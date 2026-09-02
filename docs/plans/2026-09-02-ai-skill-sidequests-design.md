# AI Skill Sidequests Design

## Goal

Make an AI-focused Skill Swap feel like a practical learning challenge instead of a generic social conversation, without turning AI into SideSpark's main purpose.

## Selected approach

SideSpark will keep Social Connect quests and non-AI Skill Swap quests unchanged. When the participant enters `AI prompting` as either the skill they can share or the skill they want to learn, the app will deterministically select an AI-practice quest for the chosen break format.

Each AI-practice quest will include:

- a playful, format-specific challenge title;
- a short sequence that teaches a reusable prompting habit;
- an explicit learning outcome; and
- a reminder to use fictional or non-sensitive work content.

The exercise may be completed with an organisation-approved AI tool or discussed as a paper exercise. SideSpark itself will not make an AI call and will continue to say so.

## Alternatives considered

1. Make every SideSpark quest about AI. This would satisfy the feedback literally, but it would erase Social Connect and conflict with SideSpark's connection-first product contract.
2. Add AI wording to the existing generic quest. This is a small change, but it would not create a meaningful skill challenge or learning outcome.
3. Select a dedicated AI quest only for AI-focused Skill Swaps. This preserves the two product intentions while making the relevant journey genuinely useful. This is the selected approach.

## Data and component flow

`getQuest` will receive the current profile in addition to the selected intention and break format. It will normalise the participant's offered and wanted skills, choose an AI quest when either contains `AI prompting`, and otherwise return the existing quest.

`QuestCard` will render optional structured steps, learning outcome, and safety note when those fields are present. Existing quest objects remain valid, so Social Connect and ordinary Skill Swap rendering do not change.

## Accessibility and truthfulness

The challenge remains readable without animation, uses semantic list markup for its steps, and adds no new interaction target. Copy will not imply that SideSpark runs an AI model. The safety reminder will prohibit confidential, personal, or sensitive work information.

## Verification

- Unit-test AI quest selection for both learning and sharing `AI prompting`.
- Unit-test that a Social Connect profile mentioning AI still receives the Social Connect quest.
- Exercise a complete AI Skill Swap journey and assert the structured challenge, learning outcome, safety note, and no-AI-call disclosure.
- Run the full test suite and production build.
- Inspect the complete mobile journey at 320px and a desktop viewport in the local browser.
