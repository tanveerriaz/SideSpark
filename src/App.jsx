import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  MessagesSquare,
  Network,
  RotateCcw,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";

import { CommunityMap } from "./components/CommunityMap.jsx";
import { FormatJourney } from "./components/FormatJourney.jsx";
import { MatchReveal } from "./components/MatchReveal.jsx";
import { ProfileForm } from "./components/ProfileForm.jsx";
import { QuestCard } from "./components/QuestCard.jsx";
import { SparkCard } from "./components/SparkCard.jsx";
import { COMMUNITY } from "./data/community.js";
import { getFormat, getQuest } from "./data/quests.js";
import { createIntroduction } from "./lib/introductions.js";
import { findBestMatch } from "./lib/matching.js";
import { loadProgress, saveCompletion } from "./lib/storage.js";

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

const INITIAL_STAGE = "choose";

function intentLabel(intent) {
  return intent === "skill" ? "Skill Swap" : "Social Connect";
}

function CompletionPanel({ onBack, onSave }) {
  const [takeaway, setTakeaway] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSave(takeaway.trim());
  }

  return (
    <motion.section
      className="flow-panel reflection-panel"
      aria-labelledby="reflection-title"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="reflection-icon" aria-hidden="true"><Lightbulb /></div>
      <p className="section-kicker">One last spark</p>
      <h2 id="reflection-title">What will you take away?</h2>
      <p className="panel-intro">Save one useful thought, or leave it blank and keep the memory.</p>
      <form onSubmit={handleSubmit}>
        <label className="takeaway-field">
          <span>Takeaway <small>optional</small></span>
          <textarea
            rows="4"
            maxLength="180"
            placeholder="Something I learned, noticed, or want to try…"
            value={takeaway}
            onChange={(event) => setTakeaway(event.target.value)}
          />
        </label>
        <div className="form-actions">
          <button className="secondary-action" type="button" onClick={onBack}>
            <ArrowLeft aria-hidden="true" /> Back
          </button>
          <button className="primary-action primary-action--inside" type="submit">
            Save my Spark Card <Sparkles aria-hidden="true" />
          </button>
        </div>
      </form>
    </motion.section>
  );
}

function NoMatchPanel({ onTryBreak, onChangeProfile, onBringBuddy }) {
  return (
    <motion.section
      className="flow-panel no-match-panel"
      aria-labelledby="no-match-title"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="section-kicker">No match made</p>
      <h2 id="no-match-title">No spark yet</h2>
      <p className="panel-intro">Your next sidekick may not have joined this demo community.</p>
      <div className="recovery-actions">
        <button className="primary-action primary-action--inside" type="button" onClick={onTryBreak}>
          Try another break <ArrowRight aria-hidden="true" />
        </button>
        <button className="secondary-action" type="button" onClick={onChangeProfile}>
          <ArrowLeft aria-hidden="true" /> Change what I want
        </button>
        <button className="secondary-action" type="button" onClick={onBringBuddy}>
          <UsersRound aria-hidden="true" /> Bring a buddy
        </button>
      </div>
    </motion.section>
  );
}

