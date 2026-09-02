# SideSpark Illustration Fidelity Design

## Decision

Bring the implemented landing and break-selection states up to the polish of the two approved SideSpark references without changing the existing product flow. The dark landing state follows `docs/references/sidespark-option-1.png`; the cream break journey follows `docs/references/sidespark-option-2-journey.png`.

## Visual system

- Replace the generic outline sparkle beside the wordmark with a compact multicolour radial spark mark.
- Replace the two generic intention icons with bespoke transparent illustrations: interlocking speech bubbles for Skill Swap and two friendly people with a shared spark for Social Connect.
- Add a small connected-community illustration to the activity strip so its visual storytelling matches the reference instead of relying on unrelated line icons.
- Keep functional arrows, checks, clocks, and break symbols code-native and accessible, but present the break symbols in the circular, colourful badge treatment from the journey reference.
- Tighten the mobile landing composition to match the source density: remove the extra eyebrow from the opening viewport, enlarge the illustration area, reduce excess vertical gaps, and keep the primary action visible soon after the community strip.

## Responsive and interaction behavior

The reference images govern the mobile presentation, but SideSpark remains a responsive public website. Intent cards remain side by side where they are readable and stack at 420px and below. Selecting either card still reveals the complete vertical break journey. All controls preserve their existing labels, focus indicators, 48px minimum target size, reduced-motion behavior, and deterministic end-to-end paths.

## Asset constraints

New artwork is generated as isolated transparent PNG assets with no embedded words, logos, or backgrounds. Text remains live HTML for accessibility and responsive wrapping. The supplied screenshots remain comparison references only and are not cropped into the production interface.

## Verification

Add presentation-level tests that require the brand and intention artwork to be rendered with useful alternative text, while decorative community artwork stays hidden from assistive technology. Run the complete Vitest and Sites suites, build the project, then compare browser captures against both references at 592 x 1280 plus desktop and 320px checks. The final `design-qa.md` must record the visual comparison and pass with no P0-P2 findings.
