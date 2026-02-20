# MongoDB Schema Design

## User
- `name`: string
- `email`: unique string
- `password`: hashed string
- `role`: `admin | user`
- `favorites`: `[TourId]`
- `progress[]`
  - `tourId`
  - `completedScenes[]`
  - `lastSceneId`
  - `durationSeconds`

## Tour
- `title`: string
- `description`: string
- `thumbnailUrl`
- `ambientAudioUrl`
- `scenes[]`
  - `name`
  - `imageUrl`
  - `voiceNarrationUrl`
  - `hotspots[]`
    - `label`
    - `type`: `info | navigation | media`
    - `position`: `[x,y,z]`
    - `content`
    - `targetSceneId`
    - `mediaUrl`
- `analytics`
  - `views`
  - `totalDurationSeconds`
- `createdBy`
