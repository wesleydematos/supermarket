import { Request, Response, Router } from "express";
import Product from "../entities/Product";
import { getProducts } from "../services/productSevices";
import IProducts from "../interfaces/IProducts";
import multer from "multer";

const multerConfig = multer();

export const productRouter = Router();

productRouter.post(
  "/",
  multerConfig.single("file"),
  async (req: Request, res: Response) => {
    console.log(req.file.buffer.toString("utf-8"));
    return res.send();
  }
);

productRouter.get(
  "/",
  async (_req: Request, res: Response): Promise<Response> => {
    const products = await getProducts();
    return res.status(200).json(products);
  }
);
