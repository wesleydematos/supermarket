import { Router } from "express";
import {
  listProductsController,
  updateProductsController,
  verifyProductController,
} from "../controllers/productController";

export const productsRouter = Router();

productsRouter.get("", listProductsController);
productsRouter.post("", verifyProductController);
productsRouter.patch("", updateProductsController);
