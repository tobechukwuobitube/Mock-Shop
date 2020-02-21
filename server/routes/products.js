import { Router } from 'express';
import productController from '../controllers/products';

const router = Router();

router.post('/products', productController.create);
router.get('/products', productController.getAllProducts);
router.delete('/products/:product_id', productController.deleteProduct);
router.patch('/products/:product_id/edit', productController.editProduct);
router.patch('/products/:product_id/sell', productController.sellProduct);

export default router;
