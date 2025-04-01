import React from "react";
import ProductCardList from "./ProductCardList";
import Pagination from "./Pagination";

const ProductList = () => {
  const products = [
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/64ec409c8ca8649a158a00eee9cdd1fcd4d0e625?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      reviewsImageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d67a1e485739b2809a69bd055df3f3618edfd250?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e12842b18cc9781ffbf9ea4b4bea00493f794537?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      reviewsImageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d67a1e485739b2809a69bd055df3f3618edfd250?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5bd05b47504e1040b3aec0cdc74c6f30ba180c93?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      reviewsImageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9392e816a707aa76852b8c6ba287cbe53dc3f3db?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    },
    {
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/433bbf95979caf9393d68187a5dc71c65e52e4be?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      reviewsImageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9392e816a707aa76852b8c6ba287cbe53dc3f3db?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
    },
  ];

  return (
    <div className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-1.5 w-full max-md:mt-2.5 max-md:max-w-full">
        {products.map((product, index) => (
          <ProductCardList key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
