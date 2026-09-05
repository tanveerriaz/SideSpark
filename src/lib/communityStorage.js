const STORAGE_KEY = "sidespark-community-demo-v1";

const EMPTY_STATE = Object.freeze({
  localExperiences: [],
  bookings: [],
});

export function loadCommunityState(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_STATE, persisted: true };
    const parsed = JSON.parse(raw);
    return {
      localExperiences: Array.isArray(parsed.localExperiences) ? parsed.localExperiences : [],
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
      persisted: true,
    };
  } catch {
    return { ...EMPTY_STATE, persisted: false };
  }
}

export function saveCommunityState(state, storage = globalThis.localStorage) {
  const nextState = {
    localExperiences: state.localExperiences ?? [],
    bookings: state.bookings ?? [],
  };

  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(nextState));
    return { ...nextState, persisted: true };
  } catch {
    return { ...nextState, persisted: false };
  }
}
