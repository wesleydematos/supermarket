import { AppDataSource } from "../data-source";
import Product from "../entities/Product";

export const ensuseProductCodeExist = async (
  code: number
): Promise<number | void> => {
  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOneBy({ code: code });
  if (!product) {
    return code;
  }
};
