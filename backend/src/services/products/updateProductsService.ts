import { Readable } from "stream";
import readline from "readline";
import { ensuseProductFieldsExist } from "../../helpers/ensureFieldsExist";
import { ensuseProductCodeExist } from "../../helpers/ensuseProductCodeExist";
import { ensureIsValidPrice } from "../../helpers/ensureIsValidPrice";
import { IProduct } from "../../interfaces/IProducts";

export const verifyProductsService = async (
  buffer: Buffer
): Promise<IProduct[] | object> => {
  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const productsLine = readline.createInterface({
    input: readableFile,
  });

  const products: IProduct[] = [];

  let firstInteraction = true;

  for await (let line of productsLine) {
    const productLineSplit = line.split(",");
    const code = Number(productLineSplit[0]);
    const sales_price = Number(productLineSplit[1]);

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

    const product: IProduct = {
      code: code,
      name: "",
      last_price: 0,
      new_price: sales_price,
      errors: [],
    };

    const productEsxist = await ensuseProductCodeExist(code);

    if (productEsxist) {
      product.name = productEsxist.name;
      product.last_price = Number(productEsxist.sales_price);
    } else {
      product.errors.push("Código de produto inexistente.");
    }

    const invalidPrice = await ensureIsValidPrice(sales_price, code);
    if (invalidPrice.length) {
      product.errors.push(...invalidPrice);
    }

    products.push(product);
  }

  return products;
};
