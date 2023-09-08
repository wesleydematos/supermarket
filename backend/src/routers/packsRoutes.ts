import { Router } from "express";
import { listPacksController } from "../controllers/packController";

export const packsRouter = Router();

packsRouter.get("", listPacksController);
