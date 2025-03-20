import React from "react";
import CategoryBanner from "../shared/CategoryBanner";
import ProductCard from "../shared/ProductCard";

const Desktops = () => {
  const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/821479d907471ed41755b81c77da15bfd660f3433f54c08b9224cc78f5d67830?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/821eff83ac660e17650bf9722556d63f4920036eda8838ac07ef0a445d7fbd90?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c1a0a83a21dde0ff6192348a4b0b7ea5c091968e754610cd9953782f913d76c4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c1a0a83a21dde0ff6192348a4b0b7ea5c091968e754610cd9953782f913d76c4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c1a0a83a21dde0ff6192348a4b0b7ea5c091968e754610cd9953782f913d76c4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
  ];

  return (
    <div className="flex flex-wrap mt-5 w-full text-black max-w-[1397px] max-md:max-w-full">
      <CategoryBanner
        backgroundImage="https://cdn.builder.io/api/v1/image/assets/TEMP/29a8551f13ef02ba428246e3383107923f18aba698ccaf80df4ff20434a5c404?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
        title="Desktops"
        className="aspect-[0.671]"
      />
      {products.map((product, index) => (
        <ProductCard key={`desktop-${index}`} {...product} />
      ))}
    </div>
  );
};

export default Desktops;
