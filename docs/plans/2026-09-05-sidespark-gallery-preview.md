# SideSpark Gallery Preview Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish a permanent SideSpark gallery/social preview and make it discoverable through standards-based metadata.

**Architecture:** A small deterministic macOS rendering script composes existing SideSpark brand artwork into 1200×630 PNG and JPEG assets under `public/`. The HTML head exposes those stable assets through Open Graph and Twitter metadata, while a Vitest regression test verifies both the metadata contract and PNG dimensions.

**Tech Stack:** React/Vite, Vitest, Node filesystem assertions, macOS AppKit via Swift, GPTSites.

---

### Task 1: Define the preview contract

**Files:**
- Create: `tests/social-preview.test.jsx`

**Step 1: Write the failing test**

Assert that `index.html` contains the canonical, Open Graph, and Twitter tags with the absolute `/og.png` URL. Assert that `public/og.png` and `public/screenshot.jpeg` exist and that the PNG IHDR reports 1200×630.

**Step 2: Run the focused test to verify it fails**

Run: `npx vitest run tests/social-preview.test.jsx`

Expected: FAIL because the metadata and assets do not exist.

**Step 3: Commit the RED test**

Commit only the new test.

### Task 2: Build the branded preview assets

**Files:**
- Create: `scripts/build-social-preview.swift`
- Create: `public/og.png`
- Create: `public/screenshot.jpeg`

**Step 1: Implement the renderer**

Create a 1200×630 deep-indigo card. Place the SideSpark mark and concise copy on the left. Place a rounded, cropped panel of `src/assets/brand/experience-sharing.png` on the right while preserving all three faces.

**Step 2: Generate both assets**

Run the Swift renderer from the repository root.

Expected: both files exist at 1200×630.

**Step 3: Inspect the native-size PNG**

Confirm the typography, crop, contrast, safe area, and face visibility match the approved visual language.

### Task 3: Add discoverable metadata

**Files:**
- Modify: `index.html`

**Step 1: Add canonical and social tags**

Use `https://sidespark.tanveer-riaz.chatgpt.site/` as the canonical origin and `/og.png` as the absolute preview URL. Include image size, alt text, and Twitter large-card metadata.

**Step 2: Run the focused test to verify GREEN**

Run: `npx vitest run tests/social-preview.test.jsx`

Expected: PASS.

**Step 3: Commit the implementation**

Commit the renderer, assets, metadata, and passing test.

### Task 4: Verify and publish

**Files:**
- Verify: `dist/client/og.png`
- Verify: `dist/client/screenshot.jpeg`

**Step 1: Run the full gate**

Run `npm test`, `npm run test:video`, `npm run build`, and `npm run test:sites`.

Expected: all commands exit successfully.

**Step 2: Verify the built metadata and assets**

Confirm the production HTML contains the absolute preview tags and both 1200×630 files are present in the built client output.

**Step 3: Merge and publish the exact verified commit**

Fast-forward `main`, push it, save one Sites version from the exact commit and packaged build, deploy to the existing public Site, and poll until successful.

**Step 4: Verify production and gallery state**

Confirm `/og.png`, `/screenshot.jpeg`, and the homepage metadata return successfully. Recheck the gallery’s SideSpark `previewImageUrl`; if it remains the old 404 URL, report that the external gallery cache still needs its own refresh.
