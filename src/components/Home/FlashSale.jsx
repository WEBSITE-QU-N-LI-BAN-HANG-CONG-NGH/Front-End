import React from "react";
import ProductCard from "./ProductCard";

const FlashSale = () => {
  const products = [
    {
      image:
        "/Placeholder2.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
      stockStatus: "in stock",
    },
    {
      image:
        "/Placeholder2.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
      stockStatus: "check availability",
    },
    {
      image:
        "/Placeholder2.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "/Placeholder2.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "/Placeholder2.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "/Placeholder2.png",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
  ];

  return (
    <div className="flex flex-col max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between ml-4 max-md:max-w-full">
        <div className="text-2xl mt-5 font-semibold text-center text-black">
          FLASH SALE
        </div>
        <a
          href="#"
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
