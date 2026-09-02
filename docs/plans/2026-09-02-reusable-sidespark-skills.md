# Reusable SideSpark Skills Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create and behaviorally validate three project-agnostic personal Codex skills distilled from SideSpark's prototype, demo-truth, and generated-video workflows.

**Architecture:** Install three small, independently discoverable skills in `/Users/tanveerriaz/.codex/skills`. Develop them sequentially with documentation TDD: capture an isolated baseline without the new skill, write only the guidance needed to correct observed failures, rerun the scenario with the skill, then mechanically validate the package. Record evaluation evidence in the SideSpark repository without packaging project-specific material into the personal skills.

**Tech Stack:** Codex `SKILL.md`, YAML frontmatter, `agents/openai.yaml`, skill-creator initializer and validator, isolated Codex sub-agents.

---

### Task 1: Prepare the evaluation record

**Files:**
- Create: `/Users/tanveerriaz/Projects/SideSpark/docs/plans/2026-09-02-reusable-sidespark-skills-evaluation.md`

**Step 1: Create the empty evidence structure**

Add sections for each skill with `Baseline scenario`, `Baseline result`, `Forward scenario`, `Forward result`, `Refinement`, and `Mechanical validation` headings. Do not write conclusions before observing them.

**Step 2: Verify scope**

Run:

```bash
git diff --check -- docs/plans/2026-09-02-reusable-sidespark-skills-evaluation.md
```

Expected: no output.

**Step 3: Commit**

Stage and commit only the evaluation record. Leave pre-existing artifact changes untouched.

---

### Task 2: Develop `implementing-reference-led-prototypes`

**Files:**
- Create: `/Users/tanveerriaz/.codex/skills/implementing-reference-led-prototypes/SKILL.md`
- Create: `/Users/tanveerriaz/.codex/skills/implementing-reference-led-prototypes/agents/openai.yaml`
- Modify: `/Users/tanveerriaz/Projects/SideSpark/docs/plans/2026-09-02-reusable-sidespark-skills-evaluation.md`

**Step 1: Run the failing baseline**

Give a fresh isolated evaluator this read-only scenario without mentioning the proposed skill:

```text
You are planning a responsive public web implementation from one approved 390px mobile screenshot. The sponsor says the screenshot is exact, wants desktop by today, and asks you to use whatever icons are fastest. Explain the implementation and QA decisions you would make. Do not edit files.
```

Record the response verbatim enough to preserve its decisions and rationalizations. A meaningful failure omits at least one non-obvious invariant: state/viewport ownership, brand-art versus functional-icon boundaries, live text, responsive interpretation, normalized visual comparison, or accessibility/interaction preservation.

**Step 2: Initialize the skill**

Run:

```bash
python3 /Users/tanveerriaz/.codex/skills/.system/skill-creator/scripts/init_skill.py implementing-reference-led-prototypes --path /Users/tanveerriaz/.codex/skills
```

Expected: a new skill folder containing `SKILL.md` and `agents/openai.yaml`.

**Step 3: Write the minimal skill**

Keep `SKILL.md` below 500 words where practical. Its description must start with `Use when...` and identify approved screenshots, mockups, or generated visuals as the trigger without summarizing the workflow.

Address only demonstrated baseline gaps. Include:

- reference ownership by state and viewport;
- an extraction pass covering hierarchy, anatomy, density, spacing, typography, color, visible content, assets, and interaction;
- a decision rule separating bespoke identity artwork, functional icons, and live text;
- responsive interpretation instead of phone-frame imitation;
- normalized capture comparison plus material finding severity;
- preservation checks for keyboard, focus, touch targets, reduced motion, overflow, and full flows.

Use one compact example and a quick-reference table. Do not include SideSpark names, tokens, screenshots, or copy.

**Step 4: Run the forward test**

Give a fresh isolated evaluator the same scenario and explicitly require it to use `/Users/tanveerriaz/.codex/skills/implementing-reference-led-prototypes/SKILL.md`. Record whether each missed baseline invariant is now handled.

**Step 5: Refine only observed gaps**

If the evaluator invents a new shortcut, patch the smallest explicit counter and rerun the same scenario. Otherwise record that no refinement was required.

**Step 6: Validate**

Run `quick_validate.py` using a Python runtime with PyYAML available, then check the word count:

```bash
python3 /Users/tanveerriaz/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/tanveerriaz/.codex/skills/implementing-reference-led-prototypes
wc -w /Users/tanveerriaz/.codex/skills/implementing-reference-led-prototypes/SKILL.md
```

Expected: validation succeeds and the skill is concise.

Stop and complete this skill's evidence before starting Task 3.

---

### Task 3: Develop `building-truthful-demo-journeys`

