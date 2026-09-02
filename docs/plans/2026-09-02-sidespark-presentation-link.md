# SideSpark Homepage Presentation Link Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an accessible, responsive homepage header link that launches the SideSpark 60-second presentation.

**Architecture:** Keep the presentation as the existing independent Vite entry at `/presentation.html`. Extend the homepage header with a small navigation group containing the existing Community anchor and a new native presentation anchor, then use the current SideSpark design tokens for responsive styling.

**Tech Stack:** React 19, Lucide React, CSS, Vitest, Testing Library, Vite

---

### Task 1: Define The Homepage Link Contract

**Files:**
- Modify: `tests/app.test.jsx`

**Step 1: Write the failing test**

Add this assertion to the opening-screen test:

```jsx
const pitchLink = screen.getByRole("link", { name: /watch 60-sec pitch/i });
expect(pitchLink).toHaveAttribute("href", "/presentation.html");
```

**Step 2: Run the focused test to verify it fails**

Run: `npx vitest run tests/app.test.jsx`

Expected: FAIL because no link named `Watch 60-sec pitch` exists.

**Step 3: Commit the test**

```bash
git add tests/app.test.jsx
git commit -m "test: define homepage presentation link"
```

### Task 2: Add The Approved Header Link

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

**Step 1: Write the minimal implementation**

Import Lucide's `CirclePlay` icon. Wrap the existing Community anchor and a new anchor in a `site-header__links` navigation element:

```jsx
<nav className="site-header__links" aria-label="Site links">
  <a className="community-link" href="#community">
    Community
    <ArrowRight aria-hidden="true" />
  </a>
  <a className="presentation-link" href="/presentation.html">
    <CirclePlay aria-hidden="true" />
    Watch 60-sec pitch
  </a>
</nav>
```

Style the group and presentation link using the existing yellow, indigo, rounded-control, and tactile-shadow tokens. Preserve a 48-pixel target. At narrow widths, allow the link group to wrap below the brand instead of shrinking controls below the accessibility boundary.

**Step 2: Run the focused test to verify it passes**

Run: `npx vitest run tests/app.test.jsx`

Expected: PASS.

**Step 3: Run the full automated verification**

Run: `npm test && npm run build && npm run test:sites && git diff --check`

Expected: all checks pass and both `dist/client/index.html` and `dist/client/presentation.html` exist.

**Step 4: Verify the journey in the in-app browser**

Open `http://localhost:4174/`, inspect desktop and 320 by 720 layouts, activate `Watch 60-sec pitch`, confirm `/presentation.html` loads, and activate the SideSpark brand to return home. Confirm no console warnings, errors, or page overflow.

**Step 5: Record QA and commit**

Append the homepage-link check to `design-qa.md`, save representative screenshots under `qa/`, then commit:

```bash
git add src/App.jsx src/styles.css tests/app.test.jsx design-qa.md qa/
git commit -m "feat: link homepage to SideSpark presentation"
```
