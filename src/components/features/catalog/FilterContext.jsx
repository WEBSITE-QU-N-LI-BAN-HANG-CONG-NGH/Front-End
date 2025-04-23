import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Tạo FilterContext
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ----- Sửa đổi State -----
  // Khởi tạo state CHỈ cho các bộ lọc CHI TIẾT (nằm trong query string)
  const [activeFilters, setActiveFilters] = useState({
    // KHÔNG có 'category' ở đây
    color: [],
    size: [],
    price: null,
    discount: null
    // Thêm các bộ lọc query string khác nếu có (ví dụ: sort, stock)
  });
  // --------------------------

  // ----- Sửa đổi useEffect đọc URL -----
  // Phân tích CHỈ query string khi nó thay đổi
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const colorParam = params.get('color');
    const sizeParam = params.get('size');
    const priceParam = params.get('price');
    const discountParam = params.get('discount');
    
    console.log("URL params detected:", { 
      color: colorParam, 
      size: sizeParam, 
      price: priceParam, 
      discount: discountParam 
    });
    
    const initialFilters = {
      color: colorParam ? colorParam.split(',') : [],
      size: sizeParam ? sizeParam.split(',') : [],
      price: priceParam || null,
      discount: discountParam || null,
    };
    
    console.log("Setting filters from URL:", initialFilters);
    
    if (JSON.stringify(activeFilters) !== JSON.stringify(initialFilters)) {
      setActiveFilters(initialFilters);
    }
  }, [location.search]);
  // ------------------------------------

  // ----- Sửa đổi updateFilters -----
  const updateFilters = (filterType, value, isActive) => {
    // Validate filterType first 
    if (filterType === 'category') {
      console.warn("FilterContext doesn't manage 'category'. It's part of the URL path.");
      return;
    }
  
    // Create a copy of current filters
    const newFilters = { ...activeFilters };
    
    // Handle array-type filters (like color)
    if (Array.isArray(newFilters[filterType])) {
      if (isActive) {
        // Add value if not already present
        if (!newFilters[filterType].includes(value)) {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else {
        // Remove value
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      }
    } else {
      // Handle single-value filters (like price)
      newFilters[filterType] = isActive ? value : null;
    }
    
    // Update state
    setActiveFilters(newFilters);
    
    // Update URL query string
    const params = new URLSearchParams(location.search);
    
    // Clear existing filter params to prevent duplicates
    Object.keys(newFilters).forEach(key => params.delete(key));
    
    // Add updated filter values to URL
    if (newFilters.color.length > 0) params.set('color', newFilters.color.join(','));
    if (newFilters.size.length > 0) params.set('size', newFilters.size.join(','));
    if (newFilters.price) params.set('price', newFilters.price);
    if (newFilters.discount) params.set('discount', newFilters.discount);
    
    // Keep current path but update query string
    const currentPathname = location.pathname;
    const queryString = params.toString();
    const newUrl = `${currentPathname}${queryString ? `?${queryString}` : ''}`;
    
    // Update URL, replace history entry
    navigate(newUrl, { replace: true });
  }
  // ----------------------------

  // ----- Sửa đổi removeFilter -----
  // Xóa một bộ lọc CHI TIẾT cụ thể
  const removeFilter = (filterType, value) => {
    if (filterType === 'category') {
        console.warn("FilterContext không quản lý 'category'.");
        return;
    }
    // Gọi updateFilters với isActive = false để tái sử dụng logic cập nhật URL
    updateFilters(filterType, value, false);
  };
  // ---------------------------

  // ----- Sửa đổi clearAllFilters -----
  // Xóa tất cả bộ lọc CHI TIẾT
  const clearAllFilters = () => {
    // Reset state về rỗng (chỉ các filter chi tiết)
    const clearedFilters = {
      color: [],
      size: [],
      price: null,
      discount: null,
      // Reset các filter chi tiết khác nếu có
    };
    setActiveFilters(clearedFilters);

    // --- Cập nhật URL QUERY STRING ---
    const params = new URLSearchParams(location.search);
    // Xóa các key của bộ lọc chi tiết khỏi query params
    Object.keys(clearedFilters).forEach(key => params.delete(key));

    const currentPathname = location.pathname;
    const queryString = params.toString(); // Có thể vẫn còn totalItem/totalPage
    const newUrl = `${currentPathname}${queryString ? `?${queryString}` : ''}`;

    // Cập nhật URL, tùy chọn reset về trang 1
    // Ví dụ reset về trang 1: (Tương tự như trong updateFilters)
    // const pathSegments = currentPathname.split('/');
    // const pageIndex = pathSegments.findIndex(seg => /^\d+$/.test(seg));
    // let basePath = currentPathname;
    // if (pageIndex > -1) {
    //     basePath = pathSegments.slice(0, pageIndex).join('/');
    // }
    // const urlWithPage1 = `${basePath}/1${queryString ? `?${queryString}` : ''}`;
    // navigate(urlWithPage1, { replace: true });

    // Nếu giữ nguyên trang hiện tại:
    navigate(newUrl, { replace: true });
    // -------------------------------
  };
  // ---------------------------

  // ----- Sửa đổi getActiveFilterCount -----
  // Đếm số lượng bộ lọc CHI TIẾT đang active
  const getActiveFilterCount = () => {
    let count = 0;
    // Chỉ đếm các bộ lọc chi tiết
    count += activeFilters.color.length;
    count += activeFilters.size.length;
    count += activeFilters.price ? 1 : 0;
    count += activeFilters.discount ? 1 : 0;
    // Đếm các bộ lọc chi tiết khác nếu có
    return count;
  };
  // ---------------------------------

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

// Custom hook để sử dụng FilterContext (Giữ nguyên)
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    console.warn("useFilter must be used within a FilterProvider");
    // Trả về một triển khai giả để tránh lỗi
    return {
      activeFilters: { // Trả về cấu trúc state đã sửa
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