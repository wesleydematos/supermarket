import { Request, Response, Router } from "express";
import Product from "../entities/Product";
import { getProducts } from "../services/productSevices";
import IProducts from "../interfaces/IProducts";
import multer from "multer";
import { Readable } from "stream";
import readline from "readline";

const multerConfig = multer();

export const productRouter = Router();

interface IProduct {
  code: number;
  sales_price: number;
}

productRouter.post(
  "/",
  multerConfig.single("file"),
  async (req: Request, res: Response) => {
    const { file } = req;
    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const productsLine = readline.createInterface({
      input: readableFile,
    });

    const products: IProduct[] = [];

    let firstInteraction = true;

    for await (let line of productsLine) {
      const productLineSplit = line.split(",");

      if (firstInteraction) {
        // console.log(productLineSplit);
        // [ 'product_code', 'new_price' ]
        firstInteraction = false;
        continue;
      }

      products.push({
        code: Number(productLineSplit[0]),
        sales_price: Number(productLineSplit[1]),
      });
    }

    return res.json(products);
  }
);

productRouter.get(
  "/",
  async (_req: Request, res: Response): Promise<Response> => {
    const products = await getProducts();
    return res.status(200).json(products);
  }
);
