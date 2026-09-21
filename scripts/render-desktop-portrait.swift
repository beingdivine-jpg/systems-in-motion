// Native-resolution desktop renderer. Usage:
// swift -O scripts/render-desktop-portrait.swift <source.mov> <output-directory> [--preview]
// Renders the original recording and approved hair correction before one H.264 encode.
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
generator.maximumSize = CGSize(width: 3840, height: 3840)
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero
let ciContext = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
let segmentation = VNGeneratePersonSegmentationRequest()
segmentation.qualityLevel = .accurate
segmentation.outputPixelFormat = kCVPixelFormatType_OneComponent8
let sequence = VNSequenceRequestHandler()
let width = 1620, height = 1800, fps: Int32 = 30
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

// Cache tiny antialiased circles once. Stamping their coverage is much faster than
// filling a path containing hundreds of thousands of ellipses for every frame.
struct InkSample { let dx:Int; let dy:Int; let coverage:UInt8 }
let radiusSteps=48, phaseSteps=8, radiusUnit=1.6/48.0
var inkStamps=[[InkSample]]()
for radiusIndex in 0...radiusSteps {
 for py in 0..<phaseSteps {
  for px in 0..<phaseSteps {
   let stamp=CGContext(data:nil,width:8,height:8,bitsPerComponent:8,bytesPerRow:32,space:colourSpace,bitmapInfo:bitmapInfo)!
   stamp.setFillColor(CGColor(gray:1,alpha:1));stamp.fill(CGRect(x:0,y:0,width:8,height:8))
   stamp.setFillColor(CGColor(gray:0,alpha:1))
   let radius=Double(radiusIndex)*radiusUnit
   let cx=3+Double(px)/Double(phaseSteps),cy=3+Double(py)/Double(phaseSteps)
   stamp.fillEllipse(in:CGRect(x:cx-radius,y:8-cy-radius,width:radius*2,height:radius*2))
   let bytes=stamp.data!.assumingMemoryBound(to:UInt8.self)
   var samples=[InkSample]()
   for y in 0..<8 {for x in 0..<8 {
    let coverage=255-bytes[(y*8+x)*4]
    if coverage>0 {samples.append(InkSample(dx:x-3,dy:y-3,coverage:coverage))}
   }}
   inkStamps.append(samples)
  }
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
    var coverage=[UInt8](repeating:0,count:width*height)
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
        let edgeFade = smooth(18, 144, point.x) * (1 - smooth(Double(width - 144), Double(width - 18), point.x))
        // Pixel memory is top-down; CGContext drawing below uses bottom-up coordinates.
        let shoulderFade = 1 - smooth(Double(height) * 0.72, Double(height) * 0.98, point.y)
        let density = pow(darkness, 1.1) * edgeFade * shoulderFade
        let presence = smooth(point.threshold, point.threshold + 0.075, density)
        let radius = point.size * sqrt(presence) * (0.90 + darkness * 0.40)
        if radius > 0.12 {
            let x0=Int(point.x),y0=Int(point.y)
            let phaseX=min(phaseSteps-1,Int((point.x-Double(x0))*Double(phaseSteps)))
            let phaseY=min(phaseSteps-1,Int((point.y-Double(y0))*Double(phaseSteps)))
            let radiusIndex=min(radiusSteps,Int((radius/radiusUnit).rounded()))
            let stamp=inkStamps[(radiusIndex*phaseSteps+phaseY)*phaseSteps+phaseX]
            for sample in stamp {
                let sx=x0+sample.dx,sy=y0+sample.dy
                if sx>=0 && sx<width && sy>=0 && sy<height {
                    let index=sy*width+sx
                    coverage[index]=max(coverage[index],sample.coverage)
                }
            }
        }
    }
    let ink=context.data!.assumingMemoryBound(to:UInt8.self)
    for index in 0..<(width*height) where coverage[index]>0 {
        let alpha=Int(coverage[index]),offset=index*4
        ink[offset]=UInt8(255-(241*alpha+127)/255)
        ink[offset+1]=UInt8(255-(238*alpha+127)/255)
        ink[offset+2]=UInt8(255-(235*alpha+127)/255)
    }
    if debug {
        let png = NSBitmapImageRep(cgImage: sampled).representation(using: .png, properties: [:])!
        try png.write(to: output.appendingPathComponent("source-isolated.png"))
    }
    return context.makeImage()!
}

