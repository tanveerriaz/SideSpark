# SideSpark 60-Second HTML Presentation Design

**Status:** Approved on 2026-09-02

## Communication job

By the end, hackathon judges and the wider audience should understand and remember that SideSpark turns an ordinary work break into a useful coworker connection, because the complete journey is simple, playful, and honest about how the demo works.

## Creative direction

Create a cinematic, self-running HTML presentation with six full-screen story beats lasting ten seconds each. Use the approved SideSpark visual language: deep electric indigo, coral, mint, yellow, Fredoka and Inter typography, tactile shapes, and the existing fictional office-life keyframes. The presentation should feel like a lively product trailer rather than a conventional bullet-point deck.

The sequence must remain understandable without narration. Short on-screen statements, product visuals, and deliberate motion carry the story. Motion should create pace and focus, not decoration everywhere.

## Sixty-second storyline

1. **The hidden opportunity:** “The coworker who could change your day may be one desk away.”
2. **The friction:** Busy workdays narrow workplace circles and leave practical knowledge trapped inside teams.
3. **The invitation:** Choose Skill Swap or Social Connect.
4. **The small commitment:** Pick Coffee, Walk, Lunch, or a 15-minute Desk Break.
5. **The connection:** SideSpark finds one thing in common and one thing worth discovering, then provides a guided sidequest.
6. **The payoff:** A completed quest becomes a locally saved Spark Card and one visible community connection. Close on “Take a break. Find your spark.”

## Presentation behavior

- Add an isolated `/presentation.html` entry point so the existing product route stays unchanged.
- Auto-play once loaded and complete the main sequence in exactly 60 seconds.
- Provide visible pause/play and replay controls, plus previous/next keyboard and button navigation.
- Show a persistent progress treatment that makes the remaining sequence legible without exposing production notes.
- Pause auto-advance when the browser tab is hidden.
- Respect `prefers-reduced-motion`; replace travel, scaling, and parallax with short opacity changes while keeping manual controls available.
- Support touch, keyboard, 320px mobile, tablet, desktop, and full-screen presentation widths.

## Visual composition

- Use each story beat as one strong composition rather than a dashboard of small cards.
- Alternate between photographic office-life scenes, oversized kinetic type, and close product-interface crops.
- Reuse the three approved fictional office keyframes once each.
- Use the approved SideSpark reference screens only where they explain the choice and journey; crop them deliberately and retain their original proportions.
- Use Lucide for functional controls and symbols. Do not create decorative art with CSS, inline SVG, emoji, or text glyphs.
- Keep the fictional-demo disclosure visible whenever a photographic scene or sample match could be mistaken for live employee data.

## Content boundaries

- Do not claim live employees, company-directory access, AI matching, or measured adoption.
- Describe matching as deterministic and based on explicitly consented synthetic demo profiles.
- Keep AI prompting as one optional skill topic, not the core product.
- State that progress and Spark Cards stay on the device.

## Verification

- Unit-test the six-beat order, exact 60-second duration, pause/replay behavior, keyboard navigation, and demo disclosure.
- Verify the production build and existing Sites worker contract.
- Review the presentation in the local in-app browser at desktop and 320px widths.
- Check reduced motion, focus visibility, readable crops, text wrapping, asset loading, and absence of horizontal overflow.
