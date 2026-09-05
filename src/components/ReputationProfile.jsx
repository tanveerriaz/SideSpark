import { ArrowLeft, CircleHelp } from "lucide-react";
import {
  Award01Icon,
  GlobalIcon,
  HandHeartIcon,
  MapsLocation01Icon,
  ShieldCheckIcon,
  SparklesIcon,
  UserAdd02Icon,
  UserGroup02Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { motion } from "motion/react";

import { ThemedIcon } from "./ThemedIcon.jsx";

const BADGES = [
  { name: "First Spark", state: "earned", detail: "Completed your first confirmed session", icon: SparklesIcon, tone: "sun" },
  { name: "Connector", state: "progress", detail: "2 of 3 peers", icon: UserMultiple02Icon, tone: "coral" },
  { name: "Skill Giver", state: "locked", detail: "Host 3 completed skill-sharing sessions", icon: HandHeartIcon, tone: "mint" },
  { name: "Circle Builder", state: "locked", detail: "Host a completed small-group experience", icon: UserGroup02Icon, tone: "blue" },
  { name: "Reliable Sidekick", state: "progress", detail: "4 of 5 sessions without a late cancellation", icon: ShieldCheckIcon, tone: "violet" },
  { name: "Welcome Spark", state: "locked", detail: "Host 3 first-time guests", icon: UserAdd02Icon, tone: "mint" },
  { name: "Island Explorer", state: "progress", detail: "2 of 3 Singapore neighborhoods", icon: MapsLocation01Icon, tone: "coral" },
  { name: "Global Spark", state: "locked", detail: "Meet online with peers in 3 countries", icon: GlobalIcon, tone: "blue" },
];

function stateLabel(state) {
  if (state === "earned") return "Earned";
  if (state === "progress") return "In progress";
  return "Locked";
}

export function ReputationProfile({ onBack }) {
  return (
    <motion.div className="profile-page" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <button className="marketplace-back" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" /> Back to discover</button>

      <section className="profile-hero" aria-labelledby="profile-title">
        <div className="profile-identity">
          <span className="profile-identity__icon" aria-hidden="true"><CircleHelp /></span>
          <div><p className="marketplace-kicker">Fictional demo profile</p><h1 id="profile-title">Maya’s community profile</h1><p>Curious about cities, creative skills and the stories people carry.</p></div>
        </div>
        <div className="profile-credit-card">
          <span aria-hidden="true"><ThemedIcon icon={Award01Icon} /></span>
          <p><strong>110 reputation credits</strong><small>Non-spendable recognition for confirmed participation</small></p>
        </div>
      </section>

      <section className="profile-explanation" aria-labelledby="credits-title">
        <div>
          <p className="marketplace-kicker">Trust, not currency</p>
          <h2 id="credits-title">Credits show how you participate</h2>
          <p>Booking a place or publishing an experience earns nothing. Credits are added only when both people confirm that the session happened. A disputed confirmation would need a review.</p>
        </div>
        <dl>
          <div><dt>Completed</dt><dd>4 sessions</dd></div>
          <div><dt>Hosted</dt><dd>1 session</dd></div>
          <div><dt>Reliability</dt><dd>100% demo record</dd></div>
        </dl>
      </section>

      <section className="badge-section" aria-labelledby="badges-title">
        <div className="badge-section__heading">
          <div><p className="marketplace-kicker">How badges would be earned</p><h2 id="badges-title">Example badge path</h2></div>
          <p><strong>Next:</strong> meet one new peer to earn Connector.</p>
        </div>
        <ul className="badge-grid" aria-label="Badge collection">
          {BADGES.map(({ name, state, detail, icon, tone }) => (
            <li className={`badge-card badge-card--${state} badge-card--${tone}`} key={name}>
              <span className="badge-card__medal" aria-hidden="true"><ThemedIcon icon={icon} /></span>
              <span className="badge-card__state">{stateLabel(state)}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <aside className="profile-safety-note">
        <ThemedIcon icon={ShieldCheckIcon} />
        <p><strong>No popularity contest.</strong> SideSpark does not rank people. Badges recognise reliable, generous participation and never gate a free experience.</p>
      </aside>
    </motion.div>
  );
}
