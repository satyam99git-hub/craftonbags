import React from "react";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";

const ProductDetails = () => {
  return (
    <section className="bg-[#f7f7f7] py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 lg:px-10">

        <ProductGallery />

        <ProductInfo />

      </div>
    </section>
  );
};

export default ProductDetails;