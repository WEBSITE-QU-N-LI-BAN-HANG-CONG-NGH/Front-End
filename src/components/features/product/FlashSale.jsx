import React from "react";
import ProductCard from "./ProductCard";

const FlashSale = () => {
  const products = [
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "2", 
    },{
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "2", 
    },{
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "2", 
    },{
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "2", 
    },{
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "2", 
    },{
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "2", 
    }
  ];

  return (
    <div className="flex flex-col max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between ml-4 max-md:max-w-full">
        <div className="text-2xl mt-5 font-semibold text-center text-black">
          FLASH SALE
        </div>
        <a
          href="/product/all"
          className="my-auto text-sm leading-none text-right text-blue-600 underline underline-offset-auto">
            See All New Products
        </a>

      </div>
      <div className="flex flex-wrap mt-3.5 text-black max-md:max-w-full">
        {products.map((product, index) => (
          <ProductCard key={`flash-${index}`} {...product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
