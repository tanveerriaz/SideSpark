import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const liveSite = "https://sidespark.tanveer-riaz.chatgpt.site";

describe("project README", () => {
  it("introduces SideSpark and links to the live experience", () => {
    const readme = readFileSync(resolve(process.cwd(), "README.md"), "utf8");

    expect(readme).toContain("# SideSpark");
    expect(readme).toContain(`[Try SideSpark](${liveSite})`);
    expect(readme).toContain("Skill Swap");
    expect(readme).toContain("Social Connect");
    expect(readme).toContain("same clear matching rules every time");
    expect(readme).toContain("fictional demo profiles");
    expect(readme).toContain("stays on your device");
  });
});
