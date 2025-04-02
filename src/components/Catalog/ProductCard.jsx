"use client";
import React from "react";

const ProductCard = ({
  image,
  inStock,
  rating,
  title,
  originalPrice,
  currentPrice,
}) => {
  return (
    <article className="flex overflow-hidden flex-col flex-1 items-center">
      <div className="flex flex-col px-6 w-full bg-white max-w-[235px] max-md:px-5">
        <p className="px-6 py-2.5 text-xs leading-loose text-center bg-white text-neutral-500 w-[71px] max-md:pl-5">
          {inStock ? "in stock" : "out of stock"}
        </p>
        <img
          src={image}
          alt={title}
          className="object-contain self-center max-w-full aspect-square w-[150px]"
        />
        <div className="flex gap-2.5 py-2.5 max-w-full text-xs leading-loose text-center text-gray-400 w-[152px]">
          <img
            src="/RatingPlaceholder.svg"
            alt="Rating"
            className="object-contain shrink-0 aspect-[5.68] w-[74px]"
          />
          <p>Reviews ({rating})</p>
        </div>
        <h3 className="text-sm text-black">{title}</h3>
        <div className="text-lg font-semibold leading-6 text-black">
          <span className="block text-sm line-through text-gray-600">
            ${originalPrice}
          </span>
          ${currentPrice}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
