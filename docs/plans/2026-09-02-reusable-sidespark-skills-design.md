# Reusable SideSpark Skills Design

**Approved:** 2026-09-02

## Goal

Turn the non-obvious lessons from SideSpark into personal Codex skills that improve similar work in other projects without carrying over SideSpark-specific branding, copy, architecture, or deployment assumptions.

## Selected structure

Create three focused skills under `~/.codex/skills`. Separate skills are easier to discover accurately than one broad prototype skill, and personal installation makes them available across projects without requiring repository-by-repository copying.

Each skill will keep its essential decision rules in `SKILL.md`. Supporting references will be added only when conditional detail would otherwise make the entrypoint noisy. No SideSpark assets, fixtures, copy, color tokens, product names, or Sites-specific files will be packaged.

## Skill 1: implementing-reference-led-prototypes

Use when an approved screenshot, mockup, or generated visual must govern a responsive implementation rather than serve as loose inspiration.

The skill will teach an evidence loop:

- identify which reference governs each state and viewport;
- extract layout, component anatomy, density, typography, color, asset, and interaction commitments;
- distinguish bespoke brand artwork from functional icons and live text;
- adapt a mobile reference into a real responsive website without simulating a phone frame;
- compare normalized browser captures against the source;
- record and fix material findings while preserving accessibility and interaction behavior.

It will not duplicate general frontend implementation guidance or mandate pixel identity where the target viewport differs from the reference.

## Skill 2: building-truthful-demo-journeys

Use when an interactive prototype relies on synthetic fixtures, deterministic logic, local state, or simulated service behavior that could be mistaken for live data or AI.

The skill will require the product promise to survive without fabricated capabilities:

- define an explicit state machine and complete every primary branch;
- label fictional people, sample activity, deterministic outputs, and local-only state at the surfaces where they appear;
- encode consent and prohibited-field constraints in fixture tests;
- test positive, no-result, restart, cancellation, validation, and storage-failure paths;
- never degrade into a random low-quality result or claim an external call that did not occur;
- keep the demo useful when optional media, storage, or external services fail.

It will remain domain-neutral and will not prescribe matching scores or profile schemas.

## Skill 3: producing-accessible-generated-product-video

Use when a product page needs generated promotional footage while cost, text fidelity, provenance, graceful failure, and motion accessibility matter.

The skill will capture the generation-to-delivery chain:

- define scene purpose, duration, cost ceiling, and retry limits before spending;
- generate and inspect still keyframes before paying to animate them;
- keep logos and wording out of generated footage, then add exact brand text in deterministic local post-production;
- produce a poster, provenance manifest, and broadly supported delivery asset;
- disclose fictional people where relevant;
- provide visible playback control and a reduced-motion still state;
- verify duration, codec, dimensions, file size, visible captions, page fallback, and accessibility behavior.

It will not name one vendor or media stack as universally required.

## Validation

Develop one skill at a time using documentation TDD:

1. Give an isolated evaluator a realistic request without the proposed skill and record the missed decisions or rationalizations.
2. Write the smallest skill that addresses observed failures.
3. Repeat the scenario with the skill available and inspect the result.
4. Close demonstrated loopholes only, then run the Codex skill validator.

Evaluation work must remain read-only or use temporary directories. It must not spend paid generation credits, mutate production systems, publish, or deploy.

## Acceptance

- All three skill folders pass `quick_validate.py`.
- Descriptions are specific enough for accurate automatic discovery.
- Instructions are project-agnostic and contain no SideSpark implementation details that should remain local.
- Each skill has a recorded failing baseline and a passing forward test.
- No existing personal skill or unrelated SideSpark file is changed.
