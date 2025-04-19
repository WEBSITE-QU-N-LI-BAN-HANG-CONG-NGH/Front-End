import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import ProductControls from "../../components/features/catalog/ProductControls";
import FilterSidebar from "../../components/features/catalog/FilterSidebar";
import Filter from "../../components/features/catalog/Filter";
import ProductCard from "../../components/features/product/ProductCard";
import Pagination from "../../components/common/Pagination";
import { useFilter } from "../../components/features/catalog/FilterContext";

const Catalog = ({ category }) => {
  const { page = "1" } = useParams();
  const currentPage = parseInt(page, 10) || 1;
  const navigate = useNavigate();
  const itemsPerPage = 10;
  
  // Tạo dữ liệu mẫu
  const allProducts = [

  ];
  
  // Sử dụng hook useFilter
  const { activeFilters } = useFilter();
  
  // Lọc sản phẩm theo category
  const applyFilters = (products) => {
    let filtered = [...products];
    
    // Lọc theo category từ URL
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Lọc theo category từ FilterContext
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.category.includes(product.category)
      );
    }
    
    // Lọc theo color nếu có
    if (activeFilters.color.length > 0) {
      // Giả sử các sản phẩm có thuộc tính color
      filtered = filtered.filter(product => 
        activeFilters.color.includes(product.color)
      );
    }
    
    // Lọc theo size nếu có
    if (activeFilters.size.length > 0) {
      // Giả sử các sản phẩm có thuộc tính size
      filtered = filtered.filter(product => 
        activeFilters.size.includes(product.size)
      );
    }
    
    // Lọc theo price nếu có
    if (activeFilters.price) {
      const [min, max] = activeFilters.price.split('-').map(p => parseInt(p));
      // Giả sử price là số nguyên
      filtered = filtered.filter(product => {
        const productPrice = parseInt(product.price.replace(/\D/g, ''));
        return productPrice >= min && productPrice <= max;
      });
    }
    
    return filtered;
  };
  
  const categoryTitle = {
    "laptops": "Laptops",
    "desktops": "Máy tính bàn",
    "phones": "Điện thoại",
    "components": "Linh kiện máy tính",
    "accessories": "Phụ kiện",
    "others": "Sản phẩm khác",
    "deals": "Khuyến mãi"
  };
  
  // Áp dụng tất cả các bộ lọc
  const filteredProducts = applyFilters(allProducts);
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const [currentProducts, setCurrentProducts] = useState(getCurrentProducts());

  useEffect(() => {
    if (currentPage < 1 || (totalPages > 0 && currentPage > totalPages)) {
      navigate("/product/all/1");
      return;
    }
    
    setCurrentProducts(getCurrentProducts());
    window.scrollTo(0, 0);
  }, [currentPage, category, activeFilters]);

  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <div className="flex flex-col self-center mt-4 w-full max-w-[1407px] max-md:max-w-full">
        <img
          src="/BannerPlaceholder.png"
          alt="Banner"
          className="object-contain w-full aspect-[13.51] max-md:max-w-full"
        />
        <BreadcrumbNav />
        <h1 className="self-start mt-5 mb-5 text-3xl font-semibold text-center text-black max-md:ml-2">
          {categoryTitle[category] || "Tất cả sản phẩm"} ({filteredProducts.length})
        </h1>
        <div className="flex gap-5 max-md:flex-col">
          <FilterSidebar />

          <section className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full max-md:mt-3 max-md:max-w-full">
              <Filter/>
              <ProductControls shown={currentProducts.length} total={filteredProducts.length} />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {currentProducts.map((product, index) => (
                  <ProductCard key={`product-${product.id}-${index}`} {...product} />
                ))}
              </div>
              
              <Pagination totalPages={totalPages} basePath="product/all" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Catalog;