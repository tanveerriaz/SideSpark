# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## SideSpark product contract

- The product name is **SideSpark**. It helps non-technical office workers meet coworkers, exchange practical skills, and grow their networks through short shared sidequests.
- Connection comes first. AI prompting is one optional skill topic, never the product's main category or a load-bearing dependency.
- The two entry intentions are **Skill Swap** and **Social Connect**. Break formats are Coffee, Walk, Lunch, and a 15-minute Desk Break.
- Use `docs/references/sidespark-option-1.png` as the visual source of truth: deep electric indigo, coral and mint choice cards, yellow primary actions, bold rounded typography, tactile controls, and playful spark accents.
- After either intention is selected, reveal the vertical journey behavior shown in `docs/references/sidespark-option-2-journey.png`.
- This is a responsive public website, not a simulated phone app. The selected mobile visual governs the mobile state; layouts must also adapt cleanly through tablet and desktop widths.
- The MVP uses deterministic matching against explicitly consented synthetic demo profiles. Label demo data honestly and never imply live employees, private directory access, or an AI call that did not happen.
- Store only device-local progress. Do not collect email addresses, employee IDs, photos, sensitive HR data, or transmit profile data.
- Preserve keyboard access, 48px touch targets, visible focus, reduced-motion behavior, honest no-match handling, and a complete 320px-wide experience.
- The canonical implementation plan is `docs/plans/2026-09-02-sidespark-implementation.md`.

## Visual asset boundary

- The approved screens contain no required photographic or raster illustration assets beyond the two source references retained for comparison.
- Use the chosen icon library for functional symbols such as people, conversation, coffee, walking, lunch, clocks, checks, arrows, and sparkles.
- Do not recreate decorative artwork with CSS drawings, hand-authored SVG, emoji, or text glyphs.
