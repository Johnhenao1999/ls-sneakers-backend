import { Router } from "express";
import { adminLogin } from "../controllers/auth.controller.js";
import { createProduct, getProducts, updateProduct, deleteProduct  } from "../controllers/products.controller.js";

const router = Router();

router.post("/admin/login", adminLogin);
router.post('/products', createProduct)
router.get('/products', getProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;