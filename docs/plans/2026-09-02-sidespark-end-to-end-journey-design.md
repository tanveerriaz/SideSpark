# SideSpark End-to-End Journey Design

**Approved:** 2026-09-02

## Decision

Both SideSpark intentions must lead from the landing choice to a completed, locally saved Spark Card. The MVP may use fictional profiles, but every fictional person and community activity surface must be labelled as demo data. The user's answers are entered during the journey and are never presented as pre-submitted employee information.

Use one expanding, single-page journey. Completing a step reveals the next section below it, preserving the visual momentum of `docs/references/sidespark-option-2-journey.png` while retaining the deep-indigo, coral, mint, and yellow visual language of `docs/references/sidespark-option-1.png`.

## Shared Journey

1. Choose **Skill Swap** or **Social Connect**.
2. Choose Coffee, Walk, Lunch, or a 15-minute Desk Break.
3. Complete the smallest useful local profile.
4. Explicitly ask SideSpark to find a demo sidekick.
5. See a short matching state followed by a clearly labelled demo match.
6. Review why the match works and the assigned sidequest.
7. Mark the demo sidequest complete and optionally save a short takeaway.
8. Receive a Spark Card and see the new connection on the demo community map.

The user can go back without losing earlier choices or start over from any later state.

## Social Connect Branch

The user enters a first name, team, and up to three interests. SideSpark prefers a consented fictional coworker from another team with exactly one shared interest and one worthwhile difference to discover.

The match reveal names the demo sidekick, team, shared interest, and discovery angle. The sidequest is a short conversation prompt suited to the selected break. Completion saves the person, format, quest, date, and optional takeaway locally.

## Skill Swap Branch

The user enters a first name, team, one skill to share, one skill to learn, and optional interests. SideSpark prefers a consented fictional coworker with complementary offered and wanted skills; cross-team variety is secondary.

The match reveal explains the two-way exchange. The sidequest asks one person to demonstrate a useful technique and the learner to try or explain it back. Completion saves the technique, format, sidekick, date, and optional takeaway locally.

## Honest Recovery

If no fictional candidate clears the matching threshold, show **No spark yet — your next sidekick may not have joined this demo community.** Offer **Try another break**, **Change my choices**, and **Bring a buddy**. Never fabricate a low-quality match or add a map connection.

If local storage is unavailable, continue in memory and explain that the Spark Card will last for this visit only.

## Data and Privacy

- Matching is deterministic and uses explicitly consented synthetic fixtures.
- User input and completed Spark Cards stay on the device.
- No accounts, company directory, email address, employee ID, photo, sensitive HR field, network submission, or live AI call is used.
- The UI says **Demo sidekick** and **Demo community map** anywhere a fictional profile or aggregate appears.

## Accessibility and Responsive Behaviour

The complete journey must work at 320px, 390px, tablet, and desktop widths. It must retain 48px touch targets, keyboard navigation, visible focus, useful form labels and errors, reduced-motion behaviour, and no horizontal overflow.

## Acceptance

- Both intentions reach a completed Spark Card.
- The two branches ask different questions, apply different matching priorities, and assign different quest types.
- The user can recover from validation errors, no match, and storage failure.
- No fictional activity is presented as live employee activity.
- Refreshing the page restores only the allowed device-local progress.

Implementation follows `docs/plans/2026-09-02-sidespark-implementation.md`.
