import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";


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
          <span className="text-[#A2A6B0]">Show: </span> 12 per page
        </span>
      </button>
    </div>
  );
};

const SortControl = ({ onSortChange }) => {
  const { activeFilters, updateFilters } = useFilter();
  
  // Danh sách các tùy chọn sắp xếp
  const sortOptions = [
    { label: "Mặc định", value: "" },
    { label: "Giá thấp đến cao", value: "price_low" },
    { label: "Giá cao đến thấp", value: "price_high" },
    { label: "Giảm giá nhiều", value: "discount" },
    { label: "Mới nhất", value: "newest" }
  ];

  const handleSortChange = (event) => {
    const value = event.target.value;
    updateFilters('sort', value, value !== "");
    if (onSortChange) onSortChange();
  };

  return (
    <div className="flex text-center">
      <select 
        className="px-5 py-3 rounded-sm border-2 border-solid border-[color:var(--Color---6,#CACDD8)]"
        value={activeFilters.sort || ""}
        onChange={handleSortChange}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

// Đúng cách định nghĩa component với destructuring props
const ProductControls = ({ shown, total, onSortChange }) => {
  return (
    <nav className="flex flex-wrap gap-2 mt-5 w-full font-semibold max-md:max-w-full">
      <BackButton />
      <div className="flex flex-row flex-auto gap-3 justify-end my-auto ml-auto text-sm leading-7 text-black max-md:max-w-full">
        <ItemsCounter itemsShown={shown || 0} totalItems={total || 0} />
        <SortControl onSortChange={onSortChange} />
        <DisplayControl />
        <ViewToggle />
      </div>
    </nav>
  );
};

export default ProductControls;