import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Plus,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  CalendarCheckIn01Icon,
  HandHeartIcon,
  UserShield01Icon,
} from "@hugeicons/core-free-icons";
import { motion, MotionConfig } from "motion/react";

import sidesparkMark from "../assets/brand/sidespark-mark.png";
import sparkAccent from "../assets/brand/spark-accent.png";
import { EXPERIENCES } from "../data/experiences.js";
import { loadCommunityState, saveCommunityState } from "../lib/communityStorage.js";
import { createBooking, createLocalExperience, filterExperiences } from "../lib/marketplace.js";
import { ExperienceCard } from "./ExperienceCard.jsx";
import { ExperienceDetail } from "./ExperienceDetail.jsx";
import { HostExperienceForm } from "./HostExperienceForm.jsx";
import { LiveCommunity } from "./LiveCommunity.jsx";
import { ReputationProfile } from "./ReputationProfile.jsx";
import { ThemedIcon } from "./ThemedIcon.jsx";

const DEFAULT_FILTERS = { query: "", format: "all", group: "all" };

function scrollToPageStart() {
  const behavior = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  window.setTimeout(() => window.scrollTo?.({ top: 0, behavior }), 0);
}

function focusPageHeading(selector) {
  window.setTimeout(() => document.querySelector(selector)?.focus(), 0);
}

