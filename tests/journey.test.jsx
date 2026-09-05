import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/App.jsx";

describe("SideSpark journey", () => {
  beforeEach(() => window.localStorage.clear());

  async function openClassic(user) {
    await user.click(screen.getByRole("button", { name: /classic guided demo/i }));
  }

  it("reveals all four break formats after an intention is selected", async () => {
    const user = userEvent.setup();
    render(<App />);
    await openClassic(user);

    await user.click(screen.getByRole("button", { name: /social connect/i }));

    expect(screen.getByRole("button", { name: /coffee/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /walk/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lunch/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /desk break/i })).toBeInTheDocument();
  });

  it("collects a local profile after a break is chosen", async () => {
    const user = userEvent.setup();
    render(<App />);
    await openClassic(user);

    await user.click(screen.getByRole("button", { name: /social connect/i }));
    await user.click(screen.getByRole("button", { name: /coffee/i }));
    await user.click(screen.getByRole("button", { name: /find my sidekick/i }));

    expect(await screen.findByRole("heading", { name: /tell us a little about you/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^team$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /street photography/i })).toBeInTheDocument();
  });

  it("returns the viewport to the top when moving to the profile", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<App />);
    await openClassic(user);

    await user.click(screen.getByRole("button", { name: /social connect/i }));
    await user.click(screen.getByRole("button", { name: /coffee/i }));
    await user.click(screen.getByRole("button", { name: /find my sidekick/i }));

    expect(await screen.findByRole("heading", { name: /tell us a little about you/i })).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollTo.mockRestore();
  });

  it("does not reveal a stale match after starting over during matching", async () => {
    const user = userEvent.setup();
    render(<App />);
    await openClassic(user);

    await user.click(screen.getByRole("button", { name: /social connect/i }));
    await user.click(screen.getByRole("button", { name: /coffee/i }));
    await user.click(screen.getByRole("button", { name: /find my sidekick/i }));
    await user.type(await screen.findByLabelText(/first name/i), "Tanveer");
    await user.type(screen.getByLabelText(/^team$/i), "Product");
    await user.click(screen.getByRole("button", { name: /street photography/i }));
    await user.click(screen.getByRole("button", { name: /match me with a demo sidekick/i }));

    expect(screen.getByRole("heading", { name: /looking through the demo community/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /start over/i }));
    await new Promise((resolve) => window.setTimeout(resolve, 500));

    expect(screen.getByRole("heading", { name: /take a break\. find your spark/i })).toBeInTheDocument();
  });
});
