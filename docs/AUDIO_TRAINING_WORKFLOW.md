# Audio Training Workflow

This document captures how Loan Factory turns NotebookLM audio overviews and other source grounded audio into training assets for the Elite Sales and Marketing Training Series.

## Source of truth

1. Curriculum content lives in `src/data/`.
2. Audio files live in `public/audio/`.
3. Each audio item is registered in `src/data/audioTraining.ts` with a `category` so the page groups it correctly.
4. Transcript placeholders live in `docs/audio-transcripts/`.

## Categories

Audio briefs are grouped on the page into:

1. `sales-psychology` Sales Psychology and Borrower Conversion
2. `realtor-trust` Referral Partner and Realtor Trust
3. `broker-value-and-guarantee` Broker Value Proposition and Guarantee Conversations
4. `training-blueprint` Training Blueprint and Coaching Strategy

When adding a new item, set `category` to one of the four ids above.

## What we use NotebookLM audio overviews for

A NotebookLM audio overview is one source. From it we can produce several downstream training assets. Every downstream asset still requires LO review, and anything borrower facing, Realtor facing, or public requires compliance review.

1. Supplemental audio briefs. Hosted on `/audio-training/` as study material before or after a module.
2. HeyGen video podcast scripts. The audio is reworked into a tight script Jeremy or an avatar can deliver on camera for short form video.
3. Short training nuggets. Pull a 60 second chunk and use it as a Monday team motivator or a Friday review prompt.
4. Coach discussion prompts. One question per audio that a coach uses to open a coaching session.
5. Team leader discussion questions. One question per audio for the Monday team kickoff.
6. Quiz questions. Five to ten questions that test whether the LO captured the main ideas.
7. Flashcards. One side prompt, one side answer, used for repetition learning.
8. Transcript based study guides. A one page summary tied to the matching module page.

## Pipeline

1. Record or generate. NotebookLM audio overview, live session replay, coach recording.
2. Drop. Save the audio file under `public/audio/` with a clean snake_case filename.
3. Register. Add a `AudioTrainingItem` to `src/data/audioTraining.ts` with id, title, description, skill level, related modules, suggested use, compliance note, and the transcript placeholder path.
4. Placeholder. Create the transcript placeholder under `docs/audio-transcripts/` marked `Transcript status: Pending`.
5. Publish. The audio appears on `/audio-training/` automatically.
6. Transcribe. Generate the transcript when ready. Update the placeholder file. Update the `transcriptStatus` in the data file to `Draft` then `Approved`.
7. Derive. Use the workflow assets above to produce coach prompts, team leader questions, quiz items, and HeyGen scripts.

## What we do not do

1. Do not fake transcripts.
2. Do not present supplemental audio as official compliance guidance.
3. Do not extract verbatim audio quotes into borrower facing artifacts without compliance review.
4. Do not commit large audio files outside `public/audio/`.
5. Do not promise specific production results from any audio overview.

## Adding a new audio file (quick checklist)

1. Drop the file into `public/audio/` with a snake_case filename.
2. Add a new entry to `src/data/audioTraining.ts`.
3. Create a transcript placeholder under `docs/audio-transcripts/`.
4. Build locally (`npm run build`) to confirm the page renders.
5. Walk the page and confirm the player works.
6. Update `transcriptStatus` when the transcript is ready.
