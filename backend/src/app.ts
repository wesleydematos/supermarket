import express, { Application } from "express";
import cors from "cors";
import { productsRouter } from "./routers/productsRoutes";
import { packsRouter } from "./routers/packsRoutes";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/products", productsRouter);
app.use("/packs", packsRouter);

export default app;
