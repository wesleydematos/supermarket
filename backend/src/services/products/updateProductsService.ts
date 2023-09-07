import { Readable } from "stream";
import readline from "readline";
// import Product from "../../entities/Product";
import { ensuseProductFieldsExist } from "../../helpers/ensureFieldsExist";
import { ensuseProductCodeExist } from "../../helpers/ensuseProductCodeExist";

export const updateProductsService = async (buffer: Buffer): Promise<any> => {
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

    const product: any = {
      code: Number(productLineSplit[0]),
      sales_price: Number(productLineSplit[1]),
      errors: [],
    };

    const inexistentProduct = await ensuseProductCodeExist(
      Number(productLineSplit[0])
    );

    if (inexistentProduct) {
      product.errors.push("Código inexistente.");
    }

    products.push(product);
  }

  return products;
};
