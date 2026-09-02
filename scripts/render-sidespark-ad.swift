import AppKit
import AVFoundation
import CoreText
import Darwin
import Foundation
import QuartzCore

enum RenderError: LocalizedError {
    case missingSource(String)
    case missingVideoTrack(String)
    case cannotCreateCompositionTrack
    case cannotCreateExporter
    case exportFailed(String)
    case posterFailed

    var errorDescription: String? {
        switch self {
        case .missingSource(let path):
            return "Missing source clip: \(path)"
        case .missingVideoTrack(let path):
            return "No video track found in: \(path)"
        case .cannotCreateCompositionTrack:
            return "Could not create the composition video track."
        case .cannotCreateExporter:
            return "Could not create an H.264 export session."
        case .exportFailed(let message):
            return "Video export failed: \(message)"
        case .posterFailed:
            return "Could not create the poster image."
        }
    }
}

struct Scene {
    let fileName: String
    let caption: String
    let accent: NSColor
    let startZoom: CGFloat
    let endZoom: CGFloat
    let startOffset: CGPoint
    let endOffset: CGPoint
}

struct SideSparkAdRenderer {
    static let renderSize = CGSize(width: 1280, height: 720)
    static let sceneDuration = CMTime(seconds: 6, preferredTimescale: 600)
    static let indigo = NSColor(calibratedRed: 17 / 255, green: 16 / 255, blue: 95 / 255, alpha: 1)
    static let coral = NSColor(calibratedRed: 255 / 255, green: 115 / 255, blue: 94 / 255, alpha: 1)
    static let mint = NSColor(calibratedRed: 118 / 255, green: 223 / 255, blue: 196 / 255, alpha: 1)
    static let sun = NSColor(calibratedRed: 255 / 255, green: 216 / 255, blue: 61 / 255, alpha: 1)

