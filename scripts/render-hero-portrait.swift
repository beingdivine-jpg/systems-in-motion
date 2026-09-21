// macOS-only, offline renderer. Usage:
// swift scripts/render-hero-portrait.swift <source.mov> <output-directory> [--preview]
// The source stays private; only the silent rendered loop and poster enter public/.
import Foundation
import AVFoundation
import AppKit
import Vision
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else { fatalError("Expected source video and output directory") }
let source = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2], isDirectory: true)
let preview = args.contains("--preview")
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
let asset = AVURLAsset(url: source)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.maximumSize = CGSize(width: 2560, height: 2560)
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero
let ciContext = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
let segmentation = VNGeneratePersonSegmentationRequest()
segmentation.qualityLevel = .accurate
segmentation.outputPixelFormat = kCVPixelFormatType_OneComponent8
let sequence = VNSequenceRequestHandler()
let width = 1080, height = 1200, fps: Int32 = 30
let colourSpace = CGColorSpaceCreateDeviceRGB()
let bitmapInfo = CGBitmapInfo.byteOrder32Big.rawValue | CGImageAlphaInfo.premultipliedLast.rawValue

func smooth(_ low: Double, _ high: Double, _ value: Double) -> Double {
    let t = min(1, max(0, (value - low) / (high - low)))
    return t * t * (3 - 2 * t)
}
// A fixed, irregular point field prevents distracting random grain between frames.
var seed: UInt64 = 421
func random() -> Double {
    seed = seed &* 6364136223846793005 &+ 1442695040888963407
    return Double(seed >> 11) / 9007199254740992
}
struct Point { let x: Double; let y: Double; let threshold: Double; let size: Double }
var points: [Point] = []
let spacing = 2.05
for row in 0..<Int(Double(height) / spacing) {
    for col in 0..<Int(Double(width) / spacing) {
        points.append(Point(x: (Double(col) + 0.15 + random() * 0.7) * spacing,
                            y: (Double(row) + 0.15 + random() * 0.7) * spacing,
                            threshold: random(), size: 0.68 + random() * 0.47))
    }
}

