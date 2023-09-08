import { Request, Response } from "express";

import { listProductsService } from "../services/products/listProductsService";
import { updateProductsService } from "../services/products/updateProductsService";
import { verifyProductsService } from "../services/products/verifyProductsService";

export const listProductsController = async (_req: Request, res: Response) => {
  const allProducts = await listProductsService();
  return res.json(allProducts);
};

export const verifyProductController = async (req: Request, res: Response) => {
  const data = req.body;
  const verifiedProducts = await verifyProductsService(data);
  return res.json(verifiedProducts);
};

export const updateProductsController = async (req: Request, res: Response) => {
  const data = req.body;
  const response = await updateProductsService(data);
  return res.status(200).json(response);
};
