import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../src/App.jsx";

describe("public experiences marketplace", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => {
    vi.restoreAllMocks();
    delete window.matchMedia;
  });

  it("opens on a product-first discovery experience", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /share something you know/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /host a spark/i })).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: /search experiences/i })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getByText(/fictional community examples/i)).toBeInTheDocument();
    expect(screen.getByText(/18\+ community/i)).toBeInTheDocument();
    expect(screen.getByText(/attendance-confirmed credits/i)).toBeInTheDocument();
  });

  it("filters and resets the discovery list", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("searchbox", { name: /search experiences/i }), "photography");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: /phone photography walk/i })).toBeInTheDocument();

    await user.clear(screen.getByRole("searchbox", { name: /search experiences/i }));
    await user.click(screen.getByRole("button", { name: /^online$/i }));
    expect(screen.getByRole("button", { name: /^online$/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(3);

    await user.click(screen.getByRole("button", { name: /one-to-one/i }));
    expect(screen.getAllByRole("article")).toHaveLength(1);

    await user.type(screen.getByRole("searchbox", { name: /search experiences/i }), "does not exist");
    expect(screen.getByRole("heading", { name: /no sparks fit those filters/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /reset filters/i }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("keeps the classic guided journey available", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /classic guided demo/i }));
    expect(screen.getByRole("heading", { name: /take a break\. find your spark/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to marketplace/i })).toBeInTheDocument();
  });

  it("avoids smooth page transitions when reduced motion is requested", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /demo profile/i }));

    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" }));
  });

  it("reserves an instant experience without awarding credits", async () => {
    const user = userEvent.setup();
    render(<App />);

    const experience = screen.getByRole("article", { name: /phone photography walk/i });
    await user.click(within(experience).getByRole("button", { name: /view experience/i }));
    expect(screen.getByRole("heading", { name: /phone photography walk/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /reserve my place/i }));

    expect(screen.getByRole("heading", { name: /you’re reserved/i })).toBeInTheDocument();
    expect(screen.getByText(/credits unlock only after both people confirm attendance/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reserved/i })).toBeDisabled();
  });

  it("sends a host-approval request", async () => {
    const user = userEvent.setup();
    render(<App />);

    const experience = screen.getByRole("article", { name: /speak confidently/i });
    await user.click(within(experience).getByRole("button", { name: /view experience/i }));
    await user.click(screen.getByRole("button", { name: /request to join/i }));

    expect(screen.getByRole("heading", { name: /request sent to the host/i })).toBeInTheDocument();
    expect(screen.getByText(/credits unlock only after both people confirm attendance/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /request pending/i })).toBeDisabled();
  });

  it("shows useful validation when a host draft is incomplete", async () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /host a spark/i }));
    expect(screen.getByRole("heading", { name: /host a free experience/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /publish local draft/i }));

    expect(screen.getByText(/add a title for the experience/i)).toBeInTheDocument();
    expect(screen.getByText(/add a description of at least 20 characters/i)).toBeInTheDocument();
    const errorSummary = screen.getByRole("alert");
    expect(errorSummary).toHaveTextContent(/check the highlighted fields/i);
    expect(errorSummary).toHaveFocus();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "center" });
    expect(screen.getByLabelText(/^date$/i)).toHaveAccessibleDescription(/choose a date/i);
    expect(screen.getByLabelText(/^time$/i)).toHaveAccessibleDescription(/choose a time/i);
    delete Element.prototype.scrollIntoView;
  });

  it("adapts host fields for online and one-to-one experiences", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /host a spark/i }));
    expect(screen.getByLabelText(/public neighborhood/i)).toBeInTheDocument();
    await user.click(screen.getByLabelText(/^online$/i));
    expect(screen.queryByLabelText(/public neighborhood/i)).not.toBeInTheDocument();
    await user.click(screen.getByLabelText(/one-to-one/i));
    expect(screen.getByLabelText(/guest capacity/i)).toHaveValue(1);
    expect(screen.getByLabelText(/guest capacity/i)).toBeDisabled();
  });

  it("publishes a valid device-only experience to discovery", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /host a spark/i }));
    await user.type(screen.getByLabelText(/^title$/i), "Sketch the city together");
    await user.selectOptions(screen.getByLabelText(/category/i), "Creative");
    await user.type(screen.getByLabelText(/what will people do/i), "A relaxed hour learning to notice and sketch everyday details.");
    await user.type(screen.getByLabelText(/^date$/i), "2026-09-20");
    await user.type(screen.getByLabelText(/^time$/i), "10:00");
    await user.type(screen.getByLabelText(/public neighborhood/i), "Tiong Bahru");
    await user.click(screen.getByRole("button", { name: /publish local draft/i }));

    expect(screen.getByRole("heading", { name: /experiences you can actually picture joining/i })).toBeInTheDocument();
    const draft = screen.getByRole("article", { name: /sketch the city together/i });
    expect(within(draft).getByText(/your device-only draft/i)).toBeInTheDocument();
  });

  it("explains non-spendable credits and all badge milestones", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /demo profile/i }));
    expect(screen.getByRole("heading", { name: /maya’s community profile/i })).toBeInTheDocument();
    expect(screen.getByText(/110 reputation credits/i)).toBeInTheDocument();
    expect(screen.getByText(/non-spendable/i)).toBeInTheDocument();
    expect(screen.getByText(/^first spark$/i)).toBeInTheDocument();
    expect(screen.getByText(/^connector$/i)).toBeInTheDocument();
    expect(screen.getByText(/2 of 3 peers/i)).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /badge collection/i })).toHaveTextContent(
      /first spark.*connector.*skill giver.*circle builder.*reliable sidekick.*welcome spark.*island explorer.*global spark/i,
    );
    expect(screen.queryByText(/leaderboard/i)).not.toBeInTheDocument();
  });
});
