# SideSpark Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and publish a lively, mobile-responsive ChatGPT Sites (GPTSites) experience that matches coworkers for short social or skill-sharing sidequests.

**Architecture:** Use the Product Design responsive prototype template as a React/Vite single-page app, with an explicit UI state machine and deterministic matching against a consented demo community. Keep the hackathon path reliable and public without sign-in: personal progress is stored on the device, introductions are generated from safe profile fields, and no external AI or shared database is load-bearing for the MVP.

**Tech Stack:** React 19, Vite 6, Motion, Lucide React, Vitest, Testing Library, Playwright, Cloudflare Worker-compatible Sites build, ChatGPT Sites hosting.

---

## 1. Product contract

### Track fit

- **Track:** Make Life Easier.
- **Audience:** Non-technical office workers as a workplace community.
- **Real task:** Meet someone outside the usual circle and begin a comfortable, useful interaction.
- **One-line description:** SideSpark turns ordinary work breaks into playful sidequests for meeting coworkers, exchanging skills, and growing your network.
- **Fifteen-second promise:** Pick why you want to connect, choose a break, and meet a coworker with an icebreaker ready.
- **Primary demo:** One person selects Social Connect, chooses Coffee, completes a lightweight profile, matches with Alex from Finance, receives an icebreaker quest, completes it, and adds a spark to the community map.

### Product language

- **Sidekick:** The coworker a person is matched with.
- **Sidequest:** The shared coffee, walk, lunch, or 15-minute desk activity.
- **Spark:** The personalised icebreaker.
- **Spark Card:** The skill or shared memento saved after completion.
- **Spark Map:** The visual network of completed community connections.
- **Matching principle:** One thing in common. One thing to discover.

### MVP scope

The MVP includes:

1. Skill Swap and Social Connect intentions.
2. Coffee, Walk, Lunch, and 15-minute Desk Break formats.
3. A minimal local profile: first name, team, interests, skills to share, skills to learn.
4. Deterministic matching against a consented sample office community.
5. A friendly introduction explaining the common ground and the discovery angle.
6. Interactive quest cards with one playful activity.
7. Five optional micro-skills, with AI prompting represented as only one possible skill.
8. Completion, a shareable Spark Card, and a community connection map.
9. Honest no-match and storage-failure states.
10. Keyboard, touch, reduced-motion, and responsive support.

Explicitly excluded from the hackathon MVP:

- Accounts or sign-in.
- Chat, direct messages, notifications, or calendar integration.
- Collecting email addresses, employee IDs, photos, or sensitive HR data.
- Live company-directory integration.
- Unmoderated public profile creation.
- A live LLM dependency for matching or introductions.
- A realtime multiplayer room, ranking system, or points economy.
- A manager dashboard.

### Why the MVP is deterministic

Connection is the product. It must still work if an AI provider is slow or unavailable. The first version creates introductions and quests from structured, non-sensitive profile fields. AI remains one optional skill topic, and a later enhancement can add a bounded server-side model for rewriting introductions after the core experience is proven.

The public prototype must describe the sample coworker pool honestly. It must never imply that fixture profiles are live employees or that an AI model was called when it was not.

---

## 2. Selected visual direction

### Source of truth

- Visual reference: [Option 1 foundation](../../references/sidespark-option-1.png)
- Interaction reference: [Option 2 journey](../../references/sidespark-option-2-journey.png)
- Use generated Option 1 as the visual foundation: deep electric indigo, coral Skill Swap card, mint Social Connect card, yellow primary action, bold rounded typography, tactile controls, and small spark accents.
- Incorporate Option 2's journey after either intention is selected.
- Kahoot is inspiration for energy, interaction pacing, chunky controls, and instant feedback only. Do not copy its logo, mascots, answer grid, exact colors, typography, or trade dress.

### Combined interaction

Initial state:

1. The SideSpark wordmark and Community link sit at the top.
2. The headline reads **Take a break. Find your spark.**
3. Two large choices dominate the first viewport: **Skill Swap** and **Social Connect**.
4. The main action remains disabled until an intention is selected.

Selected state:

