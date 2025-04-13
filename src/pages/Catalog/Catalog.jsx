import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/layout/Header";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import ProductControls from "../../components/ui/ProductControls";
import FilterSidebar from "../../components/ui/FilterSidebar";
import Filter from "../../components/ui/Filter";
import ProductCard from "../../components/ui/ProductCard";
import Pagination from "../../components/ui/Pagination";
import Footer from "../../components/layout/Footer";
import Features from "../../components/layout/Features";
import { FilterProvider } from "../../components/ui/FilterContext";

const Catalog = () => {
  const { page = "1" } = useParams();
  const currentPage = parseInt(page, 10) || 1;
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;
  
  const allProducts = [
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
    {
      image: "/Placeholder2.png",
      stockStatus: "in stock",
      title: "NahNah Model A",
      price: "999",
      originalPrice: "499",
      reviewCount: 4,
      ratingImage: "4",
      productId: "1", 
    },
  ];

 
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  

  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allProducts.slice(startIndex, endIndex);
  };

  const [currentProducts, setCurrentProducts] = useState(getCurrentProducts());


  useEffect(() => {

    if (currentPage < 1 || currentPage > totalPages) {
      navigate("/product/all/1");
      return;
    }
    
    setCurrentProducts(getCurrentProducts());
 
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <FilterProvider>
      <div className="flex overflow-hidden flex-col pt-3 bg-white">
        <Header />
        <div className="flex flex-col self-center mt-4 w-full max-w-[1407px] max-md:max-w-full">
          <img
            src="/BannerPlaceholder.png"
            alt="Banner"
            className="object-contain w-full aspect-[13.51] max-md:max-w-full"
          />
          <BreadcrumbNav />
          <h1 className="self-start mt-5 mb-5 text-3xl font-semibold text-center text-black max-md:ml-2">
            MSI PS Series ({allProducts.length}) - Page {currentPage}
          </h1>
          <div className="flex gap-5 max-md:flex-col">
            <FilterSidebar />

            <section className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full max-md:mt-3 max-md:max-w-full">
                <Filter/>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                  {currentProducts.map((product, index) => (
                    <ProductCard key={`product-${product.productId}`} {...product} />
                  ))}
                </div>
                
                <Pagination totalPages={totalPages} basePath="product/all" />
              </div>
            </section>
          </div>
        </div>
        <Features />
        <Footer />
      </div>
    </FilterProvider>
  );
};

export default Catalog;