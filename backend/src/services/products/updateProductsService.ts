import { AppDataSource } from "../../data-source";
import Product from "../../entities/Product";

export const updateProductsService = async (data: []) => {
  const productsRepository = AppDataSource.getRepository(Product);

  let firstInteraction = true;

  for await (let line of data) {
    const code = Number(line[0]);
    const sales_price = Number(line[1]);

    if (firstInteraction) {
      firstInteraction = false;
      continue;
    }

    const productToUpdate = await productsRepository.findOneBy({ code: code });
    const updatedProduct = productsRepository.create({
      ...productToUpdate,
      sales_price: sales_price,
    });

    await productsRepository.save(updatedProduct);
  }

  return { message: "Produtos atualizados!" };
};