1. The chosen card springs upward slightly and receives a visible check.
2. The other card remains available but becomes quieter.
3. A dotted journey line draws downward from the selected card.
4. Coffee, Walk, Lunch, and Desk Break nodes reveal in a short stagger.
5. Choosing a node moves the highlight along the line.
6. The primary button changes to **Find my sidekick** and scrolls into view.

### Animation choreography

Use Motion for stateful UI animation, not decoration everywhere.

| Moment | Motion | Timing |
|---|---|---:|
| Page arrival | Wordmark, headline, and intention cards fade/raise in | 180-360 ms stagger |
| Intention selection | Selected card scales to 1.02, check pops, sibling fades to 0.72 | 220 ms spring |
| Journey reveal | Path draws top-to-bottom; nodes rise in sequence | 420 ms total |
| Break selection | Active node gains a ring; progress spark travels to it | 240 ms |
| Matching | Three orbiting sparks, then a decisive snap together | 900 ms maximum |
| Match reveal | Sidekick card flips or wipes open once | 360 ms |
| Quest completion | Connection line draws; Spark Card rises from bottom | 420 ms |
| Map update | Only the new connection pulses once | 500 ms |

Reduced motion:

- Remove scale, travel, orbit, and flip effects.
- Reveal each state with a 100 ms opacity transition or immediately.
- Never require animation to understand progress.
- Avoid endless ambient movement.

### Visual tokens

```css
:root {
  --color-indigo-950: #11105f;
  --color-indigo-800: #1b23a8;
  --color-coral: #ff735e;
  --color-mint: #76dfc4;
  --color-sun: #ffd83d;
  --color-cream: #fff9ee;
  --color-white: #ffffff;
  --color-ink: #12105f;
  --radius-card: 28px;
  --radius-control: 18px;
  --shadow-press: 0 7px 0 rgba(7, 8, 69, 0.28);
  --space-page: clamp(20px, 5vw, 52px);
  --touch-min: 48px;
}
```

Typography:

- Display: Fredoka, 700.
- Interface/body: Inter, 400-700.
- Maximum two font families.
- Body text 16px on mobile and at least 16px on desktop.
- The largest headline should use `clamp()` and never wrap into more than three lines.

### Responsive behavior

| Width | Layout |
|---:|---|
| 320-479 px | Single column; intent cards become a two-column pair only when both remain readable; journey is vertical |
| 480-767 px | Two intent cards side by side; vertical journey; sticky action near the bottom |
| 768-1099 px | Hero and selection on the left; animated journey on the right |
| 1100 px+ | Maximum content width 1180px; two-column stage with community preview beside the main flow |

Mobile rules:

- No horizontal page scrolling.
- All primary targets are at least 48 by 48px.
- Selected content scrolls into view without hiding the heading.
- Sticky actions respect the browser safe area.
- Content remains usable at 320px width and 200% zoom.

---

## 3. User journey and screen states

### State machine

```text
CHOOSE_INTENT
  -> CHOOSE_FORMAT
  -> PROFILE
  -> MATCHING
  -> MATCH_FOUND | NO_MATCH
  -> QUEST
  -> COMPLETE
  -> MAP
```

Allowed recovery transitions:

```text
NO_MATCH -> CHOOSE_FORMAT
NO_MATCH -> BRING_A_BUDDY
MATCH_FOUND -> CHOOSE_INTENT
QUEST -> MATCH_FOUND
COMPLETE -> CHOOSE_INTENT
ANY_STATE -> CHOOSE_INTENT via Start over
```

### Positive Social Connect path

1. Select Social Connect.
2. Pick Coffee.
3. Enter first name, team, and up to three interests.
4. Matching prioritises another team, one shared interest, and one useful difference.
5. Reveal: **Meet Alex from Finance.**
6. Explain: both enjoy street photography; Alex knows a part of the business the user rarely sees.
7. Spark: each person shares the story behind their role in 30 seconds, then finds one way the teams could help each other.
8. Complete the quest.
9. Save a Spark Card locally.
10. Draw a new connection on the map.

### Positive Skill Swap path

1. Select Skill Swap.
2. Pick Walk.
3. Enter one skill to share and one to learn.
4. Match on complementary offer/want fields, with cross-team diversity as a secondary signal.
5. Reveal the match and a clear reason.
6. Quest: each person demonstrates one useful technique, then the learner repeats it in their own words.
7. Save the technique title and one takeaway in the Spark Card.

