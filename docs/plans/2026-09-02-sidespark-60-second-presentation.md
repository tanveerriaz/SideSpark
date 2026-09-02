# SideSpark 60-Second HTML Presentation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an isolated, cinematic HTML presentation that tells the complete SideSpark story to hackathon judges in exactly 60 seconds.

**Architecture:** Add a second Vite HTML entry point at `presentation.html` backed by a dedicated React tree under `src/presentation/`. Keep timing and slide copy in a pure story module, while the presentation component owns playback, manual navigation, keyboard controls, visibility pausing, and reduced-motion behavior. Reuse only existing approved SideSpark references and fictional office media.

**Tech Stack:** React 19, Vite 6, Motion, Lucide React, Vitest, Testing Library, CSS, existing SideSpark image and video assets.

---

### Task 1: Lock the 60-second story contract

**Files:**
- Create: `src/presentation/story.js`
- Create: `tests/presentation-story.test.js`

**Step 1: Write the failing story tests**

Test that the story exports six ordered beats, each beat lasts 10,000 milliseconds, all durations total exactly 60,000 milliseconds, the first beat contains the hidden-opportunity hook, the last beat contains “Take a break. Find your spark.”, and every photographic beat declares the fictional-demo disclosure.

**Step 2: Run the focused test to verify it fails**

Run: `npm test -- tests/presentation-story.test.js`

Expected: FAIL because `src/presentation/story.js` does not exist.

**Step 3: Implement the story data**

Export `SLIDE_DURATION_MS`, `TOTAL_DURATION_MS`, and a six-item `STORY_BEATS` array. Keep audience copy brief, natural, and claim-safe. Encode only presentation content and asset identifiers; do not put React elements or timers in this module.

**Step 4: Run the focused test to verify it passes**

