import { ensuseProductFieldsExist } from "../../helpers/ensureFieldsExist";
import { ensuseProductCodeExist } from "../../helpers/ensuseProductCodeExist";
import { ensureIsValidPrice } from "../../helpers/ensureIsValidPrice";
import { IProduct } from "../../interfaces/IProducts";

export const verifyProductsService = async (
  data: []
): Promise<IProduct[] | object> => {
  const products: IProduct[] = [];
  let firstInteraction = true;

  for await (let line of data) {
    if (firstInteraction) {
      const fieldsExist = ensuseProductFieldsExist(line);
      if (!fieldsExist) {
        return {
          message:
            "O arquivo deve conter os campos 'product_code' e 'new_price'.",
        };
      }
      firstInteraction = false;
      continue;
    }

    const code = Number(line[0]);
    const sales_price = Number(line[1]);

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
