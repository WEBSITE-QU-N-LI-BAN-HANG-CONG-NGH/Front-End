"use client";
import React from "react";
import { useState } from "react";

const OrderSummary = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className="p-5 bg-violet-50 order-[summary] w-[446px] max-md:w-full">
      <h2 className="mb-5 text-2xl font-semibold">Order Summary</h2>
      <div className="mb-5 h-px bg-gray-300" />
      <div className="flex justify-between items-center mx-0 my-5">
        <span>2 Items in Cart</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="focus:outline-none"
          aria-expanded={isExpanded}
          aria-label="Toggle order details"
        >
        </button>
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-5">
          <article className="flex gap-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/47a13fc85a6f744d9fe84e0f2b2c5819935a99db"
              alt="Product"
              className="h-[62px] w-[62px]"
            />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm">
                MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER...
              </h3>
              <p className="text-sm text-gray-400">
                <span>Qty</span>
                <span>1</span>
              </p>
              <p className="text-sm font-semibold">$3,799.00</p>
            </div>
          </article>
          <article className="flex gap-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d420497c4642db33c8ecd88967b28c150339105"
              alt="Product"
              className="h-[62px] w-[62px]"
            />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm">
                MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER...
              </h3>
              <p className="text-sm text-gray-400">
                <span>Qty</span>
                <span>1</span>
              </p>
              <p className="text-sm font-semibold">$3,799.00</p>
            </div>
          </article>
        </div>
      )}
    </aside>
  );
};
export default OrderSummary;