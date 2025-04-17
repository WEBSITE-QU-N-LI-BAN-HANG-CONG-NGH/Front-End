"use client";
// Sửa imports để trỏ đến vị trí mới
import React from "react";
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import ProductGallery from "../../components/features/product/ProductGallery"
import ProductInfo from "../../components/features/product/ProductInfo"
import ProductReviews from "../../components/features/product/ProductReviews"
import Footer from "../../components/layout/Footer";

const ProductDetail1 = () => {
  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <Header />
      <main>
        <section className="flex gap-10 px-64 py-10 max-md:flex-col max-md:p-5">
          <ProductGallery />
          <ProductInfo />
        </section>
        <ProductReviews />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail1;