    static func render() async throws {
        let fileManager = FileManager.default
        let projectRoot = URL(fileURLWithPath: fileManager.currentDirectoryPath, isDirectory: true)
        let assetDirectory = projectRoot.appendingPathComponent("src/assets/video", isDirectory: true)
        let sourceDirectory = assetDirectory.appendingPathComponent("source", isDirectory: true)
        let outputURL = assetDirectory.appendingPathComponent("sidespark-office-ad.mp4")
        let posterURL = assetDirectory.appendingPathComponent("sidespark-office-ad-poster.jpg")

        let scenes = [
            Scene(
                fileName: "coffee.mp4",
                caption: "Pick a break.",
                accent: coral,
                startZoom: 1.03,
                endZoom: 1.10,
                startOffset: CGPoint(x: -6, y: 0),
                endOffset: CGPoint(x: 24, y: -8)
            ),
            Scene(
                fileName: "walk.mp4",
                caption: "Meet someone new.",
                accent: mint,
                startZoom: 1.08,
                endZoom: 1.02,
                startOffset: CGPoint(x: 18, y: -6),
                endOffset: CGPoint(x: -18, y: 4)
            ),
            Scene(
                fileName: "skill.mp4",
                caption: "Swap a skill. Grow your circle.",
                accent: sun,
                startZoom: 1.02,
                endZoom: 1.09,
                startOffset: CGPoint(x: -14, y: 4),
                endOffset: CGPoint(x: 18, y: -8)
            )
        ]

        try fileManager.createDirectory(at: assetDirectory, withIntermediateDirectories: true)
        let composition = AVMutableComposition()
        guard let compositionTrack = composition.addMutableTrack(
            withMediaType: .video,
            preferredTrackID: kCMPersistentTrackID_Invalid
        ) else {
            throw RenderError.cannotCreateCompositionTrack
        }

        var instructions: [AVVideoCompositionInstructionProtocol] = []
        var cursor = CMTime.zero

        for scene in scenes {
            let sourceURL = sourceDirectory.appendingPathComponent(scene.fileName)
            guard fileManager.fileExists(atPath: sourceURL.path) else {
                throw RenderError.missingSource(sourceURL.path)
            }

            let asset = AVURLAsset(url: sourceURL)
            guard let sourceTrack = try await asset.loadTracks(withMediaType: .video).first else {
                throw RenderError.missingVideoTrack(sourceURL.path)
            }

            let sourceDuration = try await asset.load(.duration)
            let sourceRange = CMTimeRange(start: .zero, duration: sourceDuration)
            try compositionTrack.insertTimeRange(sourceRange, of: sourceTrack, at: cursor)

            let insertedRange = CMTimeRange(start: cursor, duration: sourceDuration)
            compositionTrack.scaleTimeRange(insertedRange, toDuration: sceneDuration)

            let naturalSize = try await sourceTrack.load(.naturalSize)
            let preferredTransform = try await sourceTrack.load(.preferredTransform)
            let instruction = AVMutableVideoCompositionInstruction()
            instruction.timeRange = CMTimeRange(start: cursor, duration: sceneDuration)

            let layerInstruction = AVMutableVideoCompositionLayerInstruction(assetTrack: compositionTrack)
            let startTransform = aspectFillTransform(
                naturalSize: naturalSize,
                preferredTransform: preferredTransform,
                zoom: scene.startZoom,
                offset: scene.startOffset
            )
            let endTransform = aspectFillTransform(
                naturalSize: naturalSize,
                preferredTransform: preferredTransform,
                zoom: scene.endZoom,
                offset: scene.endOffset
            )
            layerInstruction.setTransformRamp(
                fromStart: startTransform,
                toEnd: endTransform,
                timeRange: instruction.timeRange
            )
            instruction.layerInstructions = [layerInstruction]
            instructions.append(instruction)
            cursor = CMTimeAdd(cursor, sceneDuration)
        }

        let videoComposition = AVMutableVideoComposition()
        videoComposition.renderSize = renderSize
        videoComposition.frameDuration = CMTime(value: 1, timescale: 30)
        videoComposition.instructions = instructions

        let parentLayer = CALayer()
        let videoLayer = CALayer()
        let overlayLayer = CALayer()
        parentLayer.frame = CGRect(origin: .zero, size: renderSize)
        videoLayer.frame = parentLayer.frame
        overlayLayer.frame = parentLayer.frame
        overlayLayer.isGeometryFlipped = true
        parentLayer.addSublayer(videoLayer)
        parentLayer.addSublayer(overlayLayer)

        let shade = CAGradientLayer()
        shade.frame = overlayLayer.bounds
        shade.colors = [
            indigo.withAlphaComponent(0.58).cgColor,
            indigo.withAlphaComponent(0.12).cgColor,
            NSColor.clear.cgColor
        ]
        shade.locations = [0, 0.46, 0.8]
        shade.startPoint = CGPoint(x: 0, y: 0.5)
        shade.endPoint = CGPoint(x: 1, y: 0.5)
        overlayLayer.addSublayer(shade)

        addCaption("Pick a break.", accent: coral, start: 0, end: 5.7, to: overlayLayer)
        addCaption("Meet someone new.", accent: mint, start: 6, end: 11.7, to: overlayLayer)
        addCaption("Swap a skill.\nGrow your circle.", accent: sun, start: 12, end: 15.6, to: overlayLayer)
        addEndCard(to: overlayLayer)

        videoComposition.animationTool = AVVideoCompositionCoreAnimationTool(
            postProcessingAsVideoLayer: videoLayer,
            in: parentLayer
        )

        if fileManager.fileExists(atPath: outputURL.path) {
            try fileManager.removeItem(at: outputURL)
        }
        if fileManager.fileExists(atPath: posterURL.path) {
            try fileManager.removeItem(at: posterURL)
        }

        guard let exporter = AVAssetExportSession(
            asset: composition,
            presetName: AVAssetExportPresetHighestQuality
        ) else {
            throw RenderError.cannotCreateExporter
        }
        exporter.videoComposition = videoComposition
        exporter.shouldOptimizeForNetworkUse = true

        do {
            try await exporter.export(to: outputURL, as: .mp4)
        } catch {
            throw RenderError.exportFailed(error.localizedDescription)
        }

        try await createPoster(from: outputURL, at: posterURL)
        print("Rendered \(outputURL.path)")
        print("Rendered \(posterURL.path)")
    }

