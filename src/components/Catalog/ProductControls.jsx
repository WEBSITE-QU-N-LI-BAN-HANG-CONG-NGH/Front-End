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

const SortControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="flex gap-4 py-3 pr-3.5 pl-7 text-center rounded-sm border-2 border-solid border-[color:var(--Color---6,#CACDD8)] max-md:pl-5"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <span className="basis-auto">
        <span className="text-[#A2A6B0]">Sort By: </span>Position
      </span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/192ec7429d9ddfcdcddd91c42b8b6a64688abeac?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
        className="object-contain shrink-0 my-auto w-4 aspect-square"
        alt="Sort dropdown indicator"
      />
    </button>
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
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/411695f9246914b6d1eeda4e44d91e2c1bd75c0d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
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
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/04de518dd7b98d4349c0881a5d28f0f5cbee260a?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
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

const ProductControls = () => {
  return (
    <nav className="flex flex-wrap gap-2 mt-5 w-full font-semibold max-md:max-w-full">
      <BackButton />
      <div className="flex flex-row flex-auto gap-3 justify-end my-auto ml-auto text-sm leading-7 text-black max-md:max-w-full">
        <ItemsCounter itemsShown="1-35" totalItems="61" />
        <SortControl />
        <DisplayControl />
        <ViewToggle />
      </div>
    </nav>
  );
};

export default ProductControls;
