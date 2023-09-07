import { AppDataSource } from "../data-source";
import Product from "../entities/Product";

export const ensuseProductCodeExist = async (code: number) => {
  const productRepository = AppDataSource.getRepository(Product);
  return await productRepository.findOneBy({ code: code });
};
