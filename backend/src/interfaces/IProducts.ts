interface IProducts {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
}

interface IProduct {
  code: number;
  name: string;
  last_price: number;
  new_price: number;
  errors: string[];
}

export { IProducts, IProduct };
