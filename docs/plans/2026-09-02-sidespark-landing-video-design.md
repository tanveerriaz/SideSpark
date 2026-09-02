# SideSpark Landing Video Design

**Status:** Approved on 2026-09-02

## Goal

Create an 18-second, cost-conscious landing-page ad that makes SideSpark feel active and social by showing fictional office coworkers connecting through three recognisable sidequests.

## Creative direction

The ad is a silent, landscape loop made from three six-second scenes:

1. Two coworkers meet naturally for coffee in a bright office pantry. Overlay: **Pick a break.**
2. Coworkers from different teams take a short walk and discover an easy rapport. Overlay: **Meet someone new.**
3. One coworker shares a useful technique with another at a desk. Overlay: **Swap a skill. Grow your circle.**

The last seconds resolve into the SideSpark message: **Take a break. Find your spark.** Generated frames contain no lettering, logos, or legible interface. Brand copy and graphic treatments are added during deterministic local post-production using the approved deep indigo, coral, mint, yellow, Fredoka, and Inter system.

## Generation approach and budget

Use Fal's current low-cost workflow:

- Three Bria Fast 16:9 photographic keyframes at US$0.028 per generation: approximately US$0.084.
- Three MiniMax Hailuo-02 Fast image-to-video generations at six seconds each and US$0.017 per second: approximately US$0.306.
- Expected Fal generation total: approximately **US$0.39**, excluding any taxes, retries, or future pricing changes.

Generate one approved keyframe for each scene, then animate it once. Do not retry merely to chase cosmetic variation. Inspect every still before spending on its video generation. If a still contains malformed hands, implausible office details, embedded text, or inappropriate content, make at most one targeted replacement and report the additional cost.

## Post-production

Use a project-local Swift/AVFoundation render script because the workspace has macOS AVFoundation but no ffmpeg. The script will:

- concatenate the three clips into one 18-second timeline;
- crop or letterbox consistently to a landscape presentation;
- add high-contrast SideSpark captions and a branded closing treatment;
- export a broadly supported H.264 MP4;
- extract a poster frame for reduced-motion and initial loading states.

Keep the three Fal source clips in `src/assets/video/source/`, the finished asset at `src/assets/video/sidespark-office-ad.mp4`, and the poster at `src/assets/video/sidespark-office-ad-poster.jpg`.

## Landing-page integration

Add a self-contained section after the primary opening interaction. It contains a short heading, the responsive 16:9 video, a visible 48px play/pause control, and a brief disclosure that the people shown are fictional demo characters. The video is muted, loops, and uses `playsInline`. It may autoplay only when reduced motion is not requested. With reduced motion, it remains paused on the poster until explicitly played.

The video is decorative storytelling rather than a required step in the SideSpark journey. If it fails to load, the poster and surrounding copy still communicate the concept and the matching flow remains fully usable.

## Verification

- Unit-test the section's accessible name, disclosure, playback control, and reduced-motion behavior.
- Verify MP4 duration, codec, dimensions, poster existence, and file sizes with macOS media metadata tools.
- Run the app tests, production build, and Sites worker tests.
- Open the local page and visually review desktop, mobile, keyboard focus, pause behavior, reduced motion, and loading fallback.
