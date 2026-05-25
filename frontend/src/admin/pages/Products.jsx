import React from "react";

import ProductTable from "../components/ProductTable";

import productsData from "../../data/product";

const Products = () => {
  return (
    <div>

      <div className="mb-8">

        <h1 className="text-4xl font-black">
          Products
        </h1>

        <p className="mt-2 text-zinc-500">
          Manage products
        </p>

      </div>

      <ProductTable
        products={productsData}
      />

    </div>
  );
};

export default Products;