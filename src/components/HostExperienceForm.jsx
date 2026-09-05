import { useRef, useState } from "react";
import { ArrowLeft, Info, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { getLocalDateStamp, validateExperienceDraft } from "../lib/marketplace.js";

const INITIAL_DRAFT = {
  title: "",
  category: "",
  description: "",
  date: "",
  time: "",
  duration: "45 min",
  format: "in-person",
  neighborhood: "",
  participation: "small-group",
  capacity: 4,
  bookingMode: "request",
  language: "English",
};

function FieldError({ id, message }) {
  return message ? <span className="host-field__error" id={id}>{message}</span> : null;
}

export function HostExperienceForm({ onBack, onPublish }) {
  const [draft, setDraft] = useState(INITIAL_DRAFT);
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef(null);

  function update(name, value) {
    setDraft((current) => ({
      ...current,
      [name]: value,
      ...(name === "participation" && value === "one-to-one" ? { capacity: 1 } : {}),
    }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateExperienceDraft(draft);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setShowSummary(true);
      window.setTimeout(() => {
        const summary = summaryRef.current;
        if (!summary) return;
        const behavior = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
        summary.focus({ preventScroll: true });
        summary.scrollIntoView?.({ behavior, block: "center" });
      }, 0);
      return;
    }
    onPublish(draft);
  }

  return (
    <motion.div className="host-page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <button className="marketplace-back" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /> Back to discover</button>

      <div className="host-page__intro">
        <p className="marketplace-kicker"><Sparkles aria-hidden="true" /> Give what you know freely</p>
        <h1>Host a free experience</h1>
        <p>Offer one useful thing you can share in a small, human-sized session. This prototype publishes only to your device.</p>
      </div>

      <form className="host-form" onSubmit={handleSubmit} noValidate>
        {showSummary ? (
          <div className="host-form__summary" role="alert" ref={summaryRef} tabIndex="-1">
            <strong>Check the highlighted fields.</strong>
            <span>Nothing has been published yet.</span>
          </div>
        ) : null}

        <section className="host-form__section" aria-labelledby="host-basics-title">
          <div className="host-form__section-heading">
            <span>1</span><div><h2 id="host-basics-title">What will you share?</h2><p>Keep it specific enough that someone can picture the hour.</p></div>
          </div>
          <div className="host-form__grid">
            <label className="host-field host-field--wide">
              <span>Title</span>
              <input aria-label="Title" value={draft.title} onChange={(event) => update("title", event.target.value)} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "host-title-error" : undefined} />
              <FieldError id="host-title-error" message={errors.title} />
            </label>
            <label className="host-field">
              <span>Category</span>
              <select aria-label="Category" value={draft.category} onChange={(event) => update("category", event.target.value)} aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "host-category-error" : undefined}>
                <option value="">Choose one</option>
                <option>Creative</option>
                <option>Career</option>
                <option>Digital skills</option>
                <option>Food</option>
                <option>Life stories</option>
                <option>Wellbeing</option>
              </select>
              <FieldError id="host-category-error" message={errors.category} />
            </label>
            <label className="host-field host-field--wide">
              <span>What will people do?</span>
              <textarea aria-label="What will people do?" rows="5" value={draft.description} onChange={(event) => update("description", event.target.value)} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "host-description-error" : "host-description-hint"} />
              <small id="host-description-hint">Describe the outcome and what makes the experience comfortable for a newcomer.</small>
              <FieldError id="host-description-error" message={errors.description} />
            </label>
          </div>
        </section>

        <section className="host-form__section" aria-labelledby="host-logistics-title">
          <div className="host-form__section-heading">
            <span>2</span><div><h2 id="host-logistics-title">When and where?</h2><p>Only show a public neighborhood until a guest is accepted.</p></div>
          </div>
          <div className="host-form__grid">
            <label className="host-field"><span>Date</span><input aria-label="Date" type="date" min={getLocalDateStamp()} value={draft.date} onChange={(event) => update("date", event.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "host-date-error" : undefined} /><FieldError id="host-date-error" message={errors.date} /></label>
            <label className="host-field"><span>Time</span><input aria-label="Time" type="time" value={draft.time} onChange={(event) => update("time", event.target.value)} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "host-time-error" : undefined} /><FieldError id="host-time-error" message={errors.time} /></label>
            <fieldset className="host-choice-group host-field--wide">
              <legend>Where</legend>
              <label><input type="radio" name="format" value="in-person" checked={draft.format === "in-person"} onChange={(event) => update("format", event.target.value)} /> In person</label>
              <label><input type="radio" name="format" value="online" checked={draft.format === "online"} onChange={(event) => update("format", event.target.value)} /> Online</label>
            </fieldset>
            {draft.format === "in-person" ? (
              <label className="host-field host-field--wide"><span>Public neighborhood</span><input aria-label="Public neighborhood" value={draft.neighborhood} onChange={(event) => update("neighborhood", event.target.value)} placeholder="For example, Tiong Bahru" aria-invalid={Boolean(errors.neighborhood)} aria-describedby={errors.neighborhood ? "host-neighborhood-error" : "host-neighborhood-hint"} /><small id="host-neighborhood-hint">Do not enter a home address or exact meeting point.</small><FieldError id="host-neighborhood-error" message={errors.neighborhood} /></label>
            ) : (
              <div className="host-inline-note host-field--wide"><Info aria-hidden="true" /><p><strong>Private online link</strong>The real platform shares it only after acceptance. This demo does not collect one.</p></div>
            )}
          </div>
        </section>

        <section className="host-form__section" aria-labelledby="host-people-title">
          <div className="host-form__section-heading">
            <span>3</span><div><h2 id="host-people-title">How will people join?</h2><p>You choose the size and whether approval is needed.</p></div>
          </div>
          <div className="host-form__grid">
            <fieldset className="host-choice-group host-field--wide">
              <legend>Participation</legend>
              <label><input type="radio" name="participation" value="one-to-one" checked={draft.participation === "one-to-one"} onChange={(event) => update("participation", event.target.value)} /> One-to-one</label>
              <label><input type="radio" name="participation" value="small-group" checked={draft.participation === "small-group"} onChange={(event) => update("participation", event.target.value)} /> Small group</label>
            </fieldset>
            <label className="host-field"><span>Guest capacity</span><input type="number" min="3" max="8" value={draft.participation === "one-to-one" ? 1 : draft.capacity} disabled={draft.participation === "one-to-one"} onChange={(event) => update("capacity", Number(event.target.value))} /></label>
            <label className="host-field"><span>Language</span><input aria-label="Language" value={draft.language} onChange={(event) => update("language", event.target.value)} aria-invalid={Boolean(errors.language)} aria-describedby={errors.language ? "host-language-error" : undefined} /><FieldError id="host-language-error" message={errors.language} /></label>
            <fieldset className="host-choice-group host-field--wide">
              <legend>Joining rule</legend>
              <label><input type="radio" name="bookingMode" value="request" checked={draft.bookingMode === "request"} onChange={(event) => update("bookingMode", event.target.value)} /> Host approves requests</label>
              <label><input type="radio" name="bookingMode" value="instant" checked={draft.bookingMode === "instant"} onChange={(event) => update("bookingMode", event.target.value)} /> Instant reservations</label>
            </fieldset>
          </div>
        </section>

        <div className="host-form__actions">
          <p><Info aria-hidden="true" /> This creates fictional device-local demo content. It does not notify anyone.</p>
          <button className="marketplace-primary" type="submit">Publish local draft <Sparkles aria-hidden="true" /></button>
        </div>
      </form>
    </motion.div>
  );
}
