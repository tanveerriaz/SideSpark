# SideSpark Privacy And Terms Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add truthful privacy and terms routes, universal contact and making-of links, verify every SideSpark journey, merge to `main`, and deploy the validated build to GPTSites.

**Architecture:** Route `/privacy` and `/terms` through the existing React entry point using `window.location.pathname`, with an optional `initialPath` prop for deterministic tests. Reuse a `LegalPage` component and a `SiteFooter` component across the community marketplace, classic guided journey, and policy pages. Keep policy copy specific to the current local-data prototype and leave the protected GPTSites runtime files unchanged.

**Tech Stack:** React 19, Vite, Vitest, Testing Library, existing SideSpark CSS, GPTSites Worker packaging.

---

### Task 1: Add failing policy-route tests

**Files:**
- Create: `tests/legal-pages.test.jsx`
- Modify: `tests/app.test.jsx`

**Step 1: Write the failing route test**

Render `<App initialPath="/privacy" />` and assert a `Privacy` page heading, current-prototype disclosure, browser-storage explanation, contact email, Terms cross-link, and return-home link.

**Step 2: Write the failing terms test**

Render `<App initialPath="/terms" />` and assert a `Terms` page heading, 18+ rule, fictional-demo disclosure, non-monetary credits language, safety limitation, Singapore law, contact email, Privacy cross-link, and return-home link.

**Step 3: Write the failing footer contract test**

Render the normal app and assert `/privacy`, `/terms`, `mailto:tanveer.riaz@hotmail.com`, and `https://tanveerriaz.me/blog/sidespark-started-with-a-conversation` links.

**Step 4: Run tests to verify RED**

Run: `npm test -- --run tests/legal-pages.test.jsx tests/app.test.jsx`

Expected: FAIL because the policy pages and footer links do not exist.

**Step 5: Commit the failing tests**

```bash
git add tests/legal-pages.test.jsx tests/app.test.jsx
git commit -m "test: define SideSpark policy and footer contract"
```

### Task 2: Implement shared policy pages and footer

**Files:**
- Create: `src/components/LegalPage.jsx`
- Create: `src/components/SiteFooter.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/CommunityMarketplace.jsx`
- Modify: `src/styles.css`

**Step 1: Implement `SiteFooter`**

Render the prototype status plus normal anchors for Privacy, Terms, Contact, the verified making-of article, and the existing 60-second pitch. Accept a `tone` prop only if the classic and cream surfaces need different contrast.

**Step 2: Implement `LegalPage`**

Use a data object keyed by `privacy` and `terms` to render one semantic article template. Include the exact approved subjects from the design document, `Last updated 5 September 2026`, the contact mailto link, policy cross-link, and SideSpark home link.

**Step 3: Route from `App`**

Add `initialPath = window.location.pathname` to `App`. Keep the hook order stable, then return `<LegalPage type="privacy" />` or `<LegalPage type="terms" />` for those direct paths.

**Step 4: Reuse the footer**

Replace the marketplace-only footer and classic footer with `SiteFooter` while preserving their existing prototype and pitch wording.

**Step 5: Add responsive styles**

Use the existing indigo, cream, coral, mint, yellow, Fredoka, Inter, border and radius tokens. Keep the policy article at a readable width, ensure 48-pixel links, visible focus, mobile wrapping, and no horizontal overflow.

**Step 6: Run tests to verify GREEN**

Run: `npm test -- --run tests/legal-pages.test.jsx tests/app.test.jsx tests/community-marketplace.test.jsx`

Expected: PASS.

**Step 7: Commit**

```bash
git add src/components/LegalPage.jsx src/components/SiteFooter.jsx src/App.jsx src/components/CommunityMarketplace.jsx src/styles.css tests/legal-pages.test.jsx tests/app.test.jsx
git commit -m "feat: add privacy terms and trust footer"
```

### Task 3: Exercise every journey and repair regressions with TDD

**Files:**
- Modify if a gap is found: `tests/complete-flow.test.jsx`
- Modify if a gap is found: `tests/community-marketplace.test.jsx`
- Modify only after a failing regression test: relevant `src/**` file
- Modify: `design-qa.md`

**Step 1: Run the complete interaction suite**

Run: `npm test -- --run tests/complete-flow.test.jsx tests/journey.test.jsx tests/community-marketplace.test.jsx tests/office-ad.test.jsx tests/presentation.test.jsx tests/legal-pages.test.jsx`

Expected: all tests pass.

**Step 2: Inspect coverage against the journey list**

Confirm automated coverage for Live landing, Demo entry/exit, search/filter/reset, instant reservation, host-approval request, host validation/publish, reputation profile, Skill Swap completion, Social Connect completion, no-match recovery, video control, presentation control, Privacy, Terms, contact, making-of, and return navigation.

**Step 3: Add any missing journey test and watch it fail**

For every uncovered behavior, add one focused test and run it to confirm the expected RED state before production edits.

**Step 4: Fix only proven regressions**

Implement the smallest repair and rerun the focused test to GREEN.

**Step 5: Perform Chrome QA**

Use the selected existing Chrome session. Inspect `/`, `/privacy`, and `/terms` at desktop and 320 × 720; then exercise the primary Live, Demo, booking, hosting, profile, Skill Swap, and Social Connect paths. Record visible and interaction evidence in `design-qa.md`.

**Step 6: Commit QA updates and any repairs**

```bash
git add design-qa.md tests src
git commit -m "test: verify complete SideSpark site journeys"
```

### Task 4: Run release gates

**Files:**
- Verify: `dist/client/index.html`
- Verify: `dist/server/index.js`
- Verify: `dist/.openai/hosting.json`

**Step 1: Run every automated gate**

Run: `npm test && npm run test:video && npm run build && npm run test:sites`

Expected: zero failures and successful Sites packaging.

**Step 2: Check the repository**

Run: `git diff --check`, confirm a clean feature worktree, and confirm `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` are unchanged.

### Task 5: Merge without disturbing the main checkout

**Files:**
- Preserve existing unrelated changes in: `/Users/tanveerriaz/Projects/SideSpark`

**Step 1: Inventory the dirty main checkout**

Record its modified and untracked paths. Do not stage, commit, delete, or rewrite them.

**Step 2: Merge the feature branch**

Merge `codex/public-experiences-marketplace` into `main`. If Git cannot merge without touching the existing changes, stop and resolve by preserving the user's versions and applying only the feature diff. Never force, reset, or discard.

**Step 3: Verify the merged result**

Run the full release gate from the main checkout. Confirm the pre-existing unrelated paths still exist with their original content.

### Task 6: Publish the exact merged build

**Files:**
- Package: `/Users/tanveerriaz/Projects/SideSpark/dist`

**Step 1: Resolve the existing GPTSites project and access policy**

Reuse the Site project ID in `.openai/hosting.json`, obtain a fresh write credential if needed, and confirm the existing access level before deploying.

**Step 2: Push the exact validated `main` commit**

Use the Sites source credential without storing it in Git configuration or files.

**Step 3: Package and save one version**

Run the Sites package helper against the merged repository, save the archive against the pushed commit SHA, and keep the archive until saving succeeds.

**Step 4: Deploy and poll**

Deploy to the already approved existing access, poll until `succeeded`, then fetch the public URL and exercise the home, privacy, terms, making-of, and one primary demo journey.

**Step 5: Handoff**

Open the exact deployed URL in the existing Site tab and report the public result without exposing credentials or internal deployment IDs.
