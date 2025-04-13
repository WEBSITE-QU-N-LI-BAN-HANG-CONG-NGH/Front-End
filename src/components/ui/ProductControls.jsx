"use client";
import React, { useState } from "react";

const BackButton = () => {
  return (
    <button
      className="py-5 w-50 text-sm text-center text-black bg-white grow-0 max-md:px-5"
      onClick={() => window.history.back()}
      aria-label="Go back"
    >
      ‹ Back
    </button>
  );
};

const ItemsCounter = ({ itemsShown, totalItems }) => {
  return (
    <p className="px-1 py-3 text-gray-400 bg-white max-md:pr-5 max-md:max-w-full">
      Items {itemsShown} of {totalItems}
    </p>
  );
};


const DisplayControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex text-center">
      <button
        className="flex gap-2 px-5 py-3 rounded-sm border-2 border-solid border-[color:var(--Color---6,#CACDD8)] max-md:pl-5"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="grow">
          <span className="text-[#A2A6B0]">Show: </span>35 per page
        </span>
        <img
          src="/DownArrow.svg"
          className="object-contain shrink-0 my-auto w-4 aspect-square"
          alt="Display options dropdown indicator"
        />
      </button>
    </div>
  );
};

const ViewToggle = () => {
  return (
    <img
      src="/Grid.svg"
      className="object-contain shrink-0 ml-0.5 max-w-full aspect-[2.2] w-[110px]"
      alt="Toggle view mode"
      role="button"
      tabIndex={0}
      onClick={() => {}}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
        }
      }}
    />
  );
};

const ProductControls = (shown, total) => {
  return (
    <nav className="flex flex-wrap gap-2 mt-5 w-full font-semibold max-md:max-w-full">
      <BackButton />
      <div className="flex flex-row flex-auto gap-3 justify-end my-auto ml-auto text-sm leading-7 text-black max-md:max-w-full">
        <ItemsCounter itemsShown={shown} totalItems={total} />
        <DisplayControl />
        <ViewToggle />
      </div>
    </nav>
  );
};

export default ProductControls;
