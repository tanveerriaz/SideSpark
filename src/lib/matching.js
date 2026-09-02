function normalise(value) {
  return value?.trim().toLowerCase() ?? "";
}

function overlap(first = [], second = []) {
  const values = new Set(second.map(normalise));
  return first.map(normalise).filter((value) => value && values.has(value));
}

function scoreSocialConnect(user, candidate) {
  const sharedInterests = overlap(user.interests, candidate.interests);
  let score = normalise(user.team) === normalise(candidate.team) ? -4 : 4;
  if (sharedInterests.length > 0) score += 3;
  if (sharedInterests.length === 1) score += 2;
  if (overlap(user.wants, candidate.offers).length > 0) score += 2;
  score += 1;
  return { score, sharedInterests };
}

function scoreSkillSwap(user, candidate) {
  const candidateCanTeach = overlap(user.wants, candidate.offers);
  const userCanTeach = overlap(user.offers, candidate.wants);
  const sharedInterests = overlap(user.interests, candidate.interests);
  let score = 0;
  if (candidateCanTeach.length > 0) score += 6;
  if (userCanTeach.length > 0) score += 5;
  if (normalise(user.team) !== normalise(candidate.team)) score += 2;
  if (sharedInterests.length > 0) score += 1;
  score += 1;
  return { score, sharedInterests, candidateCanTeach, userCanTeach };
}

export function findBestMatch({
  user,
  candidates,
  intent,
  format,
  completedIds = [],
}) {
  if (intent !== "social" && intent !== "skill") return null;

  const completed = new Set(completedIds);
  const scored = candidates
    .filter(
      (candidate) =>
        candidate.consentedForDemo === true &&
        candidate.id !== user.id &&
        candidate.formats.includes(format) &&
        !completed.has(candidate.id),
    )
    .map((candidate) => ({
      candidate,
      ...(intent === "skill"
        ? scoreSkillSwap(user, candidate)
        : scoreSocialConnect(user, candidate)),
    }))
    .filter((result) => intent !== "social" || result.sharedInterests.length > 0)
    .sort(
      (first, second) =>
        second.score - first.score ||
        first.candidate.id.localeCompare(second.candidate.id),
    );

  return scored[0]?.score >= 5 ? scored[0] : null;
}
