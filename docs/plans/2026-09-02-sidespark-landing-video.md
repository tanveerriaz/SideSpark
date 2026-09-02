# SideSpark Landing Video Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Generate and integrate an accessible 18-second SideSpark office ad using the approved lowest-cost Fal workflow.

**Architecture:** Generate three 16:9 photographic keyframes with Bria Fast, animate each into a six-second 512p clip with MiniMax Hailuo-02 Fast, then use a reproducible Swift/AVFoundation script to assemble a single H.264 MP4 with SideSpark brand captions. A React `OfficeAd` component presents the asset with autoplay, pause, poster, fallback, reduced-motion support, and an honest fictional-people disclosure.

**Tech Stack:** Fal plugin, Bria Fast, MiniMax Hailuo-02 Fast, Swift, AVFoundation, CoreAnimation, React 19, Motion, Lucide React, Vitest, Testing Library, Vite.

---

### Task 1: Generate and preserve three approved keyframes

**Files:**
- Create: `src/assets/video/source/coffee-keyframe.jpg`
- Create: `src/assets/video/source/walk-keyframe.jpg`
- Create: `src/assets/video/source/skill-keyframe.jpg`
- Create: `src/assets/video/manifest.json`

**Step 1: Confirm generation inputs**

Call Fal's schema and pricing tools for `fal-ai/bria/text-to-image/fast`. Record the returned price and schema summary in the manifest. Do not generate more than one image per scene.

**Step 2: Generate the coffee keyframe**

Run `fal-ai/bria/text-to-image/fast` with `aspect_ratio: "16:9"`, `medium: "photography"`, `num_images: 1`, `prompt_enhancement: false`, and this prompt:

```text
Candid cinematic workplace advertising photograph in a bright contemporary Singapore office pantry. Two friendly adult coworkers from different teams, one South Asian man and one East Asian woman, meet naturally beside a coffee counter, holding simple ceramic cups and beginning an easy conversation. Smart-casual office clothing, warm natural daylight, real skin texture, inclusive modern workplace, energetic but believable, clean 16:9 composition with negative space at upper left for later typography. No readable text, no logos, no branded products, no phones facing camera, no exaggerated poses, no extra fingers, no watermark.
```

Show the returned image, inspect it, and download the accepted output to `coffee-keyframe.jpg`. Only replace it if there is a clear defect.

**Step 3: Generate the walk keyframe**

Use the same parameters with this prompt:

```text
Candid cinematic workplace advertising photograph of two adult coworkers from different departments taking a short walking break along a sheltered tropical office walkway in Singapore. One Black woman and one East Asian man in smart-casual clothing walk side by side, engaged in a relaxed useful conversation, subtle city greenery and modern office architecture, natural midday light, genuine expressions, believable movement, 16:9 framing with negative space at upper left for later typography. No readable text, no logos, no branded products, no phones facing camera, no exaggerated poses, no extra fingers, no watermark.
```

Show, inspect, and preserve the accepted image as `walk-keyframe.jpg`.

**Step 4: Generate the skill-swap keyframe**

Use the same parameters with this prompt:

```text
Candid cinematic workplace advertising photograph in a modern Singapore office collaboration area. Two adult coworkers from different teams sit together at a desk while one demonstrates a practical spreadsheet or presentation technique on a laptop angled away so no interface text is readable. One Southeast Asian woman and one Middle Eastern man, smart-casual clothing, friendly focused expressions, a third coworker softly out of focus in the background, natural window light, realistic hands, inclusive and useful peer learning, 16:9 composition with negative space at upper left for later typography. No readable text, no logos, no branded products, no legible screen UI, no exaggerated poses, no extra fingers, no watermark.
```

Show, inspect, and preserve the accepted image as `skill-keyframe.jpg`.

**Step 5: Write the initial manifest**

Store only non-secret evidence:

```json
{
  "title": "SideSpark office ad",
  "durationSeconds": 18,
  "fictionalPeople": true,
  "imageModel": "fal-ai/bria/text-to-image/fast",
  "videoModel": "fal-ai/minimax/hailuo-02-fast/image-to-video",
  "imagePriceAtGenerationUsd": 0.028,
  "videoPricePerSecondAtGenerationUsd": 0.017,
  "estimatedFalCostUsd": 0.39,
  "scenes": []
}
```

Add prompt, Fal request ID, source filename, and remote output URL for each scene. Never include API keys or authorization headers.

**Step 6: Verify keyframes**

Run:

```bash
sips -g pixelWidth -g pixelHeight src/assets/video/source/*-keyframe.jpg
```

