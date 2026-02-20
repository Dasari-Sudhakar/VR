import { Router } from 'express';
import { toggleFavorite, updateProgress } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/favorites', protect, toggleFavorite);
router.post('/progress', protect, updateProgress);

export default router;
