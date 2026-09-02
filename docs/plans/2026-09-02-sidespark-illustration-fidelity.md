# SideSpark Illustration Fidelity Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace generic brand and intention iconography with polished SideSpark artwork and align the landing/journey composition with the approved references while preserving the complete responsive flow.

**Architecture:** Keep the current React state machine and data flow unchanged. Add purpose-sized transparent image assets under `src/assets/brand/`, render them through semantic image elements in the existing landing components, and refine the existing CSS tokens and component layout rather than creating new routes or a parallel UI.

**Tech Stack:** React 19, Vite 6, Motion, Lucide React for functional controls, Vitest, Testing Library, built-in Image Generation, in-app Browser.

---

### Task 1: Lock the branded-artwork contract in tests

**Files:**
- Modify: `tests/app.test.jsx`

**Step 1: Write the failing test**

Require a visible `SideSpark spark mark`, `Skill Swap illustration`, and `Social Connect illustration` on the opening state. After selecting an intention, continue asserting that the break journey appears.

**Step 2: Run the focused test to verify it fails**

Run: `npm test -- tests/app.test.jsx`

Expected: FAIL because the current implementation renders Lucide SVGs and exposes no branded image assets.

### Task 2: Generate and place the visual assets

**Files:**
- Create: `src/assets/brand/sidespark-mark.png`
- Create: `src/assets/brand/skill-swap.png`
- Create: `src/assets/brand/social-connect.png`
- Create: `src/assets/brand/community-chain.png`

**Step 1: Generate one isolated asset per prompt**

Use both supplied screenshots as style references. Request transparent backgrounds, bold flat shapes, crisp edges, the exact SideSpark indigo/coral/mint/yellow/cream palette, no text, and no watermark.

**Step 2: Inspect each result**

Reject assets with stray text, opaque backgrounds, inconsistent palette, weak silhouettes, or cropped edges. Copy accepted assets into `src/assets/brand/` without altering the source references.

### Task 3: Integrate the assets and align the landing composition

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Step 1: Implement the semantic image treatment**

Import the four PNGs. Render the mark beside the live `SideSpark` wordmark, the two intention illustrations above their titles, and the community chain as decorative art. Preserve live labels and button semantics.

**Step 2: Match the source layout**

Remove the opening eyebrow, resize illustration slots, tune card proportions and mobile spacing, and refine the community strip and CTA to match the approved landing composition. Preserve responsive desktop behavior and the 320px fallback.

**Step 3: Run the focused test**

Run: `npm test -- tests/app.test.jsx`

Expected: PASS.

### Task 4: Refine the revealed break journey

**Files:**
- Modify: `src/components/FormatJourney.jsx`
- Modify: `src/styles.css`
- Test: `tests/journey.test.jsx`

**Step 1: Write any required failing presentation assertion**

Assert the four break choices remain semantic buttons with the expected labels and selection state while the revised badge treatment is present.

**Step 2: Style the journey from the cream reference**

Use stacked white tactile cards, coloured circular badges, a coral dotted route, stronger rounded display type, and visible selected feedback. Keep Coffee, Walk, Lunch, and Desk Break plus their current durations.

**Step 3: Verify the journey tests**

Run: `npm test -- tests/journey.test.jsx tests/complete-flow.test.jsx`

Expected: PASS.

### Task 5: Visual QA and complete verification

**Files:**
- Create: `design-qa.md`
- Create: `artifacts/design-qa/landing-592x1280.png`
- Create: `artifacts/design-qa/journey-592x1280.png`

**Step 1: Run the full automated checks**

Run: `npm test && npm run build && npm run test:sites`

Expected: all commands exit 0.

**Step 2: Verify in the browser**

Capture the landing and selected-intention journey at 592 x 1280, inspect 320px and desktop layouts, exercise both intention selections and a break selection, and check the console for errors.

**Step 3: Compare against the source references**

Place each implementation capture beside its matching source reference, record P0-P2 differences, fix them, and repeat at the same viewport until the report says `final result: passed`.

**Step 4: Keep the verified preview open**

Mark the local SideSpark browser tab as the deliverable for user inspection. Do not deploy unless the user explicitly asks.
