const STORAGE_KEY = "sidespark-demo-progress-v1";

export function loadProgress(storage = window.localStorage) {
  try {
    const stored = JSON.parse(storage.getItem(STORAGE_KEY) || "null");
    return {
      completedIds: Array.isArray(stored?.completedIds) ? stored.completedIds : [],
      cards: Array.isArray(stored?.cards) ? stored.cards : [],
    };
  } catch {
    return { completedIds: [], cards: [] };
  }
}

export function saveCompletion({ profile, card }, storage = window.localStorage) {
  try {
    const current = loadProgress(storage);
    const completedIds = [...new Set([...current.completedIds, card.sidekickId])];
    const next = {
      profile: {
        firstName: profile.firstName,
        team: profile.team,
        interests: profile.interests,
        offers: profile.offers,
        wants: profile.wants,
      },
      completedIds,
      cards: [...current.cards, card],
    };
    storage.setItem(STORAGE_KEY, JSON.stringify(next));
    return { persisted: true, progress: next };
  } catch {
    return {
      persisted: false,
      progress: { completedIds: [card.sidekickId], cards: [card] },
    };
  }
}
