import AppKit
import Foundation

let fileManager = FileManager.default
let root = URL(fileURLWithPath: fileManager.currentDirectoryPath, isDirectory: true)
let sourceURL = root.appendingPathComponent("src/assets/brand/experience-sharing.png")
let markURL = root.appendingPathComponent("src/assets/brand/sidespark-mark.png")
let accentURL = root.appendingPathComponent("src/assets/brand/spark-accent.png")
let publicDirectory = root.appendingPathComponent("public", isDirectory: true)

guard
  let sourceImage = NSImage(contentsOf: sourceURL),
  let markImage = NSImage(contentsOf: markURL),
  let accentImage = NSImage(contentsOf: accentURL)
else {
  fputs("Missing a required SideSpark brand asset.\n", stderr)
  exit(1)
}

try fileManager.createDirectory(at: publicDirectory, withIntermediateDirectories: true)

let width = 1200
let height = 630
guard let bitmap = NSBitmapImageRep(
  bitmapDataPlanes: nil,
  pixelsWide: width,
  pixelsHigh: height,
  bitsPerSample: 8,
  samplesPerPixel: 4,
  hasAlpha: true,
  isPlanar: false,
  colorSpaceName: .deviceRGB,
  bytesPerRow: 0,
  bitsPerPixel: 0
) else {
  fputs("Could not create the social preview canvas.\n", stderr)
  exit(1)
}

NSGraphicsContext.saveGraphicsState()
guard let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
  fputs("Could not create a drawing context.\n", stderr)
  exit(1)
}
NSGraphicsContext.current = context

func color(_ hex: UInt32) -> NSColor {
  NSColor(
    red: CGFloat((hex >> 16) & 0xff) / 255,
    green: CGFloat((hex >> 8) & 0xff) / 255,
    blue: CGFloat(hex & 0xff) / 255,
    alpha: 1
  )
}

func font(named name: String, size: CGFloat, fallbackWeight: NSFont.Weight) -> NSFont {
  NSFont(name: name, size: size) ?? NSFont.systemFont(ofSize: size, weight: fallbackWeight)
}

func drawText(
  _ text: String,
  in rect: NSRect,
  font: NSFont,
  color: NSColor,
  lineHeight: CGFloat? = nil
) {
  let paragraph = NSMutableParagraphStyle()
  paragraph.alignment = .left
  if let lineHeight {
    paragraph.minimumLineHeight = lineHeight
    paragraph.maximumLineHeight = lineHeight
  }
  NSAttributedString(
    string: text,
    attributes: [
      .font: font,
      .foregroundColor: color,
      .paragraphStyle: paragraph,
    ]
  ).draw(in: rect)
}

let canvas = NSRect(x: 0, y: 0, width: width, height: height)
color(0x11105f).setFill()
canvas.fill()

let coralBand = NSBezierPath(
  roundedRect: NSRect(x: 0, y: 0, width: 1200, height: 18),
  xRadius: 9,
  yRadius: 9
)
color(0xff6d57).setFill()
coralBand.fill()

let artworkPanel = NSRect(x: 560, y: 54, width: 590, height: 522)
let artworkClip = NSBezierPath(roundedRect: artworkPanel, xRadius: 34, yRadius: 34)
NSGraphicsContext.saveGraphicsState()
artworkClip.addClip()
color(0xfffbf0).setFill()
artworkPanel.fill()

let sourceAspect = sourceImage.size.width / sourceImage.size.height
let fittedHeight = artworkPanel.width / sourceAspect
let imageRect = NSRect(
  x: artworkPanel.minX,
  y: artworkPanel.midY - fittedHeight / 2 - 6,
  width: artworkPanel.width,
  height: fittedHeight
)
sourceImage.draw(
  in: imageRect,
  from: .zero,
  operation: .sourceOver,
  fraction: 1,
  respectFlipped: true,
  hints: [.interpolation: NSImageInterpolation.high]
)
NSGraphicsContext.restoreGraphicsState()

markImage.draw(
  in: NSRect(x: 70, y: 486, width: 68, height: 68),
  from: .zero,
  operation: .sourceOver,
  fraction: 1
)

drawText(
  "SideSpark",
  in: NSRect(x: 150, y: 482, width: 350, height: 76),
  font: font(named: "ArialRoundedMTBold", size: 54, fallbackWeight: .heavy),
  color: .white
)

drawText(
  "Share a skill.\nMake a connection.",
  in: NSRect(x: 70, y: 254, width: 440, height: 190),
  font: font(named: "ArialRoundedMTBold", size: 55, fallbackWeight: .heavy),
  color: .white,
  lineHeight: 67
)

let promise = NSBezierPath(roundedRect: NSRect(x: 70, y: 146, width: 368, height: 58), xRadius: 29, yRadius: 29)
color(0xffd63d).setFill()
promise.fill()
drawText(
  "Free to host. Free to join.",
  in: NSRect(x: 94, y: 158, width: 330, height: 36),
  font: font(named: "ArialRoundedMTBold", size: 23, fallbackWeight: .bold),
  color: color(0x11105f)
)

drawText(
  "Singapore-first · online or in person",
  in: NSRect(x: 72, y: 91, width: 430, height: 34),
  font: NSFont.systemFont(ofSize: 20, weight: .medium),
  color: color(0xd9dbff)
)

accentImage.draw(
  in: NSRect(x: 445, y: 71, width: 70, height: 70),
  from: .zero,
  operation: .sourceOver,
  fraction: 0.95
)

context.flushGraphics()
NSGraphicsContext.restoreGraphicsState()

guard
  let pngData = bitmap.representation(using: .png, properties: [:]),
  let jpegData = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.9])
else {
  fputs("Could not encode the social preview assets.\n", stderr)
  exit(1)
}

try pngData.write(to: publicDirectory.appendingPathComponent("og.png"), options: .atomic)
try jpegData.write(to: publicDirectory.appendingPathComponent("screenshot.jpeg"), options: .atomic)

print("Generated public/og.png and public/screenshot.jpeg at 1200x630.")