Expected: every file is landscape and readable by macOS image tools.

**Step 7: Commit**

```bash
git add src/assets/video/source/*-keyframe.jpg src/assets/video/manifest.json
git commit -m "assets: add SideSpark office ad keyframes"
```

### Task 2: Animate the three Fal video clips

**Files:**
- Create: `src/assets/video/source/coffee.mp4`
- Create: `src/assets/video/source/walk.mp4`
- Create: `src/assets/video/source/skill.mp4`
- Modify: `src/assets/video/manifest.json`

**Step 1: Confirm video inputs**

Call Fal's schema and pricing tools for `fal-ai/minimax/hailuo-02-fast/image-to-video`. Confirm `duration: "6"` remains supported and the price is still acceptable. Stop and report if the estimated total materially exceeds the approved budget.

**Step 2: Submit one job per approved keyframe**

Use each Fal image result URL directly as `image_url`, set `duration: "6"`, and set `prompt_optimizer: true`.

Coffee prompt:

```text
Subtle handheld commercial camera push-in. The two coworkers smile, make natural eye contact, and lift their coffee cups slightly as their conversation begins. Realistic restrained gestures, stable faces and hands, believable office background, no scene change, no text appearing.
```

Walk prompt:

```text
Smooth lateral tracking shot as the two coworkers walk at a relaxed pace and talk. Natural arm movement, a brief shared smile, gentle tropical greenery motion, stable faces and hands, no scene change, no text appearing.
```

Skill prompt:

```text
Slow commercial camera slide. The first coworker points to one part of the laptop while the second nods and tries the technique, both visibly engaged. Restrained realistic movement, stable faces and hands, screen remains unreadable, no scene change, no text appearing.
```

**Step 3: Poll without resubmitting**

Use `check_job` for each request ID until complete, then `get_job_result`. Never call the generation endpoint twice for an existing request.

**Step 4: Inspect and preserve outputs**

Download each result once to its corresponding MP4 path. Visually inspect motion, anatomy, duration, and brand safety. Do not retry for small imperfections; obtain user approval before any billable replacement.

**Step 5: Update and validate the manifest**

Record each video request ID, remote output URL, local filename, and actual model. Run:

```bash
mdls -name kMDItemDurationSeconds -name kMDItemPixelWidth -name kMDItemPixelHeight src/assets/video/source/*.mp4
```

Expected: three playable clips of approximately six seconds each.

**Step 6: Commit**

```bash
git add src/assets/video/source/*.mp4 src/assets/video/manifest.json
git commit -m "assets: add SideSpark office motion clips"
```

### Task 3: Build a deterministic local ad renderer

**Files:**
- Create: `scripts/render-sidespark-ad.swift`
- Create: `tests/video-assets.test.mjs`
- Modify: `package.json`
- Create: `src/assets/video/sidespark-office-ad.mp4`
- Create: `src/assets/video/sidespark-office-ad-poster.jpg`

**Step 1: Write the failing asset test**

Create a Node test that asserts the final MP4 and poster exist, are non-empty, and the manifest declares 18 seconds, fictional people, and the approved model IDs. The test must print a clear missing-render message before the assets exist.

**Step 2: Run the test to verify it fails**

Run:

```bash
node --test tests/video-assets.test.mjs
```

Expected: FAIL because the finished MP4 and poster do not exist.

**Step 3: Add the renderer**

Implement `scripts/render-sidespark-ad.swift` with AVFoundation and CoreAnimation. It must:

- accept project-relative source and output paths;
- validate all three source clips before export;
- place exactly six seconds from each clip on an 18-second 1280x720 timeline;
- use aspect-fill transforms and preserve orientation;
- add indigo caption panels with coral, mint, yellow, and white text;
- show `Pick a break.`, `Meet someone new.`, `Swap a skill. Grow your circle.`, and the final `Take a break. Find your spark.` treatment at their approved times;
- register the bundled Fredoka and Inter files where supported, with a system rounded fallback;
- export H.264 MP4 with no audio track;
- create a JPEG poster from a representative composited frame;
- exit non-zero on missing media or export failure.

Add scripts:

```json
"render:video": "swift scripts/render-sidespark-ad.swift",
"test:video": "node --test tests/video-assets.test.mjs"
```

**Step 4: Render the ad**

Run:

```bash
npm run render:video
```

Expected: an 18-second H.264 MP4 and a landscape poster are written under `src/assets/video/`.

**Step 5: Run the test to verify it passes**

