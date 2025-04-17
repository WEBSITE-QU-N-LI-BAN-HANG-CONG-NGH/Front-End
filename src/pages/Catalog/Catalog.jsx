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
    {
      id: 1,
      productId: 1,
      category: "laptops",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "Laptop MSI Modern 14",
      price: "15.990.000đ",
      originalPrice: "17.990.000đ",
      reviewCount: 4,
      rating: 4
    },
    {
      id: 2,
      productId: 2,
      category: "desktops",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "PC Gaming MSI MEG Aegis Ti5",
      price: "89.990.000đ",
      originalPrice: "95.990.000đ",
      reviewCount: 3,
      rating: 5
    },
    {
      id: 3,
      productId: 3,
      category: "phones",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "iPhone 15 Pro Max 1TB",
      price: "44.990.000đ",
      originalPrice: "47.990.000đ",
      reviewCount: 5,
      rating: 5
    },
    {
      id: 4,
      productId: 4,
      category: "accessories",
      image: "/Placeholder2.png",
      stockStatus: "out of stock",
      title: "Tai nghe Apple AirPods Pro 2",
      price: "5.990.000đ",
      originalPrice: "6.990.000đ",
      reviewCount: 4,
      rating: 4
    },
    {
      id: 5,
      productId: 5,
      category: "components",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "CPU Intel Core i9-13900K",
      price: "15.990.000đ",
      originalPrice: "16.990.000đ",
      reviewCount: 4,
      rating: 5
    },
    {
      id: 6,
      productId: 6,
      category: "others",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "Màn hình Samsung Odyssey G9",
      price: "35.990.000đ",
      originalPrice: "39.990.000đ",
      reviewCount: 3,
      rating: 4
    },
    {
      id: 7,
      productId: 7,
      category: "deals",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "Laptop Gaming Acer Nitro 5",
      price: "19.990.000đ",
      originalPrice: "24.990.000đ",
      reviewCount: 4,
      rating: 4
    },
    {
      id: 8,
      productId: 8,
      category: "laptops",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "MacBook Pro 16 M3 Max",
      price: "79.990.000đ",
      originalPrice: "85.990.000đ",
      reviewCount: 5,
      rating: 5
    },
    {
      id: 9,
      productId: 9,
      category: "components",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "Card đồ họa NVIDIA RTX 4090",
      price: "45.990.000đ",
      originalPrice: "49.990.000đ",
      reviewCount: 4,
      rating: 5
    },
    {
      id: 10,
      productId: 10,
      category: "phones",
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "Samsung Galaxy S24 Ultra",
      price: "34.990.000đ",
      originalPrice: "36.990.000đ",
      reviewCount: 4,
      rating: 4
    },
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