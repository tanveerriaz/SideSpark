import { describe, expect, it } from "vitest";

import { EXPERIENCES } from "../src/data/experiences.js";
import {
  createBooking,
  createLocalExperience,
  filterExperiences,
  validateExperienceDraft,
} from "../src/lib/marketplace.js";

const validDraft = {
  title: "Sketch the city together",
  category: "Creative",
  description: "A relaxed hour learning to notice and sketch everyday details.",
  date: "2026-09-12",
  time: "10:00",
  format: "in-person",
  neighborhood: "Tiong Bahru",
  participation: "small-group",
  capacity: 5,
  bookingMode: "request",
  language: "English",
};

describe("experience discovery", () => {
  it("searches across experience, host, topic, and location text", () => {
    expect(filterExperiences(EXPERIENCES, { query: "photo", format: "all", group: "all" }))
      .toHaveLength(1);
    expect(filterExperiences(EXPERIENCES, { query: "marina bay", format: "all", group: "all" }))
      .toHaveLength(1);
  });

  it("filters by format and participation size", () => {
    const results = filterExperiences(EXPERIENCES, {
      query: "",
      format: "online",
      group: "one-to-one",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((experience) => experience.format === "online")).toBe(true);
    expect(results.every((experience) => experience.participation === "one-to-one")).toBe(true);
  });
});

describe("hosting an experience", () => {
  it("validates required and conditional fields", () => {
    const errors = validateExperienceDraft({ title: "", format: "in-person" });

    expect(errors.title).toMatch(/title/i);
    expect(errors.description).toMatch(/description/i);
    expect(errors.neighborhood).toMatch(/neighborhood/i);
  });

  it("does not require a neighborhood for an online experience", () => {
    expect(validateExperienceDraft(
      { ...validDraft, format: "online", neighborhood: "" },
      { today: "2026-09-04" },
    ))
      .not.toHaveProperty("neighborhood");
  });

  it("rejects a session date that has already passed", () => {
    const errors = validateExperienceDraft(
      { ...validDraft, date: "2026-09-03" },
      { today: "2026-09-04" },
    );

    expect(errors.date).toMatch(/future date/i);
  });

  it("creates an explicitly device-only local listing", () => {
    const experience = createLocalExperience(validDraft, { now: () => 1725552000000 });

    expect(experience.id).toBe("local-1725552000000");
    expect(experience.demoState).toBe("device-only");
    expect(experience.host.name).toBe("Maya");
  });
});

describe("booking semantics", () => {
  it("reserves instantly without awarding reputation credits", () => {
    const experience = EXPERIENCES.find((item) => item.bookingMode === "instant");
    const booking = createBooking({ experience, now: () => 1725552000000 });

    expect(booking.status).toBe("reserved");
    expect(booking.creditsAwarded).toBe(0);
  });

  it("creates a host-pending request without awarding reputation credits", () => {
    const experience = EXPERIENCES.find((item) => item.bookingMode === "request");
    const booking = createBooking({ experience, now: () => 1725552000000 });

    expect(booking.status).toBe("pending-host");
    expect(booking.creditsAwarded).toBe(0);
  });
});
