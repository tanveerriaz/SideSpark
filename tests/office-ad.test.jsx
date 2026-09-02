import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/App.jsx";

function installMotionPreference(reduced) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: reduced,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe("SideSpark office ad", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    installMotionPreference(false);
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  it("explains the ad and identifies its fictional people", () => {
    render(<App />);

    expect(
      screen.getByRole("region", { name: /see a sidespark sidequest/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/fictional characters created for this demo/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/coworkers sharing coffee, a walk, and a practical skill/i),
    ).toHaveProperty("muted", true);
  });

  it("autoplays muted and lets a person pause the ad", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    });

    const pause = screen.getByRole("button", { name: /pause office ad/i });
    await user.click(pause);

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /play office ad/i })).toBeInTheDocument();
  });

  it("keeps the poster still when reduced motion is preferred", async () => {
    installMotionPreference(true);
    render(<App />);

    await Promise.resolve();
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /play office ad/i })).toBeInTheDocument();
  });
});