// Apply the approved temple correction directly to the uncompressed desktop frame.
// Hair tracking uses the original 1080×1200 coordinate system; dots stay native-resolution.
func refineHair(_ highResolutionImage:CGImage,_ time:Double)->CGImage {
 let width=1080,height=1200
func smooth(_ low:Double,_ high:Double,_ v:Double)->Double {let t=min(1,max(0,(v-low)/(high-low)));return t*t*(3-2*t)}
struct Area {let x:Double;let y:Double;let rx:Double;let ry:Double}
// Soft tracked regions follow the temples through the approved sequence.
// These coordinates are specific to render-hero-portrait.swift’s 16-second framing.
let left:[Area]=[
 .init(x:380,y:345,rx:59,ry:58),.init(x:414,y:340,rx:61,ry:60),
 .init(x:444,y:315,rx:65,ry:60),.init(x:480,y:326,rx:70,ry:60),
 .init(x:505,y:336,rx:74,ry:65),.init(x:488,y:345,rx:68,ry:64),
 .init(x:447,y:362,rx:60,ry:67),.init(x:404,y:352,rx:56,ry:66),
 .init(x:365,y:349,rx:31,ry:45),.init(x:310,y:362,rx:12,ry:25),
 .init(x:285,y:370,rx:1,ry:1),.init(x:300,y:360,rx:1,ry:1),
 .init(x:321,y:355,rx:15,ry:25),.init(x:348,y:330,rx:30,ry:38),
 .init(x:373,y:322,rx:49,ry:48),.init(x:387,y:304,rx:51,ry:48),
 .init(x:380,y:345,rx:59,ry:58)]
let right:[Area]=[
 .init(x:666,y:354,rx:34,ry:44),.init(x:695,y:351,rx:21,ry:35),
 .init(x:710,y:338,rx:10,ry:25),.init(x:713,y:346,rx:1,ry:1),
 .init(x:719,y:360,rx:1,ry:1),.init(x:730,y:359,rx:1,ry:1),
 .init(x:710,y:380,rx:10,ry:25),.init(x:677,y:399,rx:23,ry:35),
 .init(x:663,y:386,rx:49,ry:59),.init(x:595,y:389,rx:62,ry:65),
 .init(x:530,y:398,rx:65,ry:70),.init(x:550,y:394,rx:65,ry:70),
 .init(x:584,y:377,rx:64,ry:64),.init(x:656,y:371,rx:48,ry:56),
 .init(x:685,y:353,rx:33,ry:46),.init(x:682,y:336,rx:33,ry:44),
 .init(x:666,y:354,rx:34,ry:44)]
func area(_ sequence:[Area],_ t:Double)->Area {
 let pos=min(16,max(0,t)),i=min(15,Int(pos)),u=pos-Double(i)
 let a=sequence[i],b=sequence[i+1]
 return Area(x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u,rx:a.rx+(b.rx-a.rx)*u,ry:a.ry+(b.ry-a.ry)*u)
}
func mask(_ a:Area,_ x:Double,_ y:Double)->Double {
 let dx=(x-a.x)/a.rx,dy=(y-a.y)/a.ry
 return 1-smooth(0.48,1,sqrt(dx*dx+dy*dy))
}
var seed:UInt64=934153
func random()->Double {seed=seed &* 6364136223846793005 &+ 1442695040888963407;return Double(seed>>11)/9007199254740992}
struct Point {let x:Double,y:Double,threshold:Double,size:Double}
var points:[Point]=[]
let hairSpacing=2.05/1.5
for row in Int(100/hairSpacing)..<Int(565/hairSpacing) {
 for col in Int(200/hairSpacing)..<Int(820/hairSpacing) {
  points.append(Point(x:(Double(col)+0.15+random()*0.7)*hairSpacing,y:(Double(row)+0.15+random()*0.7)*hairSpacing,threshold:random(),size:(0.7+random()*0.42)/1.5))
 }
}
func context(_ space:CGColorSpace = colourSpace)->CGContext {CGContext(data:nil,width:width,height:height,bitsPerComponent:8,bytesPerRow:width*4,space:space,bitmapInfo:bitmapInfo)!}
func refine(_ image:CGImage,_ t:Double)->CGImage {
 let sampling=context(image.colorSpace ?? colourSpace)
 sampling.draw(image,in:CGRect(x:0,y:0,width:width,height:height))
 let original=CIImage(cgImage:sampling.makeImage()!)
 let blur=original.clampedToExtent().applyingFilter("CIGaussianBlur",parameters:[kCIInputRadiusKey:7.0]).cropped(to:original.extent)
 // Restrict the density source to the connected crown, excluding eyebrows/eyes.
 let core=context()
 let bounds=CGRect(x:0,y:0,width:width,height:height)
 core.draw(ciContext.createCGImage(blur,from:bounds)!,in:bounds)
 let corePixels=core.data!.assumingMemoryBound(to:UInt8.self)
 var seen=[Bool](repeating:false,count:width*height)
 var queue=[Int](); queue.reserveCapacity(150000)
 var seedIndex=0,seedValue=255
 for y in stride(from:200,to:310,by:4) {
  for x in stride(from:370,to:630,by:4) {
   let index=y*width+x,value=Int(corePixels[index*4])
   if value<seedValue {seedValue=value;seedIndex=index}
  }
 }
 queue.append(seedIndex);seen[seedIndex]=true
 var cursor=0
 while cursor<queue.count {
  let index=queue[cursor];cursor += 1
  for neighbor in [index-1,index+1,index-width,index+width] {
   if neighbor<width*100 || neighbor>=width*550 || seen[neighbor] {continue}
   // A dense connected region avoids growing a nearby brow into the hairstyle.
   if corePixels[neighbor*4]<120 {seen[neighbor]=true;queue.append(neighbor)}
  }
 }
 for index in 0..<(width*height) where !seen[index] {
  corePixels[index*4]=255;corePixels[index*4+1]=255;corePixels[index*4+2]=255
 }
 let hairCore=CIImage(cgImage:core.makeImage()!)
 let expanded=hairCore.applyingFilter("CIMorphologyMinimum",parameters:[kCIInputRadiusKey:40.0])
 let soft=context(),wide=context()
 let result=CGContext(data:nil,width:image.width,height:image.height,bitsPerComponent:8,bytesPerRow:image.width*4,space:image.colorSpace ?? colourSpace,bitmapInfo:bitmapInfo)!
 soft.draw(ciContext.createCGImage(blur,from:bounds)!,in:bounds)
 wide.draw(ciContext.createCGImage(expanded,from:bounds)!,in:bounds)
 result.draw(image,in:CGRect(x:0,y:0,width:image.width,height:image.height))
 result.scaleBy(x:Double(image.width)/Double(width),y:Double(image.height)/Double(height))
 let base=soft.data!.assumingMemoryBound(to:UInt8.self)
 let grown=wide.data!.assumingMemoryBound(to:UInt8.self)
 let a=area(left,t),b=area(right,t)
 let dots=CGMutablePath()
 for p in points {
  let region=max(mask(a,p.x,p.y),mask(b,p.x,p.y))
  if region<0.001 {continue}
  let index=(Int(p.y)*width+Int(p.x))*4
  let dark=1-Double(base[index])/255,neighbor=1-Double(grown[index])/255
  // Retain the original frame and add only sparse, matching ink at the hairline.
  let eligible=smooth(0.40,0.62,neighbor)
  let extra=max(0,neighbor-dark)*region*eligible*1.45
  let probability=min(0.76,extra/max(0.15,1-dark)*0.92)
  let presence=smooth(p.threshold,p.threshold+0.075,probability)
  let r=p.size*sqrt(presence)*1.18
  if r>0.12 {dots.addEllipse(in:CGRect(x:p.x-r,y:Double(height)-p.y-r,width:2*r,height:2*r))}
 }
 result.setFillColor(CGColor(red:0.055,green:0.065,blue:0.08,alpha:1))
 result.addPath(dots);result.fillPath()
 return result.makeImage()!
}
 return refine(highResolutionImage,time)
}

