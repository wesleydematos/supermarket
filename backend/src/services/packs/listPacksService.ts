import { AppDataSource } from "../../data-source";
import Pack from "../../entities/Pack";
import Product from "../../entities/Product";
import IPacks from "../../interfaces/IPacks";

export const listPacksService = async (): Promise<IPacks[]> => {
  const packsRepository = AppDataSource.getRepository(Pack);
  const productsRepository = AppDataSource.getRepository(Product);

  const packs = await packsRepository.find();

  const alteredPacks = await Promise.all(
    packs.map(async (pack) => {
      const product_id = Number(pack.product_id);

      const product = await productsRepository.findOne({
        where: { code: product_id },
      });

      return {
        ...pack,
        product_name: product.name,
        product_price: product.sales_price,
      };
    })
  );

  return alteredPacks;
};
