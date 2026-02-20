import { Router } from 'express';
import {
  createTour,
  deleteTour,
  getTourById,
  getTours,
  updateTour,
  uploadPanorama
} from '../controllers/tourController.js';
import { authorize, protect } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = Router();

router.get('/', getTours);
router.get('/:id', getTourById);
router.post('/', protect, authorize('admin'), createTour);
router.put('/:id', protect, authorize('admin'), updateTour);
router.delete('/:id', protect, authorize('admin'), deleteTour);
router.post('/upload/panorama', protect, authorize('admin'), upload.single('image'), uploadPanorama);

export default router;
