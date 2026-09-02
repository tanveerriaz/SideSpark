import { describe, expect, it } from "vitest";

import { getQuest } from "../src/data/quests.js";

describe("AI skill sidequests", () => {
  it("selects a structured AI challenge when the participant wants to learn AI prompting", () => {
    const quest = getQuest("skill", "coffee", {
      offers: ["presentation confidence"],
      wants: ["AI prompting"],
    });

    expect(quest).toMatchObject({
      kind: "ai-practice",
      title: "The prompt remix challenge",
      steps: expect.arrayContaining([
        expect.stringMatching(/safe fictional work task/i),
        expect.stringMatching(/goal, context, and constraints/i),
        expect.stringMatching(/swap prompts/i),
      ]),
      learningOutcome: expect.stringMatching(/specific context and constraints/i),
      safetyNote: expect.stringMatching(/confidential, personal, or sensitive/i),
    });
  });

  it("selects the AI challenge when the participant can share AI prompting", () => {
    const quest = getQuest("skill", "desk", {
      offers: [" AI PROMPTING "],
      wants: ["excel shortcuts"],
    });

    expect(quest.kind).toBe("ai-practice");
  });

  it("preserves social and non-AI skill quests", () => {
    const profile = {
      offers: ["AI prompting"],
      wants: ["excel shortcuts"],
    };

    expect(getQuest("social", "coffee", profile).title).toBe("The 30-second role remix");
    expect(
      getQuest("skill", "coffee", {
        offers: ["presentation confidence"],
        wants: ["excel shortcuts"],
      }).title,
    ).toBe("Teach it over a sip");
  });
});
