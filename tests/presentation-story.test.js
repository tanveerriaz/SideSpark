import { describe, expect, it } from "vitest";

import {
  SLIDE_DURATION_MS,
  STORY_BEATS,
  TOTAL_DURATION_MS,
} from "../src/presentation/story.js";

describe("SideSpark presentation story", () => {
  it("runs six ten-second beats for exactly one minute", () => {
    expect(STORY_BEATS).toHaveLength(6);
    expect(SLIDE_DURATION_MS).toBe(10_000);
    expect(STORY_BEATS.every((beat) => beat.durationMs === SLIDE_DURATION_MS)).toBe(true);
    expect(STORY_BEATS.reduce((total, beat) => total + beat.durationMs, 0)).toBe(60_000);
    expect(TOTAL_DURATION_MS).toBe(60_000);
  });

  it("opens with the hidden opportunity and closes with the SideSpark promise", () => {
    expect(STORY_BEATS[0].title).toMatch(/one desk away/i);
    expect(STORY_BEATS.at(-1).title).toBe("Take a break. Find your spark.");
  });

  it("labels every photographic beat as fictional demo storytelling", () => {
    const photographicBeats = STORY_BEATS.filter((beat) => beat.mediaType === "photo");

    expect(photographicBeats.length).toBeGreaterThan(0);
    expect(photographicBeats.every((beat) => beat.disclosure === "Fictional demo characters")).toBe(true);
  });
});
