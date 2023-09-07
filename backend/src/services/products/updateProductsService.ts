import { Readable } from "stream";
import readline from "readline";
import Product from "../../entities/Product";

export const updateProductsService = async (
  buffer: Buffer
): Promise<Product[]> => {
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const productsLine = readline.createInterface({
    input: readableFile,
  });

  const products = [];

  let firstInteraction = true;

  for await (let line of productsLine) {
    const productLineSplit = line.split(",");

    if (firstInteraction) {
      // console.log(productLineSplit);
      // [ 'product_code', 'new_price' ]
      firstInteraction = false;
      continue;
    }

    products.push({
      code: Number(productLineSplit[0]),
      sales_price: Number(productLineSplit[1]),
    });
  }

  return products;
};
