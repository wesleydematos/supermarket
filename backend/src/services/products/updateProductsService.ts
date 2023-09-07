import { Readable } from "stream";
import readline from "readline";
import Product from "../../entities/Product";
import { ensuseProductFieldsExist } from "../../helpers/ensureFieldsExist";

export const updateProductsService = async (
  buffer: Buffer
): Promise<Product[] | object> => {
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
      const fieldsExist = ensuseProductFieldsExist(productLineSplit);
      if (!fieldsExist) {
        return {
          message:
            "O arquivo deve conter os campos 'product_code' e 'new_price'.",
        };
      }
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
