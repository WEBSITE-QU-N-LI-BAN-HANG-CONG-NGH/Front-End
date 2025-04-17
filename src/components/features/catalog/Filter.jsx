import React from "react";
import { useFilter } from "../../../hooks/useFilter";

const Filter = () => {
  const { activeFilters, removeFilter, clearAllFilters } = useFilter();
  
  // Create an array of all active filter items for display
  const getActiveFilterItems = () => {
    const items = [];
    
    // Add category filters
    activeFilters.category.forEach(category => {
      items.push({ type: 'category', value: category });
    });
    
    // Add color filters
    activeFilters.color.forEach(color => {
      items.push({ type: 'color', value: color });
    });
    
    // Add size filters
    activeFilters.size.forEach(size => {
      items.push({ type: 'size', value: size });
    });
    
    // Add price filter
    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split('-');
      items.push({ type: 'price', value: `$${min} - $${max}` });
    }
    
    // Add discount filter
    if (activeFilters.discount) {
      items.push({ type: 'discount', value: activeFilters.discount });
    }
    
    return items;
  };
  
  const filterItems = getActiveFilterItems();
  
  // Don't render if no filters are active
  if (filterItems.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row mt-5 gap-2 justify-center items-center max-w-full text-sm font-semibold leading-loose text-black w-full flex-wrap">
      {filterItems.map((item, index) => (
        <div
          key={`${item.type}-${item.value}-${index}`}
          className="flex flex-row gap-2.5 justify-center items-center px-4 py-3 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] max-w-[230px] max-md:pr-5"
        >
          <span>
            {item.value.toUpperCase()}{" "}
            <span className="font-normal text-gray-400">(24)</span>
          </span>
          <img
            src="/Close.png"
            alt="Remove filter"
            className="box-border object-cover overflow-hidden shrink-0 aspect-square min-h-5 min-w-5 w-5 cursor-pointer"
            onClick={() => removeFilter(item.type, item.type === 'price' ? activeFilters.price : item.value)}
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