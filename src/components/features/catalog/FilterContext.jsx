// Không cần sửa imports
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FilterContext = createContext();

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

  // Parse URL params on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    const newFilters = { ...activeFilters };
    
    // Parse category filters
    const categories = searchParams.get("category")?.split(",") || [];
    if (categories.length) newFilters.category = categories;
    
    // Parse color filters
    const colors = searchParams.get("color")?.split(",") || [];
    if (colors.length) newFilters.color = colors;
    
    // Parse size filters
    const sizes = searchParams.get("size")?.split(",") || [];
    if (sizes.length) newFilters.size = sizes;
    
    // Parse price filter
    const price = searchParams.get("price");
    if (price) newFilters.price = price;
    
    // Parse discount filter
    const discount = searchParams.get("discount");
    if (discount) newFilters.discount = discount;
    
    setActiveFilters(newFilters);
  }, [location.search]);

  // Update URL when filters change
  const updateFilters = (type, value, isActive) => {
    const newFilters = { ...activeFilters };
    
    // Handle array filters (category, color, size)
    if (Array.isArray(newFilters[type])) {
      if (isActive) {
        newFilters[type] = [...newFilters[type], value];
      } else {
        newFilters[type] = newFilters[type].filter(item => item !== value);
      }
    } 
    // Handle single value filters (price, discount)
    else {
      newFilters[type] = isActive ? value : null;
    }
    
    setActiveFilters(newFilters);
    updateURL(newFilters);
  };

  // Remove a specific filter
  const removeFilter = (type, value) => {
    const newFilters = { ...activeFilters };
    
    if (Array.isArray(newFilters[type])) {
      newFilters[type] = newFilters[type].filter(item => item !== value);
    } else {
      newFilters[type] = null;
    }
    
    setActiveFilters(newFilters);
    updateURL(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    const emptyFilters = {
      category: [],
      color: [],
      size: [],
      price: null,
      discount: null
    };
    
    setActiveFilters(emptyFilters);
    updateURL(emptyFilters);
  };

  // Update URL with current filters
  const updateURL = (filters) => {
    const searchParams = new URLSearchParams();
    
    if (filters.category.length > 0) {
      searchParams.set("category", filters.category.join(","));
    }
    
    if (filters.color.length > 0) {
      searchParams.set("color", filters.color.join(","));
    }
    
    if (filters.size.length > 0) {
      searchParams.set("size", filters.size.join(","));
    }
    
    if (filters.price) {
      searchParams.set("price", filters.price);
    }
    
    if (filters.discount) {
      searchParams.set("discount", filters.discount);
    }
    
    // Get the base path without query params
    const basePath = location.pathname;
    const newUrl = searchParams.toString() ? `${basePath}?${searchParams.toString()}` : basePath;
    
    navigate(newUrl, { replace: true });
  };

  // Get count of active filters
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

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};