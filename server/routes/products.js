import { Router } from 'express';
import productController from '../controllers/products';

const router = Router();

router.post('/products', productController.create);
router.get('/products', productController.getAllProducts);

export default router;
