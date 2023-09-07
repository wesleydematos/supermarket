import { AppDataSource } from "../data-source";
import Product from "../entities/Product";

export const ensureIsValidPrice = async (
  price: number,
  code: number
): Promise<string[]> => {
  let errors = [];

  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.findOneBy({ code: code });
  if (product) {
    const { cost_price, sales_price } = product;
    const upperLimit = sales_price * 1.1;
    const lowerLimit = sales_price * 0.9;

    if (price <= lowerLimit || price >= upperLimit) {
      errors.push(
        `O reajuste do preço de venda de R$${sales_price} para R$${price} excedeu o limite de 10%.`
      );
    }

    if (price < cost_price) {
      errors.push(
        "O novo preço de venda informado está abaixo do preço de custo."
      );
    }
  }

  const regex = /^(\d{1,7}(\.\d{1,2})?|\d{8}(\.\d{0,2})?)$/;
  if (!regex.test(String(price))) {
    errors.push("Formato do preço inválido.");
  }

  return errors;
};
