import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);

const manifestUrl = new URL("../src/assets/video/manifest.json", import.meta.url);
const videoUrl = new URL("../src/assets/video/sidespark-office-ad.mp4", import.meta.url);
const posterUrl = new URL("../src/assets/video/sidespark-office-ad-poster.jpg", import.meta.url);

test("the office ad has truthful generation metadata", async () => {
  const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));

  assert.equal(manifest.durationSeconds, 18);
  assert.equal(manifest.fictionalPeople, true);
  assert.equal(manifest.imageModel, "fal-ai/bria/text-to-image/fast");
  assert.equal(
    manifest.videoModel,
    "fal-ai/minimax/hailuo-02-fast/image-to-video",
  );
  assert.equal(manifest.scenes.length, 3);
});

test("the rendered office ad and poster are present", async () => {
  const [video, poster] = await Promise.all([
    stat(videoUrl).catch(() => null),
    stat(posterUrl).catch(() => null),
  ]);

  assert.ok(video, "Run `npm run render:video` to create the office ad MP4.");
  assert.ok(poster, "Run `npm run render:video` to create the office ad poster.");
  assert.ok(video.size > 100_000, "The office ad MP4 is unexpectedly small.");
  assert.ok(poster.size > 10_000, "The office ad poster is unexpectedly small.");
});

test("the rendered office ad contains its visible captions", async () => {
  await assert.doesNotReject(
    execFileAsync("swift", [
      fileURLToPath(new URL("./video-text-ocr.swift", import.meta.url)),
      fileURLToPath(videoUrl),
    ]),
  );
});
