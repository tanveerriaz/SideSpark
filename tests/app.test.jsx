import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { App } from "../src/App.jsx";

describe("SideSpark classic guided demo", () => {
  it("shows the approved connection-first choices", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /explore demo mode/i }));
    await user.click(screen.getByRole("button", { name: /classic guided demo/i }));

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
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(within(footer).getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
    expect(within(footer).getByRole("link", { name: /contact us/i })).toHaveAttribute(
      "href",
      "mailto:tanveer.riaz@hotmail.com",
    );
  });

  it("lets a person select why they want to connect", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /explore demo mode/i }));
    await user.click(screen.getByRole("button", { name: /classic guided demo/i }));

    const socialConnect = screen.getByRole("button", { name: /social connect/i });
    await user.click(socialConnect);

    expect(socialConnect).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: /pick your break/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /find my sidekick/i })).toBeDisabled();
  });
});
