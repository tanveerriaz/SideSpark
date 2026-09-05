# SideSpark privacy and terms pages design

## Goal

Give the current SideSpark prototype clear, shareable privacy and terms pages, a direct contact route, and a link to the verified making-of article without implying that accounts, real bookings, or a live community already exist.

## Selected approach

Use two first-class application routes, `/privacy` and `/terms`, rendered by the existing React entry point. This keeps the pages visually consistent with SideSpark, allows direct links, and works with the existing GPTSites unknown-route fallback. A shared legal-page component will provide the brand header, update date, readable article layout, contact link, cross-links, and return link.

Static standalone HTML pages were rejected because they would duplicate the design system and navigation. Modal policies were rejected because they are harder to link, read, and reference independently.

## Public footer

The marketplace footer will appear in Live and Demo modes and contain:

- Privacy
- Terms
- Contact us at `tanveer.riaz@hotmail.com`
- How SideSpark was made, linked to `https://tanveerriaz.me/blog/sidespark-started-with-a-conversation`
- The existing 60-second pitch link

The classic guided journey will receive the same policy, contact, and making-of links so users can reach them from every primary product state.

## Privacy page

The privacy page will describe the current implementation, not a future service. It will state that:

- SideSpark is currently a prototype with no real accounts, people, bookings, messages, or notifications.
- Demo names, profiles, experiences, credits, and badges are fictional.
- Demo progress, drafts, and reservations are stored in the visitor's browser where supported and can be removed by clearing site data.
- SideSpark itself does not send those demo records to an application backend.
- The hosting provider may process ordinary request and diagnostic information under its own policies.
- Visitors should not enter sensitive or confidential information into prototype fields.
- Privacy questions and requests can be sent to the published contact address.

The page will say that the policy must change before real accounts or community data are launched.

## Terms page

The terms page will cover:

- Adults aged 18 and over only.
- Prototype status and fictional demo content.
- Free community concept and no monetary value for credits or badges.
- No professional, medical, legal, financial, employment, or safety advice.
- Personal responsibility for in-person and online interactions.
- Prohibited harmful, unlawful, harassing, deceptive, or privacy-invasive use.
- Intellectual-property ownership and permitted personal evaluation of the prototype.
- No guarantee of availability, accuracy, matches, identity checks, outcomes, or uninterrupted service.
- Liability wording expressly subject to rights that cannot be excluded by law.
- Singapore governing law and a direct contact route.

These terms are a clear prototype notice, not a substitute for review by a qualified Singapore lawyer before real-person launch.

## Interaction and accessibility

Policy links use normal anchors so they work with keyboard navigation, browser history, copied URLs, and the GPTSites fallback. Each page has one `h1`, semantic article sections, visible focus states, at least 48-pixel navigation targets, and a compact reading width. External links identify their destination and use safe new-tab attributes only where a new tab is intentional.

## Verification

Automated tests will cover direct routing, headings, current-prototype disclosures, contact address, policy cross-links, making-of URL, and return navigation. The existing full suite will cover Live, Demo, booking, host, profile, Skill Swap, Social Connect, presentation, video, and GPTSites packaging. The selected Chrome session will be used to inspect both legal pages and retest the primary journeys at desktop and mobile widths before merge and deployment.
