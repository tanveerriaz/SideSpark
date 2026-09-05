import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const siteOrigin = "https://sidespark.tanveer-riaz.chatgpt.site";
const indexUrl = resolve(process.cwd(), "index.html");
const pngUrl = resolve(process.cwd(), "public/og.png");
const jpegUrl = resolve(process.cwd(), "public/screenshot.jpeg");

describe("SideSpark social and gallery preview", () => {
  it("publishes absolute Open Graph and Twitter preview metadata", async () => {
    const html = await readFile(indexUrl, "utf8");

    expect(html).toContain(`<link rel="canonical" href="${siteOrigin}/" />`);
    expect(html).toContain(`<meta property="og:type" content="website" />`);
    expect(html).toContain(`<meta property="og:image" content="${siteOrigin}/og.png" />`);
    expect(html).toContain(`<meta property="og:image:width" content="1200" />`);
    expect(html).toContain(`<meta property="og:image:height" content="630" />`);
    expect(html).toContain(`<meta name="twitter:card" content="summary_large_image" />`);
    expect(html).toContain(`<meta name="twitter:image" content="${siteOrigin}/og.png" />`);
  });

  it("ships stable 1200 by 630 preview assets", async () => {
    const [pngStat, jpegStat] = await Promise.all([
      stat(pngUrl).catch(() => null),
      stat(jpegUrl).catch(() => null),
    ]);

    expect(pngStat, "Generate public/og.png before publishing.").not.toBeNull();
    expect(jpegStat, "Generate public/screenshot.jpeg before publishing.").not.toBeNull();

    const png = await readFile(pngUrl);
    expect(png.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);

    const jpeg = await readFile(jpegUrl);
    expect(Array.from(jpeg.subarray(0, 3))).toEqual([0xff, 0xd8, 0xff]);
  });
});
