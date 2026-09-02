import { ArrowLeft, ArrowRight, BadgeCheck, Lightbulb, UsersRound } from "lucide-react";
import { motion } from "motion/react";

import { getFormat } from "../data/quests.js";

export function MatchReveal({ result, introduction, intent, format, onBack, onStart }) {
  const sidekick = result.candidate;
  const formatLabel = getFormat(format)?.label;

  return (
    <motion.section
      className="flow-panel match-panel"
      aria-labelledby="match-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="demo-badge"><BadgeCheck aria-hidden="true" /> Demo sidekick</div>
      <div className="match-avatar" aria-hidden="true"><UsersRound /></div>
      <p className="eyebrow">Your {formatLabel} spark</p>
      <h2 id="match-title">Meet {sidekick.firstName}</h2>
      <p className="match-team">{sidekick.team}</p>

      <div className="match-reasons">
        <article>
          <Lightbulb aria-hidden="true" />
          <div><strong>{intent === "skill" ? "The exchange" : "One thing in common"}</strong><p>{introduction.commonGround}</p></div>
        </article>
        <article>
          <UsersRound aria-hidden="true" />
          <div><strong>One thing to discover</strong><p>{introduction.discovery}</p></div>
        </article>
      </div>
      <p className="match-introduction">{introduction.text}</p>

      <div className="form-actions">
        <button className="secondary-action" type="button" onClick={onBack}>
          <ArrowLeft aria-hidden="true" /> Change details
        </button>
        <button className="primary-action primary-action--inside" type="button" onClick={onStart}>
          Start this sidequest <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </motion.section>
  );
}
