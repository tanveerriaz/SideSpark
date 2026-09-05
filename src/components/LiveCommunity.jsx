import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  Globe2,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";

import communityChain from "../assets/brand/community-chain.png";
import skillSwap from "../assets/brand/skill-swap.png";
import socialConnect from "../assets/brand/social-connect.png";
import sparkAccent from "../assets/brand/spark-accent.png";

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ block: "start" });
}

export function LiveCommunity({ onExploreDemo }) {
  const [showFoundingDetails, setShowFoundingDetails] = useState(false);

  function openFoundingDetails() {
    setShowFoundingDetails(true);
    window.setTimeout(() => document.querySelector("#founding-host-details")?.focus(), 0);
  }

  return (
    <div className="live-community">
      <section className="live-opening" aria-labelledby="live-community-title">
        <img className="live-opening__accent live-opening__accent--top" src={sparkAccent} alt="" />
        <img className="live-opening__accent live-opening__accent--side" src={sparkAccent} alt="" />
        <div className="live-opening__copy">
          <p className="live-opening__eyebrow"><Sparkles aria-hidden="true" /> Free community experiences</p>
          <h1 id="live-community-title" tabIndex="-1">Take a break. <span>Find your spark.</span></h1>
          <p>Share something you know. Join something you’re curious about.</p>
        </div>

        <div className="live-intentions" aria-label="Ways to use SideSpark">
          <section className="live-intention live-intention--coral" aria-labelledby="live-host-title">
            <div className="live-intention__art">
              <img src={skillSwap} alt="Two people sharing a practical skill" />
            </div>
            <div className="live-intention__copy">
              <p>Skill Swap</p>
              <h2 id="live-host-title">Host something</h2>
              <p>Show one practical thing you know, online or in person.</p>
              <button type="button" onClick={openFoundingDetails}>
                Become a founding host <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </section>

          <section className="live-intention live-intention--mint" aria-labelledby="live-find-title">
            <div className="live-intention__art">
              <img src={socialConnect} alt="Two people making a new connection" />
            </div>
            <div className="live-intention__copy">
              <p>Social Connect</p>
              <h2 id="live-find-title">Find something</h2>
              <p>Reserve a place to learn, walk, make, or talk with others.</p>
              <button type="button" onClick={() => scrollToSection("#live-experiences")}>
                See live experiences <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      </section>

      <section className="live-trust" aria-label="How the community will work">
        <span><MapPin aria-hidden="true" /><strong>Singapore-first</strong> for in-person sessions</span>
        <span><Globe2 aria-hidden="true" /><strong>Global online</strong> for remote sessions</span>
        <span><UsersRound aria-hidden="true" /><strong>Adults 18+</strong> in pairs or small groups</span>
        <span><CalendarCheck2 aria-hidden="true" /><strong>Free to join</strong> with credits after attendance</span>
      </section>

      <section className="live-empty" id="live-experiences" aria-labelledby="live-experiences-title">
        <div className="live-empty__art">
          <img src={communityChain} alt="A chain of people connected by SideSpark" />
        </div>
        <div className="live-empty__copy">
          <p className="marketplace-kicker">Live community</p>
          <h2 id="live-experiences-title">No live experiences are listed yet.</h2>
          <p>We’re inviting the first Singapore hosts now.</p>
          <div className="live-empty__actions">
            <button className="marketplace-primary" type="button" onClick={openFoundingDetails}>
              Become a founding host <ArrowRight aria-hidden="true" />
            </button>
            <button className="live-secondary" type="button" onClick={onExploreDemo}>
              Explore demo mode
            </button>
          </div>
          {showFoundingDetails ? (
            <div className="founding-host-details" id="founding-host-details" tabIndex="-1">
              <BadgeCheck aria-hidden="true" />
              <p><strong>What founding hosts will need</strong>A verified adult account, one free experience, a date, and a public area or online format. This prototype does not collect those details yet.</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
