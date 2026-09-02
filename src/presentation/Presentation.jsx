import { useCallback, useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Footprints,
  Lightbulb,
  Map,
  MessagesSquare,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Timer,
  UsersRound,
  Utensils,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import intentReference from "../../docs/references/sidespark-option-1.png";
import journeyReference from "../../docs/references/sidespark-option-2-journey.png";
import productScreen from "../../qa/implementation-mobile-v1.png";
import coffeePhoto from "../assets/video/source/coffee-keyframe.jpg";
import skillPhoto from "../assets/video/source/skill-keyframe.jpg";
import walkPhoto from "../assets/video/source/walk-keyframe.jpg";
import { STORY_BEATS, TOTAL_DURATION_MS } from "./story.js";

const MEDIA = {
  coffee: coffeePhoto,
  complete: productScreen,
  intent: intentReference,
  journey: journeyReference,
  skill: skillPhoto,
  walk: walkPhoto,
};

function isEditableTarget(target) {
  return target instanceof HTMLElement
    && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

function PhotoScene({ beat }) {
  return (
    <figure className={`presentation__media presentation__media--photo presentation__media--${beat.media}`}>
      <img src={MEDIA[beat.media]} alt={beat.alt} />
      <figcaption><BadgeCheck aria-hidden="true" /> {beat.disclosure}</figcaption>
    </figure>
  );
}

function IntentScene({ beat }) {
  return (
    <div className="intent-scene">
      <div className="intent-scene__choices" aria-label="SideSpark intentions">
        <article className="intent-scene__choice intent-scene__choice--skill">
          <MessagesSquare aria-hidden="true" />
          <div><strong>Skill Swap</strong><span>Share what you know.</span></div>
        </article>
        <article className="intent-scene__choice intent-scene__choice--social">
          <UsersRound aria-hidden="true" />
          <div><strong>Social Connect</strong><span>Grow your circle.</span></div>
        </article>
      </div>
      <figure className="reference-crop reference-crop--intent">
        <img src={MEDIA[beat.media]} alt={beat.alt} />
      </figure>
    </div>
  );
}

const FORMATS = [
  { label: "Coffee", detail: "15 min", Icon: Coffee },
  { label: "Walk", detail: "15 min", Icon: Footprints },
  { label: "Lunch", detail: "30 min", Icon: Utensils },
  { label: "15-minute Desk Break", detail: "Right where you are", Icon: Timer },
];

function FormatScene({ beat }) {
  return (
    <div className="format-scene">
      <ol className="format-scene__list">
        {FORMATS.map(({ label, detail, Icon }, index) => (
          <li key={label} data-active={index === 1 ? "true" : undefined}>
            <span><Icon aria-hidden="true" /></span>
            <div><strong>{label}</strong><small>{detail}</small></div>
          </li>
        ))}
      </ol>
      <figure className="reference-crop reference-crop--journey">
        <img src={MEDIA[beat.media]} alt={beat.alt} />
      </figure>
    </div>
  );
}

function MatchScene({ beat }) {
  return (
    <div className="match-scene">
      <PhotoScene beat={beat} />
      <article className="match-card">
        <p><BadgeCheck aria-hidden="true" /> Demo sidekick</p>
        <div className="match-card__person">
          <span><UsersRound aria-hidden="true" /></span>
          <div><strong>Meet Alex</strong><small>Finance</small></div>
        </div>
        <dl>
          <div><dt><Sparkles aria-hidden="true" /> In common</dt><dd>Street photography</dd></div>
          <div><dt><Lightbulb aria-hidden="true" /> Discover</dt><dd>A new view of the business</dd></div>
        </dl>
        <small className="match-card__truth">Deterministic matching · consented synthetic demo profile</small>
      </article>
    </div>
  );
}

function PayoffScene({ beat }) {
  return (
    <div className="payoff-scene">
      <figure className="payoff-scene__screen">
        <img src={MEDIA[beat.media]} alt={beat.alt} />
      </figure>
      <div className="payoff-scene__proof">
        <p><ShieldCheck aria-hidden="true" /><span><strong>No private directory</strong><small>Consented demo profiles only</small></span></p>
        <p><Map aria-hidden="true" /><span><strong>Spark Cards stay on this device</strong><small>Progress is device-local</small></span></p>
      </div>
    </div>
  );
}

function BeatVisual({ beat }) {
  if (beat.id === "intent") return <IntentScene beat={beat} />;
  if (beat.id === "format") return <FormatScene beat={beat} />;
  if (beat.id === "match") return <MatchScene beat={beat} />;
  if (beat.id === "payoff") return <PayoffScene beat={beat} />;
  return <PhotoScene beat={beat} />;
}

export function Presentation({ autoStart = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const wasPlayingBeforeHide = useRef(false);
  const reduceMotion = useReducedMotion();
  const beat = STORY_BEATS[currentIndex];

  const goPrevious = useCallback(() => {
    setIsComplete(false);
    setCurrentIndex((index) => Math.max(0, index - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((index) => {
      if (index >= STORY_BEATS.length - 1) {
        setIsPlaying(false);
        setIsComplete(true);
        return index;
      }
      return index + 1;
    });
  }, []);

  const replay = useCallback(() => {
    setCurrentIndex(0);
    setIsComplete(false);
    setIsPlaying(true);
  }, []);

  const togglePlayback = useCallback(() => {
    if (isComplete) {
      replay();
      return;
    }
    setIsPlaying((playing) => !playing);
  }, [isComplete, replay]);

  useEffect(() => {
    if (!isPlaying || isComplete) return undefined;

    const timer = window.setTimeout(goNext, beat.durationMs);
    return () => window.clearTimeout(timer);
  }, [beat.durationMs, currentIndex, goNext, isComplete, isPlaying]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (isEditableTarget(event.target)) return;

      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
      if (event.key === " ") {
        event.preventDefault();
        togglePlayback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious, togglePlayback]);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        wasPlayingBeforeHide.current = isPlaying;
        setIsPlaying(false);
      } else if (wasPlayingBeforeHide.current && !isComplete) {
        wasPlayingBeforeHide.current = false;
        setIsPlaying(true);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isComplete, isPlaying]);

  return (
    <main
      className="presentation"
      data-tone={beat.tone}
      aria-label="SideSpark 60-second presentation"
    >
      <header className="presentation__header">
        <a className="presentation__brand" href="/" aria-label="SideSpark home">
          <Sparkles aria-hidden="true" />
          <span>SideSpark</span>
        </a>
        <p className="presentation__duration">One idea. One minute.</p>
      </header>

      <div className="presentation__progress" aria-hidden="true">
        {STORY_BEATS.map((storyBeat, index) => (
          <span key={storyBeat.id} data-state={index < currentIndex ? "past" : index === currentIndex ? "active" : "future"}>
            <i
              key={`${storyBeat.id}-${currentIndex}-${isPlaying}`}
              style={{
                animationDuration: `${storyBeat.durationMs}ms`,
                animationPlayState: isPlaying && index === currentIndex ? "running" : "paused",
              }}
            />
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={beat.id}
          className={`presentation__beat presentation__beat--${beat.id}`}
          aria-labelledby={`beat-${beat.id}`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="presentation__copy">
            <p className="presentation__kicker">{beat.kicker}</p>
            <h1 id={`beat-${beat.id}`}>{beat.title}</h1>
            <p className="presentation__body">{beat.body}</p>
          </div>

          <BeatVisual beat={beat} />
        </motion.section>
      </AnimatePresence>

      <footer className="presentation__footer">
        <p className="sr-only" role="status" aria-live="polite">
          {isComplete ? "Presentation complete" : `Story ${currentIndex + 1} of ${STORY_BEATS.length}`}
        </p>

        <div className="presentation__counter" aria-hidden="true">
          <strong>{String(currentIndex + 1).padStart(2, "0")}</strong>
          <span>/ {String(STORY_BEATS.length).padStart(2, "0")}</span>
        </div>

        <div className="presentation__controls">
          <button type="button" onClick={goPrevious} disabled={currentIndex === 0} aria-label="Previous story">
            <ChevronLeft aria-hidden="true" />
          </button>
          {isComplete ? (
            <button type="button" onClick={replay} aria-label="Replay presentation">
              <RotateCcw aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              className="presentation__play"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause presentation" : "Play presentation"}
            >
              {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
          )}
          <button type="button" onClick={goNext} disabled={isComplete} aria-label="Next story">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <p className="presentation__time" aria-label="Total duration one minute">
          {Math.floor((currentIndex * 10) / 60)}:{String((currentIndex * 10) % 60).padStart(2, "0")}
          <span> / {Math.floor(TOTAL_DURATION_MS / 60_000)}:00</span>
        </p>
      </footer>
    </main>
  );
}
