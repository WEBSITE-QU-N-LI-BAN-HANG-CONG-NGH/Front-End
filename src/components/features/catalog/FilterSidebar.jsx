import React, { useEffect, useState } from "react";
import { useFilter } from "../../../components/features/catalog/FilterContext";
import { useLocation, useNavigate } from "react-router-dom";
import { productService } from "../../../services/product.service";


// Category filter data
useEffect(() => {
  const categories = productService.getSecondCategory()
}, [])

// Price filter data
const priceRanges = [
  { range: "50.000 To 200.000", value: "50000-199999" },
  { range: "100.000 To 500.000", value: "200000-499999" },
  { range: "500.000 To 2.000.000", value: "500000-1999999" },
  { range: "2.000.000 To 10.000.000", value: "2000000-9999999" },
  { range: "10.000.000 To 50.000.000", value: "10000000-49999999" },
  { range: "50.000.000 To 100.000.000", value: "50000000-99999999" }
];

// Color filter data
const colors = [
  { name: "White", value: "white" },
  { name: "Black", value: "black" },
  { name: "Blue", value: "blue" },
  { name: "Brown", value: "brown" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Yellow", value: "yellow" }
];


const FilterSidebar = () => {
  const { activeFilters, updateFilters, clearAllFilters } = useFilter();
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


          
        </section>
      </div>
    </aside>
  );
};

export default FilterSidebar;