import { Readable } from "stream";
import readline from "readline";
import { AppDataSource } from "../../data-source";
import Product from "../../entities/Product";

export const updateProductsService = async (buffer: Buffer) => {
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const productsLine = readline.createInterface({
    input: readableFile,
  });

  const productsRepository = AppDataSource.getRepository(Product);

  let firstInteraction = true;

  for await (let line of productsLine) {
    const productLineSplit = line.split(",");
    const code = Number(productLineSplit[0]);
    const sales_price = Number(productLineSplit[1]);

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

  return { message: "Products updated!" };
};
