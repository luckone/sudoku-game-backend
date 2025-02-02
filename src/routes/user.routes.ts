import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/', userController.create);
router.get('/:id', userController.findOne);

export default router;
