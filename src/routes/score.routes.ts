import { Router } from 'express';
import { ScoreController } from '../controllers/score.controller';

const router = Router();
const scoreController = new ScoreController();

router.post('/', scoreController.create);
router.get('/leaderboard', scoreController.getLeaderboard);

export default router;
