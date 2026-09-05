import { useEffect, useRef, useState } from "react";
import { Pause, Play, Sparkles } from "lucide-react";

import officeAdUrl from "../assets/video/sidespark-office-ad.mp4";
import officeAdPosterUrl from "../assets/video/sidespark-office-ad-poster.jpg";

export function OfficeAd() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!video || reducedMotion) return undefined;

    let active = true;
    video.play().then(
      () => {
        if (active) setIsPlaying(true);
      },
      () => {
        if (active) setIsPlaying(false);
      },
    );

    return () => {
      active = false;
    };
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <section className="office-ad" aria-labelledby="office-ad-title">
      <div className="office-ad__intro">
        <p className="office-ad__kicker">
          <Sparkles aria-hidden="true" /> 18 seconds of SideSpark
        </p>
        <h2 id="office-ad-title">See a SideSpark sidequest</h2>
        <p>Coffee, a quick walk, or one useful skill—small breaks can open up a whole new corner of your world.</p>
      </div>

      <div className="office-ad__media">
        <video
          ref={videoRef}
          aria-label="Adults sharing coffee, a walk, and a practical skill"
          aria-describedby="office-ad-disclosure"
          loop
          muted
          playsInline
          poster={officeAdPosterUrl}
          preload="metadata"
          src={officeAdUrl}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
        <button
          className="office-ad__control"
          type="button"
          aria-label={`${isPlaying ? "Pause" : "Play"} office ad`}
          onClick={togglePlayback}
        >
          {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
      </div>

      <p className="office-ad__disclosure" id="office-ad-disclosure">
        The people shown are fictional characters created for this demo.
      </p>
    </section>
  );
}
