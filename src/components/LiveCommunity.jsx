export function LiveCommunity({ onExploreDemo }) {
  return (
    <section className="live-community" aria-labelledby="live-community-title">
      <p className="marketplace-kicker">Live community</p>
      <h1 id="live-community-title" tabIndex="-1">No live experiences are listed yet.</h1>
      <p>We’re inviting the first Singapore hosts now.</p>
      <button className="marketplace-primary" type="button" onClick={onExploreDemo}>
        Explore demo mode
      </button>
    </section>
  );
}
