import { getFormat } from "../data/quests.js";

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function createIntroduction({ user, result, intent, format }) {
  const { candidate } = result;
  const breakLabel = getFormat(format)?.label ?? "break";

  if (intent === "skill") {
    const teaching = result.candidateCanTeach?.[0] ?? candidate.offers[0];
    const sharing = result.userCanTeach?.[0] ?? user.offers[0];
    return {
      commonGround: `${candidate.firstName} can share ${titleCase(teaching)}, while you can share ${titleCase(sharing)}.`,
      discovery: `You will bring perspectives from ${user.team} and ${candidate.team}.`,
      text: `Use your ${breakLabel.toLowerCase()} to trade one practical technique each, then try it together.`,
    };
  }

  const interest = result.sharedInterests?.[0];
  return {
    commonGround: interest
      ? `You both enjoy ${titleCase(interest)}.`
      : `You both chose a ${breakLabel.toLowerCase()} break.`,
    discovery: `${candidate.firstName} brings a ${candidate.team} view you may not usually encounter.`,
    text: `Use this ${breakLabel.toLowerCase()} to trade the stories behind your roles and find one useful connection.`,
  };
}
