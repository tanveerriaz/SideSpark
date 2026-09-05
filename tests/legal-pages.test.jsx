import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "../src/App.jsx";

const MAKING_OF_URL = "https://tanveerriaz.me/blog/sidespark-started-with-a-conversation";

describe("SideSpark policy pages and public footer", () => {
  it("serves a truthful privacy page at a direct route", () => {
    render(<App initialPath="/privacy/" />);

    expect(screen.getByRole("heading", { name: "Privacy", level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/sidespark is currently a prototype/i)).toBeInTheDocument();
    expect(screen.getByText(/progress, draft experiences, and reservations are stored in your browser/i)).toBeInTheDocument();
    expect(screen.getByText(/does not send those demo records to an application backend/i)).toBeInTheDocument();
    expect(screen.getByText(/hosting service may process standard technical data/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact tanveer about privacy/i })).toHaveAttribute(
      "href",
      "mailto:tanveer.riaz@hotmail.com",
    );
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms/");
    expect(screen.getAllByRole("link", { name: /back to sidespark/i })[0]).toHaveAttribute("href", "/");
  });

  it("serves prototype terms at a direct route", () => {
    render(<App initialPath="/terms" />);

    expect(screen.getByRole("heading", { name: "Terms", level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/you must be 18 or older/i)).toBeInTheDocument();
    expect(screen.getByText(/names, profiles and experiences in demo mode are fictional/i)).toBeInTheDocument();
    expect(screen.getByText(/credits and badges have no monetary value/i)).toBeInTheDocument();
    expect(screen.getByText(/medical, legal, financial, employment or safety advice/i)).toBeInTheDocument();
    expect(screen.getByText(/governed by the laws of singapore/i)).toBeInTheDocument();
    expect(screen.getByText(/nothing in these terms excludes rights or liability that the law does not allow/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy/");
  });

  it("links every public trust destination from the live footer", () => {
    render(<App />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy/");
    expect(within(footer).getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms/");
    expect(within(footer).getByRole("link", { name: /contact us/i })).toHaveAttribute(
      "href",
      "mailto:tanveer.riaz@hotmail.com",
    );
    const makingOf = within(footer).getByRole("link", { name: /how sidespark was made/i });
    expect(makingOf).toHaveAttribute("href", MAKING_OF_URL);
    expect(makingOf).toHaveAttribute("target", "_blank");
    expect(makingOf).toHaveAttribute("rel", "noopener noreferrer");
    expect(within(footer).getByRole("link", { name: /watch the original 60-sec pitch/i })).toHaveAttribute(
      "href",
      "/presentation.html",
    );
  });
});
