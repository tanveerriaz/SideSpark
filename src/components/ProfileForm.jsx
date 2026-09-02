import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { useState } from "react";

const INTERESTS = [
  "Street photography",
  "Running",
  "Hawker food",
  "Books",
  "Cooking",
  "Board games",
];

export function ProfileForm({ intent, initialProfile, onBack, onSubmit }) {
  const [firstName, setFirstName] = useState(initialProfile?.firstName ?? "");
  const [team, setTeam] = useState(initialProfile?.team ?? "");
  const [interests, setInterests] = useState(initialProfile?.interests ?? []);
  const [offer, setOffer] = useState(initialProfile?.offers?.[0] ?? "");
  const [want, setWant] = useState(initialProfile?.wants?.[0] ?? "");
  const [error, setError] = useState("");

  function toggleInterest(label) {
    const value = label.toLowerCase();
    setInterests((current) => {
      if (current.includes(value)) return current.filter((item) => item !== value);
      if (current.length >= 3) return current;
      return [...current, value];
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!firstName.trim() || !team.trim()) {
      setError("Add your first name and team to continue.");
      return;
    }
    if (intent === "social" && interests.length === 0) {
      setError("Choose at least one interest so the introduction has real common ground.");
      return;
    }
    if (intent === "skill" && (!offer.trim() || !want.trim())) {
      setError("Add one skill to share and one you want to learn.");
      return;
    }
    setError("");
    onSubmit({
      id: "local-user",
      firstName: firstName.trim(),
      team: team.trim(),
      interests,
      offers: offer.trim() ? [offer.trim().toLowerCase()] : [],
      wants: want.trim() ? [want.trim().toLowerCase()] : [],
    });
  }

  return (
    <section className="flow-panel profile-panel" aria-labelledby="profile-title">
      <div className="section-kicker">Step 3 of 4</div>
      <h2 id="profile-title">Tell us a little about you</h2>
      <p className="panel-intro">
        Just enough to create a useful introduction. Nothing leaves this device.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field-grid">
          <label>
            <span>First name</span>
            <input
              autoComplete="given-name"
              maxLength="40"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label>
            <span>Team</span>
            <input
              autoComplete="organization-title"
              maxLength="60"
              value={team}
              onChange={(event) => setTeam(event.target.value)}
            />
          </label>
        </div>

        {intent === "skill" ? (
          <div className="field-grid skill-fields">
            <label>
              <span>Skill you can share</span>
              <input
                maxLength="70"
                placeholder="e.g. Presentation confidence"
                value={offer}
                onChange={(event) => setOffer(event.target.value)}
              />
            </label>
            <label>
              <span>Skill you want to learn</span>
              <input
                maxLength="70"
                placeholder="e.g. Excel shortcuts"
                value={want}
                onChange={(event) => setWant(event.target.value)}
              />
            </label>
          </div>
        ) : null}

        <fieldset className="interest-fieldset">
          <legend>
            {intent === "social" ? "Choose up to three interests" : "Optional interests"}
          </legend>
          <p>{interests.length}/3 selected</p>
          <div className="interest-chips">
            {INTERESTS.map((interest) => {
              const selected = interests.includes(interest.toLowerCase());
              return (
                <button
                  key={interest}
                  type="button"
                  className={selected ? "is-selected" : ""}
                  aria-pressed={selected}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </fieldset>

        {error ? <p className="form-error" role="alert">{error}</p> : null}

        <div className="privacy-note">
          <LockKeyhole aria-hidden="true" />
          <span>Device-local demo. No email, employee ID, directory, or AI call.</span>
        </div>

        <div className="form-actions">
          <button className="secondary-action" type="button" onClick={onBack}>
            <ArrowLeft aria-hidden="true" /> Back
          </button>
          <button className="primary-action primary-action--inside" type="submit">
            Match me with a demo sidekick <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </form>
    </section>
  );
}
