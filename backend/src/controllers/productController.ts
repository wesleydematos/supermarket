import { Request, Response } from "express";

import { listProductsService } from "../services/products/listProductsService";
import { updateProductsService } from "../services/products/updateProductsService";

export const listProductsController = async (_req: Request, res: Response) => {
  const allProducts = await listProductsService();
  return res.json(allProducts);
};

export const updateProductController = async (req: Request, res: Response) => {
  const buffer = req.file.buffer;
  const updatedProducts = await updateProductsService(buffer);
  return res.json(updatedProducts);
};
