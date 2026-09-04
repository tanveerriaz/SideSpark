# SideSpark Public Experiences Marketplace Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace SideSpark’s pitch-first opening with a responsive, product-first public experiences marketplace while preserving the existing guided matching demo and GPTSites runtime.

**Architecture:** Keep `App.jsx` as the top-level mode switch. Add a self-contained community marketplace whose routes are local React state: discovery, experience detail, host form, booking confirmation and demo profile. Use fictional fixtures plus a small versioned local-storage layer; keep all backend-dependent claims explicitly labeled as demo behavior.

**Tech Stack:** React 19, Vite 6, Motion, Lucide React, Vitest, Testing Library, existing GPTSites Worker build.

---

### Task 1: Add marketplace domain behavior

**Files:**
- Create: `src/data/experiences.js`
- Create: `src/lib/marketplace.js`
- Create: `src/lib/communityStorage.js`
- Create: `tests/marketplace.test.js`

**Step 1: Write the failing tests**

Cover:

```js
expect(filterExperiences(EXPERIENCES, { query: "photo", format: "all", group: "all" }))
  .toHaveLength(1);
expect(validateExperienceDraft({ title: "" }).title).toMatch(/title/i);
expect(createLocalExperience(validDraft).demoState).toBe("device-only");
expect(createBooking({ experience: instantExperience }).status).toBe("reserved");
expect(createBooking({ experience: requestExperience }).status).toBe("pending-host");
```

Also prove booking creation never awards credits.

**Step 2: Run the focused tests and verify RED**

Run: `npm test -- tests/marketplace.test.js`

Expected: FAIL because the marketplace modules do not exist.

**Step 3: Implement the minimal domain layer**

- Add six explicitly fictional Singapore/online experience fixtures.
- Implement normalized text search plus format/group filters.
- Validate the required host fields and conditional neighborhood field.
- Generate stable local IDs without a network call.
- Return `reserved` for instant booking and `pending-host` for request booking.
- Store local listings/bookings under `sidespark-community-demo-v1`, with in-memory fallback and a persistence notice.

**Step 4: Run the focused tests and verify GREEN**

Run: `npm test -- tests/marketplace.test.js`

Expected: PASS.

### Task 2: Build the product-first discovery experience

**Files:**
- Create: `src/components/CommunityMarketplace.jsx`
- Create: `src/components/ExperienceCard.jsx`
- Create: `tests/community-marketplace.test.jsx`
- Modify: `src/App.jsx`

**Step 1: Write the failing opening-screen test**

Assert the default render includes:

```js
screen.getByRole("heading", { name: /share something you know/i });
screen.getByRole("button", { name: /host a spark/i });
screen.getByRole("searchbox", { name: /search experiences/i });
screen.getAllByRole("article");
screen.getByText(/fictional community examples/i);
```

Assert search and format filters reduce visible cards and Reset filters restores them.

**Step 2: Run the focused tests and verify RED**

Run: `npm test -- tests/community-marketplace.test.jsx`

Expected: FAIL because the community marketplace is not rendered.

**Step 3: Implement discovery**

- Make `CommunityMarketplace` the default App mode.
- Keep the existing implementation available as “Classic guided demo.”
- Use the existing SideSpark mark, colors, fonts and functional icon library.
- Add compact header, promise, role actions, trust row, search, format/group filters and responsive card grid.
- Keep all visible examples labeled fictional.

**Step 4: Run the focused tests and verify GREEN**

Run: `npm test -- tests/community-marketplace.test.jsx`

Expected: PASS.

### Task 3: Implement experience details and booking semantics

**Files:**
- Create: `src/components/ExperienceDetail.jsx`
- Modify: `src/components/CommunityMarketplace.jsx`
- Modify: `tests/community-marketplace.test.jsx`

**Step 1: Write failing journey tests**

- Open an instant-reserve experience and verify “Reserve my place.”
- Complete the action and verify status “You’re reserved.”
- Open a request experience and verify “Request to join.”
- Complete it and verify “Request sent to the host.”
- Verify both states say credits unlock only after mutual attendance confirmation.
- Verify duplicate booking is disabled.

**Step 2: Run and verify RED**

Run: `npm test -- tests/community-marketplace.test.jsx`

Expected: FAIL at missing detail/booking behavior.

**Step 3: Implement the detail and success states**

- Show outcome, description, agenda, host reputation, format, capacity, language and access notes.
- Expose only a public neighborhood for in-person examples.
- Save booking status locally without changing credits.
- Add an accessible status region and Back to discover action.

**Step 4: Run and verify GREEN**

Run: `npm test -- tests/community-marketplace.test.jsx`

Expected: PASS.

### Task 4: Implement the host flow

**Files:**
- Create: `src/components/HostExperienceForm.jsx`
- Modify: `src/components/CommunityMarketplace.jsx`
- Modify: `tests/community-marketplace.test.jsx`

