const ensuseProductFieldsExist = (fields: string[]) => {
  const totalFields = fields.length == 2;
  const containsFields =
    fields.includes("new_price") && fields.includes("product_code");

  if (totalFields && containsFields) {
    return true;
  }
};

const ensusePackFieldsExist = (fields: string[]) => {};

export { ensusePackFieldsExist, ensuseProductFieldsExist };