### Honest negative path

If no candidate clears the minimum score:

- Say **No spark yet — your next sidekick may not have joined this demo community.**
- Offer **Try another break**, **Change what I want**, and **Bring a buddy**.
- Do not return a random low-quality match.
- Do not show a connection on the map.

### Storage failure

If local storage is unavailable:

- Keep the current flow working in memory.
- Show **This spark will last for this visit only.**
- Do not repeatedly prompt or block completion.

---

## 4. Data and matching design

### Profile model

```js
{
  id: "alex-finance",
  firstName: "Alex",
  team: "Finance",
  interests: ["street photography", "running", "hawker food"],
  offers: ["Excel shortcuts", "budget storytelling"],
  wants: ["presentation confidence", "AI prompting"],
  formats: ["coffee", "walk"],
  consentedForDemo: true
}
```

### Matching rules

Reject a candidate when:

- `consentedForDemo` is not true.
- Candidate ID matches the current person.
- Candidate does not support the chosen break format.
- Candidate has already been completed with during this local session.

Social Connect scoring:

```text
+4 different team
+3 at least one shared interest
+2 exactly one shared interest rather than complete similarity
+2 candidate has a skill the user wants
+1 preferred format matches
-4 same team
```

Skill Swap scoring:

```text
+6 candidate offers something the user wants
+5 candidate wants something the user offers
+2 different team
+1 shared interest
+1 preferred format matches
```

Minimum score: 5. Ties are resolved by stable profile ID order so the demo is repeatable.

### Introduction contract

Every introduction must contain:

1. The sidekick's first name and team.
2. One genuine common point.
3. One difference worth discovering.
4. One sentence explaining the activity.

It must not infer personality, seniority, performance, demographic traits, or private information.

Example:

> Meet Alex from Finance. You both enjoy street photography, and Alex sees a side of the business you rarely encounter. Over coffee, trade the story behind your roles and invent one small way your teams could help each other.

---

## 5. Planned project structure

Bootstrap the Product Design `prototype` template into:

```text
work/sidespark/
├── .openai/hosting.json
├── AGENTS.md
├── package.json
├── public/
│   └── og.png
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── CommunityMap.jsx
│   │   ├── FormatJourney.jsx
│   │   ├── IntentCard.jsx
│   │   ├── MatchReveal.jsx
│   │   ├── ProfileForm.jsx
│   │   ├── QuestCard.jsx
│   │   ├── SparkCard.jsx
│   │   └── StatusNotice.jsx
│   ├── data/
│   │   ├── community.js
│   │   └── quests.js
│   ├── lib/
│   │   ├── introductions.js
│   │   ├── matching.js
│   │   ├── stateMachine.js
│   │   └── storage.js
│   └── test/
│       └── setup.js
├── tests/
│   ├── accessibility.spec.js
│   ├── matching.test.js
│   ├── sidespark-flow.spec.js
│   └── sites-worker.test.mjs
├── worker/index.js
└── vite.config.mjs
```

Keep the template's Sites packaging and worker contract intact for the static MVP.

---

## 6. Implementation tasks

### Task 1: Bootstrap and lock the design contract

**Files:**

- Create: `work/sidespark/` from the Product Design `prototype` template
- Modify: `work/sidespark/AGENTS.md`
- Modify: `work/sidespark/package.json`

**Steps:**

1. Bootstrap the responsive prototype template into `work/sidespark`.
2. Record the following durable decisions in `AGENTS.md`: SideSpark name, Option 1 visual source, Option 2 journey reveal, connection-first positioning, mobile responsiveness, and deterministic MVP data boundary.
3. Install `motion`, `lucide-react`, `@fontsource/fredoka`, and `@fontsource/inter`.
4. Install test dependencies: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, and `@playwright/test`.
5. Add scripts: `test`, `test:watch`, and `test:e2e`.
6. Run `npm run build`.
7. Expected: `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json` exist.
8. Initialise Git inside `work/sidespark` and commit the untouched template plus recorded contract.

```bash
git add AGENTS.md package.json package-lock.json .openai worker scripts tests src
git commit -m "chore: bootstrap SideSpark prototype"
```

