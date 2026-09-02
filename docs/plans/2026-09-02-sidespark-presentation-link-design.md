# SideSpark Presentation Link Design

## Goal

Give hackathon judges and visitors a clear way to launch the finished 60-second SideSpark presentation from the public homepage.

## Approved Direction

Add a yellow `Watch 60-sec pitch` link to the site header beside the existing Community link. Use a Lucide play icon, the established Fredoka and Inter typography, SideSpark's yellow and indigo palette, tactile rounded geometry, and a minimum 48-pixel target.

The link navigates in the same tab to `/presentation.html`. It remains visually secondary to the homepage's `Find my sidekick` action and compresses cleanly at 320 pixels without obscuring the SideSpark brand.

## Alternatives Considered

- A secondary hero button would be highly visible but compete with the matching journey.
- A card near the community strip would feel contextual but be easier for judges to miss.

## Accessibility And Verification

The native anchor exposes its text and destination without JavaScript. Automated coverage will verify its accessible name and URL. Browser QA will verify desktop and 320-pixel layouts, focus visibility, navigation to the presentation, and return navigation through the presentation's SideSpark brand link.
