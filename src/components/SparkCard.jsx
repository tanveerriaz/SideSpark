import { CalendarDays, Coffee, Copy, Sparkles, UsersRound } from "lucide-react";
import { useState } from "react";

export function SparkCard({ card }) {
  const [copied, setCopied] = useState(false);

  async function copySummary() {
    const summary = `SideSpark: ${card.intentLabel} with ${card.sidekickName} from ${card.sidekickTeam} — ${card.questTitle}.`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="spark-card" data-testid="spark-card" aria-labelledby="spark-card-title">
      <div className="spark-card__mark" aria-hidden="true"><Sparkles /></div>
      <p className="section-kicker">Sidequest complete</p>
      <h2 id="spark-card-title">Your Spark Card</h2>
      <p className="spark-card__intent">{card.intentLabel}</p>
      <div className="spark-card__details">
        <p><UsersRound aria-hidden="true" /><span><strong>{card.sidekickName}</strong><small>{card.sidekickTeam}</small></span></p>
        <p><Coffee aria-hidden="true" /><span><strong>{card.formatLabel}</strong><small>{card.questTitle}</small></span></p>
        <p><CalendarDays aria-hidden="true" /><span><strong>{card.dateLabel}</strong><small>Saved on this device</small></span></p>
      </div>
      {card.takeaway ? <blockquote>“{card.takeaway}”</blockquote> : null}
      <button className="secondary-action secondary-action--light" type="button" onClick={copySummary}>
        <Copy aria-hidden="true" /> {copied ? "Copied" : "Copy summary"}
      </button>
    </article>
  );
}