function FilterButton({ active, children, onClick }) {
  return (
    <button
      className="filter-pill"
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function CommunityMarketplace({ onOpenClassic }) {
  const [communityMode, setCommunityMode] = useState("live");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [communityState, setCommunityState] = useState(() => loadCommunityState());
  const [route, setRoute] = useState("discover");
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [persistenceNotice, setPersistenceNotice] = useState("");
  const allExperiences = useMemo(
    () => [...communityState.localExperiences, ...EXPERIENCES],
    [communityState.localExperiences],
  );
  const visibleExperiences = useMemo(
    () => filterExperiences(allExperiences, filters),
    [allExperiences, filters],
  );

  function setFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function goDiscover() {
    setRoute("discover");
    setSelectedExperience(null);
    scrollToPageStart();
  }

  function openExperience(experience) {
    setSelectedExperience(experience);
    setRoute("detail");
    scrollToPageStart();
  }

  function openHost() {
    setRoute("host");
    setSelectedExperience(null);
    scrollToPageStart();
  }

  function openProfile() {
    setRoute("profile");
    setSelectedExperience(null);
    scrollToPageStart();
  }

  function enterDemoMode() {
    setCommunityMode("demo");
    setRoute("discover");
    setSelectedExperience(null);
    scrollToPageStart();
    focusPageHeading("#marketplace-title");
  }

  function leaveDemoMode() {
    setCommunityMode("live");
    setRoute("discover");
    setSelectedExperience(null);
    scrollToPageStart();
    focusPageHeading("#live-community-title");
  }

  function publishExperience(draft) {
    const experience = createLocalExperience(draft);
    const saved = saveCommunityState({
      ...communityState,
      localExperiences: [experience, ...communityState.localExperiences],
    });
    setCommunityState(saved);
    setPersistenceNotice(saved.persisted ? "Your device-only draft is now first in discovery." : "This draft lasts for this visit only.");
    goDiscover();
  }

  function bookSelectedExperience() {
    if (!selectedExperience) return;
    const existing = communityState.bookings.find((booking) => booking.experienceId === selectedExperience.id);
    if (existing) return;
    const booking = createBooking({ experience: selectedExperience });
    const saved = saveCommunityState({
      ...communityState,
      bookings: [...communityState.bookings, booking],
    });
    setCommunityState(saved);
    setPersistenceNotice(saved.persisted ? "" : "This booking lasts for this visit only.");
  }

  const selectedBooking = selectedExperience
    ? communityState.bookings.find((booking) => booking.experienceId === selectedExperience.id)
    : null;

  return (
    <MotionConfig reducedMotion="user">
      <main className="marketplace-shell">
      <header className="marketplace-header">
        <button className="marketplace-brand" type="button" onClick={communityMode === "demo" ? goDiscover : leaveDemoMode} aria-label="SideSpark discover home">
          <img src={sidesparkMark} alt="SideSpark spark mark" />
          <span>SideSpark</span>
        </button>
        <nav className="marketplace-nav" aria-label="Marketplace navigation">
          <button className={communityMode === "live" ? "marketplace-nav__active" : ""} type="button" aria-pressed={communityMode === "live"} onClick={leaveDemoMode}>Live community</button>
          {communityMode === "demo" ? <>
          <button className={route === "discover" ? "marketplace-nav__active" : ""} type="button" onClick={goDiscover}>Demo experiences</button>
          <button className={route === "host" ? "marketplace-nav__active" : ""} type="button" onClick={openHost}>Demo host</button>
          <button className={`demo-profile-button ${route === "profile" ? "marketplace-nav__active" : ""}`} type="button" onClick={openProfile}>
            <UserRound aria-hidden="true" /> Demo profile
          </button>
          </> : <button type="button" aria-pressed="false" onClick={enterDemoMode}>Demo mode</button>}
        </nav>
      </header>

      {communityMode === "live" ? (
        <LiveCommunity onExploreDemo={enterDemoMode} />
      ) : <>
      <div className="demo-mode-disclosure" role="status">
        <strong>Demo mode.</strong> Every name, profile and experience below is fictional. Nothing here connects you to a real person.
      </div>
      {route === "detail" && selectedExperience ? (
        <ExperienceDetail
          experience={selectedExperience}
          booking={selectedBooking}
          onBack={goDiscover}
          onBook={bookSelectedExperience}
          persistenceNotice={persistenceNotice}
        />
      ) : route === "host" ? (
        <HostExperienceForm onBack={goDiscover} onPublish={publishExperience} />
      ) : route === "profile" ? (
        <ReputationProfile onBack={goDiscover} />
      ) : (
        <>
      <section className="marketplace-hero" aria-labelledby="marketplace-title">
        <img className="marketplace-hero__accent" src={sparkAccent} alt="" />
        <motion.div
          className="marketplace-hero__copy"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="marketplace-kicker"><Sparkles aria-hidden="true" /> Free community experiences</p>
          <h1 id="marketplace-title" tabIndex="-1">Share something you know. <span>Join something you’re curious about.</span></h1>
          <p>Try the fictional sessions to see how finding, booking, hosting, credits, and badges would work. Nothing is sent to a real person.</p>
          <div className="marketplace-hero__actions">
            <button className="marketplace-primary" type="button" onClick={() => document.querySelector("#discover")?.scrollIntoView()}>
              See demo experiences <Compass aria-hidden="true" />
            </button>
            <button className="marketplace-secondary" type="button" onClick={openHost}>
              Create demo listing <Plus aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <aside className="marketplace-promise" aria-label="How SideSpark works">
          <p className="marketplace-promise__label">How this demo works</p>
          <h2 className="marketplace-promise__title">Choose a fictional session and run the full flow.</h2>
          <div className="marketplace-promise__route">
            <span><strong>1</strong> Pick</span>
            <ArrowRight aria-hidden="true" />
            <span><strong>2</strong> Meet</span>
            <ArrowRight aria-hidden="true" />
            <span><strong>3</strong> Confirm</span>
          </div>
          <p><BadgeCheck aria-hidden="true" /> Credits recognise completed sessions. They are never money and never required to join.</p>
        </aside>
      </section>

      <section className="trust-row" aria-label="Community commitments">
        <span><ThemedIcon icon={UserShield01Icon} /><strong>18+ community</strong> for adults</span>
        <span><ThemedIcon icon={HandHeartIcon} /><strong>Always free</strong> to host and join</span>
        <span><ThemedIcon icon={CalendarCheckIn01Icon} /><strong>Attendance-confirmed credits</strong>, not popularity points</span>
      </section>

      <section className="discovery-section" id="discover" aria-labelledby="discovery-title">
        <div className="discovery-heading">
          <div>
            <p className="marketplace-kicker">Demo experiences</p>
            <h2 id="discovery-title">Demo sessions to try</h2>
          </div>
          <p>Showing <strong>{visibleExperiences.length}</strong> of {allExperiences.length} demo experiences.</p>
        </div>

        <div className="discovery-controls">
          <label className="experience-search">
            <span>Search experiences</span>
            <span className="experience-search__control">
              <Search aria-hidden="true" />
              <input
                type="search"
                value={filters.query}
                onChange={(event) => setFilter("query", event.target.value)}
                placeholder="Try photography, career, or Tiong Bahru"
              />
            </span>
          </label>

          <div className="filter-groups">
            <fieldset>
              <legend>Where</legend>
              <FilterButton active={filters.format === "all"} onClick={() => setFilter("format", "all")}>All formats</FilterButton>
              <FilterButton active={filters.format === "online"} onClick={() => setFilter("format", "online")}>Online</FilterButton>
              <FilterButton active={filters.format === "in-person"} onClick={() => setFilter("format", "in-person")}>In person</FilterButton>
            </fieldset>
            <fieldset>
              <legend>Group size</legend>
              <FilterButton active={filters.group === "all"} onClick={() => setFilter("group", "all")}>All groups</FilterButton>
              <FilterButton active={filters.group === "one-to-one"} onClick={() => setFilter("group", "one-to-one")}>One-to-one</FilterButton>
              <FilterButton active={filters.group === "small-group"} onClick={() => setFilter("group", "small-group")}>Small group</FilterButton>
            </fieldset>
          </div>
        </div>

        {visibleExperiences.length ? (
          <div className="experience-grid" aria-label="Community experiences">
            {visibleExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} onOpen={openExperience} />
            ))}
          </div>
        ) : (
          <div className="marketplace-empty" role="status">
            <Sparkles aria-hidden="true" />
            <h3>No sparks fit those filters</h3>
            <p>Try a broader topic, format, or group size.</p>
            <button className="marketplace-secondary" type="button" onClick={resetFilters}>Reset filters</button>
          </div>
        )}
      </section>

      <section className="classic-demo-callout" aria-labelledby="classic-demo-title">
        <div>
          <p className="marketplace-kicker">The original SideSpark journey</p>
          <h2 id="classic-demo-title">Prefer a guided match?</h2>
          <p>Try the existing local Skill Swap and Social Connect journey with fictional, consented demo profiles.</p>
        </div>
        <button className="marketplace-secondary marketplace-secondary--light" type="button" onClick={onOpenClassic}>
          Classic guided demo <ArrowRight aria-hidden="true" />
        </button>
      </section>
        </>
      )}
      </>}

      <footer className="marketplace-footer">
        <p><strong>SideSpark community prototype.</strong> No real accounts, people, bookings, or notifications are connected yet.</p>
        <a href="/presentation.html">Watch the original 60-sec pitch <ArrowRight aria-hidden="true" /></a>
      </footer>
      </main>
    </MotionConfig>
  );
}
