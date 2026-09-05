# SideSpark Gallery Preview Design

## Goal

Give SideSpark a permanent, branded 1200×630 preview image that the hackathon gallery and social-link crawlers can load directly instead of relying on an expiring generated cover.

## Chosen direction

Use the existing `experience-sharing.png` artwork as the visual anchor. It already carries the approved SideSpark illustration language: expressive adults, shared food, mint/coral/yellow accents, and a clear sense of giving time together. Compose it into a deep-indigo social card with the SideSpark mark, product name, and the short line “Share a skill. Make a connection.”

This is preferable to:

- reusing the office-film poster, which overstates the workplace-only framing;
- using a raw page screenshot, which is harder to read in a small gallery card and can date quickly;
- relying on the gallery’s generated cover endpoint, which is the URL currently returning 404.

## Asset contract

- `public/og.png`: stable 1200×630 PNG used by `og:image` and `twitter:image`.
- `public/screenshot.jpeg`: matching 1200×630 Sites deployment thumbnail.
- The composition is deterministic and built from approved local artwork; it does not introduce stock imagery, generic AI iconography, or new claims.
- The right-side illustration must keep all three people’s faces visible at gallery-card size.
- The left-side copy stays short, high contrast, and inside a generous safe area.

## Metadata

`index.html` will include an absolute canonical URL, Open Graph title/description/image metadata, image dimensions and alt text, plus Twitter large-card metadata. Absolute URLs are required so the gallery crawler can resolve the image without guessing the deployment origin.

## Failure handling

The image is committed and served from the SideSpark origin, so it remains available across deployments. If the hackathon gallery keeps its older cached URL, the site fix is still complete but the gallery record will need a refresh or resubmission by the gallery service.

## Verification

- A regression test checks the required metadata and validates the PNG dimensions.
- The generated PNG and JPEG are inspected at their native size.
- The production build must contain both assets.
- After deployment, the live asset URLs and metadata must return 200.
- The gallery page is checked again to determine whether it refreshed its cached cover.
