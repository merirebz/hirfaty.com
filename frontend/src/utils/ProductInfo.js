const GetProductName = (product, i18n) => {
  if (!product || !product.name) {
    return "Default Name"; // Provide a default value or handle the error as needed
  }
  let ProductName =
    product.name[i18n.language] || product.name.ar || product.name;
  return ProductName;
};

const GetProductDescription = (product, i18n) => {
  if (!product || !product.description) {
    return "Default Description"; // Provide a default value or handle the error as needed
  }
  let ProductDescription =
    product.description[i18n.language] ||
    product.description.ar ||
    product.description;
  return ProductDescription;
};

const GetProductPrice = (product) => {
  if (!product) {
    return "Default Price"; // Provide a default value or handle the error as needed
  }
  return product.discountPrice ||
    product.discountPrice === 0 ||
    product.discountPrice === "" ||
    product.discountPrice === null
    ? product.originalPrice
    : product.discountPrice;
};

export { GetProductName, GetProductDescription, GetProductPrice };
