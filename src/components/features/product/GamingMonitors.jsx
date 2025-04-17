import React from "react";
import CategoryBanner from "./CategoryBanner";
import ProductCard from "./ProductCard";

const GamingMonitors = () => {
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
    }
  ];

  return (
    <div className="flex flex-wrap mt-8 w-full text-black max-w-[1397px] max-md:max-w-full">
      <CategoryBanner
        backgroundImage="/Placeholder4.png"
        title="Gaming Monitors"
        className="aspect-[0.671]"
      />
      {products.map((product, index) => (
        <ProductCard key={`monitor-${index}`} {...product} />
      ))}
    </div>
  );
};

export default GamingMonitors;
