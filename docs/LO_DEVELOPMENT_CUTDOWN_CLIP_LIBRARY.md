# LO Development Cutdown Clip Library

The LO Development cutdown library stages 91 internal Loan Factory training clips inside the platform.

## Current State

- 91 internal Loan Factory training clips are staged.
- All clips are visible to approved Loan Factory loan officers and employees.
- No MP4 files are committed to the platform repository.
- No local absolute file paths are exposed in client-shipped code.
- No YouTube uploads were triggered.
- YouTube embed URLs will be added later after upload.
- This is an internal Loan Factory training library, not consumer marketing content.

## Platform Route

- `/training-library/clips`

## Clip Metadata

Each card uses sanitized metadata: title, summary, learning outcome, section, audience, category, tags, duration, priority, source training name, and video status.

## Video Status

All clips currently show `YouTube embed not added yet`. The page does not embed local MP4 files and does not invent YouTube URLs.
