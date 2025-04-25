import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import ProductControls from "../../components/features/catalog/ProductControls";
import FilterSidebar from "../../components/features/catalog/FilterSidebar";
import Filter from "../../components/features/catalog/Filter"; // Component hiển thị filter active
import ProductCard from "../../components/features/product/ProductCard";
import Pagination from "../../components/common/Pagination";
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
  const location = useLocation(); // Để đọc location.search (query string)
  const navigate = useNavigate();
  const currentPage = parseInt(pageFromParams, 10) || 1; // Trang hiện tại
  const itemsPerPage = 12; // Số sản phẩm mỗi trang (có thể cấu hình)

  // --- State ---
  const [allFilteredProducts, setAllFilteredProducts] = useState([]); // Lưu toàn bộ SP khớp filter (cho client-side pagination)
  const [currentProducts, setCurrentProducts] = useState([]); // SP hiển thị trên trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang (tính toán client-side)
  const [totalItems, setTotalItems] = useState(0); // Tổng số SP khớp filter
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [statusMessage, setStatusMessage] = useState(""); // Thông báo
  const [messageType, setMessageType] = useState(""); // Loại thông báo (info, error)

  // --- Fetch và Xử lý Dữ liệu ---
  useEffect(() => {
    const fetchDataAndPaginate = async () => {
      setLoading(true);
      setStatusMessage("Đang tải sản phẩm...");
      setMessageType("info");
      // Reset state trước mỗi lần fetch
      setAllFilteredProducts([]);
      setCurrentProducts([]);
      setTotalPages(0);
      setTotalItems(0);

      // 1. Phân tích Query String từ URL
      const queryParams = new URLSearchParams(location.search);
      const colorFilter = queryParams.get('color');
      const priceFilter = queryParams.get('price');
      const sortFilter = queryParams.get('sort'); // Lấy cả sort nếu dùng

      let minPrice = null;
      let maxPrice = null;
      if (priceFilter) {
        const parts = priceFilter.split('-');
        const parsedMin = parseInt(parts[0], 10);
        const parsedMax = parseInt(parts[1], 10);
        if (!isNaN(parsedMin)) minPrice = parsedMin;
        if (!isNaN(parsedMax)) maxPrice = parsedMax;
      }

      // Xác định xem có filter nào trong query string không
      const hasQueryFilters = !!colorFilter || !!priceFilter || !!sortFilter;

      try {
        let response;
        let fetchedData = []; // Dữ liệu thô từ API

        // 2. Quyết định gọi API nào
        if (hasQueryFilters) {
          // --- Gọi API Lọc Backend (GET + Request Body) ---
          console.log("Fetching using getProductByFilter (GET + Body)");
          const filterPayload = {
              topLevelCategory: (categoryProp && categoryProp !== 'all') ? categoryProp : undefined,
              secondLevelCategory: secondLevelCategoryProp || undefined,
              color: colorFilter || undefined,
              minPrice: minPrice,
              maxPrice: maxPrice,
              sort: sortFilter || undefined,
              // Không gửi page/size vì backend này không phân trang
          };
          response = await productService.getProductByFilter(filterPayload);
          // Backend trả về List<ProductDTO>
          fetchedData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
          console.log("Data received from getProductByFilter:", fetchedData);

        } else {
          // --- Gọi API Category/All ---
          if (categoryProp && categoryProp !== 'all' && secondLevelCategoryProp) {
            console.log(`Fetching by top: ${categoryProp}, second: ${secondLevelCategoryProp}`);
            response = await productService.getProductByTopCategoryAndSecondCategory(categoryProp, secondLevelCategoryProp);
          } else if (categoryProp && categoryProp !== 'all') {
            console.log(`Fetching by top: ${categoryProp}`);
            response = await productService.getProductByTopCategory(categoryProp);
          } else {
            console.log("Fetching all products");
            response = await productService.getAllProducts();
          }
          fetchedData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
          console.log("Data received from category/all API:", fetchedData);
        }

        // 3. Lưu trữ và Phân trang Client-side
        setAllFilteredProducts(fetchedData); // Lưu toàn bộ kết quả
        const totalFetchedItems = fetchedData.length;
        setTotalItems(totalFetchedItems); // Cập nhật tổng số item

        const calculatedTotalPages = Math.ceil(totalFetchedItems / itemsPerPage);
        setTotalPages(calculatedTotalPages); // Cập nhật tổng số trang

        // Tính toán slice cho trang hiện tại
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentProducts(fetchedData.slice(startIndex, endIndex)); // Cập nhật sản phẩm cho trang hiện tại

        console.log(`Client Pagination: TotalItems=${totalFetchedItems}, TotalPages=${calculatedTotalPages}, CurrentPage=${currentPage}, Start=${startIndex}, End=${endIndex}`);

        setStatusMessage("");
        setMessageType("");

      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setStatusMessage(error.response?.data?.message || "Tải sản phẩm thất bại. Vui lòng thử lại.");
        setMessageType("error");
        // Reset tất cả state liên quan đến dữ liệu khi có lỗi
        setAllFilteredProducts([]);
        setCurrentProducts([]);
        setTotalPages(0);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndPaginate();
  // Dependencies: Chạy lại khi path params, trang, hoặc query string thay đổi
  }, [categoryProp, secondLevelCategoryProp, currentPage, location.search, itemsPerPage]);

  // --- Mapping tên danh mục ---
  const categoryTitleMap = {
    "laptop": "Laptop", "desktops": "Máy tính bàn", "phone": "Điện thoại",
    "components": "Linh kiện", "accessories": "Phụ kiện", "others": "Khác",
    "deals": "Khuyến mãi", "all": "Tất cả sản phẩm"
  };
  const secondLevelCategoryTitleMap = {
    "acer": "Acer", "dell": "Dell", "apple": "Apple", "asus": "Asus", "hp": "HP", // Thêm HP
    // ... thêm các hãng khác
  };

  // --- Effect: Xử lý trang không hợp lệ ---
   useEffect(() => {
     // Dùng totalPages đã tính toán client-side
     if (!loading) {
         // Chỉ chuyển hướng nếu có trang (>0) và trang hiện tại > tổng số trang
         if (totalPages > 0 && currentPage > totalPages) {
             console.log(`Redirecting to last page: ${totalPages}`);
             // Gọi handlePageChange để cập nhật URL đúng cách
             handlePageChange(totalPages, true);
         }
         // Chỉ chuyển hướng nếu trang < 1 và có ít nhất 0 trang (tránh lỗi khi totalPages=0)
         else if (currentPage < 1 && totalPages >= 0) {
             console.log(`Redirecting to page 1`);
             handlePageChange(1, true);
         }
     }
     // Luôn cuộn lên đầu khi các dependency thay đổi (sau khi render)
     window.scrollTo(0, 0);
   }, [currentPage, totalPages, loading]); // Bỏ handlePageChange khỏi dependencies

  // --- Effect: Cập nhật totalItem/totalPage trên URL ---
   useEffect(() => {
       // Chỉ cập nhật sau khi loading xong và đã có totalItems/totalPages
       if (!loading) {
           const params = new URLSearchParams(location.search);
           const currentTotalItem = params.get('totalItem');
           const currentTotalPage = params.get('totalPage');
           // Lấy từ state đã tính toán
           const newTotalItem = totalItems.toString();
           const newTotalPage = totalPages.toString();

           if (currentTotalItem !== newTotalItem || currentTotalPage !== newTotalPage) {
               params.set('totalItem', newTotalItem);
               params.set('totalPage', newTotalPage);
               console.log("Updating URL pagination info:", params.toString());
               // navigate chỉ cập nhật query string, giữ nguyên path
               navigate(`${location.pathname}?${params.toString()}`, { replace: true, state: location.state });
           }
       }
   // Chạy khi totalItems hoặc totalPages thay đổi (sau khi fetch/paginate)
   }, [totalItems, totalPages, loading, navigate, location.pathname, location.search, location.state]);

  // --- Hàm xử lý chuyển trang ---
  const handlePageChange = (newPage, replace = false) => {
    // Dùng totalPages từ state
    if (newPage < 1 || (totalPages > 0 && newPage > totalPages) || newPage === currentPage) {
      console.warn(`handlePageChange: Invalid or same page requested (${newPage}). Current: ${currentPage}, Total: ${totalPages}`);
      return;
    }
    const params = new URLSearchParams(location.search); // Giữ lại query filter (color, price...)
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
    console.log(`handlePageChange: Navigating to ${targetUrl}`);
    navigate(targetUrl, { replace: replace, state: location.state });
  };

  // --- Xác định tiêu đề trang ---
  const pageTitle = secondLevelCategoryProp
      ? `${categoryTitleMap[categoryProp] || categoryProp} - ${secondLevelCategoryTitleMap[secondLevelCategoryProp] || secondLevelCategoryProp}`
      : (categoryTitleMap[categoryProp] || "Tất cả sản phẩm");

  // --- Render component ---
  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-gray-50 min-h-screen"> {/* Nền xám nhạt */}
      <div className="flex flex-col self-center mt-4 w-full max-w-screen-xl px-4"> {/* Max width và padding */}
        {/* Bỏ banner nếu không cần */}
        {/* <img src="/BannerPlaceholder.png" alt="Banner" className="object-contain w-full aspect-[13.51] max-md:max-w-full mb-4"/> */}
        <BreadcrumbNav />
        <h1 className="self-start mt-4 mb-4 text-2xl md:text-3xl font-semibold text-gray-800"> {/* Giảm margin, responsive size */}
          {pageTitle} ({totalItems}) {/* Hiển thị totalItems */}
        </h1>

        {/* Loading/Error/No Results Messages */}
        {loading && <div className="text-center p-10 text-gray-500">Đang tải sản phẩm...</div>}
        {!loading && messageType === 'error' && <div className="text-center p-4 text-red-600 bg-red-100 rounded border border-red-300">{statusMessage}</div>}
        {!loading && !allFilteredProducts.length && messageType !== 'error' && <div className="text-center p-10 text-gray-500">Không tìm thấy sản phẩm nào phù hợp.</div>}

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-4"> {/* Tăng gap */}
          {/* Sidebar */}
          <FilterSidebar topCategory={categoryProp} />

          {/* Main Content Area */}
          <section className="w-full"> {/* Section chiếm phần còn lại */}
            <div className="flex flex-col w-full">
              {/* Filter Active Tags */}
              <Filter />
              {/* Product Controls (Sort, View) */}
              <ProductControls shown={currentProducts.length} total={totalItems} />
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-4">
                {/* Map qua currentProducts (đã phân trang) */}
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
                    // Thêm các props khác nếu cần
                  />
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages} // Dùng totalPages từ state
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