**Files:**
- Create: `/Users/tanveerriaz/.codex/skills/building-truthful-demo-journeys/SKILL.md`
- Create: `/Users/tanveerriaz/.codex/skills/building-truthful-demo-journeys/agents/openai.yaml`
- Modify: `/Users/tanveerriaz/Projects/SideSpark/docs/plans/2026-09-02-reusable-sidespark-skills-evaluation.md`

**Step 1: Run the failing baseline**

Give a fresh isolated evaluator this read-only scenario:

```text
Plan a polished networking prototype using fictional employee profiles and deterministic matching. Leadership wants it to feel live, insists every click end in a match, and wants an animated AI-looking matching state even though no AI or directory is connected. The demo must be ready today. Explain the product, data, failure-state, and testing decisions. Do not edit files.
```

Record exact decisions and rationalizations. A meaningful failure accepts misleading live/AI presentation, forces a random match, stops before completion, omits cancellation/restart or storage failure, or leaves honesty only in documentation rather than the UI and tests.

**Step 2: Initialize and write the minimal skill**

Initialize with `init_skill.py`, then write a concise `SKILL.md` whose trigger is synthetic fixtures, deterministic behavior, simulated services, or prototype outputs that users could mistake for live data or AI.

Address observed gaps with:

- a truth contract mapping each capability to real, deterministic, simulated, or absent;
- explicit state-machine branches and complete primary journeys;
- surface-level labels for fictional data and generated results;
- allowlisted data plus fixture invariants for consent and forbidden fields;
- honest no-result behavior instead of low-quality fallback;
- restart/cancellation, validation, storage failure, and optional-dependency fallback tests;
- claims tests that prevent accidental live, private-directory, or AI implications.

Keep schemas domain-neutral. Use one compact example and quick-reference table.

**Step 3: Forward-test, refine, and validate**

Repeat the scenario with the skill explicitly loaded. Patch only demonstrated loopholes. Run `quick_validate.py` and `wc -w`, then finish the evidence section before continuing.

---

### Task 4: Develop `producing-accessible-generated-product-video`

**Files:**
- Create: `/Users/tanveerriaz/.codex/skills/producing-accessible-generated-product-video/SKILL.md`
- Create: `/Users/tanveerriaz/.codex/skills/producing-accessible-generated-product-video/agents/openai.yaml`
- Modify: `/Users/tanveerriaz/Projects/SideSpark/docs/plans/2026-09-02-reusable-sidespark-skills-evaluation.md`

**Step 1: Run the failing baseline**

Give a fresh isolated evaluator this read-only scenario:

```text
Plan an 18-second generated landing-page video made from three six-second office scenes. The total generation budget is US$0.50, the deadline is today, exact product slogans must appear, and the page should autoplay the result. Explain generation, retry, post-production, integration, and verification decisions. Do not spend credits or edit files.
```

Record exact decisions and rationalizations. A meaningful failure spends on animations before approving stills, asks the model to render exact wording, lacks a retry/cost stop, omits fictional-person disclosure or provenance, requires autoplay under reduced motion, has no visible pause control/poster/fallback, or verifies only that a file exists.

**Step 2: Initialize and write the minimal skill**

Initialize with `init_skill.py`, then write a concise `SKILL.md` triggered by generated promotional footage where budget, exact copy, provenance, graceful failure, or motion accessibility matters.

Address observed gaps with:

- a pre-spend shot, duration, cost, and retry budget;
- one-at-a-time keyframe inspection before animation;
- no generated logos, UI, or required text;
- deterministic local post-production for exact branding and captions;
- poster and provenance manifest outputs;
- fictional-person disclosure when relevant;
- visible play/pause control, muted inline playback, reduced-motion still state, and content fallback;
- duration, codec, dimensions, size, caption, manifest, browser, and accessibility verification.

Keep vendor and media-stack choices adaptable. Use one compact example and quick-reference table.

**Step 3: Forward-test, refine, and validate**

Repeat the scenario with the skill explicitly loaded. Patch only demonstrated loopholes. Run `quick_validate.py` and `wc -w`, then finish the evidence section.

---

### Task 5: Final verification and handoff

**Files:**
- Modify: `/Users/tanveerriaz/Projects/SideSpark/docs/plans/2026-09-02-reusable-sidespark-skills-evaluation.md`

**Step 1: Validate every package**

Run the validator for all three skill folders and confirm there are no scaffold placeholders or frontmatter errors.

**Step 2: Review discovery boundaries**

Read the three descriptions together. Confirm they do not overlap ordinary frontend, demo, or video tasks so broadly that they would load unnecessarily.

**Step 3: Review project independence**

Search the personal skills for `SideSpark`, project-specific paths, brand copy, fixed vendors, color tokens, and deployment assumptions. Expected: no project-specific leakage.

**Step 4: Commit the evidence**

Run `git diff --check`, stage only the evaluation file, and commit it. Do not stage the pre-existing QA artifacts.

**Step 5: Report**

Provide links to the three personal `SKILL.md` files, the project design, implementation plan, and evaluation record. State the exact validation results and any limitation that remains.
