import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { App } from "../src/App.jsx";

describe("SideSpark journey", () => {
  beforeEach(() => window.localStorage.clear());

  it("reveals all four break formats after an intention is selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /social connect/i }));

    expect(screen.getByRole("button", { name: /coffee/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /walk/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lunch/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /desk break/i })).toBeInTheDocument();
  });

  it("collects a local profile after a break is chosen", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /social connect/i }));
    await user.click(screen.getByRole("button", { name: /coffee/i }));
    await user.click(screen.getByRole("button", { name: /find my sidekick/i }));

    expect(await screen.findByRole("heading", { name: /tell us a little about you/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^team$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /street photography/i })).toBeInTheDocument();
  });
});
