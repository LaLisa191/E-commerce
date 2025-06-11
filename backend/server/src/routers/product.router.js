import { Router } from "express";
import {
  imprimirPrimerDato,
  obtenerTodos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/product.controller.js";

const router = Router();

// Ruta base: /productos
router.get('/', imprimirPrimerDato);
router.get('/todas', obtenerTodos);
router.post('/crear', crearProducto);
router.put('/actualizar/:id', actualizarProducto);
router.delete('/eliminar/:id', eliminarProducto);

export default router;
