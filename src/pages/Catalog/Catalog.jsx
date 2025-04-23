import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import ProductControls from "../../components/features/catalog/ProductControls";
import FilterSidebar from "../../components/features/catalog/FilterSidebar";
import Filter from "../../components/features/catalog/Filter";
import ProductCard from "../../components/features/product/ProductCard";
import Pagination from "../../components/common/Pagination";
import { useFilter } from "../../components/features/catalog/FilterContext";
import { productService } from "../../services/product.service";

// --- Hàm định dạng giá ---
const formatPrice = (price) => {
    if (typeof price !== 'number') return "N/A";
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

// --- Component Catalog ---
const Catalog = ({ category: categoryProp }) => { // Nhận categoryProp từ Router
  // Lấy các tham số từ URL path
  const { secondLevelCategory: secondLevelCategoryProp, page: pageFromParams = "1" } = useParams();
  const currentPage = parseInt(pageFromParams, 10) || 1;

  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 10;

  // --- State ---
  // State lưu trữ dữ liệu gốc lấy từ API dựa trên category
  const [baseProductData, setBaseProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  // Lấy bộ lọc đang active từ Context (color, size, price,...)
  const { activeFilters } = useFilter();

  // --- Fetch dữ liệu gốc từ Backend dựa trên Category ---
  useEffect(() => {
    const fetchBaseProducts = async () => {
      setLoading(true);
      setStatusMessage("Đang tải sản phẩm...");
      setMessageType("info");
      setBaseProductData([]); // Reset data cũ

      try {
        let response;
        // Quyết định gọi API nào dựa trên props categoryProp và secondLevelCategoryProp
        if (categoryProp && categoryProp !== 'all' && secondLevelCategoryProp) {
          console.log(`Fetching by top: ${categoryProp}, second: ${secondLevelCategoryProp}`);
          response = await productService.getProductByTopCategoryAndSecondCategory(categoryProp, secondLevelCategoryProp);
        } else if (categoryProp && categoryProp !== 'all') {
          console.log(`Fetching by top: ${categoryProp}`);
          response = await productService.getProductByTopCategory(categoryProp);
        } else {
          // Mặc định hoặc khi categoryProp là 'all'
          console.log("Fetching all products");
          response = await productService.getAllProducts();
        }

        console.log("Base products fetched:", response.data);
        setBaseProductData(Array.isArray(response.data) ? response.data : []);
        setStatusMessage("");
        setMessageType("");
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm gốc:", error);
        setStatusMessage(error.response?.data?.message || "Tải sản phẩm thất bại. Vui lòng thử lại.");
        setMessageType("error");
        setBaseProductData([]); // Đặt lại thành rỗng khi có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchBaseProducts();
  // Chạy lại khi category hoặc secondLevelCategory thay đổi (thay đổi URL)
  }, [categoryProp, secondLevelCategoryProp]);

  // --- Mapping tên danh mục (Giữ nguyên) ---
  const categoryTitleMap = {
    "laptop": "Laptop",
    "desktops": "Máy tính bàn",
    "phone": "Điện thoại",
    "components": "Linh kiện máy tính",
    "accessories": "Phụ kiện",
    "others": "Sản phẩm khác",
    "deals": "Khuyến mãi",
    "all": "Tất cả sản phẩm" // Thêm 'all'
  };
  const secondLevelCategoryTitleMap = {
      "acer": "Acer",
      "dell": "Dell",
      "apple": "Apple",
      "asus": "Asus",
      // ...
  };

  // --- Hàm Lọc phía Client (Memoized) ---
  // Áp dụng các bộ lọc từ activeFilters (color, size, price) lên baseProductData
  const applyClientSideFilters = useMemo(() => (products) => {
    let filtered = [...products]; // Start with base data from API
    
    // Filter by color
    if (activeFilters.color.length > 0) {
      console.log("Applying color filter:", activeFilters.color);
      filtered = filtered.filter(product => {
        // Check if product has color property and it matches any selected color
        // Added fallback for products that might have uppercase colors or different formats
        return activeFilters.color.some(colorFilter => {
          const productColor = product.color?.toLowerCase?.();
          const filterColor = colorFilter.toLowerCase();
          return productColor === filterColor;
        });
      });
    }
    
    // Filter by size
    if (activeFilters.size.length > 0) {
      console.log("Applying size filter:", activeFilters.size);
      filtered = filtered.filter(product => {
        // Handle different data structures for sizes
        if (Array.isArray(product.sizes)) {
          return product.sizes.some(productSize => 
            activeFilters.size.includes(productSize)
          );
        } else if (typeof product.size === 'string') {
          return activeFilters.size.includes(product.size);
        }
        return false;
      });
    }
    
    // Filter by price range
    if (activeFilters.price) {
      console.log("Applying price filter:", activeFilters.price);
      const [minStr, maxStr] = activeFilters.price.split('-');
      const min = parseInt(minStr, 10);
      const max = parseInt(maxStr, 10);
      
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter(product => {
          // Use discountedPrice for price filtering, fallback to price
          const productPrice = product.discountedPrice || product.price;
          return typeof productPrice === 'number' && 
                 productPrice >= min && 
                 productPrice <= max;
        });
      }
    }
    
    // Filter by discount percentage
    if (activeFilters.discount) {
      console.log("Applying discount filter:", activeFilters.discount);
      const minDiscountValue = parseInt(activeFilters.discount, 10);
      
      if (!isNaN(minDiscountValue)) {
        filtered = filtered.filter(product => {
          if (product.price > 0 && product.discountedPrice < product.price) {
            const discountPercent = ((product.price - product.discountedPrice) / product.price) * 100;
            return discountPercent >= minDiscountValue;
          }
          return false;
        });
      }
    }
    
    return filtered;
  }, [activeFilters]);// Chỉ phụ thuộc vào activeFilters

  // --- Tính toán danh sách sản phẩm cuối cùng sau khi lọc client-side (Memoized) ---
  const filteredProducts = useMemo(() => {
      // Chỉ lọc khi không còn loading và đã có dữ liệu gốc
      if (!loading && baseProductData.length > 0) {
          return applyClientSideFilters(baseProductData);
      }
      return []; // Trả về mảng rỗng nếu đang tải hoặc không có dữ liệu gốc
  }, [loading, baseProductData, applyClientSideFilters]);

  // --- Tính toán phân trang dựa trên dữ liệu đã lọc client-side (Memoized) ---
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts.length, itemsPerPage]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Cắt mảng filteredProducts để lấy sản phẩm cho trang hiện tại
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);


  // --- Effect: Xử lý trang không hợp lệ và cuộn lên đầu ---
   useEffect(() => {
     // Chỉ kiểm tra sau khi fetch xong và đã tính toán xong totalPages
     if (!loading && filteredProducts.length > 0) {
         if (totalPages > 0 && currentPage > totalPages) {
             console.log(`Trang ${currentPage} vượt quá giới hạn (Tổng: ${totalPages}). Chuyển hướng đến trang ${totalPages}.`);
             handlePageChange(totalPages, true); // Chuyển hướng đến trang cuối
         } else if (currentPage < 1) {
             console.log(`Trang ${currentPage} không hợp lệ. Chuyển hướng đến trang 1.`);
             handlePageChange(1, true); // Chuyển hướng đến trang 1
         }
     }
     // Cuộn lên đầu trang khi trang thay đổi hoặc khi dữ liệu/bộ lọc thay đổi
     window.scrollTo(0, 0);
   // Chạy khi trang thay đổi, hoặc khi totalPages thay đổi (do lọc client-side), hoặc khi loading xong
   }, [currentPage, totalPages, loading, filteredProducts.length]); // Thêm filteredProducts.length để đảm bảo chạy sau khi lọc xong


  // --- Effect: Cập nhật URL với totalItem và totalPage (Dựa trên lọc client-side) ---
   useEffect(() => {
       // Chỉ cập nhật URL sau khi đã tải xong và đã lọc xong
       if (!loading) {
           const params = new URLSearchParams(location.search);
           const currentTotalItem = params.get('totalItem');
           const currentTotalPage = params.get('totalPage');
           const newTotalItem = filteredProducts.length.toString();
           // Tính totalPages dựa trên filteredProducts
           const newTotalPage = Math.ceil(filteredProducts.length / itemsPerPage).toString();

           // Chỉ cập nhật nếu giá trị thực sự thay đổi
           if (currentTotalItem !== newTotalItem || currentTotalPage !== newTotalPage) {
               params.set('totalItem', newTotalItem);
               params.set('totalPage', newTotalPage);
               navigate(`${location.pathname}?${params.toString()}`, { replace: true, state: location.state });
           }
       }
   }, [filteredProducts.length, itemsPerPage, loading, navigate, location.pathname, location.search, location.state]);


  // --- Hàm xử lý chuyển trang ---
  const handlePageChange = (newPage, replace = false) => {
    // Tính totalPages dựa trên filteredProducts mới nhất
    const currentTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    if (newPage < 1 || (currentTotalPages > 0 && newPage > currentTotalPages) || newPage === currentPage) {
      return; // Không làm gì nếu trang không hợp lệ hoặc là trang hiện tại
    }

    const params = new URLSearchParams(location.search); // Giữ lại query filter

    // Xây dựng basePath dựa trên category và secondLevelCategory
    let basePathSegments = [];
     if (categoryProp && categoryProp !== 'all') {
        basePathSegments.push(categoryProp);
        if (secondLevelCategoryProp) {
            basePathSegments.push(secondLevelCategoryProp);
        }
    } else {
        basePathSegments.push('product', 'all');
    }
    const basePath = `/${basePathSegments.join('/')}`;
    const queryString = params.toString();

    // Navigate chỉ thay đổi phần page của URL path
    navigate(`${basePath}/${newPage}${queryString ? `?${queryString}` : ''}`, { replace: replace, state: location.state });
  };

  // --- Xác định tiêu đề trang (Giữ nguyên) ---
  const pageTitle = secondLevelCategoryProp
      ? `${categoryTitleMap[categoryProp] || categoryProp} - ${secondLevelCategoryTitleMap[secondLevelCategoryProp] || secondLevelCategoryProp}`
      : (categoryTitleMap[categoryProp] || "Tất cả sản phẩm");


  // --- Render component ---
  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <div className="flex flex-col self-center mt-4 w-full max-w-[1407px] max-md:max-w-full">
        <img /* Banner */ />
        <BreadcrumbNav />
        {/* Hiển thị tổng số sản phẩm sau khi lọc client-side */}
        <h1 className="self-start mt-5 mb-5 text-3xl font-semibold text-center text-black max-md:ml-2">
          {pageTitle} ({filteredProducts.length})
        </h1>

        {/* Thông báo */}
        {loading && <div className="text-center p-4">{statusMessage || "Đang tải..."}</div>}
        {!loading && messageType === 'error' && <div className="text-center p-4 text-red-600">{statusMessage}</div>}
        {/* Hiển thị khi không tải, không lỗi, nhưng không có sản phẩm nào sau khi lọc */}
        {!loading && !filteredProducts.length && messageType !== 'error' && <div className="text-center p-4">Không tìm thấy sản phẩm nào phù hợp.</div>}

        <div className="flex gap-5 max-md:flex-col">
          <FilterSidebar topCategory={categoryProp} /> 
          <section className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col w-full max-md:mt-3 max-md:max-w-full">
              <Filter /> {/* Hiển thị các bộ lọc đang active */}
              {/* Hiển thị số lượng trên trang hiện tại và tổng số sau khi lọc */}
              <ProductControls shown={currentProducts.length} total={filteredProducts.length} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {/* Map qua currentProducts (đã được lọc và phân trang client-side) */}
                {!loading && currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    productId={product.id}
                    image={product.imageUrls?.[0]?.downloadUrl || "/Placeholder2.png"}
                    stockStatus={product.quantity > 0 ? "in stock" : "out of stock"}
                    title={product.title}
                    price={formatPrice(product.discountedPrice)}
                    originalPrice={formatPrice(product.price)}
                    reviewCount={product.numRatings || 0}
                  />
                ))}
              </div>
              {/* Pagination dựa trên totalPages tính toán từ filteredProducts */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages} // Lấy từ state/memo
                  onPageChange={(newPage) => handlePageChange(newPage, false)}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Catalog;