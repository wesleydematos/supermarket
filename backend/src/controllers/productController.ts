import { Request, Response, Router } from "express";
import Product from "../entities/Product";
import { getProducts } from "../services/productSevices";
import IProducts from "../interfaces/IProducts";

export const productRouter = Router();

productRouter.get(
  "/",
  async (_req: Request, res: Response): Promise<Response> => {
    const products = await getProducts();
    return res.status(200).json(products);
  }
);
