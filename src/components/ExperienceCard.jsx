import {
  ArrowUpRight,
  CalendarDays,
  Globe2,
  MapPin,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

function formatParticipation(value) {
  return value === "one-to-one" ? "One-to-one" : "Small group";
}

export function ExperienceCard({ experience, onOpen }) {
  const isOnline = experience.format === "online";
  const titleId = `experience-${experience.id}-title`;

  return (
    <article className={`experience-card experience-card--${experience.palette ?? "mint"}`} aria-labelledby={titleId}>
      {experience.illustration ? (
        <div className="experience-card__scene">
          <img src={experience.illustration} alt={experience.illustrationAlt} />
        </div>
      ) : null}
      <div className="experience-card__topline">
        <span className="experience-card__category">{experience.category}</span>
        {experience.demoState === "device-only" ? (
          <span className="experience-card__device-label">Your device-only draft</span>
        ) : null}
      </div>

      <h3 id={titleId}>{experience.title}</h3>
      <p className="experience-card__summary">{experience.summary}</p>

      <dl className="experience-card__facts">
        <div>
          <dt><CalendarDays aria-hidden="true" /> When</dt>
          <dd>{experience.dateLabel} · {experience.timeLabel}</dd>
        </div>
        <div>
          <dt>{isOnline ? <Globe2 aria-hidden="true" /> : <MapPin aria-hidden="true" />} Where</dt>
          <dd>{experience.neighborhood}</dd>
        </div>
        <div>
          <dt>{experience.participation === "one-to-one" ? <UserRound aria-hidden="true" /> : <UsersRound aria-hidden="true" />} Format</dt>
          <dd>{formatParticipation(experience.participation)}</dd>
        </div>
      </dl>

      <div className="experience-card__host">
        <span className="experience-card__host-icon" aria-hidden="true"><UserRound /></span>
        <span>
          <strong>Hosted by {experience.host.name}</strong>
          <small><ShieldCheck aria-hidden="true" /> {experience.host.credits} credits · {experience.host.sessions} sessions</small>
        </span>
      </div>

      <div className="experience-card__footer">
        <span>{experience.bookingMode === "instant" ? "Instant reserve" : "Host approval"}</span>
        <button type="button" onClick={() => onOpen(experience)}>
          View experience <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
