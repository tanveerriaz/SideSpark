export const BREAK_FORMATS = [
  { id: "coffee", label: "Coffee", duration: "15 min" },
  { id: "walk", label: "Walk", duration: "15 min" },
  { id: "lunch", label: "Lunch", duration: "30 min" },
  { id: "desk", label: "Desk Break", duration: "15 min" },
];

const QUESTS = {
  social: {
    coffee: {
      title: "The 30-second role remix",
      prompt:
        "Take turns sharing the story behind your role in 30 seconds. Then find one small way your teams could help each other.",
    },
    walk: {
      title: "Three corners, three discoveries",
      prompt:
        "As you walk, each share one surprising part of your work, one current curiosity, and one place you go to reset.",
    },
    lunch: {
      title: "The table-topic exchange",
      prompt:
        "Trade one recent work win and one thing you would love another team to understand better.",
    },
    desk: {
      title: "Tiny tour, fresh perspective",
      prompt:
        "Show each other one tool or object on your desk and tell the short story behind why it matters.",
    },
  },
  skill: {
    coffee: {
      title: "Teach it over a sip",
      prompt:
        "Each person demonstrates one useful technique. The learner tries it and explains it back in their own words.",
    },
    walk: {
      title: "Walk-and-talk masterclass",
      prompt:
        "Share one technique step by step while you walk. At the halfway point, swap teacher and learner roles.",
    },
    lunch: {
      title: "Skill tasting menu",
      prompt:
        "Each person shares one practical shortcut, one common mistake, and one next step the other can try tomorrow.",
    },
    desk: {
      title: "The 15-minute skill sprint",
      prompt:
        "Give a five-minute demonstration, let your sidekick try it, then exchange one piece of useful feedback.",
    },
  },
};

export function getQuest(intent, format) {
  return QUESTS[intent]?.[format] ?? null;
}

export function getFormat(format) {
  return BREAK_FORMATS.find((item) => item.id === format);
}
