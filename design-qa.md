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