func savePNG(_ image: CGImage, _ name: String) throws {
    try NSBitmapImageRep(cgImage: image).representation(using: .png, properties: [:])!
        .write(to: output.appendingPathComponent(name))
}

if preview {
    for (index, seconds) in [7.1, 9.0, 12.8, 15.6, 17.4].enumerated() {
        try autoreleasepool {
            let image=try render(seconds:seconds,debug:index==0)
            let time=min(16,max(0,(seconds-7.1)/(17.25-7.1)*16))
            try savePNG(refineHair(image,time), "preview-\(index).png")
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
    try MovieOutput(name: "divin-portrait-desktop.mp4", pixelWidth: width, pixelHeight: height, bitRate: 15_000_000),
]
// Forward-only outward glances: right, left, upward, then right again.
// Match the near-frontal outward glances; a four-frame join avoids a long double exposure.
let sourceStart = 7.1, sourceEnd = 17.25
let frameCount = Int(fps) * 16
let firstFrame = try render(seconds: sourceStart)
try savePNG(refineHair(firstFrame,0), "divin-portrait-desktop-poster.png")
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
            joined.draw(rendered, in: bounds.offsetBy(dx: -22.5 * correction, dy: 9 * correction))
            if index >= frameCount - 4 {
                let fraction = Double(index - (frameCount - 4)) / 3
                joined.setAlpha(smooth(0, 1, fraction))
                joined.draw(firstFrame, in: bounds)
            }
            rendered = joined.makeImage()!
        }
        let finished=refineHair(rendered,index==frameCount-1 ? 0 : Double(index)/Double(fps))
        for movie in movies { try movie.append(finished, index: index) }
        if index % 120 == 0 { try savePNG(finished,"check-\(index).png") }
        if index % 30 == 0 { print("Rendered \(index)/\(frameCount)"); fflush(stdout) }
    }
}
for movie in movies { try movie.finish() }
