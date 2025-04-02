import React from "react";
import CategoryBanner from "./CategoryBanner";
import ProductCard from "./ProductCard";

const CustomBuilds = () => {
  const products = [
    {
      image:
        "/Placeholder6.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "/Placeholder6.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "/Placeholder6.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "/Placeholder6.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "/Placeholder6.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
  ];

  return (
    <div className="flex flex-wrap mt-5 w-full text-black max-w-[1397px] max-md:max-w-full">
      <CategoryBanner
        backgroundImage="/Placeholder4.png"
        title="Custom Build"
        className="aspect-[0.671]"
      />
      {products.map((product, index) => (
        <ProductCard key={`desktop-${index}`} {...product} />
      ))}
    </div>
  );
};

export default CustomBuilds;
