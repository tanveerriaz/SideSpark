import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Globe2,
  Languages,
  MapPin,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";

function participationLabel(experience) {
  return experience.participation === "one-to-one"
    ? "One-to-one with 1 guest"
    : `Small group · ${experience.seatsLeft} of ${experience.capacity} places left`;
}

export function ExperienceDetail({ experience, booking, onBack, onBook, persistenceNotice }) {
  const isOnline = experience.format === "online";
  const isReserved = booking?.status === "reserved";
  const isPending = booking?.status === "pending-host";
  const actionLabel = isReserved
    ? "Reserved"
    : isPending
      ? "Request pending"
      : experience.bookingMode === "instant"
        ? "Reserve my place"
        : "Request to join";

  return (
    <motion.div
      className="experience-detail-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button className="marketplace-back" type="button" onClick={onBack}>
        <ArrowLeft aria-hidden="true" /> Back to discover
      </button>

      <div className={`experience-detail-hero experience-detail-hero--${experience.palette ?? "mint"}`}>
        <div className="experience-detail-hero__copy">
          <p className="marketplace-kicker">{experience.category} · {experience.demoState === "device-only" ? "Your device-only draft" : "Fictional example"}</p>
          <h1>{experience.title}</h1>
          <p>{experience.summary}</p>
          <div className="experience-detail-hero__host">
            <span aria-hidden="true"><UserRound /></span>
            <p><strong>Hosted by {experience.host.name}</strong><small><BadgeCheck aria-hidden="true" /> {experience.host.badge} · {experience.host.credits} credits · {experience.host.sessions} completed</small></p>
          </div>
        </div>

        <aside className="experience-booking-card" aria-label="Reservation summary">
          {booking ? (
            <div className="booking-success" role="status">
              <span aria-hidden="true"><Check /></span>
              <h2>{isReserved ? "You’re reserved" : "Request sent to the host"}</h2>
              <p>{isReserved ? "Your place is held in this local demo." : "This demo request is waiting for host approval."}</p>
            </div>
          ) : (
            <>
              <p className="experience-booking-card__label">{experience.bookingMode === "instant" ? "Instant reservation" : "Host approval"}</p>
              <h2>{experience.bookingMode === "instant" ? "A place is available" : "Say why this feels useful"}</h2>
              <p>{experience.bookingMode === "instant" ? "Reserve without waiting for host approval." : "The real platform will let the host review a short request first."}</p>
            </>
          )}
          <button className="marketplace-primary marketplace-primary--full" type="button" disabled={Boolean(booking)} onClick={onBook}>
            {actionLabel}
          </button>
          <p className="credits-rule"><ShieldCheck aria-hidden="true" /> Credits unlock only after both people confirm attendance.</p>
          {persistenceNotice ? <p className="storage-notice" role="status">{persistenceNotice}</p> : null}
        </aside>
      </div>

      <div className="experience-detail-layout">
        <section className="experience-detail-main" aria-labelledby="what-happens-title">
          <p className="marketplace-kicker">The experience</p>
          <h2 id="what-happens-title">What happens</h2>
          <p>{experience.description}</p>
          <ol className="experience-agenda">
            {experience.agenda.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}
          </ol>
        </section>

        <aside className="experience-facts" aria-label="Experience details">
          <h2>Good to know</h2>
          <dl>
            <div><dt><CalendarDays aria-hidden="true" /> Date</dt><dd>{experience.dateLabel}</dd></div>
            <div><dt><Clock3 aria-hidden="true" /> Time</dt><dd>{experience.timeLabel} · {experience.duration}</dd></div>
            <div><dt>{isOnline ? <Globe2 aria-hidden="true" /> : <MapPin aria-hidden="true" />} Place</dt><dd>{experience.neighborhood}</dd></div>
            <div><dt><UsersRound aria-hidden="true" /> People</dt><dd>{participationLabel(experience)}</dd></div>
            <div><dt><Languages aria-hidden="true" /> Language</dt><dd>{experience.language}</dd></div>
          </dl>
          <div className="experience-access-note">
            <ShieldCheck aria-hidden="true" />
            <p><strong>Access and privacy</strong>{experience.accessNote}</p>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
