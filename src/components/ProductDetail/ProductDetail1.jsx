"use client";
import React from "react";
import { useEffect } from "react";
import Header from "../shared/Header";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./ProductReviews";
import Footer from "../shared/Footer";

const ProductDetail1 = () => {
  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <Header />
      <main>
        <section className="flex gap-10 px-64 py-10 max-md:flex-col max-md:p-5">
          <ProductGallery />
          <ProductInfo />
        </section>
        <RelatedProducts />
        <ProductReviews />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail1;
