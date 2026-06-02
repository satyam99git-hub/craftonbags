import axiosInstance from "./axios";

export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", {
    params,
  });

  return response.data.data;
};

export const getProductBySlug = async (slug) => {
  const response = await axiosInstance.get(`/products/${slug}`);

  return response.data.data.product;
};