### Task 2: Define fixtures and domain contracts

**Files:**

- Create: `src/data/community.js`
- Create: `src/data/quests.js`
- Create: `tests/matching.test.js`

**Steps:**

1. Write a failing test requiring every demo profile to have a stable ID, first name, team, supported format, and explicit demo consent.
2. Add 10-12 synthetic, diverse coworker profiles with no real contact information.
3. Add four break formats and at least eight quests split between Social Connect and Skill Swap.
4. Include AI prompting as one optional learnable skill rather than a product category.
5. Run `npm test -- tests/matching.test.js`.
6. Expected: fixture contract tests pass.
7. Commit.

```bash
git add src/data tests/matching.test.js
git commit -m "feat: add SideSpark demo community and quests"
```

### Task 3: Implement matching with TDD

**Files:**

- Create: `src/lib/matching.js`
- Modify: `tests/matching.test.js`

**Step 1: Write the failing tests**

Cover:

- Social Connect prefers a cross-team candidate with one shared interest.
- Skill Swap prefers complementary offers and wants.
- Unsupported formats are excluded.
- Profiles without explicit demo consent are excluded.
- Previously completed matches are excluded.
- Ties are deterministic.
- Scores below five return `null`.

**Step 2: Run the focused test**

```bash
npm test -- tests/matching.test.js
```

Expected: FAIL because `findBestMatch` does not exist.

**Step 3: Implement the minimal matcher**

```js
export function findBestMatch({ user, candidates, intent, format, completedIds = [] }) {
  const completed = new Set(completedIds);
  const eligible = candidates.filter((candidate) =>
    candidate.consentedForDemo === true &&
    candidate.id !== user.id &&
    candidate.formats.includes(format) &&
    !completed.has(candidate.id)
  );

  const scored = eligible.map((candidate) => ({
    candidate,
    score: intent === "skill"
      ? scoreSkillSwap(user, candidate, format)
      : scoreSocialConnect(user, candidate, format),
  }));

  scored.sort((a, b) => b.score - a.score || a.candidate.id.localeCompare(b.candidate.id));
  return scored[0]?.score >= 5 ? scored[0] : null;
}
```

4. Run the focused test again.
5. Expected: PASS.
6. Commit.

```bash
git add src/lib/matching.js tests/matching.test.js
git commit -m "feat: add deterministic coworker matching"
```

### Task 4: Add safe introductions and quest selection

**Files:**

- Create: `src/lib/introductions.js`
- Create: `tests/introductions.test.js`

**Steps:**

1. Write failing tests for the four-part introduction contract.
2. Test that no introduction contains email, employee ID, inferred personality, or unprovided demographic information.
3. Implement helpers to find one shared interest and one discovery point.
4. Select a quest deterministically from intent plus format.
5. Test the exact Alex-from-Finance golden fixture.
6. Run `npm test -- tests/introductions.test.js`.
7. Expected: PASS.
8. Commit.

### Task 5: Build the Option 1 visual shell

**Files:**

- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Create: `src/components/IntentCard.jsx`
- Create: `src/components/StatusNotice.jsx`

**Steps:**

1. Write a component test asserting the SideSpark wordmark, headline, two intentions, and Community link are present.
2. Import Fredoka and Inter from local packages.
3. Add the approved color, radius, spacing, and typography tokens.
4. Implement the deep-indigo responsive shell.
5. Implement the coral Skill Swap and mint Social Connect controls with Lucide icons.
6. Ensure both controls are real buttons with `aria-pressed`.
7. Add the yellow primary action, disabled until selection.
8. Run component tests and the build.
9. Compare the 390x844 render to selected Option 1.
10. Commit.

### Task 6: Reveal the Option 2 journey after selection

**Files:**