func render(seconds: Double, debug: Bool = false) throws -> CGImage {
    let sourceImage = try generator.copyCGImage(at: CMTime(seconds: seconds, preferredTimescale: 600), actualTime: nil)
    try sequence.perform([segmentation], on: sourceImage)
    guard let maskBuffer = segmentation.results?.first?.pixelBuffer else { throw NSError(domain: "Portrait", code: 1) }
    let sourceWidth = Double(sourceImage.width), sourceHeight = Double(sourceImage.height)
    let sourceCI = CIImage(cgImage: sourceImage)
    var mask = CIImage(cvPixelBuffer: maskBuffer)
    mask = mask.transformed(by: CGAffineTransform(scaleX: sourceWidth / mask.extent.width, y: sourceHeight / mask.extent.height))
        .applyingFilter("CIMorphologyMaximum", parameters: ["inputRadius": 1.0])
        .applyingFilter("CIMorphologyMinimum", parameters: ["inputRadius": 1.0])
        .applyingFilter("CIGaussianBlur", parameters: ["inputRadius": 0.55])
    let isolated = sourceCI.applyingFilter("CIBlendWithMask", parameters: [
        kCIInputBackgroundImageKey: CIImage(color: CIColor.white).cropped(to: sourceCI.extent),
        kCIInputMaskImageKey: mask,
    ])
    // Stable framing: no face tracking or resculpting; only the recorded motion.
    let cropWidth = sourceWidth
    let cropHeight = cropWidth * Double(height) / Double(width)
    let crop = CGRect(x: sourceWidth * 0.045, y: sourceHeight - sourceHeight * 0.135 - cropHeight,
                      width: cropWidth, height: cropHeight)
    let scale = Double(width) / cropWidth
    let framed = isolated.cropped(to: crop)
        .transformed(by: CGAffineTransform(translationX: -crop.minX, y: -crop.minY))
        .transformed(by: CGAffineTransform(scaleX: scale, y: scale))
    let opaque = framed.composited(over: CIImage(color: CIColor.white))
    let sampled = ciContext.createCGImage(opaque, from: CGRect(x: 0, y: 0, width: width, height: height))!
    let sampleContext = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8,
                                 bytesPerRow: width * 4, space: colourSpace, bitmapInfo: bitmapInfo)!
    sampleContext.draw(sampled, in: CGRect(x: 0, y: 0, width: width, height: height))
    let pixels = sampleContext.data!.assumingMemoryBound(to: UInt8.self)
    let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8,
                            bytesPerRow: width * 4, space: colourSpace, bitmapInfo: bitmapInfo)!
    context.setFillColor(CGColor(gray: 1, alpha: 1))
    context.fill(CGRect(x: 0, y: 0, width: width, height: height))
    context.setFillColor(CGColor(red: 0.055, green: 0.065, blue: 0.08, alpha: 1))
    let dots = CGMutablePath()
    for point in points {
        let x = min(width - 1, Int(point.x)), y = min(height - 1, Int(point.y))
        let offset = (y * width + x) * 4
        let luminance = (Double(pixels[offset]) * 0.2126 + Double(pixels[offset + 1]) * 0.7152 + Double(pixels[offset + 2]) * 0.0722) / 255
        // Remove the source's backlit haze while retaining facial highlights.
        let baseDarkness = 1 - smooth(0.26, 0.87, luminance)
        // Recover neutral dark hair that the backlight and sparse dots washed out.
        // This follows recorded colour in the head area, not a painted hair shape.
        let warmth = (Double(pixels[offset]) - Double(pixels[offset + 2])) / 255
        let neutral = 1 - smooth(0.035, 0.12, warmth)
        let headRegion = (1 - smooth(0.37, 0.52, point.y / Double(height)))
            * smooth(0.12, 0.23, point.x / Double(width))
            * (1 - smooth(0.79, 0.91, point.x / Double(width)))
        let hair = neutral * headRegion * (1 - smooth(0.67, 0.88, luminance))
        let darkness = min(0.98, baseDarkness + hair * 0.35)
        let edgeFade = smooth(12, 96, point.x) * (1 - smooth(Double(width - 96), Double(width - 12), point.x))
        // Pixel memory is top-down; CGContext drawing below uses bottom-up coordinates.
        let shoulderFade = 1 - smooth(Double(height) * 0.72, Double(height) * 0.98, point.y)
        let density = pow(darkness, 1.1) * edgeFade * shoulderFade
        let presence = smooth(point.threshold, point.threshold + 0.075, density)
        let radius = point.size * sqrt(presence) * (0.90 + darkness * 0.40)
        if radius > 0.12 {
            dots.addEllipse(in: CGRect(x: point.x - radius, y: Double(height) - point.y - radius, width: radius * 2, height: radius * 2))
        }
    }
    context.addPath(dots)
    context.fillPath()
    if debug {
        let png = NSBitmapImageRep(cgImage: sampled).representation(using: .png, properties: [:])!
        try png.write(to: output.appendingPathComponent("source-isolated.png"))
    }
    return context.makeImage()!
}

func savePNG(_ image: CGImage, _ name: String) throws {
    try NSBitmapImageRep(cgImage: image).representation(using: .png, properties: [:])!
        .write(to: output.appendingPathComponent(name))
}

if preview {
    for (index, seconds) in [7.1, 9.0, 12.8, 15.6, 17.4].enumerated() {
        try autoreleasepool {
            try savePNG(render(seconds: seconds, debug: index == 0), "preview-\(index).png")
            print("Preview at \(seconds)s")
        }
    }
    exit(0)
}

// Encode both sizes from the same high-resolution frames. No re-rendered mobile likeness.
final class MovieOutput {
    let url: URL
    let writer: AVAssetWriter
    let input: AVAssetWriterInput
    let adaptor: AVAssetWriterInputPixelBufferAdaptor
    let pixelWidth: Int
    let pixelHeight: Int

