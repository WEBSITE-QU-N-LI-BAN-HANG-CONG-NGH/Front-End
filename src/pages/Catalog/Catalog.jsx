import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import ProductControls from "../../components/features/catalog/ProductControls";
import FilterSidebar from "../../components/features/catalog/FilterSidebar";
import Filter from "../../components/features/catalog/Filter"; // Component hiển thị filter active
import ProductCard from "../../components/features/product/ProductCard";
import ProductSkeleton from "../../components/features/product/ProductSkeleton"; // Import component skeleton
import Pagination from "../../components/common/Pagination";
import { productService } from "../../services/product.service";

// --- Hàm định dạng giá ---
const formatPrice = (price) => {
  if (typeof price !== 'number') return "N/A";
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

// --- Component Catalog ---
const Catalog = ({ category: categoryProp }) => {
  // Lấy các tham số từ URL path
  const { secondLevelCategory: secondLevelCategoryProp, page: pageFromParams = "1" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = parseInt(pageFromParams, 10) || 1;
  const itemsPerPage = 12;
  const [isLoading, setIsLoading] = useState(false);

  // --- State ---
  const [allFilteredProducts, setAllFilteredProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // --- Fetch và Xử lý Dữ liệu ---
  const fetchDataAndPaginate = useCallback(async () => {
    setLoading(true);
    setStatusMessage("Đang tải sản phẩm...");
    setMessageType("info");
    
    // Reset state trước mỗi lần fetch
    setAllFilteredProducts([]);
    setCurrentProducts([]);

    try {
      // 1. Phân tích Query String từ URL
      const queryParams = new URLSearchParams(location.search);
      const colorFilter = queryParams.get('color');
      const priceFilter = queryParams.get('price');
      const sortFilter = queryParams.get('sort');

      let minPrice = null;
      let maxPrice = null;
      if (priceFilter) {
        const parts = priceFilter.split('-');
        const parsedMin = parseInt(parts[0], 10);
        const parsedMax = parseInt(parts[1], 10);
        if (!isNaN(parsedMin)) minPrice = parsedMin;
        if (!isNaN(parsedMax)) maxPrice = parsedMax;
      }

      const hasQueryFilters = !!colorFilter || !!priceFilter || !!sortFilter;

      let response;
      let fetchedData = [];

      // 2. Quyết định gọi API nào
      if (hasQueryFilters) {
        const filterPayload = {
          topLevelCategory: (categoryProp && categoryProp !== 'all') ? categoryProp : undefined,
          secondLevelCategory: secondLevelCategoryProp || undefined,
          color: colorFilter || undefined,
          minPrice: minPrice,
          maxPrice: maxPrice,
          sort: sortFilter || undefined,
        };
        response = await productService.getProductByFilter(filterPayload);
        fetchedData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      } else {
        if (categoryProp && categoryProp !== 'all' && secondLevelCategoryProp) {
          response = await productService.getProductByTopCategoryAndSecondCategory(categoryProp, secondLevelCategoryProp);
        } else if (categoryProp && categoryProp !== 'all') {
          response = await productService.getProductByTopCategory(categoryProp);
        } else {
          response = await productService.getAllProducts();
        }
        fetchedData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      }

      // 3. Lưu trữ và Phân trang Client-side
      setAllFilteredProducts(fetchedData);
      const totalFetchedItems = fetchedData.length;
      setTotalItems(totalFetchedItems);

      const calculatedTotalPages = Math.ceil(totalFetchedItems / itemsPerPage);
      setTotalPages(calculatedTotalPages);

      // Tính toán slice cho trang hiện tại
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentProducts(fetchedData.slice(startIndex, endIndex));

      setStatusMessage("");
      setMessageType("");

    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      setStatusMessage(error.response?.data?.message || "Tải sản phẩm thất bại. Vui lòng thử lại.");
      setMessageType("error");
      setAllFilteredProducts([]);
      setCurrentProducts([]);
      setTotalPages(0);
      setTotalItems(0);
    } finally {
      // Thêm timeout nhỏ để hiện skeleton rõ hơn (có thể bỏ trong production)
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [categoryProp, secondLevelCategoryProp, currentPage, location.search, itemsPerPage]);

  useEffect(() => {
    fetchDataAndPaginate();
  }, [fetchDataAndPaginate]);

  // --- Mapping tên danh mục ---
  const categoryTitleMap = {
    "laptop": "Laptop", "desktops": "Máy tính bàn", "phone": "Điện thoại",
    "components": "Linh kiện", "accessories": "Phụ kiện", "others": "Khác",
    "deals": "Khuyến mãi", "all": "Tất cả sản phẩm"
  };
  const secondLevelCategoryTitleMap = {
    "acer": "Acer", "dell": "Dell", "apple": "Apple", "asus": "Asus", "hp": "HP",
  };

  // --- Effect: Xử lý trang không hợp lệ ---
  useEffect(() => {
    if (!loading) {
      if (totalPages > 0 && currentPage > totalPages) {
        handlePageChange(totalPages, true);
      }
      else if (currentPage < 1 && totalPages >= 0) {
        handlePageChange(1, true);
      }
    }
    window.scrollTo(0, 0);
  }, [currentPage, totalPages, loading]);

  // --- Effect: Cập nhật totalItem/totalPage trên URL ---
  useEffect(() => {
    if (!loading) {
      const params = new URLSearchParams(location.search);
      const currentTotalItem = params.get('totalItem');
      const currentTotalPage = params.get('totalPage');
      const newTotalItem = totalItems.toString();
      const newTotalPage = totalPages.toString();

      if (currentTotalItem !== newTotalItem || currentTotalPage !== newTotalPage) {
        params.set('totalItem', newTotalItem);
        params.set('totalPage', newTotalPage);
        navigate(`${location.pathname}?${params.toString()}`, { replace: true, state: location.state });
      }
    }
  }, [totalItems, totalPages, loading, navigate, location.pathname, location.search, location.state]);

  // --- Hàm xử lý chuyển trang ---
  const handlePageChange = (newPage, replace = false) => {
    if (newPage < 1 || (totalPages > 0 && newPage > totalPages) || newPage === currentPage) {
      return;
    }
    const params = new URLSearchParams(location.search);
    let basePathSegments = [];
    if (categoryProp && categoryProp !== 'all') {
      basePathSegments.push(categoryProp);
      if (secondLevelCategoryProp) basePathSegments.push(secondLevelCategoryProp);
    } else {
      basePathSegments.push('product', 'all');
    }
    const basePath = `/${basePathSegments.join('/')}`;
    const queryString = params.toString();
    const targetUrl = `${basePath}/${newPage}${queryString ? `?${queryString}` : ''}`;
    navigate(targetUrl, { replace: replace, state: location.state });
  };

  // --- Xác định tiêu đề trang ---
  const pageTitle = secondLevelCategoryProp
    ? `${categoryTitleMap[categoryProp] || categoryProp} - ${secondLevelCategoryTitleMap[secondLevelCategoryProp] || secondLevelCategoryProp}`
    : (categoryTitleMap[categoryProp] || "Tất cả sản phẩm");

  // Tạo mảng skeletons cho hiệu ứng loading
  const skeletonItems = Array(itemsPerPage).fill(0).map((_, index) => (
    <ProductSkeleton key={`skeleton-${index}`} />
  ));

  // --- Render component ---
  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-gray-50 min-h-screen">
      <div className="flex flex-col self-center mt-4 w-full max-w-screen-xl px-4">
        <BreadcrumbNav />
        <h1 className="self-start mt-4 mb-4 text-2xl md:text-3xl font-semibold text-gray-800">
          {pageTitle} ({loading ? "..." : totalItems})
        </h1>

        {/* Loading/Error/No Results Messages */}
        {!loading && messageType === 'error' && (
          <div className="text-center p-4 text-red-600 bg-red-100 rounded border border-red-300">{statusMessage}</div>
        )}
        {!loading && !allFilteredProducts.length && messageType !== 'error' && (
          <div className="text-center p-10 text-gray-500">Không tìm thấy sản phẩm nào phù hợp.</div>
        )}

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-4">
          {/* Sidebar - Truyền callback để bắt sự kiện khi filter thay đổi */}
          <FilterSidebar topCategory={categoryProp} onFilterChange={() => setLoading(true)} />

          {/* Main Content Area */}
          <section className="w-full">
            <div className="flex flex-col w-full">
              {/* Filter Active Tags - Truyền callback để bắt sự kiện khi xóa filter */}
              <Filter onFilterRemove={() => setLoading(true)} />
              
              {/* Product Controls (Sort, View) */}
              <ProductControls 
                shown={loading ? 0 : currentProducts.length} 
                total={loading ? 0 : totalItems} 
                onSortChange={() => setLoading(true)} 
              />
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-4">
                {/* Hiển thị skeleton khi đang loading */}
                {loading ? (
                  skeletonItems
                ) : (
                  // Hiển thị sản phẩm thực khi đã load xong
                  currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      productId={product.id}
                      image={product.imageUrls?.[0]?.downloadUrl || "/Placeholder2.png"}
                      stockStatus={product.quantity > 0 ? "in stock" : "out of stock"}
                      title={product.title}
                      price={formatPrice(product.discountedPrice)}
                      originalPrice={formatPrice(product.price)}
                      reviewCount={product.numRatings || 0}
                      discountPercent={product.discountPercent || 0}
                    />
                  ))
                )}
              </div>
              
              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(newPage) => handlePageChange(newPage, false)}
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Catalog;