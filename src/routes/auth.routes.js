import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { createProduct } from "../controllers/products.controller.js";

const router = Router();

router.post('/register', register)

router.post('/login', login)

router.post('/products', createProduct)

export default router;