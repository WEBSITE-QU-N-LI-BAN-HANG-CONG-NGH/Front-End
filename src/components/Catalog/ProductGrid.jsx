"use client";
import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const productImages = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/de318179ab637e7b4a4e5fa196e9fa1956bd0a5d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/ac0105eea6f696263deeddaef28ba1342181ac0b?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/eb2cb4dfe58370acfad0f82a4a6479cf6d017c07?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/83dd62b264c680d352f43c69691b88860560a083?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/1a2718f1ee21046ab2f101adaa78719028653979?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/fdfc5bb9a4347c7a6730befe3377595456f5240c?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/fde031465ec3f426dd82f8ab6c418f3e010c87d5?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/bc4b514f50b16bf31097137f958f283884ab8ce1?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/4bc73fffd25a711bf3f30a74093a8249d98e418b?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/f89d4e624d0a6d5e902e5534ae04bf181c6c3ac4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
  ];

  return (
    <section className="flex flex-wrap gap-5 max-md:flex-col">
      {productImages.map((imageUrl, index) => (
        <ProductCard key={index} imageUrl={imageUrl} />
      ))}
    </section>
  );
};

export default ProductGrid;
