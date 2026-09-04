# SideSpark Public Experiences Marketplace Design

**Status:** Approved for implementation on 4 September 2026 through the user's “plan and implement” instruction following the gallery audit.

## Product outcome

Turn SideSpark from an office-break matching demo into a product-first public community for adults to host or join free experiences. The launch experience is Singapore-first for in-person discovery and globally accessible for online sessions. It supports one-to-one and small groups, host-selected request or instant-reserve rules, non-spendable reputation credits, and earned badges.

This implementation remains an honest frontend prototype. It must not imply that accounts, shared persistence, notifications, real attendance verification, or live inventory exist until a backend is connected.

## Approaches considered

### A. Add marketplace cards below the existing hero

Lowest implementation risk, but it preserves the audit’s main weakness: the first viewport remains a pitch instead of the product. Rejected.

### B. Product-first marketplace with the existing guided demo preserved

Recommended. Make discovery the default first screen, add complete local demo flows for joining and hosting, and keep the current Skill Swap/Social Connect matching journey behind a clearly labeled “Classic guided demo” route. This changes the product impression without discarding the existing verified experience.

### C. Signed-in application shell with simulated account infrastructure

Visually closest to a mature platform, but it would invite false assumptions about real multi-user behavior and overinvest in account chrome before a backend choice is made. Deferred until the backend phase.

## Visual contract

- `docs/references/sidespark-option-1.png` owns the core identity: deep indigo canvas, coral/mint surfaces, yellow primary actions, Fredoka display type, tactile shadows, rounded geometry, bespoke SideSpark mark, and playful spark accents.
- `docs/references/sidespark-option-2-journey.png` owns progressive journey behavior and the principle that selection reveals the next clear step.
- The HakkaHatta audit screenshot informs marketplace information architecture only. Its beige/green palette, sidebar, typography and trade dress must not be copied.
- The new desktop first screen uses a compact marketing statement beside/above a working experience grid. On mobile it becomes a single-column discovery feed with filters that wrap without horizontal overflow.

## Default user journey

```text
Discover
  -> filter or search
  -> open an experience
  -> request or reserve
  -> local demo confirmation
  -> view booking status
```

The alternate host journey is:

```text
Host a spark
  -> enter experience details
  -> choose online/in-person, one-to-one/small group, request/instant reserve
  -> preview and publish locally
  -> return to discovery with a clearly labeled device-only listing
```

The account/reputation journey is:

```text
Open demo profile
  -> see reputation credits, earned badges and next milestone
  -> understand that bookings do not award credits
  -> credits remain attendance-confirmed and non-spendable
```

## Information architecture

### Global header

- Brand button returns to Discover.
- Discover opens the marketplace.
- Host a spark opens the host form.
- Credits & badges opens the demo profile panel.
- “Demo profile” is explicit; it must not resemble real authentication.

### Discovery hero

- Promise: “Share something you know. Join something you’re curious about.”
- Short copy naming free community experiences, Singapore in-person discovery, and global online sessions.
- Two dominant actions: Find a spark and Host a spark.
- Trust row: 18+ community, free to join, attendance-confirmed credits.

### Filters

- Search by title, topic, host or neighborhood.
- Format: All, Online, In person.
- Group: All, One-to-one, Small group.
- Results update immediately and expose a clear empty state with reset action.

### Experience card

- Topic/category label.
- Title and short outcome.
- Fictional host identity, reputation credits and completed-session count.
- Date/time, online or public neighborhood, and one-to-one/group capacity.
- Request or Instant reserve rule.
- Single “View experience” action.

### Experience detail

- Full description, what happens, host trust summary, logistics, access notes and community safety cues.
- Exact in-person address remains private until acceptance; only a neighborhood is shown.
- Primary CTA adapts to the host’s rule.
- Success state distinguishes “reserved” from “request sent.”
- Reputation credits remain pending until attendance is confirmed by both people.

### Host form

- Required: title, category, description, date/time, format and participation type.
- In-person uses public neighborhood; online confirms the link comes after acceptance.
- Small groups choose capacity from 3–8. One-to-one fixes capacity at 1 guest.
- Host chooses request approval or instant reservation.
- Form errors are inline and focusable. Successful local publishing is explicit.

### Demo profile

- Fixed fictional profile with a transparent “Demo profile” label.
- Non-spendable credits with definition.
- Earned badge set and progress toward the next badge.
- Initial badges: First Spark, Connector, Skill Giver, Circle Builder, Reliable Sidekick, Welcome Spark, Island Explorer and Global Spark.
- No leaderboards or streak pressure.

## State and data

- `src/data/experiences.js` contains explicitly fictional example experiences.
- `src/lib/marketplace.js` owns filter logic, validation, local listing creation and booking status.
- `src/lib/communityStorage.js` persists only local demo listings and booking states under a versioned key, with in-memory fallback.
- The existing deterministic matching demo and its storage key remain untouched.
- No email, phone, exact address, password, payment, OAuth token or sensitive profile field is collected.

## Error and empty states

- No results: explain that no example fits the filters and offer Reset filters.
- Storage unavailable: keep the current visit working and say the change lasts only for this visit.
- Already booked: disable duplicate booking and show current status.
- Invalid host form: show a concise summary and field-level messages.
- Backend-only actions: never display a fake “verified” state or send fake notifications.

## Accessibility and responsive requirements

- Semantic header, navigation, forms, lists, dialogs/panels and status messages.
- Visible focus on every interactive element.
- Minimum 48px primary targets.
- Form controls have programmatic labels and errors.
- Filters work by keyboard and expose pressed/selected state.
- Respect reduced motion.
- No horizontal overflow at 320px or 200% zoom.
- Metadata remains at least 14px with sufficient contrast.

## Verification

- Unit tests: filtering, host validation, local experience creation and booking semantics.
- Component tests: first viewport, filter results, instant reserve, request flow, host publishing, profile badges and legacy demo entry.
- Regression suite: existing SideSpark matching, video, presentation and Sites worker tests.
- Production build and Sites artifact checks.
- Browser QA at desktop and 320px mobile, including primary flows, focus, empty state and console.
- Visual comparison against the approved SideSpark references for identity, and against the current first screen for the intended hierarchy change.

## Backend phase after this prototype

The real multi-user release will need an external identity/database service compatible with the GPTSites frontend, server-enforced authorization, experience and availability records, booking transactions, notification delivery, attendance confirmation, moderation/reporting, and an append-only reputation ledger. That phase begins only after the provider and privacy model are selected.
