import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const toggleFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { tourId } = req.body;
  const exists = user.favorites.some((id) => id.toString() === tourId);
  user.favorites = exists
    ? user.favorites.filter((id) => id.toString() !== tourId)
    : [...user.favorites, tourId];
  await user.save();
  res.json({ favorites: user.favorites });
});

export const updateProgress = asyncHandler(async (req, res) => {
  const { tourId, sceneId, durationSeconds } = req.body;
  const user = await User.findById(req.user._id);
  const record = user.progress.find((item) => item.tourId.toString() === tourId);

  if (record) {
    if (!record.completedScenes.some((id) => id.toString() === sceneId)) {
      record.completedScenes.push(sceneId);
    }
    record.lastSceneId = sceneId;
    record.durationSeconds = durationSeconds || record.durationSeconds;
  } else {
    user.progress.push({
      tourId,
      completedScenes: [sceneId],
      lastSceneId: sceneId,
      durationSeconds: durationSeconds || 0
    });
  }

  await user.save();
  res.json({ progress: user.progress });
});