Run:

```bash
npm run test:video
```

Expected: PASS.

**Step 6: Inspect the rendered media**

Run `mdls` on the final MP4 and `sips` on the poster. Extract representative frames with a small AVFoundation helper or Quick Look and inspect the opening, both cuts, final brand beat, crop, text, and contrast.

**Step 7: Commit**

```bash
git add scripts/render-sidespark-ad.swift tests/video-assets.test.mjs package.json package-lock.json src/assets/video/sidespark-office-ad.mp4 src/assets/video/sidespark-office-ad-poster.jpg
git commit -m "feat: render branded SideSpark office ad"
```

### Task 4: Add the accessible landing-page video section

**Files:**
- Create: `src/components/OfficeAd.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Modify: `tests/app.test.jsx`

**Step 1: Write failing component tests**

Add tests that assert:

```jsx
expect(screen.getByRole("region", { name: /see a sidespark sidequest/i })).toBeInTheDocument();
expect(screen.getByText(/fictional people created for this demo/i)).toBeInTheDocument();
expect(screen.getByRole("button", { name: /pause office ad/i })).toHaveStyle({ minWidth: "48px" });
```

Mock `matchMedia` for both reduced and normal motion, and mock `HTMLMediaElement.prototype.play` and `.pause`. In reduced motion, expect no automatic `play()` call. In normal motion, expect the component to request playback and update the button label when toggled.

**Step 2: Run the tests to verify they fail**

Run:

```bash
npm test -- tests/app.test.jsx
```

Expected: FAIL because the office-ad region does not exist.

**Step 3: Implement `OfficeAd`**

Use imported MP4 and poster asset URLs. Render a labelled `<section>`, heading, supporting sentence, responsive `<video muted loop playsInline preload="metadata">`, visible play/pause button with Lucide `Play` and `Pause`, and the disclosure:

```text
The people shown are fictional characters created for this demo.
```

Use an effect to detect `prefers-reduced-motion: reduce`; do not autoplay when true. Catch rejected `play()` promises and leave the control in the honest paused state. Keep the video optional so an error does not affect the main matching flow.

**Step 4: Integrate and style the section**

Place `<OfficeAd />` after the opening page frame so it supports rather than delays the primary choice. Match the approved deep-indigo surface, tactile rounded frame, coral/mint caption accents, yellow focus treatment, 48px control, 16:9 aspect ratio, desktop max width, 320px layout, and reduced-motion rules.

**Step 5: Run the tests to verify they pass**

Run:

```bash
npm test -- tests/app.test.jsx
```

Expected: PASS.

**Step 6: Commit**

```bash
git add src/components/OfficeAd.jsx src/App.jsx src/styles.css tests/app.test.jsx
git commit -m "feat: show accessible SideSpark office ad"
```

### Task 5: Verify the full landing-page experience

**Files:**
- Modify only if verification finds a scoped defect.
- Create: `qa/sidespark-office-ad-desktop.png`
- Create: `qa/sidespark-office-ad-mobile.png`

**Step 1: Run automated checks**

```bash
npm test
npm run test:video
npm run build
npm run test:sites
```

Expected: all checks pass, and the Sites build contains `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json` plus the emitted video and poster assets.

**Step 2: Start and open the preview**

Run the local server, open it in the available browser, and do not ask the user to start it.

**Step 3: Desktop visual QA**

At approximately 1440x900, verify the opening interaction still dominates, the ad has a deliberate hierarchy, playback starts muted, the pause control works, focus is visible, and the disclosure is legible. Save the screenshot.

**Step 4: Mobile and 320px QA**

Verify the ad at a common mobile viewport and at 320px width. Confirm no horizontal overflow, adequate 48px controls, readable poster/copy, and that the video remains a responsive website element rather than a simulated phone frame. Save the mobile screenshot.

**Step 5: Reduced-motion and failure QA**

Emulate reduced motion and confirm the poster remains still until play is explicitly pressed. Temporarily block or rename the MP4 in a non-committed check and confirm the poster and text preserve meaning without breaking the page.

**Step 6: Final diff and asset audit**

```bash
git status --short
git diff --check
find dist -maxdepth 4 -type f | sort
```

Confirm no secret, unrelated file, or generated cache is staged. Confirm the manifest truthfully records the model IDs, request IDs, and estimated cost.

**Step 7: Commit QA evidence**

```bash
git add qa/sidespark-office-ad-desktop.png qa/sidespark-office-ad-mobile.png
git commit -m "test: verify SideSpark landing video"
```
