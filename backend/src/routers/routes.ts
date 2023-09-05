import { Router } from "express";
import { productRouter } from "../controllers/productController";

const routers = Router();

routers.use("/product", productRouter);

export default routers;
