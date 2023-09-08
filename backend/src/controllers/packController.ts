import { Request, Response } from "express";

import { listPacksService } from "../services/packs/listPacksService";

export const listPacksController = async (_req: Request, res: Response) => {
  const allPacks = await listPacksService();
  return res.json(allPacks);
};
