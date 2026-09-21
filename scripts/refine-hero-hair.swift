// Hair-only finishing pass for the approved 16-second, 1080×1200 ink-dot loop.
// Usage: swift -O scripts/refine-hero-hair.swift <rendered.mp4> <output-directory> [--preview]
// The photo informs temple coverage only; no generated face or photo pixels are used.
// Keep the source and destination in different directories. Do not apply twice.
import Foundation
import AVFoundation
import AppKit
import CoreImage
let args=CommandLine.arguments
let source=URL(fileURLWithPath:args[1])
let output=URL(fileURLWithPath:args[2],isDirectory:true)
try FileManager.default.createDirectory(at:output,withIntermediateDirectories:true)
let preview=args.contains("--preview")
let asset=AVURLAsset(url:source)
let generator=AVAssetImageGenerator(asset:asset)
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero
let width=1080,height=1200,fps:Int32=30
let colourSpace=CGColorSpaceCreateDeviceRGB()
let bitmapInfo=CGBitmapInfo.byteOrder32Big.rawValue | CGImageAlphaInfo.premultipliedLast.rawValue
let ciContext=CIContext(options:[.workingColorSpace:CGColorSpace(name:CGColorSpace.sRGB)!])
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
for row in 50..<275 {
 for col in 100..<400 {
  points.append(Point(x:(Double(col)+0.15+random()*0.7)*2.05,y:(Double(row)+0.15+random()*0.7)*2.05,threshold:random(),size:0.7+random()*0.42))
 }
}
func context(_ space:CGColorSpace = colourSpace)->CGContext {CGContext(data:nil,width:width,height:height,bitsPerComponent:8,bytesPerRow:width*4,space:space,bitmapInfo:bitmapInfo)!}
func refine(_ image:CGImage,_ t:Double)->CGImage {
 let original=CIImage(cgImage:image)
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
 let soft=context(),wide=context(),result=context(image.colorSpace ?? colourSpace)
 soft.draw(ciContext.createCGImage(blur,from:bounds)!,in:bounds)
 wide.draw(ciContext.createCGImage(expanded,from:bounds)!,in:bounds)
 result.draw(image,in:bounds)
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
func savePNG(_ image:CGImage,_ name:String)throws {
 try NSBitmapImageRep(cgImage:image).representation(using:.png,properties:[:])!.write(to:output.appendingPathComponent(name))
}
if preview {
 for t in [0.0,2.0,4.0,6.0,8.0,10.0,12.0,14.0,15.0] {
  let im=try generator.copyCGImage(at:CMTime(seconds:t,preferredTimescale:600),actualTime:nil)
  try savePNG(refine(im,t),"hair-\(Int(t)).png")
 }
 exit(0)
}

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
                                space: image.colorSpace ?? colourSpace, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
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


guard let track=asset.tracks(withMediaType:.video).first,
      track.naturalSize == CGSize(width:width,height:height),
      abs(asset.duration.seconds-16)<0.02,
      source.deletingLastPathComponent().standardizedFileURL != output.standardizedFileURL else {
 fatalError("Expected the approved 1080×1200, 16-second loop and a separate output directory")
}
let movies=[
 try MovieOutput(name:"divin-portrait.mp4",pixelWidth:width,pixelHeight:height,bitRate:8_000_000),
 try MovieOutput(name:"divin-portrait-small.mp4",pixelWidth:720,pixelHeight:800,bitRate:3_100_000)
]
for index in 0..<480 {
 try autoreleasepool {
  let t=Double(index)/30
  let original=try generator.copyCGImage(at:CMTime(value:Int64(index),timescale:30),actualTime:nil)
  let refined=refine(original,index==479 ? 0:t)
  if index==0 {try savePNG(refined,"divin-portrait-poster.png")}
  if index%30==0 {try savePNG(refined,"check-\(index/30).png")}
  for movie in movies {try movie.append(refined,index:index)}
  if index%30==0 {print("Refined \(index)/480 frames");fflush(stdout)}
 }
}
for movie in movies {try movie.finish()}
