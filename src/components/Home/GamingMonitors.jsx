import React from "react";
import CategoryBanner from "../shared/CategoryBanner";
import ProductCard from "../shared/ProductCard";

const GamingMonitors = () => {
  const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6e5856cfb7de00e03268f5940aed4937e9fc64c41deb4ac4b93d7a029405b73b?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ed0540ca2cedf398ec97c2e925116c08623c0ff23c3006ceb816cb8a449926d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9b7de62500504e9ef56874e64f38789198ecdd6147210406d0ab82c09f3853b5?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/88f73a65bce1151287094e77cf67027d40ca04d77298288b51cc5e2706c02d2f?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ed0540ca2cedf398ec97c2e925116c08623c0ff23c3006ceb816cb8a449926d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
  ];

  return (
    <div className="flex flex-wrap mt-8 w-full text-black max-w-[1397px] max-md:max-w-full">
      <CategoryBanner
        backgroundImage="https://cdn.builder.io/api/v1/image/assets/TEMP/cf1d26eb779253c141cb29130e0f5c0fe4b5f55a0e56290ce2fdbaf50f99876b?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
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
