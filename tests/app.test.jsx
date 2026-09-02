import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { App } from "../src/App.jsx";

describe("SideSpark opening screen", () => {
  it("shows the approved connection-first choices", () => {
    render(<App />);

    expect(screen.getByText("SideSpark")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /sidespark spark mark/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /take a break\. find your spark\./i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /skill swap illustration/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /social connect illustration/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /skill swap/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /social connect/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /find my sidekick/i })).toBeDisabled();
    const pitchLink = screen.getByRole("link", { name: /watch 60-sec pitch/i });
    expect(pitchLink).toHaveAttribute("href", "/presentation.html");
  });

  it("lets a person select why they want to connect", async () => {
    const user = userEvent.setup();
    render(<App />);

    const socialConnect = screen.getByRole("button", { name: /social connect/i });
    await user.click(socialConnect);

    expect(socialConnect).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: /pick your break/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /find my sidekick/i })).toBeDisabled();
  });
});