export function App() {
  const [stage, setStage] = useState(INITIAL_STAGE);
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [profile, setProfile] = useState(null);
  const [match, setMatch] = useState(null);
  const [introduction, setIntroduction] = useState(null);
  const [sparkCard, setSparkCard] = useState(null);
  const [storageNotice, setStorageNotice] = useState("");
  const [progress, setProgress] = useState(() => loadProgress());

  const isChoosing = stage === "choose";

  function selectIntent(intent) {
    setSelectedIntent(intent);
    setSelectedFormat(null);
    setStage(INITIAL_STAGE);
  }

  function startProfile() {
    if (!selectedIntent || !selectedFormat) return;
    setStage("profile");
  }

  function submitProfile(nextProfile) {
    const result = findBestMatch({
      user: nextProfile,
      candidates: COMMUNITY,
      intent: selectedIntent,
      format: selectedFormat,
      completedIds: progress.completedIds,
    });

    setProfile(nextProfile);
    setMatch(result);
    if (!result) {
      setStage("no-match");
      return;
    }

    setIntroduction(
      createIntroduction({
        user: nextProfile,
        result,
        intent: selectedIntent,
        format: selectedFormat,
      }),
    );
    setStage("matching");
    window.setTimeout(() => setStage("match"), 420);
  }

  function saveSpark(takeaway) {
    const format = getFormat(selectedFormat);
    const quest = getQuest(selectedIntent, selectedFormat);
    const card = {
      id: `${match.candidate.id}-${Date.now()}`,
      sidekickId: match.candidate.id,
      sidekickName: match.candidate.firstName,
      sidekickTeam: match.candidate.team,
      intentLabel: intentLabel(selectedIntent),
      formatLabel: format.label,
      questTitle: quest.title,
      takeaway,
      dateLabel: new Intl.DateTimeFormat("en-SG", { dateStyle: "medium" }).format(new Date()),
    };
    const saved = saveCompletion({ profile, card });
    setProgress(saved.progress);
    setSparkCard(card);
    setStorageNotice(saved.persisted ? "" : "This spark will last for this visit only.");
    setStage("complete");
  }

  function startOver() {
    setStage(INITIAL_STAGE);
    setSelectedIntent(null);
    setSelectedFormat(null);
    setProfile(null);
    setMatch(null);
    setIntroduction(null);
    setSparkCard(null);
    setStorageNotice("");
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      <div className="page-frame">
        <header className="site-header">
          <button className="brand" type="button" onClick={startOver} aria-label="SideSpark home">
            <Sparkles aria-hidden="true" />
            <span>SideSpark</span>
          </button>
          {stage === "complete" ? (
            <button className="community-link" type="button" onClick={() => document.querySelector("#community")?.scrollIntoView()}>
              Community <ArrowRight aria-hidden="true" />
            </button>
          ) : stage !== INITIAL_STAGE ? (
            <button className="community-link" type="button" onClick={startOver}>
              Start over <RotateCcw aria-hidden="true" />
            </button>
          ) : (
            <a className="community-link" href="#community">
              Community <ArrowRight aria-hidden="true" />
            </a>
          )}
        </header>

        <>
          {isChoosing ? (
            <motion.div key="choose" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.16 }}>
              <section className="hero" id="top" aria-labelledby="hero-title">
                <motion.div
                  className="hero-copy"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="hero-kicker">Tiny adventures. Real workplace connections.</p>
                  <h1 id="hero-title">
                    Take a break. <span>Find your spark.</span>
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
                        onClick={() => selectIntent(id)}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: selectedIntent && !selected ? 0.72 : 1, y: 0 }}
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 2 }}
                        transition={{ delay: index * 0.08, duration: 0.22 }}
                      >
                        <span className="intent-card__icon"><Icon aria-hidden="true" /></span>
                        {selected ? <span className="intent-card__check" aria-hidden="true"><Check /></span> : null}
                        <span className="intent-card__title">{label}</span>
                        <span className="intent-card__description">{description}</span>
                        <span className="intent-card__arrow" aria-hidden="true"><ArrowRight /></span>
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              {selectedIntent ? (
                <FormatJourney selectedFormat={selectedFormat} onSelect={setSelectedFormat} />
              ) : null}

              <section className="community-strip" id="community" aria-label="Demo community activity">
                <span className="community-strip__icon" aria-hidden="true"><Network /></span>
                <p><strong>24 demo sparks</strong><span>this week</span></p>
                <div className="community-strip__people" aria-hidden="true"><UsersRound /><Sparkles /></div>
              </section>

              <button
                className="primary-action"
                type="button"
                disabled={!selectedIntent || !selectedFormat}
                onClick={startProfile}
              >
                Find my sidekick <ArrowRight aria-hidden="true" />
              </button>

              <p className="demo-note">Preview community uses fictional, consented demo profiles. No profile data leaves this device.</p>
            </motion.div>
          ) : null}

          {stage === "profile" ? (
            <motion.div className="flow-stage" key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProfileForm
                intent={selectedIntent}
                initialProfile={profile}
                onBack={() => setStage(INITIAL_STAGE)}
                onSubmit={submitProfile}
              />
            </motion.div>
          ) : null}

          {stage === "matching" ? (
            <motion.section
              className="flow-panel matching-panel"
              key="matching"
              aria-live="polite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="matching-icon" aria-hidden="true"><Sparkles /></div>
              <p className="section-kicker">Finding one good fit</p>
              <h2>Looking through the demo community…</h2>
              <p className="panel-intro">One thing in common. One thing worth discovering.</p>
            </motion.section>
          ) : null}

          {stage === "no-match" ? (
            <motion.div className="flow-stage" key="no-match" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <NoMatchPanel
                onTryBreak={() => {
                  setSelectedFormat(null);
                  setStage(INITIAL_STAGE);
                }}
                onChangeProfile={() => setStage("profile")}
                onBringBuddy={() => setStage("buddy")}
              />
            </motion.div>
          ) : null}

          {stage === "buddy" ? (
            <motion.div className="flow-stage" key="buddy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section className="flow-panel buddy-panel" aria-labelledby="buddy-title">
                <UsersRound className="panel-hero-icon" aria-hidden="true" />
                <p className="section-kicker">Buddy mode</p>
                <h2 id="buddy-title">Bring someone you already know</h2>
                <p className="panel-intro">Use the same activity together. SideSpark will not invent a match or add a demo map connection.</p>
                <button className="primary-action primary-action--inside" type="button" onClick={() => setStage("buddy-quest")}>
                  Open the sidequest <ArrowRight aria-hidden="true" />
                </button>
              </section>
            </motion.div>
          ) : null}

          {stage === "buddy-quest" ? (
            <motion.div className="flow-stage" key="buddy-quest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuestCard
                quest={getQuest(selectedIntent, selectedFormat)}
                format={selectedFormat}
                sidekick={{ firstName: "your buddy" }}
                onComplete={() => setStage("buddy-complete")}
              />
            </motion.div>
          ) : null}

          {stage === "buddy-complete" ? (
            <motion.div className="flow-stage" key="buddy-complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <section className="flow-panel buddy-panel" aria-labelledby="buddy-complete-title">
                <Sparkles className="panel-hero-icon" aria-hidden="true" />
                <p className="section-kicker">Sidequest complete</p>
                <h2 id="buddy-complete-title">A small break, well spent.</h2>
                <p className="panel-intro">No fictional match or map connection was created.</p>
                <button className="primary-action primary-action--inside" type="button" onClick={startOver}>
                  Find another spark <RotateCcw aria-hidden="true" />
                </button>
              </section>
            </motion.div>
          ) : null}

          {stage === "match" && match ? (
            <motion.div className="flow-stage" key="match" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MatchReveal
                result={match}
                introduction={introduction}
                intent={selectedIntent}
                format={selectedFormat}
                onBack={() => setStage("profile")}
                onStart={() => setStage("quest")}
              />
            </motion.div>
          ) : null}

          {stage === "quest" && match ? (
            <motion.div className="flow-stage" key="quest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuestCard
                quest={getQuest(selectedIntent, selectedFormat)}
                format={selectedFormat}
                sidekick={match.candidate}
                onComplete={() => setStage("reflection")}
              />
            </motion.div>
          ) : null}

          {stage === "reflection" ? (
            <motion.div className="flow-stage" key="reflection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CompletionPanel onBack={() => setStage("quest")} onSave={saveSpark} />
            </motion.div>
          ) : null}

          {stage === "complete" && sparkCard && match ? (
            <motion.div className="completion-stage" key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {storageNotice ? <p className="storage-notice" role="status">{storageNotice}</p> : null}
              <SparkCard card={sparkCard} />
              <div id="community"><CommunityMap user={profile} sidekick={match.candidate} /></div>
              <button className="primary-action" type="button" onClick={startOver}>
                Start another sidequest <ArrowRight aria-hidden="true" />
              </button>
            </motion.div>
          ) : null}
        </>
      </div>
    </main>
  );
}
