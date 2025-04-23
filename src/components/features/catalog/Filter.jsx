import React from "react";
import { useFilter } from "../../../components/features/catalog/FilterContext";
import { useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
  const { activeFilters, removeFilter, clearAllFilters } = useFilter();
  
  // Create array of active filters to display
  const getActiveFilterItems = () => {
    const items = [];
    
    // Add color filters
    activeFilters.color.forEach(color => {
      items.push({ 
        type: 'color', 
        value: color,
        displayValue: color.charAt(0).toUpperCase() + color.slice(1) // Capitalize color name
      });
    });
  
    // Add price filter
    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split('-');
      // Format price for display
      const formattedMin = parseInt(min).toLocaleString('vi-VN');
      const formattedMax = parseInt(max).toLocaleString('vi-VN');
      items.push({ 
        type: 'price', 
        value: activeFilters.price, // Keep original value for removal
        displayValue: `${formattedMin}đ - ${formattedMax}đ` 
      });
    }
    
    // Add discount filter if present
    if (activeFilters.discount) {
      items.push({
        type: 'discount',
        value: activeFilters.discount,
        displayValue: `Giảm giá ${activeFilters.discount}%+`
      });
    }
    
    return items;
  };
  
  const filterItems = getActiveFilterItems();
  
  // Don't display if no active filters
  if (filterItems.length === 0) {
    return null;
  }

  // Handle filter removal correctly
  const handleRemoveFilter = (filterType, filterValue) => {
    removeFilter(filterType, filterValue);
  };

  return (
    <div className="flex flex-row mt-5 gap-2 justify-center items-center max-w-full text-sm font-semibold leading-loose text-black w-full flex-wrap">
      {filterItems.map((item, index) => (
        <div
          key={`${item.type}-${item.value}-${index}`}
          className="flex flex-row gap-2.5 justify-center items-center px-4 py-3 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] max-w-[230px] max-md:pr-5"
        >
          <span>
            {item.displayValue}{" "}
          </span>
          <img
            src="/Close.png"
            alt="Remove filter"
            className="box-border object-cover overflow-hidden shrink-0 aspect-square min-h-5 min-w-5 w-5 cursor-pointer"
            onClick={() => handleRemoveFilter(item.type, item.value)}
          />
        </div>
      ))}
      {filterItems.length > 0 && (
        <button 
          className="px-4 py-3.5 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] h-[53px]"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default Filter;