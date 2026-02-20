import asyncHandler from 'express-async-handler';
import Tour from '../models/Tour.js';

export const getTourAnalytics = asyncHandler(async (_req, res) => {
  const tours = await Tour.find().select('title analytics');
  const analytics = tours.map((tour) => ({
    _id: tour._id,
    title: tour.title,
    views: tour.analytics.views,
    avgDuration: tour.analytics.views
      ? tour.analytics.totalDurationSeconds / tour.analytics.views
      : 0
  }));
  res.json({ analytics });
});
