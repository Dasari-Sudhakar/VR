import { Router } from 'express';
import { getTourAnalytics } from '../controllers/analyticsController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.get('/tours', protect, authorize('admin'), getTourAnalytics);

export default router;
