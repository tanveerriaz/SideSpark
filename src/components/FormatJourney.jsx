import { Coffee, Footprints, Timer, Utensils } from "lucide-react";
import { motion } from "motion/react";

import { BREAK_FORMATS } from "../data/quests.js";

const ICONS = {
  coffee: Coffee,
  walk: Footprints,
  lunch: Utensils,
  desk: Timer,
};

export function FormatJourney({ selectedFormat, onSelect }) {
  return (
    <motion.section
      className="format-journey"
      aria-labelledby="format-title"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className="section-kicker">Step 2 of 4</div>
      <h2 id="format-title">Pick your break</h2>
      <p>Choose the kind of moment that fits your day.</p>
      <ol className="format-list">
        {BREAK_FORMATS.map((format, index) => {
          const Icon = ICONS[format.id];
          const selected = selectedFormat === format.id;
          return (
            <motion.li
              key={format.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <button
                className={`format-button${selected ? " is-selected" : ""}`}
                type="button"
                aria-pressed={selected}
                aria-current={selected ? "step" : undefined}
                onClick={() => onSelect(format.id)}
              >
                <span className={`format-icon format-icon--${format.id}`} aria-hidden="true">
                  <Icon />
                </span>
                <span>
                  <strong>{format.label}</strong>
                  <small>{format.duration}</small>
                </span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </motion.section>
  );
}
