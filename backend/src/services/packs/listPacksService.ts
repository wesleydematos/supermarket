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
      const kit_id = Number(pack.pack_id);

      const product = await productsRepository.findOne({
        where: { code: product_id },
      });

      const kit = await productsRepository.findOne({
        where: { code: kit_id },
      });

      return {
        ...pack,
        kit_name: kit.name,
        product_price: kit.sales_price,
        product_name: product.name,
      };
    })
  );

  return alteredPacks;
};
