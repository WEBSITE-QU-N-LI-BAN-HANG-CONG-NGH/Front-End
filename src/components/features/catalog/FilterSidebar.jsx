import React, { useState } from "react";
import { useFilter } from "../../../components/features/catalog/FilterContext";
import { useLocation, useNavigate } from "react-router-dom";

// Category filter data
const categories = [
  { name: "CUSTOM PCS", count: 15 },
  { name: "MSI ALL-IN-ONE PCS", count: 45 },
  { name: "HP/COMPAQ PCS", count: 24 }
];

// Price filter data
const priceRanges = [
  { range: "$159 To $399", value: "159-399", count: 19 },
  { range: "$399 To $999", value: "399-999", count: 21 },
  { range: "$999 To $1999", value: "999-1999", count: 9 },
  { range: "$1999 To $2999", value: "1999-2999", count: 6 },
  { range: "$3999 To $4999", value: "3999-4999", count: 3 }
];

// Color filter data
const colors = [
  { name: "White", value: "white" },
  { name: "Beige", value: "beige" },
  { name: "Blue", value: "blue" },
  { name: "Brown", value: "brown" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Yellow", value: "yellow" }
];

// Size filter data
const sizes = [
  { name: "S", value: "S" },
  { name: "M", value: "M" },
  { name: "L", value: "L" }
];

const FilterSidebar = () => {
  const { activeFilters, updateFilters, clearAllFilters, getActiveFilterCount } = useFilter();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    size: true,
    discount: false
  });

  // Toggle section visibility
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Handle apply filters button
  const handleApplyFilters = () => {
    // Không cần làm gì vì updateFilters đã cập nhật URL rồi
    console.log("Applying filters:", activeFilters);
  };
  
  // Xử lý xóa tất cả bộ lọc
  const handleClearAll = () => {
    clearAllFilters();
  };

  return (
    <aside className="w-[17%] max-md:ml-0 max-md:w-full">
      <div className="max-md:mt-1.5">
        <section className="bg-violet-50">
          <div className="max-w-full text-center rounded-none w-[234px]">
            <div className="flex flex-col px-4 py-5 bg-violet-50">
              <h2 className="self-center text-base font-bold text-black">
                Filters
              </h2>
              <button 
                className="px-6 py-2 mt-4 text-sm font-semibold cursor-pointer text-gray-400 border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] rounded-[50px] max-md:px-5"
                onClick={handleClearAll}
              >
                Clear Filter
              </button>
            </div>
          </div>

          {/* Category Section */}
          <section className="px-4 py-5 w-full text-black max-w-[234px]">
            <div 
              className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => toggleSection('category')}
            >
              <h3>Category</h3>
              <img
                src={expandedSections.category ? "/UpArrow.svg" : "/DownArrow.svg"}
                alt="Toggle category"
                className="object-contain shrink-0 w-4 aspect-[1.14]"
              />
            </div>
            
            {expandedSections.category && (
              <div className="flex gap-5 justify-between mt-4 text-sm leading-7">
                <div>
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.name}`}
                        checked={activeFilters.category.includes(category.name)}
                        onChange={(e) => updateFilters('category', category.name, e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category.name}`}>{category.name}</label>
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  {categories.map((category) => (
                    <div key={`count-${category.name}`}>{category.count}</div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Price Section */}
          <section className="p-4 w-full text-black max-w-[234px]">
            <div 
              className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => toggleSection('price')}
            >
              <h3>Price</h3>
              <img
                src={expandedSections.price ? "/UpArrow.svg" : "/DownArrow.svg"}
                alt="Toggle price"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>
            
            {expandedSections.price && (
              <div className="flex gap-5 justify-between mt-5 text-sm leading-7">
                <div className="w-full">
                  {priceRanges.map((priceRange) => (
                    <div key={priceRange.value} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`price-${priceRange.value}`}
                          name="price"
                          checked={activeFilters.price === priceRange.value}
                          onChange={() => updateFilters('price', priceRange.value, true)}
                          className="mr-2"
                        />
                        <label htmlFor={`price-${priceRange.value}`}>{priceRange.range}</label>
                      </div>
                      <span>{priceRange.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Color Section */}
          <section className="px-4 py-5 w-full text-black max-w-[234px]">
            <div 
              className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => toggleSection('color')}
            >
              <h3 className="my-auto">Color</h3>
              <img
                src={expandedSections.color ? "/UpArrow.svg" : "/DownArrow.svg"}
                alt="Toggle color"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>
            
            {expandedSections.color && (
              <div className="mt-4 text-sm leading-7">
                {colors.map((color) => (
                  <div key={color.value} className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      id={`color-${color.value}`}
                      checked={activeFilters.color.includes(color.value)}
                      onChange={(e) => updateFilters('color', color.value, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`color-${color.value}`}>{color.name}</label>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Size Section */}
          <section className="px-4 py-5 w-full text-black max-w-[234px]">
            <div 
              className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => toggleSection('size')}
            >
              <h3 className="my-auto">Size</h3>
              <img
                src={expandedSections.size ? "/UpArrow.svg" : "/DownArrow.svg"}
                alt="Toggle size"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>
            
            {expandedSections.size && (
              <div className="mt-4 text-sm leading-7">
                {sizes.map((size) => (
                  <div key={size.value} className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      id={`size-${size.value}`}
                      checked={activeFilters.size.includes(size.value)}
                      onChange={(e) => updateFilters('size', size.value, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`size-${size.value}`}>{size.name}</label>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="px-4 py-5 w-full text-sm font-semibold rounded-none max-w-[234px]">
            <div className="flex gap-5 justify-between text-black">
              <h3>Filter Name</h3>
              <img
                src="/DownArrow.svg"
                alt="Toggle filter"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>
            <button 
              className="px-11 py-2 mt-4 cursor-pointer w-full text-center text-white bg-blue-600 rounded-[50px] max-md:px-5 hover:bg-blue-700 transition-colors"
              onClick={handleApplyFilters}
            >
              Apply Filters ({getActiveFilterCount()})
            </button>
          </section>
        </section>
      </div>
    </aside>
  );
};

export default FilterSidebar;