# SideSpark human visual marketplace design

## Goal

Restore the human illustration language from the approved SideSpark screens while making the truth of the marketplace obvious. The main experience represents the future real community and contains no fictional people. Synthetic profiles and sessions remain available only in a clearly labelled Demo mode.

## Visual source of truth

- `docs/references/sidespark-option-1.png` owns the mobile opening hierarchy, indigo field, coral and mint panels, face-led Social Connect art, Skill Swap puzzle art, community chain, yellow primary action and playful spark marks.
- `docs/references/sidespark-option-2-journey.png` owns the cream journey state, hand-drawn people, orange/blue/yellow activity medallions, dotted route, tactile white cards and compact community count.
- Desktop will not imitate a phone. It will keep the same visual ingredients in a wider editorial layout with image-led panels and a clear marketplace section.

## Recommended direction

Use a hybrid illustration system.

1. Reuse the approved `skill-swap.png`, `social-connect.png`, `community-chain.png`, `sidespark-mark.png` and `spark-accent.png` assets in visible, purposeful slots.
2. Add a small set of transparent, purpose-sized illustrations in the same flat hand-drawn language for creative outings, online learning, food sharing and conversation.
3. Keep dates, places, group size and navigation on Lucide icons. Those icons explain controls; they do not carry the brand.
4. Use illustrations as scenes, not profile evidence. A real host may later add a consented photo or keep an illustrated avatar while SideSpark verifies their account privately.

## Product states

### Live community, default

- Header shows `Live community` as the selected mode and offers `Demo mode` as an explicit switch.
- Hero keeps the public promise: share something useful, join something curious.
- Two large illustrated action panels use the approved Skill Swap and Social Connect assets to frame `Host something` and `Find something`.
- The marketplace does not show fictional cards. It says: `No live experiences are listed yet. We’re inviting the first Singapore hosts now.`
- Primary actions are `Become a founding host` and `Explore demo mode`.
- The founding-host action explains what will be needed for the real launch. It does not collect or transmit personal data in this prototype.

### Demo mode

- A persistent yellow notice says: `Demo mode. Every name, profile and experience below is fictional. Nothing here connects you to a real person.`
- The six current example experiences, booking states, host draft and reputation profile remain fully interactive.
- Navigation labels become `Demo experiences`, `Demo host` and `Demo profile` so the state cannot be mistaken for a live marketplace.
- Returning to Live community clears the selected demo view but does not erase device-local demo progress.

## Marketplace card anatomy

- A 3:2 visual scene leads each card.
- The scene is paired with a plain category label, title, one-sentence outcome, date, place, group size and join rule.
- Host rows remain visibly fictional in Demo mode. No portrait or name should look like proof of a real account.
- Cards keep the tactile SideSpark outline and offset shadow, but spacing is lighter than the current text-heavy grid.

## Copy rules

- Lead with a concrete action or outcome.
- Remove abstract phrases that could belong to any community product.
- Keep labels short: `Host something`, `Find something`, `See demo experiences`.
- State the limitation once in Live community and persistently in Demo mode.
- Do not use fake counts, testimonials or urgency.

## Responsive behavior

- At 320px, the two illustrated action panels stack and remain visible within the opening journey. Mode controls wrap without clipping and all targets remain at least 48px.
- At tablet width, the panels sit side by side and the live-community state follows immediately below.
- At desktop width, hero copy and the two-panel visual occupy the opening viewport; the marketplace state begins before the fold.
- Artwork uses object containment, stable aspect ratios and purpose-sized raster files. It is never stretched or used as a full-page screenshot.

## Accessibility and motion

- Every meaningful illustration has concise alternative text; decorative spark marks use empty alternative text.
- Demo mode is announced in text and not only by color.
- Keyboard focus, reduced-motion behavior, 48px targets and 320px overflow checks remain release requirements.
- Mode changes move focus to the new state heading and use reduced-motion-safe scrolling.

## Testing and verification

- Add behavior tests proving Live community is the default and contains no fictional people or experiences.
- Add tests for entering and leaving Demo mode, its persistent disclosure, and the existing six-card journey.
- Keep all booking, host-form, reputation and classic-journey tests passing inside Demo mode.
- Compare the approved references and the implementation in the same desktop and 320px inputs. Fix every P0, P1 and P2 mismatch before a release.

## Non-goals for this visual pass

- No real account creation, identity verification or shared booking backend.
- No copied names, photos or profiles from the hackathon gallery or social networks.
- No claim that founding hosts or live experiences already exist.
