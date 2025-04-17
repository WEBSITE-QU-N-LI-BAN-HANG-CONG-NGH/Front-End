// src/pages/ProductDetail/ProductDetail1.jsx
import React from "react";
import ProductGallery from "../../components/features/product/ProductGallery";
import ProductInfo from "../../components/features/product/ProductInfo";
import ProductReviews from "../../components/features/product/ProductReviews";

const ProductDetail1 = () => {
  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <main>
        <section className="flex gap-10 px-64 py-10 max-md:flex-col max-md:p-5">
          <ProductGallery />
          <ProductInfo />
        </section>
        <ProductReviews />
      </main>
    </div>
  );
};

export default ProductDetail1;