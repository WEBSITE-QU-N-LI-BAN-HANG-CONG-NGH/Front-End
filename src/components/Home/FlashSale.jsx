import React from "react";
import ProductCard from "../shared/ProductCard";

const FlashSale = () => {
  const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6110020049c709a850ef149e9595b5ea1e2201fe45de8e5923d13bf56d6cb079?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
      stockStatus: "in stock",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6ade5b6525d4f46a0b7a5063d91669a8c9ea1ae536c5b8184d9def9c83c0d8d9?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
      stockStatus: "check availability",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b13d5041d3c28e4061565880b84d85f12c6049a6c8b596fa5e6b60d67387e9e9?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/79c899cdef61d2a9552ed6f9a82a7fa5863c2a7f314f53c5f6357a7b5200cabe?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b13d5041d3c28e4061565880b84d85f12c6049a6c8b596fa5e6b60d67387e9e9?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
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
        <div className="flex flex-col flex-1 pb-32 max-md:pb-24">
          <ProductCard
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/b13d5041d3c28e4061565880b84d85f12c6049a6c8b596fa5e6b60d67387e9e9?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
            title="EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On..."
            price="499.00"
            originalPrice="499.00"
          />
          {/* <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8459b184a42cd548534a53f9101a8e7b3487e8db083d61aec6ffefc0663e9ca0?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
            className="object-contain z-10 self-end mt-0 aspect-[0.58] w-[46px] max-md:mt-0"
            alt="Sale badge"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
