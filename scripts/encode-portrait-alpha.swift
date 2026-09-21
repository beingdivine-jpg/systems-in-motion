// Encode the approved ink recording as native HEVC with alpha for Safari.
// Usage: swift -O scripts/encode-portrait-alpha.swift <input.mp4> <input-poster.png> <output-directory> <name>
import Foundation
import AVFoundation
import VideoToolbox
import CoreImage
import AppKit

let args = CommandLine.arguments
guard args.count == 5 else { fatalError("Expected video, poster, output directory and name") }
let source = URL(fileURLWithPath: args[1])
let poster = URL(fileURLWithPath: args[2])
let directory = URL(fileURLWithPath: args[3], isDirectory: true)
let name = args[4]
try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
let destination = directory.appendingPathComponent("\(name).mov")
guard !FileManager.default.fileExists(atPath: destination.path) else { fatalError("Output already exists; choose a fresh directory") }
let colourSpace = CGColorSpace(name: CGColorSpace.sRGB)!
let context = CIContext(options: [.workingColorSpace: colourSpace, .outputColorSpace: colourSpace])

func transparentInk(_ image: CIImage) -> CIImage {
    image.applyingFilter("CIColorMatrix", parameters: [
        "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
        "inputAVector": CIVector(x: -0.23167, y: -0.77938, z: -0.07868, w: 1.06838),
        "inputBiasVector": CIVector(x: 0.055, y: 0.065, z: 0.080, w: 0),
    ]).applyingFilter("CIColorClamp")
}

let posterImage = CIImage(contentsOf: poster)!
let transparentPoster = transparentInk(posterImage)
try context.writePNGRepresentation(of: transparentPoster,
    to: directory.appendingPathComponent("\(name)-poster.png"),
    format: .RGBA8, colorSpace: colourSpace)

let asset = AVURLAsset(url: source)
let track = asset.tracks(withMediaType: .video).first!
let width = Int(track.naturalSize.width), height = Int(track.naturalSize.height)
let reader = try AVAssetReader(asset: asset)
let frames = AVAssetReaderTrackOutput(track: track, outputSettings: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferIOSurfacePropertiesKey as String: [:],
])
frames.alwaysCopiesSampleData = false
reader.add(frames)

let writer = try AVAssetWriter(outputURL: destination, fileType: .mov)
writer.shouldOptimizeForNetworkUse = true
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.hevcWithAlpha,
    AVVideoWidthKey: width, AVVideoHeightKey: height,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 2_000_000,
        AVVideoExpectedSourceFrameRateKey: 30,
        AVVideoMaxKeyFrameIntervalKey: 60,
        kVTCompressionPropertyKey_TargetQualityForAlpha as String: 0.75,
        kVTCompressionPropertyKey_AlphaChannelMode as String: kVTAlphaChannelMode_PremultipliedAlpha,
    ],
])
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: width, kCVPixelBufferHeightKey as String: height,
    kCVPixelBufferIOSurfacePropertiesKey as String: [:],
])
writer.add(input)
guard writer.startWriting() else { throw writer.error! }
writer.startSession(atSourceTime: .zero)
guard reader.startReading() else { throw reader.error! }
var count = 0
while let sample = frames.copyNextSampleBuffer() {
    try autoreleasepool {
        while !input.isReadyForMoreMediaData {
            guard writer.status == .writing else { throw writer.error! }
            Thread.sleep(forTimeInterval: 0.005)
        }
        let sourceBuffer = CMSampleBufferGetImageBuffer(sample)!
        let image = transparentInk(CIImage(cvPixelBuffer: sourceBuffer))
        var outputBuffer: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &outputBuffer)
        guard let outputBuffer else { fatalError("Could not allocate output frame") }
        context.render(image, to: outputBuffer, bounds: image.extent, colorSpace: colourSpace)
        guard adaptor.append(outputBuffer, withPresentationTime: CMSampleBufferGetPresentationTimeStamp(sample)) else { throw writer.error! }
        count += 1
        if count % 60 == 0 { print("\(name): \(count) frames"); fflush(stdout) }
    }
}
guard reader.status == .completed else { throw reader.error! }
writer.endSession(atSourceTime: asset.duration)
input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
guard writer.status == .completed else { throw writer.error! }
let finished = AVURLAsset(url: destination)
let finishedTrack = finished.tracks(withMediaType: .video).first!
guard finishedTrack.hasMediaCharacteristic(.containsAlphaChannel) else { fatalError("Export did not contain alpha") }
print("Verified alpha: \(width) × \(height), \(finished.duration.seconds)s, \(count) frames. \(destination.path)")
