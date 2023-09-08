import { Router } from "express";
import multer from "multer";
import {
  listProductsController,
  updateProductsController,
  verifyProductController,
} from "../controllers/productController";

const multerConfig = multer();

export const productsRouter = Router();

productsRouter.get("", listProductsController);
productsRouter.post("", verifyProductController);
productsRouter.patch("", multerConfig.single("file"), updateProductsController);
