import { Router } from "express";
import {
  login,
  registrar,
  logout,
} from "../controllers/auth.controller.js";

import {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  generateSlugsForExistingProducts, 
  applyGlobalSale
} from "../controllers/products.controller.js";

import {
  crearOrden,
  listarOrdenes,
  obtenerOrdenPorId,
  actualizarEstadoOrden,
  eliminarOrden
} from "../controllers/order.controller.js";

import { getBrands, createBrand, deleteBrand } from "../controllers/brand.controller.js";

const router = Router();

/* ------------------ 🔐 AUTENTICACIÓN ------------------ */
router.post("/admin/login", login);
router.post("/admin/register", registrar);
router.post("/admin/logout", logout);

/* ------------------ 🛍️ PRODUCTOS ------------------ */
// ⚠️ Las rutas más específicas SIEMPRE deben ir antes de las dinámicas (/:id)
router.put("/products/generate-slugs", generateSlugsForExistingProducts); // 👈 PONLA AQUÍ ARRIBA
router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/product/:slug", getProductBySlug);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.post("/products/apply-sale", applyGlobalSale);

/* ------------------ 🧾 ÓRDENES ------------------ */
router.post("/orders", crearOrden);
router.get("/orders", listarOrdenes);
router.get("/orders/:id", obtenerOrdenPorId);
router.put("/orders/:id", actualizarEstadoOrden);
router.delete("/orders/:id", eliminarOrden);

router.get("/brands", getBrands);
router.post("/brands", createBrand);
router.delete("/brands/:id", deleteBrand);

export default router;
