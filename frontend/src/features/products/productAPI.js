import products from "../../data/product";
import schoolProducts from "../../data/schoolProducts";
import luggageProducts from "../../data/luggageProducts";

// Main Products
const mainProducts =
  Object.values(products).flat();

// School Products
const schoolProductsFlat =
  Object.values(schoolProducts).flat();

// Luggage Products
const luggageProductsFlat =
  Object.values(luggageProducts).flat();

// Merge All Products
const allProducts = [
  ...mainProducts,
  ...schoolProductsFlat,
  ...luggageProductsFlat,
];

// Fetch All Products
export const fetchAllProducts = async () => {
  return allProducts;
};

// Fetch Single Product
export const fetchProductByIdOrSlug = async (
  idOrSlug
) => {
  return allProducts.find(
    (product) =>
      product.slug === idOrSlug ||
      product.id.toString() === idOrSlug
  );
};