import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Tạo FilterContext
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Khởi tạo state cho các bộ lọc
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    color: [],
    size: [],
    price: null,
    discount: null
  });
  
  // Phân tích tham số URL khi component được tạo
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Trích xuất các tham số từ URL
    const categoryParam = params.get('category');
    const colorParam = params.get('color');
    const sizeParam = params.get('size');
    const priceParam = params.get('price');
    
    // Thiết lập các bộ lọc dựa trên tham số URL
    const initialFilters = {
      category: categoryParam ? categoryParam.split(',') : [],
      color: colorParam ? colorParam.split(',') : [],
      size: sizeParam ? sizeParam.split(',') : [],
      price: priceParam || null,
      discount: null
    };
    
    setActiveFilters(initialFilters);
  }, [location.pathname]);
  
  // Cập nhật bộ lọc và URL
  const updateFilters = (filterType, value, isActive) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      // Xử lý các bộ lọc dạng mảng (category, color, size)
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
      // Xử lý các bộ lọc dạng đơn giá trị (price, discount)
      else {
        newFilters[filterType] = isActive ? value : null;
      }
      
      // Cập nhật URL
      const params = new URLSearchParams();
      
      if (newFilters.category.length > 0) {
        params.set('category', newFilters.category.join(','));
      }
      
      if (newFilters.color.length > 0) {
        params.set('color', newFilters.color.join(','));
      }
      
      if (newFilters.size.length > 0) {
        params.set('size', newFilters.size.join(','));
      }
      
      if (newFilters.price) {
        params.set('price', newFilters.price);
      }
      
      // Lấy đường dẫn cơ sở (không có tham số truy vấn)
      const basePath = location.pathname.split('?')[0];
      
      // Tạo URL mới với tham số truy vấn
      const queryString = params.toString();
      const newUrl = queryString ? `${basePath}?${queryString}` : basePath;
      
      // Cập nhật URL mà không tải lại trang
      navigate(newUrl, { replace: true });
      
      return newFilters;
    });
  };
  
  // Xóa một bộ lọc cụ thể
  const removeFilter = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      if (Array.isArray(newFilters[filterType])) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = null;
      }
      
      // Cập nhật URL sau khi xóa bộ lọc
      const params = new URLSearchParams();
      
      if (newFilters.category.length > 0) {
        params.set('category', newFilters.category.join(','));
      }
      
      if (newFilters.color.length > 0) {
        params.set('color', newFilters.color.join(','));
      }
      
      if (newFilters.size.length > 0) {
        params.set('size', newFilters.size.join(','));
      }
      
      if (newFilters.price) {
        params.set('price', newFilters.price);
      }
      
      // Lấy đường dẫn cơ sở
      const basePath = location.pathname.split('?')[0];
      
      // Tạo URL mới
      const queryString = params.toString();
      const newUrl = queryString ? `${basePath}?${queryString}` : basePath;
      
      // Cập nhật URL
      navigate(newUrl, { replace: true });
      
      return newFilters;
    });
  };
  
  // Xóa tất cả bộ lọc
  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      color: [],
      size: [],
      price: null,
      discount: null
    });
    
    // Đặt lại URL về đường dẫn cơ sở
    const basePath = location.pathname.split('?')[0];
    navigate(basePath, { replace: true });
  };
  
  // Đếm số lượng bộ lọc đang active
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