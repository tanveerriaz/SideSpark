# Human Visual Marketplace Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restore SideSpark's face-led illustration language and separate the honest empty live community from fully interactive fictional Demo mode.

**Architecture:** `CommunityMarketplace` owns a top-level `communityMode` state with `live` as the default. Live mode renders an illustrated promise and founding-host state without importing fictional people into the visible DOM; Demo mode renders the existing experience, booking, host and reputation flows under a persistent disclosure. Approved brand assets are reused directly, while three purpose-sized raster scenes extend the same hand-drawn language across demo experience cards.

**Tech Stack:** React 19, Vite 6, Vitest and Testing Library, Motion, Lucide React, CSS, ImageGen-created transparent PNG assets, GPTSites-compatible Worker output.

---

### Task 1: Make Live community the truthful default

**Files:**
- Modify: `tests/community-marketplace.test.jsx`
- Modify: `src/components/CommunityMarketplace.jsx`
- Create: `src/components/LiveCommunity.jsx`

**Step 1: Write the failing default-mode test**

Add a test that renders `<App />` and asserts:

```jsx
expect(screen.getByRole("heading", { name: /no live experiences are listed yet/i })).toBeInTheDocument();
expect(screen.queryByRole("article")).not.toBeInTheDocument();
expect(screen.queryByText(/hosted by aisha/i)).not.toBeInTheDocument();
expect(screen.getByRole("button", { name: /explore demo mode/i })).toBeInTheDocument();
```

**Step 2: Run the focused test and verify RED**

Run: `npx vitest run tests/community-marketplace.test.jsx -t "opens on an honest live-community state"`

Expected: FAIL because the current default renders six fictional articles.

**Step 3: Add minimal mode structure**

In `CommunityMarketplace`, add:

```jsx
const [communityMode, setCommunityMode] = useState("live");
```

Render a `LiveCommunity` component for `live`. Keep existing routes inside the `demo` branch. `LiveCommunity` must show no profile names, experience cards, booking controls or reputation totals.

**Step 4: Run the focused test and verify GREEN**

Run: `npx vitest run tests/community-marketplace.test.jsx -t "opens on an honest live-community state"`

Expected: PASS.

**Step 5: Commit**

```bash
git add tests/community-marketplace.test.jsx src/components/CommunityMarketplace.jsx src/components/LiveCommunity.jsx
git commit -m "feat: separate live community from demo data"
```

### Task 2: Add explicit Demo mode entry and exit

**Files:**
- Modify: `tests/community-marketplace.test.jsx`
- Modify: `src/components/CommunityMarketplace.jsx`

**Step 1: Write failing mode-transition tests**

Add tests that click `Explore demo mode`, then assert:

```jsx
expect(screen.getByRole("status")).toHaveTextContent(
  /every name, profile and experience below is fictional/i,
);
expect(screen.getAllByRole("article")).toHaveLength(6);
expect(screen.getByRole("button", { name: /demo experiences/i })).toBeInTheDocument();
```

Click `Live community` and assert the live empty-state heading returns and fictional articles leave the DOM.

**Step 2: Run and verify RED**

Run: `npx vitest run tests/community-marketplace.test.jsx -t "enters and leaves Demo mode"`

Expected: FAIL because no mode controls or disclosure exist.

**Step 3: Implement the mode switch**

- Add `Live community` and `Demo mode` controls with `aria-pressed`.
- On entry, reset the route to demo discovery and focus its heading.
- Keep a persistent Demo mode disclosure above every demo route.
- Rename demo navigation to `Demo experiences`, `Demo host` and `Demo profile`.
- Leaving Demo mode resets the route but preserves device-local demo progress.

**Step 4: Run focused and full marketplace tests**

Run: `npx vitest run tests/community-marketplace.test.jsx`

Expected: all marketplace tests pass after existing helpers enter Demo mode before testing demo flows.

**Step 5: Commit**

```bash
git add tests/community-marketplace.test.jsx src/components/CommunityMarketplace.jsx
git commit -m "feat: add explicit SideSpark demo mode"
```

### Task 3: Restore approved human artwork in the opening journey

**Files:**
- Modify: `tests/community-marketplace.test.jsx`
- Modify: `src/components/LiveCommunity.jsx`
- Modify: `src/components/CommunityMarketplace.jsx`
- Modify: `src/styles.css`
- Reuse: `src/assets/brand/skill-swap.png`
- Reuse: `src/assets/brand/social-connect.png`
- Reuse: `src/assets/brand/community-chain.png`
- Reuse: `src/assets/brand/spark-accent.png`

**Step 1: Write the failing artwork test**

Assert the live opening contains images named `Two people sharing a practical skill`, `Two people making a new connection`, and `A chain of people connected by SideSpark`.

**Step 2: Run and verify RED**

Run: `npx vitest run tests/community-marketplace.test.jsx -t "carries the approved human artwork"`

Expected: FAIL because the live opening does not exist yet.

**Step 3: Build two illustrated action panels**

- Put `skill-swap.png` on a coral `Host something` panel.
- Put `social-connect.png` on a mint `Find something` panel.
- Use `community-chain.png` in the founding-community state.
- Keep all visible labels as semantic text and all arrows as Lucide icons.
- Remove any generic promise-card copy displaced by these panels.

**Step 4: Add responsive styling**

- Stack panels at 320px, keep artwork fully visible with `object-fit: contain`, and retain 48px actions.
- Use two equal panels from tablet upward.
- At desktop, keep the illustrated promise and live marketplace state inside or touching the opening viewport.

**Step 5: Run and verify GREEN**

