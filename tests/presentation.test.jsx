import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Presentation } from "../src/presentation/Presentation.jsx";

afterEach(() => {
  vi.useRealTimers();
});

describe("SideSpark presentation controls", () => {
  it("offers manual controls and keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Presentation autoStart={false} />);

    expect(
      screen.getByRole("main", { name: /sidespark 60-second presentation/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Story 1 of 6");
    expect(screen.getByRole("heading", { name: /one desk away/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next story/i }));
    expect(screen.getByRole("status")).toHaveTextContent("Story 2 of 6");

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByRole("status")).toHaveTextContent("Story 3 of 6");

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByRole("status")).toHaveTextContent("Story 2 of 6");

    await user.click(screen.getByRole("button", { name: /^play presentation$/i }));
    expect(screen.getByRole("button", { name: /^pause presentation$/i })).toBeInTheDocument();
  });

  it("finishes after exactly six timed beats and can replay", () => {
    vi.useFakeTimers();
    render(<Presentation />);

    for (let beat = 2; beat <= 6; beat += 1) {
      act(() => vi.advanceTimersByTime(10_000));
      expect(screen.getByRole("status")).toHaveTextContent(`Story ${beat} of 6`);
    }

    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByRole("status")).toHaveTextContent(/presentation complete/i);

    fireEvent.click(screen.getByRole("button", { name: /replay presentation/i }));
    expect(screen.getByRole("status")).toHaveTextContent("Story 1 of 6");
  });
});
