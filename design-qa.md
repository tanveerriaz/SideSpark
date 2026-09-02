# SideSpark Design QA

- Source visual truth: `docs/references/sidespark-option-1.png`
- Interaction reference: `docs/references/sidespark-option-2-journey.png`
- Landing evidence: `artifacts/design-qa/landing-592x1280.png`
- Journey evidence: `artifacts/design-qa/journey-592x1280.png`
- Combined comparisons: `artifacts/design-qa/landing-comparison.png` and `artifacts/design-qa/journey-comparison.png`
- Browser viewport override: 592 by 1280 CSS pixels
- Implementation capture pixels: 577 by 1170 after the in-app browser chrome and vertical scrollbar are excluded
- Exact comparison normalization: each source image was scaled and cropped to the same 577 by 1170 visible area before being placed beside the implementation capture
- States: unselected landing; Social Connect with Coffee selected; complete Skill Swap and Social Connect journeys

## Final Findings

No actionable P0, P1, or P2 differences remain.

- Brand and illustration fidelity: the production UI now uses purpose-sized transparent artwork for the multicolour spark mark, Skill Swap speech bubbles, Social Connect pair, and community chain. Live text remains HTML and functional controls continue to use the icon library.
- Type, colour, and hierarchy: the deep indigo shell, coral and mint choice cards, yellow action, Fredoka display type, and compact community strip preserve the approved landing composition.
- Journey fidelity: selecting either intention reveals a cream step panel with tactile white break cards, coloured badges, a dotted route, durations, and a visible selected state. The responsive site retains its dark shell instead of imitating a phone frame.
- Honest states: the opening action is intentionally dimmed until an intention and break format are chosen. The activity count is labelled as demo data, and the privacy note states that profile data remains on-device.
- Responsive behavior: 320px and 1280px browser checks showed no horizontal overflow. Every measured button and link met the 48px minimum target size.
- Interaction and accessibility: both journeys were completed through profile entry, deterministic matching, quest, reflection, Spark Card, and community map. The no-match recovery and buddy route are covered by tests. Intentions and formats expose pressed states; focus and reduced-motion handling remain present.
- Runtime: the in-app browser console showed no application errors. The landing video autoplays muted when permitted, remains still for reduced-motion preference, includes a play/pause control, and labels its fictional people.

## Comparison History

1. P1: generic outline artwork did not carry the bespoke character of the approved references. Replaced it with dedicated transparent brand and intention artwork, then re-compared the landing state.
2. P1: advancing from the lower landing page could leave the next step partially off-screen. Added top-of-step scrolling to every stage transition and covered the behavior with a regression test.
3. P1: starting over during the matching delay could reveal a stale match. The pending transition is now cancelled on restart and unmount, with a regression test.
4. P2: the header clipped at 320px and the opening action fell below the intended mobile rhythm. Tightened the narrow header and mobile spacing; the post-fix checks show full-width fit and compliant controls.
5. P2: the optional takeaway allowed more text than the agreed local Spark Card contract. Reduced it to 120 characters and added a test.
6. Final pass: reviewed the landing and selected journey in combined source-versus-implementation inputs and found no remaining P0-P2 issue.

## Focused Evidence

The primary intention cards and the break-selection panel were checked as the two decision-heavy regions. Separate 320px and desktop captures verified that their responsive changes did not introduce clipping, undersized controls, or horizontal scrolling.

final result: passed

---

# Homepage Presentation Link Design QA

- Source visual truth: `docs/references/sidespark-option-1.png`
- Desktop implementation evidence: `qa/sidespark-home-presentation-link-desktop.png`
- Mobile implementation evidence: `qa/sidespark-home-presentation-link-mobile.png`
- Tested CSS viewports: 1440 by 900 and 320 by 720
- Source pixels: 853 by 1844
- Implementation screenshot pixels: 1440 by 210 desktop header crop and 320 by 220 mobile header crop
- Density normalization: browser captures use one screenshot pixel per CSS pixel. Focused header crops were compared against the source's header and opening hero at their rendered widths.
- State: homepage at rest, presentation link visible, plus complete homepage-to-presentation-to-home navigation

## Findings

No actionable P0, P1, or P2 difference remains.

- Typography: the link uses the established Fredoka display face and remains readable at both tested widths. The original brand and hero hierarchy are unchanged.
- Spacing and layout: desktop keeps the Community and presentation links on one balanced header row. At 320 pixels the navigation wraps into a deliberate second row, with both links fully inside the 18-pixel page inset.
- Colors and tokens: the new pill uses the approved yellow and deep-indigo pairing, existing control radius, and tactile press shadow.
- Image quality: this header addition introduces no raster assets; existing source imagery and icon treatment are unchanged.
- Copy and content: `Watch 60-sec pitch` is direct and specific for hackathon judges without replacing the connection-first product message.
- Interaction and accessibility: the native anchor reaches `/presentation.html` in the same tab, the presentation's SideSpark home link returns to `/`, its accessible name remains `Watch 60-sec pitch` at every breakpoint, and the hit target measures 48 pixels high. Browser console warnings and errors: none.