Run: `npx vitest run tests/community-marketplace.test.jsx`

Expected: all tests pass.

**Step 6: Commit**

```bash
git add tests/community-marketplace.test.jsx src/components/LiveCommunity.jsx src/components/CommunityMarketplace.jsx src/styles.css
git commit -m "feat: restore SideSpark human artwork"
```

### Task 4: Add a small matching scene set for demo experiences

**Files:**
- Create: `src/assets/brand/experience-creative.png`
- Create: `src/assets/brand/experience-learning.png`
- Create: `src/assets/brand/experience-sharing.png`
- Modify: `src/data/experiences.js`
- Modify: `src/components/ExperienceCard.jsx`
- Modify: `src/components/ExperienceDetail.jsx`
- Modify: `src/styles.css`
- Modify: `tests/community-marketplace.test.jsx`

**Step 1: Write the failing scene test**

Enter Demo mode and assert each article contains one image whose accessible name ends with `illustration`.

**Step 2: Run and verify RED**

Run: `npx vitest run tests/community-marketplace.test.jsx -t "gives every demo experience a human scene"`

Expected: FAIL because cards currently have no scene images.

**Step 3: Generate three purpose-sized assets**

Use the approved references as visual inputs. Generate transparent raster illustrations with no text, logos, UI, gradients or photorealism:

- Creative: two adults noticing and photographing/sketching a Singapore streetscape.
- Learning: two adults sharing a practical idea online with visible warmth and curiosity.
- Sharing: two or three adults exchanging food, stories or a useful skill around a small table.

Match the references' navy hand-drawn outlines, flat coral/mint/yellow/blue fills, off-white highlights, rounded friendly faces and small spark marks.

**Step 4: Wire scenes into cards and details**

Add `illustration` and `illustrationAlt` to every experience record. Reuse the three scenes by meaning, not by palette alone. Render the scene at a stable 3:2 ratio in each card and as a contained visual in the detail hero.

**Step 5: Run focused tests and build**

Run: `npx vitest run tests/community-marketplace.test.jsx && npm run build`

Expected: tests pass and Vite emits all three assets.

**Step 6: Commit**

```bash
git add src/assets/brand/experience-creative.png src/assets/brand/experience-learning.png src/assets/brand/experience-sharing.png src/data/experiences.js src/components/ExperienceCard.jsx src/components/ExperienceDetail.jsx src/styles.css tests/community-marketplace.test.jsx
git commit -m "feat: add human scenes to demo experiences"
```

### Task 5: Remove generic marketplace copy

**Files:**
- Modify: `src/components/LiveCommunity.jsx`
- Modify: `src/components/CommunityMarketplace.jsx`
- Modify: `src/components/ExperienceDetail.jsx`
- Modify: `src/components/ReputationProfile.jsx`
- Modify: `tests/community-marketplace.test.jsx`

**Step 1: Add copy-contract assertions**

Assert Live community contains the exact concrete lines:

```text
No live experiences are listed yet.
We're inviting the first Singapore hosts now.
```

Assert it contains no live count, testimonial, fictional name or phrase implying existing members.

**Step 2: Run and verify RED**

Run: `npx vitest run tests/community-marketplace.test.jsx -t "uses concrete live-community copy"`

Expected: FAIL until the copy contract is implemented.

**Step 3: Apply the no-AI-slop pass**

- Keep `Share something you know. Join something you're curious about.`
- Replace abstract community/product claims with observable actions.
- Use `Host something`, `Find something`, `Become a founding host`, `Explore demo mode`, and `See demo experiences`.
- Remove fake counts, fake testimonials, urgency and generic terms such as ecosystem, meaningful experiences or unlock your potential.

**Step 4: Run all interaction tests**

Run: `npm test`

Expected: all tests pass.

**Step 5: Commit**

```bash
git add src/components/LiveCommunity.jsx src/components/CommunityMarketplace.jsx src/components/ExperienceDetail.jsx src/components/ReputationProfile.jsx tests/community-marketplace.test.jsx
git commit -m "copy: make SideSpark specific and honest"
```

### Task 6: Visual QA and Sites readiness

**Files:**
- Modify: `design-qa.md`
- Create or update: `artifacts/human-visual-marketplace-qa/desktop-comparison.html`
- Create or update: `artifacts/human-visual-marketplace-qa/mobile-comparison.html`

**Step 1: Run the complete automated gate**

Run:

```bash
npm test && npm run test:video && npm run build && npm run test:sites
```

Then require `dist/client/index.html`, `dist/server/index.js`, `dist/.openai/hosting.json`, a clean `git diff --check`, and no changes to protected Sites runtime files.

**Step 2: Exercise the browser journey**

- Verify Live community is the default and contains zero fictional names.
- Enter Demo mode, search/filter, open a scene-led card, reserve or request, publish a local demo draft, view badges, return to Live community and open the classic journey.
- Inspect application-origin console warnings and errors.

**Step 3: Compare the visual source and implementation**

- Capture 1470 × 779 desktop and 320 × 720 mobile states in the user's chosen browser.
- Put each implementation capture beside the approved reference in one comparison input.
- Record and fix every P0, P1 and P2 mismatch, then recapture.

**Step 4: Record the final QA result**

Append the tested viewport, state, full-view and focused evidence, comparison history, console result and `final result: passed` or `blocked` to `design-qa.md`.

**Step 5: Commit**

```bash
git add design-qa.md artifacts/human-visual-marketplace-qa
git commit -m "test: verify human visual marketplace"
```

Do not publish this revision without a new explicit release request.
