import React from "react";
import { useFilter } from "../../../components/features/catalog/FilterContext";
import { useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
  const { activeFilters, removeFilter, clearAllFilters } = useFilter();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Tạo mảng các bộ lọc đang active để hiển thị
  const getActiveFilterItems = () => {
    const items = [];
    
    // Thêm bộ lọc category
    activeFilters.category.forEach(category => {
      items.push({ type: 'category', value: category });
    });
    
    // Thêm bộ lọc color
    activeFilters.color.forEach(color => {
      items.push({ type: 'color', value: color });
    });
    
    // Thêm bộ lọc size
    activeFilters.size.forEach(size => {
      items.push({ type: 'size', value: size });
    });
    
    // Thêm bộ lọc price
    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split('-');
      items.push({ type: 'price', value: `$${min} - $${max}` });
    }
    
    // Thêm bộ lọc discount
    if (activeFilters.discount) {
      items.push({ type: 'discount', value: activeFilters.discount });
    }
    
    return items;
  };
  
  const filterItems = getActiveFilterItems();
  
  // Không hiển thị nếu không có bộ lọc nào đang active
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