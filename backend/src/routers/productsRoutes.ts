import { Router } from "express";
import multer from "multer";
import {
  listProductsController,
  updateProductController,
} from "../controllers/productController";

const multerConfig = multer();

export const productsRouter = Router();

productsRouter.get("", listProductsController);
productsRouter.patch("", multerConfig.single("file"), updateProductController);