## Comparison History

- Pass 1, P2 fixed: at 320 pixels, the combined Community and pitch links measured about 301 pixels inside a 284-pixel row, clipping 16 pixels from the Community link. The narrow breakpoint now visually shortens the pitch copy to `60-sec pitch` while preserving the full accessible name.
- Pass 2: after integrating the latest production homepage, remeasurement placed Community at x 48.3 and the pitch link at x 148.1 to 287 inside the 320-pixel viewport. Both links are fully visible, retain 48-pixel targets, and produce no horizontal overflow.

## Full-View And Focused Evidence

The source opening screen and both implementation captures were reviewed together. The header crops were used as the focused region because the change does not alter cards, community activity, or the primary matching action. No additional content-region crop was needed.

final result: passed

---

# SideSpark 60-Second Presentation Design QA

- Source visual truth: `docs/references/sidespark-option-1.png`
- Journey reference: `docs/references/sidespark-option-2-journey.png`
- Desktop implementation evidence: `qa/sidespark-presentation-desktop.png`
- Mobile implementation evidence: `qa/sidespark-presentation-mobile.png`
- Tested viewports: 1440 by 900 and 320 by 720 CSS pixels
- Source pixels: 853 by 1844 for each reference
- Implementation screenshot pixels: 1440 by 900 desktop and 320 by 720 mobile
- State: all six story beats inspected; focused comparison states were intention selection, journey reveal, and final proof
- Normalization: the portrait references were treated as the visual-language and component-anatomy source of truth, then deliberately composed inside a timed landscape presentation. Comparison used matched on-screen width and state rather than forcing a distorted one-to-one crop.

## Findings

No actionable P0, P1, or P2 difference remains.

- Typography: Fredoka preserves the bold rounded product voice while Inter keeps supporting copy compact and readable. Display copy remains legible without clipping at both tested viewports.
- Layout and spacing: the desktop frame balances copy and visual evidence without dead zones. At 320 pixels, all six beats fit inside the viewport with no horizontal or vertical overflow.
- Color and component fidelity: electric indigo, coral, mint, yellow, cream, heavy rounded corners, and tactile dark offsets match the approved SideSpark language. The Skill Swap, Social Connect, and break-format cards retain the hierarchy shown in the references.
- Image quality: the existing coffee, walking, and desk-side skill-swap keyframes are used at suitable crops. Product screenshots remain crisp and are not stretched.
- Copy and storyline: the six ten-second beats move from hidden opportunity, to workplace friction, to two clear intentions, to break formats, to a deterministic synthetic-demo match, and finally to the privacy and connection payoff. AI prompting is not positioned as the product category.
- Icons: functional symbols come from Lucide. No emoji, CSS illustration, hand-authored SVG, or placeholder art is used.
- Interaction: autoplay, pause, replay, previous, next, Arrow Left, Arrow Right, and Space all work. The end state reports `1:00 / 1:00` and replay returns to story one.
- Accessibility: the progress rail exposes a labelled progressbar, playback controls have accessible names, controls remain at least 48 by 48 CSS pixels, focus remains visible, and reduced-motion mode keeps manual controls available.

## Comparison History

- Pass 1, P2 fixed: mobile navigation controls measured 46 pixels; all controls now enforce a minimum 48-pixel target and remeasured at 48, 52, and 48 pixels.
- Pass 2, P2 fixed: sequential exit-before-enter animation could make fast manual navigation appear to skip visual beats; synchronized transitions and explicit grid rows now update the visual immediately.
- Pass 3, P2 fixed: the mobile finale initially hid too much of the product screen; the final layout now keeps the product capture and both privacy proof cards visible without overflow.
- Pass 4: the two source references and the final desktop and mobile screenshots were reviewed together. No remaining visual mismatch rose above optional polish.

## Focused Region Evidence

- Intention choice: card proportions, brand colors, title hierarchy, tactile shadows, and the reference-screen crop were compared at desktop width.
- Journey reveal: break tiles, selected-state emphasis, vertical-flow cues, and the portrait reference crop were compared at 320 pixels.
- Match and payoff: synthetic-demo labelling, deterministic-match language, device-local proof, and the final responsive product capture were checked independently.

final result: passed
