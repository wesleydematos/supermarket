import Product from "../entities/Product";
import IProducts from "../interfaces/IProducts";
import { AppDataSource } from "../data-source";

const productRepository = AppDataSource.getRepository(Product);

const getProducts = (): Promise<IProducts[]> => {
  return productRepository.find();
};

export { getProducts };