Run: `npm test -- tests/presentation-story.test.js`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/presentation/story.js tests/presentation-story.test.js
git commit -m "test: define SideSpark presentation story"
```

### Task 2: Build accessible playback and navigation

**Files:**
- Create: `src/presentation/Presentation.jsx`
- Create: `src/presentation/main.jsx`
- Create: `tests/presentation.test.jsx`
- Create: `presentation.html`

**Step 1: Write the failing interaction tests**

Render `<Presentation autoStart={false} />` and assert that it exposes a labelled presentation region, announces beat 1 of 6, includes a visible play button, advances with the next button and ArrowRight, moves backward with ArrowLeft, and returns to beat 1 when replay is selected. With fake timers and `autoStart`, assert that six 10-second advances end in the completed state rather than looping indefinitely.

**Step 2: Run the focused test to verify it fails**

Run: `npm test -- tests/presentation.test.jsx`

Expected: FAIL because the presentation component does not exist.

**Step 3: Implement the minimal presentation behavior**

Build a semantic `<main>` with one active story beat, an `aria-live` slide counter, play/pause, previous, next, and replay controls. Start playback automatically in the browser entry point. Pause while the document is hidden. Ignore editable targets when handling ArrowLeft, ArrowRight, and Space keyboard shortcuts. Preserve manual controls after the 60-second sequence completes.

**Step 4: Run the focused test to verify it passes**

Run: `npm test -- tests/presentation.test.jsx`

Expected: PASS.

**Step 5: Commit**

```bash
git add presentation.html src/presentation/Presentation.jsx src/presentation/main.jsx tests/presentation.test.jsx
git commit -m "feat: add SideSpark presentation playback"
```

### Task 3: Apply the approved cinematic visual system

**Files:**
- Create: `src/presentation/presentation.css`
- Modify: `src/presentation/Presentation.jsx`

**Step 1: Add visible-content assertions**

Extend `tests/presentation.test.jsx` to assert that both entry intentions, all four break formats, deterministic demo matching, device-local progress, and the fictional-demo disclosure appear in the appropriate beats.

**Step 2: Run the test to verify the assertions fail**

Run: `npm test -- tests/presentation.test.jsx`

Expected: FAIL until each beat renders its approved content.

**Step 3: Implement the six visual compositions**

Use the deep-indigo, coral, mint, yellow, Fredoka, and Inter system. Compose one clear visual idea per beat: oversized hook type; an office-photo tension frame; intent choice imagery; a vertical break journey; a match-and-quest reveal; and a photographic/product payoff. Reuse the approved reference images and the three fictional office media assets with deliberate crops. Use Lucide only for functional controls and symbols. Add no CSS drawings, hand-authored SVG, emoji, or invented metrics.

**Step 4: Add responsive and motion behavior**

Support 320px through full-screen desktop, safe-area padding, visible focus, 48px controls, and no horizontal overflow. Use Motion for deliberate entrances and CSS only for layout and presentation treatment. Under `prefers-reduced-motion`, remove parallax, scaling, and travel while retaining short opacity transitions.

**Step 5: Run focused tests and a static check**

Run: `npm test -- tests/presentation-story.test.js tests/presentation.test.jsx`

Run: `git diff --check`

Expected: PASS with no whitespace errors.

**Step 6: Commit**

```bash
git add src/presentation/Presentation.jsx src/presentation/presentation.css tests/presentation.test.jsx
git commit -m "feat: style cinematic SideSpark pitch"
```

### Task 4: Include the presentation in the production build

**Files:**
- Modify: `vite.config.mjs`
- Test: `tests/sites-worker.test.mjs`

**Step 1: Add a failing build-output assertion**

Extend the Sites build test to require `dist/client/presentation.html` while preserving the existing `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json` contract.

**Step 2: Run the build and Sites test to verify the new assertion fails**

Run: `npm run build && npm run test:sites`

Expected: FAIL because the Vite build does not yet include `presentation.html`.

**Step 3: Add the second Vite entry**

Configure Rollup inputs for the existing root `index.html` and the new `presentation.html`. Preserve all existing server, test, output, and plugin settings.

**Step 4: Run the build and Sites test to verify they pass**

Run: `npm run build && npm run test:sites`

Expected: PASS and both HTML entry points appear under `dist/client/`.

**Step 5: Commit**

```bash
git add vite.config.mjs tests/sites-worker.test.mjs
git commit -m "build: include SideSpark presentation entry"
```

### Task 5: Verify the full judge-facing experience

**Files:**
- Modify only if verification reveals a scoped presentation defect.
- Create: `qa/sidespark-presentation-desktop.png`
- Create: `qa/sidespark-presentation-mobile.png`

**Step 1: Run automated verification**

Run: `npm test`

Run: `npm run build`

Run: `npm run test:sites`

Expected: all checks pass. If a pre-existing unrelated failure remains, record it precisely and run the full presentation-specific suite separately.

**Step 2: Start the local server**

Run the existing Vite dev server and open `/presentation.html` in the in-app browser.

**Step 3: Review the desktop presentation**

At approximately 1440×900, confirm the autoplay sequence, 60-second progress, readable photography crops, copy hierarchy, pause/replay controls, keyboard navigation, focus visibility, and final CTA. Capture `qa/sidespark-presentation-desktop.png`.

**Step 4: Review mobile and reduced motion**

At 320px width, confirm there is no horizontal overflow, controls remain at least 48px, text does not collide or wrap awkwardly, and the reference screens remain legible. Emulate reduced motion and confirm the sequence remains understandable. Capture `qa/sidespark-presentation-mobile.png`.

**Step 5: Run final repository checks**

Run: `git diff --check`

Run: `git status --short`

Confirm only presentation work is staged or committed and all unrelated user changes remain untouched.

**Step 6: Commit QA evidence and any verified fixes**

```bash
git add qa/sidespark-presentation-desktop.png qa/sidespark-presentation-mobile.png presentation.html src/presentation tests/presentation-story.test.js tests/presentation.test.jsx vite.config.mjs tests/sites-worker.test.mjs
git commit -m "test: verify SideSpark 60-second presentation"
```
