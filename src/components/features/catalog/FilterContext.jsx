// src/components/features/catalog/FilterContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Tạo và export FilterContext
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

  // Các function và logic khác của bạn...

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

// Hook useFilter đã được dịch chuyển sang một file riêng