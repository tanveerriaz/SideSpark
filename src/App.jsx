import { useState } from "react";
import {
  ArrowRight,
  Check,
  CirclePlay,
  MessagesSquare,
  Network,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";

const INTENTS = [
  {
    id: "skill",
    label: "Skill Swap",
    description: "Share what you know. Learn something new.",
    Icon: MessagesSquare,
  },
  {
    id: "social",
    label: "Social Connect",
    description: "Meet great people. Build real connections.",
    Icon: UsersRound,
  },
];

export function App() {
  const [selectedIntent, setSelectedIntent] = useState(null);

  return (
    <main className="app-shell">
      <div className="page-frame">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="SideSpark home">
            <Sparkles aria-hidden="true" />
            <span>SideSpark</span>
          </a>
          <nav className="site-header__links" aria-label="Site links">
            <a className="community-link" href="#community">
              Community
              <ArrowRight aria-hidden="true" />
            </a>
            <a
              className="presentation-link"
              href="/presentation.html"
              aria-label="Watch 60-sec pitch"
            >
              <CirclePlay aria-hidden="true" />
              <span><span className="presentation-link__watch">Watch </span>60-sec pitch</span>
            </a>
          </nav>
        </header>

        <section className="hero" id="top" aria-labelledby="hero-title">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <h1 id="hero-title">
              Take a break.{" "}
              <span>Find your spark.</span>
            </h1>
            <p>Meet someone new, swap a skill, or grow your circle.</p>
          </motion.div>

          <div className="intent-grid" aria-label="Choose how you want to connect">
            {INTENTS.map(({ id, label, description, Icon }, index) => {
              const selected = selectedIntent === id;
              return (
                <motion.button
                  className={`intent-card intent-card--${id}`}
                  type="button"
                  key={id}
                  aria-pressed={selected}
                  onClick={() => setSelectedIntent(id)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: selectedIntent && !selected ? 0.72 : 1, y: 0 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 2 }}
                  transition={{ delay: index * 0.08, duration: 0.22 }}
                >
                  <span className="intent-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  {selected ? (
                    <span className="intent-card__check" aria-hidden="true">
                      <Check />
                    </span>
                  ) : null}
                  <span className="intent-card__title">{label}</span>
                  <span className="intent-card__description">{description}</span>
                  <span className="intent-card__arrow" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="community-strip" id="community" aria-label="Demo community activity">
          <span className="community-strip__icon" aria-hidden="true">
            <Network />
          </span>
          <p>
            <strong>24 demo sparks</strong>
            <span>this week</span>
          </p>
          <div className="community-strip__people" aria-hidden="true">
            <UsersRound />
            <Sparkles />
          </div>
        </section>

        <button className="primary-action" type="button" disabled={!selectedIntent}>
          Find my sidekick
          <ArrowRight aria-hidden="true" />
        </button>

        <p className="demo-note">
          Preview community uses fictional, consented demo profiles. No profile data leaves this device.
        </p>
      </div>
    </main>
  );
}
