import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { productsRouter } from "./routers/productsRoutes";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/products", productsRouter);

export default app;
