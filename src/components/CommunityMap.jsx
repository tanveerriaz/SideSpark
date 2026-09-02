import { Network, Sparkles, UsersRound } from "lucide-react";
import { motion } from "motion/react";

export function CommunityMap({ user, sidekick }) {
  return (
    <section className="community-map" aria-labelledby="community-map-title">
      <div className="community-map__heading">
        <span className="community-map__icon" aria-hidden="true"><Network /></span>
        <div>
          <p className="section-kicker">One new demo connection</p>
          <h2 id="community-map-title">Demo community map</h2>
        </div>
      </div>
      <motion.div
        className="connection-card"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span><UsersRound aria-hidden="true" />{user.firstName}<small>{user.team}</small></span>
        <Sparkles className="connection-spark" aria-hidden="true" />
        <span><UsersRound aria-hidden="true" />{sidekick.firstName}<small>{sidekick.team}</small></span>
      </motion.div>
      <p className="map-note">This map shows fictional demo activity plus the Spark Card you just completed on this device.</p>
    </section>
  );
}
