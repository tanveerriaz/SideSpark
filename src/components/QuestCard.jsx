import { CheckCircle2, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { getFormat } from "../data/quests.js";

export function QuestCard({ quest, format, sidekick, onComplete }) {
  const breakFormat = getFormat(format);
  return (
    <motion.section
      className="flow-panel quest-panel"
      aria-labelledby="quest-title"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="quest-icon" aria-hidden="true"><Sparkles /></div>
      <p className="eyebrow">{quest.kind === "ai-practice" ? "AI skill sidequest" : "Sidequest"} with {sidekick.firstName}</p>
      <h2 id="quest-title">{quest.title}</h2>
      <div className="quest-meta"><Clock3 aria-hidden="true" /> {breakFormat.duration} · {breakFormat.label}</div>
      <p className="quest-prompt">{quest.prompt}</p>
      {quest.steps ? (
        <ol className="quest-steps">
          {quest.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      ) : null}
      {quest.learningOutcome ? (
        <div className="quest-learning">
          <strong>What you’ll learn</strong>
          <p>{quest.learningOutcome}</p>
        </div>
      ) : null}
      {quest.safetyNote ? (
        <p className="quest-safety"><ShieldCheck aria-hidden="true" /> <span>{quest.safetyNote}</span></p>
      ) : null}
      <p className="demo-callout">This is a guided demo activity. Complete it with someone nearby or preview how the real experience would work.</p>
      <button className="primary-action primary-action--inside" type="button" onClick={onComplete}>
        We did it <CheckCircle2 aria-hidden="true" />
      </button>
    </motion.section>
  );
}
