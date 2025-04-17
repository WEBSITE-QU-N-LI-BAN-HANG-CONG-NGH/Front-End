import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Tạo FilterContext
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    color: [],
    size: [],
    price: null,
    discount: null
  });
  
  // Cập nhật filter
  const updateFilters = (filterType, value, isActive) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      // Xử lý các filter dạng mảng (category, color, size)
      if (Array.isArray(newFilters[filterType])) {
        if (isActive) {
          // Thêm vào nếu chưa có
          if (!newFilters[filterType].includes(value)) {
            newFilters[filterType] = [...newFilters[filterType], value];
          }
        } else {
          // Xóa nếu có
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        }
      } 
      // Xử lý các filter dạng đơn giá trị (price, discount)
      else {
        newFilters[filterType] = isActive ? value : null;
      }
      
      return newFilters;
    });
  };
  
  // Xóa một filter cụ thể
  const removeFilter = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      if (Array.isArray(newFilters[filterType])) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = null;
      }
      
      return newFilters;
    });
  };
  
  // Xóa tất cả filter
  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      color: [],
      size: [],
      price: null,
      discount: null
    });
  };
  
  // Đếm số lượng filter đang active
  const getActiveFilterCount = () => {
    let count = 0;
    
    count += activeFilters.category.length;
    count += activeFilters.color.length;
    count += activeFilters.size.length;
    count += activeFilters.price ? 1 : 0;
    count += activeFilters.discount ? 1 : 0;
    
    return count;
  };

  const value = {
    activeFilters,
    updateFilters,
    removeFilter,
    clearAllFilters,
    getActiveFilterCount
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook để sử dụng FilterContext
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    console.warn("useFilter must be used within a FilterProvider");
    // Trả về một triển khai giả để tránh lỗi
    return {
      activeFilters: {
        category: [],
        color: [],
        size: [],
        price: null,
        discount: null
      },
      updateFilters: () => {},
      removeFilter: () => {},
      clearAllFilters: () => {},
      getActiveFilterCount: () => 0
    };
  }
  return context;
};