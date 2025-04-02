import React from "react";

const ProductCard = ({
  image,
  stockStatus = "in stock",
  title,
  price,
  originalPrice,
  reviewCount = 4,
  ratingImage = "",
}) => {
  const isInStock = stockStatus === "in stock";

  return (
    <div className="flex overflow-hidden flex-col flex-1 items-center">
      <div className="flex flex-col px-6 w-full bg-white max-w-[235px] max-md:px-5">
        <div
          className={`px-6 py-2.5 text-xs leading-loose text-center bg-white ${
            isInStock ? "text-neutral-500" : "text-red-500"
          } w-[71px] max-md:pl-5`}
        >
          {stockStatus}
        </div>
        <img
          src={image}
          className="object-contain self-center max-w-full aspect-square w-[150px]"
          alt={title}
        />
        <div className="flex gap-2.5 py-2.5 max-w-full text-xs leading-loose text-center text-gray-400 w-[152px]">
          <img
            src={ratingImage}
            className="object-contain shrink-0 aspect-[5.68] w-[74px]"
            alt="Rating"
          />
          <div>Reviews ({reviewCount})</div>
        </div>
        <div className="text-sm">{title}</div>
        <div className="text-lg font-semibold leading-6">
          <span
            style={{
              fontWeight: 400,
              textDecoration: "line-through",
              fontSize: "14px",
              lineHeight: "20px",
              color: "rgba(102,102,102,1)",
            }}
          >
            ${originalPrice}
          </span>
          <br />${price}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
