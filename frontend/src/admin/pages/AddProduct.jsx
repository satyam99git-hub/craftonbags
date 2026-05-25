import React from "react";

import ProductForm from "../components/ProductForm";

const AddProduct = () => {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-black">
          Add Product
        </h1>

        <p className="mt-2 text-zinc-500">
          Create a new product
        </p>

      </div>

      <ProductForm />

    </div>
  );
};

export default AddProduct;