    static func aspectFillTransform(
        naturalSize: CGSize,
        preferredTransform: CGAffineTransform,
        zoom: CGFloat,
        offset: CGPoint
    ) -> CGAffineTransform {
        let orientedRect = CGRect(origin: .zero, size: naturalSize)
            .applying(preferredTransform)
            .standardized
        let scale = max(
            renderSize.width / orientedRect.width,
            renderSize.height / orientedRect.height
        ) * zoom
        let scaledSize = CGSize(
            width: orientedRect.width * scale,
            height: orientedRect.height * scale
        )
        let centered = CGPoint(
            x: (renderSize.width - scaledSize.width) / 2 + offset.x,
            y: (renderSize.height - scaledSize.height) / 2 + offset.y
        )

        return preferredTransform
            .concatenating(CGAffineTransform(
                translationX: -orientedRect.origin.x,
                y: -orientedRect.origin.y
            ))
            .concatenating(CGAffineTransform(scaleX: scale, y: scale))
            .concatenating(CGAffineTransform(
                translationX: centered.x,
                y: centered.y
            ))
    }

    static func roundedFont(size: CGFloat) -> NSFont {
        let candidates = ["Fredoka-Bold", "Fredoka"]
        for name in candidates {
            if let font = NSFont(name: name, size: size) {
                return font
            }
        }

        let system = NSFont.systemFont(ofSize: size, weight: .heavy)
        if let rounded = system.fontDescriptor.withDesign(.rounded),
           let font = NSFont(descriptor: rounded, size: size) {
            return font
        }
        return system
    }

    static func makeTextLayer(
        frame: CGRect,
        text: String,
        size: CGFloat,
        color: NSColor,
        alignment: CATextLayerAlignmentMode = .left
    ) -> CALayer {
        let scale: CGFloat = 2
        guard let bitmap = NSBitmapImageRep(
            bitmapDataPlanes: nil,
            pixelsWide: Int(frame.width * scale),
            pixelsHigh: Int(frame.height * scale),
            bitsPerSample: 8,
            samplesPerPixel: 4,
            hasAlpha: true,
            isPlanar: false,
            colorSpaceName: .deviceRGB,
            bytesPerRow: 0,
            bitsPerPixel: 0
        ), let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
            fatalError("Could not create a text bitmap.")
        }

        let paragraph = NSMutableParagraphStyle()
        paragraph.alignment = alignment == .center ? .center : .left
        let font = roundedFont(size: size)
        let attributes: [NSAttributedString.Key: Any] = [
            .font: font,
            .foregroundColor: color,
            .paragraphStyle: paragraph
        ]

        NSGraphicsContext.saveGraphicsState()
        NSGraphicsContext.current = context
        context.cgContext.scaleBy(x: scale, y: scale)
        (text as NSString).draw(
            with: CGRect(origin: .zero, size: frame.size),
            options: [.usesLineFragmentOrigin, .usesFontLeading],
            attributes: attributes
        )
        NSGraphicsContext.restoreGraphicsState()

