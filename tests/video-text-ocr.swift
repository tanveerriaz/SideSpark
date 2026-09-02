import AppKit
import AVFoundation
import Darwin
import Vision

let expected: [(time: Double, phrases: [String])] = [
    (0.8, ["Pick", "break"]),
    (6.8, ["Meet", "someone", "new"]),
    (12.8, ["Swap", "skill"]),
    (16.5, ["SideSpark", "Find", "spark"])
]

guard CommandLine.arguments.count == 2 else {
    fputs("Usage: swift tests/video-text-ocr.swift VIDEO_PATH\n", stderr)
    exit(EXIT_FAILURE)
}

let asset = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true

for sample in expected {
    let frame = try generator.copyCGImage(
        at: CMTime(seconds: sample.time, preferredTimescale: 600),
        actualTime: nil
    )
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    try VNImageRequestHandler(cgImage: frame).perform([request])

    let observed = (request.results ?? [])
        .compactMap { $0.topCandidates(1).first?.string }
        .joined(separator: " ")

    let missing = sample.phrases.filter {
        observed.range(of: $0, options: [.caseInsensitive, .diacriticInsensitive]) == nil
    }
    if !missing.isEmpty {
        fputs(
            "At \(sample.time)s OCR found '\(observed)' but missed: \(missing.joined(separator: ", "))\n",
            stderr
        )
        exit(EXIT_FAILURE)
    }
}

print("All SideSpark ad captions are visible to OCR.")
