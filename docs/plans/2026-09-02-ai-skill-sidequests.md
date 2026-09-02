# AI Skill Sidequests Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Serve a concrete, safe AI-prompting challenge whenever AI prompting is part of a Skill Swap.

**Architecture:** Extend the deterministic quest catalogue with one AI-practice quest per break format and select it from the current profile's offered or wanted skills. Enhance the existing quest card with optional structured learning fields while preserving all current quest objects and non-AI behavior.

**Tech Stack:** React, Vite, Vitest, Testing Library, CSS

---

### Task 1: Select AI-practice quests

**Files:**
- Create: `tests/quests.test.js`
- Modify: `src/data/quests.js`

**Step 1: Write the failing tests**

Add focused assertions that `getQuest("skill", "coffee", profile)` returns an AI-practice quest when `AI prompting` appears in `wants` or `offers`, while `getQuest("social", "coffee", profile)` and a non-AI Skill Swap retain their existing quests.

**Step 2: Run the test to verify it fails**

Run: `npm test -- tests/quests.test.js`

Expected: FAIL because `getQuest` does not inspect the profile or return structured AI-practice content.

**Step 3: Write the minimal implementation**

Add break-specific AI quest data with `title`, `prompt`, `steps`, `learningOutcome`, and `safetyNote`. Normalise `profile.offers` and `profile.wants`, and choose the AI catalogue only for Skill Swap when either includes `ai prompting`.

**Step 4: Run the tests to verify they pass**

Run: `npm test -- tests/quests.test.js`

Expected: PASS.

### Task 2: Render the learning challenge in the complete journey

**Files:**
- Modify: `tests/complete-flow.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/QuestCard.jsx`
- Modify: `src/styles.css`

**Step 1: Write the failing interaction test**

Complete Skill Swap + Coffee with `AI prompting` as the wanted skill. Assert the AI challenge heading, three ordered steps, learning outcome, non-sensitive-data reminder, and the existing no-AI-call disclosure.

**Step 2: Run the test to verify it fails**

Run: `npm test -- tests/complete-flow.test.jsx`

Expected: FAIL because the current quest lookup does not receive the profile and the card does not render structured learning fields.

**Step 3: Write the minimal implementation**

Pass the current profile to both normal and buddy quest lookups. Render optional steps, learning outcome, and safety note in `QuestCard`, then add compact styles consistent with the approved SideSpark visual language.

**Step 4: Run the tests to verify they pass**

Run: `npm test -- tests/complete-flow.test.jsx`

Expected: PASS.

### Task 3: Record and verify the product decision

**Files:**
- Modify: `AGENTS.md`

**Step 1: Record the durable decision**

State that AI-focused Skill Swaps must use hands-on learning challenges, while Social Connect and other skill topics remain intact.

**Step 2: Run automated verification**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: production build PASS.

**Step 3: Verify the rendered journey**

Run the local server and inspect the AI Skill Swap flow at 320px and desktop widths. Confirm readable hierarchy, no horizontal overflow, keyboard access, and truthful no-AI-call/safe-data copy.