- Create: `src/components/FormatJourney.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Create: `tests/journey.test.jsx`

**Steps:**

1. Write a failing interaction test: selecting Social Connect reveals four break nodes and updates the button label.
2. Implement explicit selected-intent state.
3. Use Motion layout animation for the selected card and journey container.
4. Draw a functional dotted path with CSS and semantic list markup.
5. Reveal Coffee, Walk, Lunch, and Desk Break with staggered animation.
6. Add `aria-current="step"` to the chosen format.
7. Scroll the journey into view only when needed.
8. Add a `prefers-reduced-motion` branch.
9. Run `npm test -- tests/journey.test.jsx`.
10. Verify at 320, 390, 768, and 1280px.
11. Commit.

### Task 7: Capture the smallest useful profile

**Files:**

- Create: `src/components/ProfileForm.jsx`
- Create: `src/lib/stateMachine.js`
- Modify: `src/App.jsx`
- Create: `tests/profile.test.jsx`

**Steps:**

1. Write a failing test that blocks progress without first name and team.
2. Add fields for first name, team, up to three interests, skill offered, and skill wanted.
3. Show skill fields only for Skill Swap.
4. Validate locally; do not transmit profile data.
5. Preserve the chosen intent and format when editing the profile.
6. Add Back and Start over transitions to the state machine.
7. Test keyboard-only completion.
8. Commit.

### Task 8: Match and reveal the sidekick

**Files:**

- Create: `src/components/MatchReveal.jsx`
- Create: `src/components/QuestCard.jsx`
- Modify: `src/App.jsx`
- Create: `tests/match-flow.test.jsx`

**Steps:**

1. Write a failing golden-flow test using Social Connect + Coffee.
2. Add a matching state lasting no more than 900ms.
3. Respect reduced motion by showing a static progress message.
4. Call `findBestMatch` exactly once per explicit match attempt.
5. Reveal the sidekick, team, common ground, discovery angle, and selected format.
6. Render the assigned quest with one clear action.
7. Implement the honest no-match state and Bring a Buddy fallback.
8. Test that no-match never writes a map connection.
9. Commit.

### Task 9: Complete a quest and create a Spark Card

**Files:**

- Create: `src/components/SparkCard.jsx`
- Create: `src/lib/storage.js`
- Modify: `src/App.jsx`
- Create: `tests/completion.test.jsx`

**Steps:**

1. Write failing tests for completion, saved takeaway, and storage failure.
2. Allow one optional takeaway of no more than 120 characters.
3. Create a Spark Card containing sidekick name, format, quest title, date, and takeaway.
4. Store only the local user's profile, completed profile IDs, and Spark Cards.
5. Never store hidden profile attributes or contact information.
6. Fall back to in-memory state if storage throws.
7. Add a Copy summary action; do not auto-share externally.
8. Commit.

### Task 10: Build the community Spark Map

**Files:**

- Create: `src/components/CommunityMap.jsx`
- Modify: `src/App.jsx`
- Create: `tests/community-map.test.jsx`

**Steps:**

1. Write a failing test showing no new edge before completion.
2. Render an accessible list describing all visible connections alongside the visual map.
3. Use abstract nodes and team labels rather than real portraits.
4. Add the current user's new edge only after quest completion.
5. Pulse the new edge once; suppress in reduced-motion mode.
6. Do not imply that fixture connections are live activity. Label the surface **Demo community map**.
7. Commit.

### Task 11: Responsive, accessible, and motion QA

**Files:**

- Modify: `src/styles.css`
- Create: `tests/accessibility.spec.js`
- Create: `tests/sidespark-flow.spec.js`

**Steps:**

1. Add Playwright coverage for the complete Social Connect path.
2. Add the complete Skill Swap path.
3. Test 320x568, 390x844, 768x1024, and 1280x800 viewports.
4. Assert no horizontal overflow.
5. Assert visible focus, semantic headings, form labels, and button names.
6. Run the flow with `prefers-reduced-motion: reduce`.
7. Verify contrast for yellow/navy, coral/navy, mint/navy, white/indigo.
8. Verify touch targets are at least 48px.
9. Run `npm test`, `npm run test:e2e`, and `npm run build`.
10. Fix visible differences against Option 1 and the approved journey behavior.
11. Commit.

### Task 12: Metadata and public presentation

**Files:**

- Modify: `index.html`
- Create: `public/og.png`
- Modify: `src/App.jsx`

**Steps:**

1. Set title: `SideSpark — Take a break. Find your spark.`
2. Set description to the approved one-line project description.
3. Generate one SideSpark social card using the selected visual identity.
4. Wire Open Graph and X metadata.
5. Add a small About section naming the audience and explaining the demo data boundary.
6. Run the build and inspect the root page metadata.
7. Commit.

### Task 13: Final build and ChatGPT Sites publication

**Files:**

- Preserve: `.openai/hosting.json`
- Preserve: `worker/index.js`
- Preserve: `scripts/prepare-sites-build.mjs`
- Preserve: `tests/sites-worker.test.mjs`

**Steps:**

1. Run `npm test`.
2. Run `npm run test:e2e`.
3. Run `npm run build`.
4. Run `npm run test:sites`.
5. Verify the exact public build from a clean checkout.
6. Audit for emails, personal data, secrets, machine paths, stale copy, and unproven AI claims.
7. Publish to ChatGPT Sites only after the user approves the resolved access level.
8. Set the deployed Site to public access because the hackathon explicitly requires a public Site that opens without sign-in.
9. Open the deployed URL in Chrome and verify it while signed out, following the current ChatGPT Sites Academy guidance.
10. Run the golden Social Connect path on the deployment.
11. Run the no-match path on the deployment.
12. Check the social preview and mobile viewport.

### Task 14: Submission and live demo

**Submission values:**

- **Project name:** SideSpark
- **Track:** Make Life Easier
- **One-line description:** SideSpark turns ordinary work breaks into playful sidequests for meeting coworkers, exchanging skills, and growing your network.
- **Live demo:** Yes, once the deployed golden path is verified.
- **Made on Mobile:** Select Yes only if the entire build was genuinely created using ChatGPT Work on mobile; otherwise select No.

**Sixty-second demo:**

```text
0-08s  “Useful knowledge and potential connections are trapped inside teams that rarely meet.”
08-15s “SideSpark turns an ordinary break into a small social sidequest.”
15-25s Select Social Connect, then Coffee. The animated journey appears.
25-38s Match with Alex from Finance. Reveal one common point and one thing to discover.
38-50s Show the conversation quest and complete it.
50-58s Reveal the Spark Card and new map connection.
58-60s “One break. One useful connection. Your office gets a little less siloed.”
```

**Demo safeguards:**

- Pre-warm the public URL.
- Keep Alex's fixture in the consented demo pool.
- Record a real 60-second fallback after the deployment is verified.
- Use the actual site, not a separate pitch mock.
- Freeze feature work after the fallback recording.

---

## 7. Acceptance matrix

| Area | Required proof |
|---|---|
| Clarity | A new user can explain SideSpark after the first viewport |
| Positive flow | Social Connect and Skill Swap both reach a completed Spark Card |
| Negative flow | No-match provides useful choices and never fabricates a connection |
| Matching | Tests prove deterministic, consented, intent-specific matching |
| Privacy | No email, employee ID, photo, HR data, or external transmission |
| Truth | Demo profiles and map are labelled honestly; no uncalled AI is implied |
| Motion | Selected intention reveals the journey; reduced motion remains complete |
| Mobile | Usable at 320px and 390px with 48px targets and no horizontal overflow |
| Desktop | Main flow stays focused and does not become a dashboard |
| Accessibility | Keyboard flow, focus visibility, labels, contrast, and zoom pass |
| Reliability | Static build, Sites worker test, public signed-out URL, and fallback recording pass |
| Submission | Name, one-line description, public URL, track, and live-demo choice are verified |

---

## 8. Freeze rules

After the golden deployed flow and fallback recording exist, do not add:

- Live AI-generated introductions.
- D1 profile persistence.
- Company accounts or invite codes.
- Messaging, calendars, or notifications.
- A realtime leaderboard.
- More sidequest categories.
- User-uploaded photos.

These are post-hackathon candidates. The only allowed late changes are blocking bugs, accessibility fixes, truthful copy corrections, and submission requirements.

## 9. Post-hackathon extension order

If the concept tests well, extend in this order:

1. Invite-only company community with verified consent.
2. Shared D1 profiles and match records with deletion controls.
3. Mutual availability and calendar suggestions.
4. Bounded AI introduction rewriting using only approved profile fields.
5. Organisation-specific sidequest packs.
6. Opt-in reminders and recurring rotations.
7. Aggregated, privacy-safe community insights.

Do not add these before real user feedback proves the core connection loop.