**Step 1: Write failing form tests**

- Submitting an empty form displays field errors.
- Selecting online removes the public-neighborhood requirement.
- Selecting one-to-one fixes capacity to one guest.
- A valid submission returns to discovery and shows a “Your device-only draft” card.

**Step 2: Run and verify RED**

Run: `npm test -- tests/community-marketplace.test.jsx`

Expected: FAIL at missing host form.

**Step 3: Implement the form**

- Use native labeled inputs, textarea, date/time, select controls and fieldsets.
- Keep the form intentionally small and exclude exact address, email and phone.
- Publish to device-local state only and announce success.

**Step 4: Run and verify GREEN**

Run: `npm test -- tests/community-marketplace.test.jsx`

Expected: PASS.

### Task 5: Add the credits and badge profile

**Files:**
- Create: `src/components/ReputationProfile.jsx`
- Modify: `src/components/CommunityMarketplace.jsx`
- Modify: `tests/community-marketplace.test.jsx`

**Step 1: Write failing profile tests**

Assert:

```js
screen.getByText(/reputation credits/i);
screen.getByText(/non-spendable/i);
screen.getByText(/first spark/i);
screen.getByText(/connector/i);
screen.getByText(/2 of 3 peers/i);
```

Verify all eight badge definitions are available and no leaderboard appears.

**Step 2: Run and verify RED**

Run: `npm test -- tests/community-marketplace.test.jsx`

Expected: FAIL because the profile view does not exist.

**Step 3: Implement the profile**

- Add the fixed fictional demo profile, current credits and completed-session count.
- Render earned, in-progress and locked badges with accessible text.
- Explain mutual attendance confirmation and non-spendable reputation.

**Step 4: Run and verify GREEN**

Run: `npm test -- tests/community-marketplace.test.jsx`

Expected: PASS.

### Task 6: Preserve the classic guided journey

**Files:**
- Modify: `src/App.jsx`
- Modify: `tests/app.test.jsx`
- Modify: `tests/complete-flow.test.jsx`
- Modify: `tests/journey.test.jsx`

**Step 1: Update tests to enter the classic demo explicitly**

Before existing intent selection, click:

```js
await user.click(screen.getByRole("button", { name: /classic guided demo/i }));
```

Add a regression assertion that Back to marketplace restores discovery.

**Step 2: Run the existing journey tests and verify RED**

Run: `npm test -- tests/app.test.jsx tests/journey.test.jsx tests/complete-flow.test.jsx`

Expected: FAIL until the mode switch is complete.

**Step 3: Add the mode boundary**

- Retain the current state machine unchanged inside classic mode.
- Add Back to marketplace without clearing existing classic local progress.
- Ensure the product header never exposes contradictory navigation.

**Step 4: Run and verify GREEN**

Run: `npm test -- tests/app.test.jsx tests/journey.test.jsx tests/complete-flow.test.jsx`

Expected: PASS.

### Task 7: Apply the approved responsive visual system

**Files:**
- Modify: `src/styles.css`
- Create: `design-qa.md`

**Step 1: Add visual requirements to component tests where behavior is observable**

- Verify filter buttons expose `aria-pressed`.
- Verify the mobile filter group and experience list have semantic labels.
- Verify each CTA remains a native button/link.

**Step 2: Implement responsive styling**

- Use existing tokens, Fredoka and Inter.
- Desktop: compact hero with working cards visible in the first viewport at 1470×779.
- Tablet: two-card grid.
- Mobile: one column, wrapping filters, 48px actions, no horizontal overflow.
- Respect `prefers-reduced-motion`.

**Step 3: Run full automated verification**

Run:

```bash
npm test
npm run test:video
npm run build
npm run test:sites
git diff --check
```

Expected: all commands exit 0 and the Sites artifacts exist.

**Step 4: Run browser and design QA**

- Start the existing local Vite app.
- Open it in the user’s selected Chrome session.
- Exercise Discover, filter-empty-reset, instant reserve, request, host publish, credits/badges and classic guided demo.
- Capture desktop and 320px screenshots.
- Compare against `docs/references/sidespark-option-1.png` and `docs/references/sidespark-option-2-journey.png` for identity and responsive behavior.
- Record findings in `design-qa.md`, fix P0/P1/P2, recapture, and require `final result: passed`.

### Task 8: Final implementation review

**Files:**
- Review only the files named above plus generated `dist/` outputs.

**Step 1: Re-read the design and implementation plan**

Check every launch requirement against rendered behavior.

**Step 2: Inspect the scoped diff**

Confirm no changes were made to `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, or `tests/sites-worker.test.mjs`.

**Step 3: Verify the preview remains open**

Keep the working local preview open for inspection. Do not publish or deploy without a separate explicit instruction.
