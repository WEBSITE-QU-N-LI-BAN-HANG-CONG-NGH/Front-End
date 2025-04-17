// src/pages/Catalog/Catalog.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import ProductControls from "../../components/features/catalog/ProductControls";
import FilterSidebar from "../../components/features/catalog/FilterSidebar";
import Filter from "../../components/features/catalog/Filter";
import ProductCard from "../../components/features/product/ProductCard";
import Pagination from "../../components/common/Pagination";
import { FilterProvider } from "../../components/features/catalog/FilterContext";

const Catalog = ({ category }) => {
  const { page = "1" } = useParams();
  const currentPage = parseInt(page, 10) || 1;
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;
  
  // Dữ liệu sản phẩm và logic trang giữ nguyên...
  const allProducts = [
    // ... danh sách sản phẩm của bạn từ nguồn dữ liệu thực tế
  ];
  
  // Lọc sản phẩm theo category
  const filterProductsByCategory = (products, categoryFilter) => {
    if (!categoryFilter) return products;
    return products.filter(product => product.category === categoryFilter);
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
  
  // Áp dụng bộ lọc category
  const filteredByCategory = category ? filterProductsByCategory(allProducts, category) : allProducts;
  console.log("Category:", category);
  console.log("Filtered products count:", filteredByCategory.length);
  
  const totalPages = Math.ceil(filteredByCategory.length / itemsPerPage);

  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredByCategory.slice(startIndex, endIndex);
  };

  const [currentProducts, setCurrentProducts] = useState(getCurrentProducts());

  useEffect(() => {
    if (currentPage < 1 || (totalPages > 0 && currentPage > totalPages)) {
      navigate("/product/all/1");
      return;
    }
    
    setCurrentProducts(getCurrentProducts());
    window.scrollTo(0, 0);
  }, [currentPage, category]);

  return (
    <FilterProvider>
      <div className="flex overflow-hidden flex-col pt-3 bg-white">
        <div className="flex flex-col self-center mt-4 w-full max-w-[1407px] max-md:max-w-full">
          <img
            src="/BannerPlaceholder.png"
            alt="Banner"
            className="object-contain w-full aspect-[13.51] max-md:max-w-full"
          />
          <BreadcrumbNav />
          <h1 className="self-start mt-5 mb-5 text-3xl font-semibold text-center text-black max-md:ml-2">
            {categoryTitle[category] || "MSI PS Series"} ({filteredByCategory.length}) - Page {currentPage}
          </h1>
          <div className="flex gap-5 max-md:flex-col">
            <FilterSidebar />

            <section className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full max-md:mt-3 max-md:max-w-full">
                <Filter/>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                  {currentProducts.map((product, index) => (
                    <ProductCard key={`product-${product.productId || index}`} {...product} />
                  ))}
                </div>
                
                <Pagination totalPages={totalPages} basePath="product/all" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </FilterProvider>
  );
};

export default Catalog;