import { describe, expect, it } from "vitest";

import { COMMUNITY } from "../src/data/community.js";
import { findBestMatch } from "../src/lib/matching.js";

describe("demo community", () => {
  it("contains only explicitly consented synthetic profiles", () => {
    expect(COMMUNITY.length).toBeGreaterThanOrEqual(8);
    for (const profile of COMMUNITY) {
      expect(profile).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          firstName: expect.any(String),
          team: expect.any(String),
          consentedForDemo: true,
        }),
      );
      expect(profile.formats.length).toBeGreaterThan(0);
      expect(profile.email).toBeUndefined();
      expect(profile.employeeId).toBeUndefined();
    }
  });
});

describe("findBestMatch", () => {
  it("prefers a cross-team social match with one shared interest", () => {
    const result = findBestMatch({
      user: {
        id: "local-user",
        team: "Product",
        interests: ["street photography"],
        offers: [],
        wants: [],
      },
      candidates: COMMUNITY,
      intent: "social",
      format: "coffee",
    });

    expect(result.candidate.id).toBe("alex-finance");
    expect(result.sharedInterests).toEqual(["street photography"]);
  });

  it("prefers a complementary two-way skill exchange", () => {
    const result = findBestMatch({
      user: {
        id: "local-user",
        team: "Product",
        interests: ["hawker food"],
        offers: ["presentation confidence"],
        wants: ["excel shortcuts"],
      },
      candidates: COMMUNITY,
      intent: "skill",
      format: "walk",
    });

    expect(result.candidate.id).toBe("alex-finance");
  });

  it("excludes unsupported, unconsented, and completed candidates", () => {
    const result = findBestMatch({
      user: {
        id: "local-user",
        team: "Product",
        interests: ["street photography"],
        offers: [],
        wants: [],
      },
      candidates: [
        { ...COMMUNITY[0], consentedForDemo: false },
        { ...COMMUNITY[1], formats: ["lunch"] },
      ],
      intent: "social",
      format: "coffee",
      completedIds: [COMMUNITY[1].id],
    });

    expect(result).toBeNull();
  });

  it("does not invent common ground for a social match", () => {
    const result = findBestMatch({
      user: {
        id: "local-user",
        team: "Product",
        interests: ["ceramics"],
        offers: [],
        wants: [],
      },
      candidates: [COMMUNITY[0]],
      intent: "social",
      format: "coffee",
    });

    expect(result).toBeNull();
  });

  it("rejects an unknown connection intention", () => {
    const result = findBestMatch({
      user: {
        id: "local-user",
        team: "Product",
        interests: ["street photography"],
        offers: [],
        wants: [],
      },
      candidates: COMMUNITY,
      intent: "surprise-me",
      format: "coffee",
    });

    expect(result).toBeNull();
  });
});
