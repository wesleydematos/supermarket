import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import routers from "./routers/routes";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(routers);

export default app;
