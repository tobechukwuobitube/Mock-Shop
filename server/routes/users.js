import { Router } from 'express';
import userController from '../controllers/users';

const router = Router();

router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);

export default router;
