import asyncHandler from 'express-async-handler';
import Tour from '../models/Tour.js';

export const getTours = asyncHandler(async (_req, res) => {
  const tours = await Tour.find().sort({ createdAt: -1 });
  res.json({ tours });
});

export const getTourById = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    res.status(404);
    throw new Error('Tour not found');
  }
  tour.analytics.views += 1;
  await tour.save();
  res.json({ tour });
});

export const createTour = asyncHandler(async (req, res) => {
  const tour = await Tour.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ tour });
});

export const updateTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!tour) {
    res.status(404);
    throw new Error('Tour not found');
  }
  res.json({ tour });
});

export const deleteTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    res.status(404);
    throw new Error('Tour not found');
  }
  res.json({ message: 'Tour deleted' });
});

export const uploadPanorama = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image uploaded');
  }
  res.status(201).json({ imageUrl: req.file.path });
});
