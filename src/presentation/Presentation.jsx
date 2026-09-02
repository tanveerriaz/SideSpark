import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

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

export function Presentation({ autoStart = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const wasPlayingBeforeHide = useRef(false);
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

      <section className="presentation__beat" aria-labelledby={`beat-${beat.id}`}>
        <div className="presentation__copy">
          <p className="presentation__kicker">{beat.kicker}</p>
          <h1 id={`beat-${beat.id}`}>{beat.title}</h1>
          <p className="presentation__body">{beat.body}</p>
        </div>

        <figure className={`presentation__media presentation__media--${beat.mediaType}`}>
          <img src={MEDIA[beat.media]} alt={beat.alt} />
          {beat.disclosure ? <figcaption>{beat.disclosure}</figcaption> : null}
        </figure>
      </section>

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
