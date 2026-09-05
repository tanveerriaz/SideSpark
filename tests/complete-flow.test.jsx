import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { App } from "../src/App.jsx";
import { COMMUNITY } from "../src/data/community.js";

async function beginJourney(user, intent, format) {
  await user.click(screen.getByRole("button", { name: /explore demo mode/i }));
  await user.click(screen.getByRole("button", { name: /classic guided demo/i }));
  await user.click(screen.getByRole("button", { name: intent }));
  await user.click(screen.getByRole("button", { name: format }));
  await user.click(screen.getByRole("button", { name: /find my sidekick/i }));
  await user.type(await screen.findByLabelText(/first name/i), "Tanveer");
  await user.type(screen.getByLabelText(/^team$/i), "Product");
}

describe("complete SideSpark journeys", () => {
  beforeEach(() => window.localStorage.clear());

  it("completes Social Connect from interest to Spark Card", async () => {
    const user = userEvent.setup();
    render(<App />);

    await beginJourney(user, /social connect/i, /coffee/i);
    await user.click(screen.getByRole("button", { name: /street photography/i }));
    await user.click(screen.getByRole("button", { name: /match me with a demo sidekick/i }));

    expect(await screen.findByRole("heading", { name: /meet alex/i })).toBeInTheDocument();
    expect(screen.getByText(/demo sidekick/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /start this sidequest/i }));
    await user.click(screen.getByRole("button", { name: /we did it/i }));
    expect(screen.getByLabelText(/takeaway/i)).toHaveAttribute("maxlength", "120");
    await user.type(screen.getByLabelText(/takeaway/i), "Finance has a useful view of product trade-offs.");
    await user.click(screen.getByRole("button", { name: /save my spark card/i }));

    expect(screen.getByRole("heading", { name: /your spark card/i })).toBeInTheDocument();
    expect(screen.getByText(/finance has a useful view/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /demo community map/i })).toBeInTheDocument();
  });

  it("completes Skill Swap with a complementary exchange", async () => {
    const user = userEvent.setup();
    render(<App />);

    await beginJourney(user, /skill swap/i, /walk/i);
    await user.type(screen.getByLabelText(/skill you can share/i), "Presentation confidence");
    await user.type(screen.getByLabelText(/skill you want to learn/i), "Excel shortcuts");
    await user.click(screen.getByRole("button", { name: /match me with a demo sidekick/i }));

    expect(await screen.findByRole("heading", { name: /meet alex/i })).toBeInTheDocument();
    expect(screen.getByText(/excel shortcuts/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /start this sidequest/i }));
    await user.click(screen.getByRole("button", { name: /we did it/i }));
    await user.click(screen.getByRole("button", { name: /save my spark card/i }));

    expect(screen.getByRole("heading", { name: /your spark card/i })).toBeInTheDocument();
    expect(screen.getByText(/skill swap/i)).toBeInTheDocument();
  });

  it("turns an AI prompting Skill Swap into a structured learning challenge", async () => {
    const user = userEvent.setup();
    render(<App />);

    await beginJourney(user, /skill swap/i, /coffee/i);
    await user.type(screen.getByLabelText(/skill you can share/i), "Presentation confidence");
    await user.type(screen.getByLabelText(/skill you want to learn/i), "AI prompting");
    expect(screen.getByText(/no email, employee ID, directory, or AI call/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /match me with a demo sidekick/i }));

    expect(await screen.findByRole("heading", { name: /meet priya/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /start this sidequest/i }));

    const challenge = screen.getByRole("region", { name: /the prompt remix challenge/i });
    expect(within(challenge).getAllByRole("listitem")).toHaveLength(3);
    expect(within(challenge).getByText(/specific context and constraints make a prompt more useful/i)).toBeInTheDocument();
    expect(within(challenge).getByText(/do not enter confidential, personal, or sensitive work information/i)).toBeInTheDocument();
  });

  it("offers useful recovery actions when every suitable demo match is complete", async () => {
    window.localStorage.setItem(
      "sidespark-demo-progress-v1",
      JSON.stringify({ completedIds: COMMUNITY.map((profile) => profile.id), cards: [] }),
    );
    const user = userEvent.setup();
    render(<App />);

    await beginJourney(user, /social connect/i, /coffee/i);
    await user.click(screen.getByRole("button", { name: /street photography/i }));
    await user.click(screen.getByRole("button", { name: /match me with a demo sidekick/i }));

    expect(screen.getByRole("heading", { name: /no spark yet/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try another break/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /change what i want/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /bring a buddy/i })).toBeInTheDocument();
  });
});
