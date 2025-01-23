import { Router } from 'express';
import userRoutes from './user.routes';
import scoreRoutes from './score.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/scores', scoreRoutes);

export default router;