        let layer = CALayer()
        layer.frame = frame
        layer.contents = bitmap.cgImage
        layer.contentsGravity = .resize
        layer.contentsScale = scale
        return layer
    }

    static func addCaption(
        _ text: String,
        accent: NSColor,
        start: Double,
        end: Double,
        to parent: CALayer
    ) {
        let twoLines = text.contains("\n")
        let panel = CALayer()
        panel.frame = CGRect(x: 52, y: 52, width: twoLines ? 760 : 660, height: twoLines ? 172 : 122)
        panel.backgroundColor = indigo.withAlphaComponent(0.92).cgColor
        panel.cornerRadius = 30
        panel.borderWidth = 2
        panel.borderColor = NSColor.white.withAlphaComponent(0.18).cgColor
        panel.shadowColor = indigo.cgColor
        panel.shadowOpacity = 0.3
        panel.shadowRadius = 18
        panel.shadowOffset = CGSize(width: 0, height: 8)
        panel.opacity = 0

        let accentLayer = CALayer()
        accentLayer.frame = CGRect(x: 20, y: 22, width: 10, height: panel.bounds.height - 44)
        accentLayer.backgroundColor = accent.cgColor
        accentLayer.cornerRadius = 5
        panel.addSublayer(accentLayer)

        let textLayer = makeTextLayer(
            frame: CGRect(x: 52, y: twoLines ? 24 : 28, width: panel.bounds.width - 78, height: panel.bounds.height - 48),
            text: text,
            size: twoLines ? 50 : 56,
            color: .white
        )
        panel.addSublayer(textLayer)

        let animation = CAKeyframeAnimation(keyPath: "opacity")
        animation.values = [0, 1, 1, 0]
        animation.keyTimes = [0, 0.08, 0.84, 1]
        animation.beginTime = AVCoreAnimationBeginTimeAtZero + start
        animation.duration = end - start
        animation.fillMode = .both
        animation.isRemovedOnCompletion = false
        panel.add(animation, forKey: "timedOpacity")
        parent.addSublayer(panel)
    }

    static func addEndCard(to parent: CALayer) {
        let card = CALayer()
        card.frame = parent.bounds
        card.backgroundColor = indigo.cgColor
        card.opacity = 0

        let brand = makeTextLayer(
            frame: CGRect(x: 92, y: 172, width: 1096, height: 84),
            text: "SideSpark",
            size: 62,
            color: sun,
            alignment: .center
        )
        card.addSublayer(brand)

        let firstLine = makeTextLayer(
            frame: CGRect(x: 92, y: 272, width: 1096, height: 92),
            text: "Take a break.",
            size: 80,
            color: .white,
            alignment: .center
        )
        card.addSublayer(firstLine)

        let secondLine = makeTextLayer(
            frame: CGRect(x: 92, y: 370, width: 1096, height: 92),
            text: "Find your spark.",
            size: 80,
            color: coral,
            alignment: .center
        )
        card.addSublayer(secondLine)

        let animation = CAKeyframeAnimation(keyPath: "opacity")
        animation.values = [0, 1, 1]
        animation.keyTimes = [0, 0.18, 1]
        animation.beginTime = AVCoreAnimationBeginTimeAtZero + 15.1
        animation.duration = 2.9
        animation.fillMode = .both
        animation.isRemovedOnCompletion = false
        card.add(animation, forKey: "endCardOpacity")
        parent.addSublayer(card)
    }

    static func createPoster(from videoURL: URL, at posterURL: URL) async throws {
        let asset = AVURLAsset(url: videoURL)
        let generator = AVAssetImageGenerator(asset: asset)
        generator.appliesPreferredTrackTransform = true
        generator.maximumSize = renderSize

        let time = CMTime(seconds: 13.2, preferredTimescale: 600)
        let result = try await generator.image(at: time)
        let image = result.image
        let bitmap = NSBitmapImageRep(cgImage: image)
        guard let jpeg = bitmap.representation(
            using: .jpeg,
            properties: [.compressionFactor: 0.88]
        ) else {
            throw RenderError.posterFailed
        }
        try jpeg.write(to: posterURL)
    }
}

Task {
    do {
        try await SideSparkAdRenderer.render()
        exit(EXIT_SUCCESS)
    } catch {
        fputs("\(error.localizedDescription)\n", stderr)
        exit(EXIT_FAILURE)
    }
}

dispatchMain()
