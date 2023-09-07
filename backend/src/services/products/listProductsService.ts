import { AppDataSource } from "../../data-source";
import Product from "../../entities/Product";

export const listProductsService = async (): Promise<Product[]> => {
  const productRepository = AppDataSource.getRepository(Product);

  return await productRepository.find();
};
