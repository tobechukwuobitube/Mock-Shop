import { Router } from 'express';
import productController from '../controllers/products';

const router = Router();

router.post('/products', productController.create);
// router.post('/auth/signin', userController.signin);

export default router;