    init(name: String, pixelWidth: Int, pixelHeight: Int, bitRate: Int) throws {
        self.pixelWidth = pixelWidth
        self.pixelHeight = pixelHeight
        url = output.appendingPathComponent(name)
        if FileManager.default.fileExists(atPath: url.path) { try FileManager.default.removeItem(at: url) }
        writer = try AVAssetWriter(outputURL: url, fileType: .mp4)
        writer.shouldOptimizeForNetworkUse = true
        input = AVAssetWriterInput(mediaType: .video, outputSettings: [
            AVVideoCodecKey: AVVideoCodecType.h264,
            AVVideoWidthKey: pixelWidth, AVVideoHeightKey: pixelHeight,
            AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: bitRate,
                                              AVVideoExpectedSourceFrameRateKey: fps,
                                              AVVideoMaxKeyFrameIntervalKey: fps * 2,
                                              AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel],
        ])
        input.expectsMediaDataInRealTime = false
        adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
            kCVPixelBufferWidthKey as String: pixelWidth, kCVPixelBufferHeightKey as String: pixelHeight,
            kCVPixelBufferCGImageCompatibilityKey as String: true,
            kCVPixelBufferCGBitmapContextCompatibilityKey as String: true,
        ])
        writer.add(input)
        guard writer.startWriting() else { throw writer.error! }
        writer.startSession(atSourceTime: .zero)
    }

    func append(_ image: CGImage, index: Int) throws {
        while !input.isReadyForMoreMediaData {
            guard writer.status == .writing else { throw writer.error ?? NSError(domain: "Portrait", code: 3) }
            Thread.sleep(forTimeInterval: 0.005)
        }
        var buffer: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &buffer)
        guard let buffer else { throw NSError(domain: "Portrait", code: 2) }
        CVPixelBufferLockBaseAddress(buffer, [])
        let context = CGContext(data: CVPixelBufferGetBaseAddress(buffer), width: pixelWidth, height: pixelHeight,
                                bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
                                space: colourSpace, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
        context.interpolationQuality = .high
        context.draw(image, in: CGRect(x: 0, y: 0, width: pixelWidth, height: pixelHeight))
        CVPixelBufferUnlockBaseAddress(buffer, [])
        guard adaptor.append(buffer, withPresentationTime: CMTime(value: Int64(index), timescale: fps)) else { throw writer.error! }
    }

    func finish() throws {
        input.markAsFinished()
        let done = DispatchSemaphore(value: 0)
        writer.finishWriting { done.signal() }
        done.wait()
        guard writer.status == .completed else { throw writer.error! }
        print("Saved \(url.path)")
    }
}

let movies = [
    try MovieOutput(name: "divin-portrait.mp4", pixelWidth: width, pixelHeight: height, bitRate: 5_200_000),
    try MovieOutput(name: "divin-portrait-small.mp4", pixelWidth: 720, pixelHeight: 800, bitRate: 2_400_000),
]
// Forward-only outward glances: right, left, upward, then right again.
// Match the near-frontal outward glances; a four-frame join avoids a long double exposure.
let sourceStart = 7.1, sourceEnd = 17.25
let frameCount = Int(fps) * 16
let firstFrame = try render(seconds: sourceStart)
try savePNG(firstFrame, "divin-portrait-poster.png")
for index in 0..<frameCount {
    try autoreleasepool {
        let seconds = sourceStart + Double(index) / Double(frameCount - 1) * (sourceEnd - sourceStart)
        var rendered = index == 0 ? firstFrame : try render(seconds: seconds)
        if index >= frameCount - 36 {
            // A tiny framing correction aligns the returning head position, without warping the face.
            let correction = smooth(Double(frameCount - 36), Double(frameCount - 1), Double(index))
            let joined = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8,
                                   bytesPerRow: width * 4, space: colourSpace, bitmapInfo: bitmapInfo)!
            let bounds = CGRect(x: 0, y: 0, width: width, height: height)
            joined.setFillColor(CGColor(gray: 1, alpha: 1))
            joined.fill(bounds)
            joined.draw(rendered, in: bounds.offsetBy(dx: -15 * correction, dy: 6 * correction))
            if index >= frameCount - 4 {
                let fraction = Double(index - (frameCount - 4)) / 3
                joined.setAlpha(smooth(0, 1, fraction))
                joined.draw(firstFrame, in: bounds)
            }
            rendered = joined.makeImage()!
        }
        for movie in movies { try movie.append(rendered, index: index) }
        if index % 30 == 0 { print("Rendered \(index)/\(frameCount)"); fflush(stdout) }
    }
}
for movie in movies { try movie.finish() }
