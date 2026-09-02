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

const AI_QUESTS = {
  coffee: {
    kind: "ai-practice",
    title: "The prompt remix challenge",
    prompt: "Turn a vague request into a prompt you could reuse.",
    steps: [
      "Pick one safe fictional work task, such as drafting a project update.",
      "Write a first prompt with a clear goal, context, and constraints.",
      "Swap prompts. Improve one detail each, then explain what should change in the result.",
    ],
    learningOutcome: "Learn how specific context and constraints make a prompt more useful.",
    safetyNote: "Use fictional or non-sensitive content. Do not enter confidential, personal, or sensitive work information.",
  },
  walk: {
    kind: "ai-practice",
    title: "The walk-and-talk prompt relay",
    prompt: "Build a stronger prompt aloud, one useful layer at a time.",
    steps: [
      "Choose a safe fictional work task and name the result you want.",
      "Let your sidekick ask two questions that add useful context or constraints.",
      "Swap roles halfway, then each repeat the prompt in its improved form.",
    ],
    learningOutcome: "Learn how clarifying questions turn a vague request into an actionable prompt.",
    safetyNote: "Use fictional or non-sensitive content. Do not enter confidential, personal, or sensitive work information.",
  },
  lunch: {
    kind: "ai-practice",
    title: "The three-course prompt test",
    prompt: "Build and critique a useful prompt in three short rounds.",
    steps: [
      "Starter: agree on a safe fictional task and a clear goal.",
      "Main: add the context, constraints, and output format an AI would need.",
      "Dessert: challenge one assumption, revise the prompt, and keep the strongest pattern.",
    ],
    learningOutcome: "Learn a repeatable structure for prompting: goal, context, constraints, and format.",
    safetyNote: "Use fictional or non-sensitive content. Do not enter confidential, personal, or sensitive work information.",
  },
  desk: {
    kind: "ai-practice",
    title: "The 15-minute prompt lab",
    prompt: "Test one prompt, inspect the result, and make one evidence-based improvement.",
    steps: [
      "Choose a safe fictional task and write a prompt with a goal, context, and constraints.",
      "Use an approved AI tool if available, or predict and discuss the likely result together.",
      "Change one part of the prompt, then note why the revised version should work better.",
    ],
    learningOutcome: "Learn to improve a prompt by changing one variable and evaluating the difference.",
    safetyNote: "Use fictional or non-sensitive content. Do not enter confidential, personal, or sensitive work information.",
  },
};

function includesAiPrompting(profile) {
  return [...(profile?.offers ?? []), ...(profile?.wants ?? [])]
    .some((skill) => skill.trim().toLowerCase() === "ai prompting");
}

export function getQuest(intent, format, profile) {
  if (intent === "skill" && includesAiPrompting(profile)) {
    return AI_QUESTS[format] ?? null;
  }
  return QUESTS[intent]?.[format] ?? null;
}

export function getFormat(format) {
  return BREAK_FORMATS.find((item) => item.id === format);
}
