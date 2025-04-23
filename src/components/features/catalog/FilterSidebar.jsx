import React, { useEffect, useState } from "react";
import { useFilter } from "../../../components/features/catalog/FilterContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { productService } from "../../../services/product.service";

// Price filter data (Giữ nguyên)
const priceRanges = [
  // ... (dữ liệu giá)
    { range: "50.000 To 200.000", value: "50000-199999" },
    { range: "100.000 To 500.000", value: "200000-499999" },
    { range: "500.000 To 2.000.000", value: "500000-1999999" },
    { range: "2.000.000 To 10.000.000", value: "2000000-9999999" },
    { range: "10.000.000 To 50.000.000", value: "10000000-49999999" },
    { range: "50.000.000 To 100.000.000", value: "50000000-99999999" }
];

// Color filter data (Giữ nguyên)
const colors = [
  // ... (dữ liệu màu)
    { name: "White", value: "white" },
    { name: "Black", value: "black" },
    { name: "Blue", value: "blue" },
    { name: "Brown", value: "brown" },
    { name: "Green", value: "green" },
    { name: "Purple", value: "purple" },
    { name: "Yellow", value: "yellow" }
];

// Nhận topCategory từ props của Catalog component
const FilterSidebar = ({ topCategory }) => {
  const { activeFilters, updateFilters, clearAllFilters } = useFilter();
  const location = useLocation(); // Để lấy query string hiện tại
  const { secondLevelCategory: secondLevelCategoryFromUrl } = useParams(); 

  // --- State cho categories ---
  // Lưu trữ object response từ API { data: [...], message: ... } hoặc null
  const [categoryData, setCategoryData] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(false); // Chỉ loading khi fetch categories
  const [categoryError, setCategoryError] = useState(null);
  // ---------------------------

  // --- State cho sections (Giữ nguyên) ---
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    size: true, // Thêm size nếu có bộ lọc size
    discount: false
  });

  // --- Fetch second-level categories khi topCategory thay đổi ---
  useEffect(() => {
    // Hàm async để fetch data
    const fetchSecondCategories = async () => {
        // Chỉ fetch khi topCategory có giá trị và không phải 'all'
        if (!topCategory || topCategory === 'all') {
            setCategoryData(null); // Xóa data cũ nếu không fetch
            setCategoryLoading(false);
            setCategoryError(null);
            return; // Không làm gì nếu là trang 'all' hoặc không có topCategory
        }

        setCategoryLoading(true); // Bắt đầu loading
        setCategoryError(null); // Reset lỗi
        setCategoryData(null); // Reset data cũ

        try {
            // *** Gọi API service đã tạo ***
            const response = await productService.getSecondCategory(topCategory);
            console.log("Fetched second categories:", response.data); // Log dữ liệu từ API
            setCategoryData(response.data); // Lưu toàn bộ object { data: [...], message: ...} vào state
        } catch (err) {
            console.error("Error fetching second categories:", err);
            setCategoryError(err.response?.data?.message || err.message || "Failed to load categories");
            setCategoryData(null); // Đảm bảo data là null khi lỗi
        } finally {
            setCategoryLoading(false); // Kết thúc loading
        }
    };

    fetchSecondCategories(); // Gọi hàm fetch

    // Dependency array: Chạy lại effect này khi `topCategory` thay đổi
  }, [topCategory]);

  // --- Các hàm xử lý khác (Giữ nguyên) ---
  const toggleSection = (section) => { /* ... */
    setExpandedSections({
        ...expandedSections,
        [section]: !expandedSections[section]
      });
  };
  const handleClearAll = () => { /* ... */
    clearAllFilters();
  };
  // ----------------------------------------

  return (
    <aside className="w-[17%] max-md:ml-0 max-md:w-full">
      <div className="max-md:mt-1.5">
        <section className="bg-violet-50">
          {/* Filter Header & Clear Button (Giữ nguyên) */}
          <div className="max-w-full text-center rounded-none w-[234px]">
            <div className="flex flex-col px-4 py-5 bg-violet-50">
              <h2 className="self-center text-base font-bold text-black">
                Filters
              </h2>
              <button
                className="px-6 py-2 mt-4 text-sm font-semibold cursor-pointer text-gray-400 border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] rounded-[50px] max-md:px-5"
                onClick={handleClearAll}
              >
                Clear Filter
              </button>
            </div>
          </div>

           {/* --- Category Section --- */}
          {/* Chỉ hiển thị nếu có topCategory và không phải 'all' */}
          {topCategory && topCategory !== 'all' && (
            <section className="px-4 py-5 w-full text-black max-w-[234px]">
                <div
                    className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap cursor-pointer"
                    onClick={() => toggleSection('category')}
                >
                    <h3>{topCategory.charAt(0).toUpperCase() + topCategory.slice(1)} Types</h3>
                    <img /* ... toggle icon ... */ />
                </div>

                {expandedSections.category && (
                    <div className="flex flex-col gap-2 mt-4 text-sm leading-7"> {/* Tăng gap nếu muốn */}
                        {categoryLoading && <div>Loading sub-categories...</div>}
                        {categoryError && <div className="text-red-600">Error: {categoryError}</div>}

                        {/* ------ Sửa đổi phần render category ------ */}
                        {!categoryLoading && !categoryError && categoryData && categoryData.data && categoryData.data.length > 0 && (
                            categoryData.data.map((category) => {
                                // Tạo slug hoặc dùng ID nếu có cho URL path
                                const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
                                // Xây dựng URL path mới (luôn về trang 1 khi chọn category)
                                const targetPath = `/${topCategory}/${categorySlug}/1`;
                                // Lấy query string hiện tại (chứa filters + totalItem/Page)
                                const currentQueryString = location.search;
                                // URL đích
                                const targetUrl = `${targetPath}${currentQueryString}`;

                                // Kiểm tra xem category này có đang active không (dựa vào URL)
                                const isActive = secondLevelCategoryFromUrl?.toLowerCase() === categorySlug;

                                return (
                                    // Thay thế input/label bằng Link
                                    <Link
                                        key={category.id || category.name}
                                        to={targetUrl}
                                        className={`block px-2 py-1 rounded hover:bg-gray-200 ${isActive ? 'font-bold text-blue-700 bg-blue-100' : 'text-gray-700'}`} // Style cho link active
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })
                        )}
                        {/* ------------------------------------------ */}

                        {!categoryLoading && !categoryError && (!categoryData || !categoryData.data || categoryData.data.length === 0) && (
                            <div>No specific types found.</div>
                        )}
                    </div>
                )}
            </section>
          )}
          {/* --------------------------- */}



          {/* Price Section (Giữ nguyên) */}
          <section className="p-4 w-full text-black max-w-[234px]">
             {/* ... (code price section) ... */}
             <div
              className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => toggleSection('price')}
            >
              <h3>Price</h3>
              <img
                src={expandedSections.price ? "/UpArrow.svg" : "/DownArrow.svg"}
                alt="Toggle price"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>

            {expandedSections.price && (
              <div className="flex gap-5 justify-between mt-5 text-sm leading-7">
                <div className="w-full">
                {priceRanges.map((priceRange) => (
                  <div key={priceRange.value} className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`price-${priceRange.value}`}
                        name="price"
                        checked={activeFilters.price === priceRange.value}
                        onChange={() => {
                          console.log("Price filter clicked:", priceRange.value);
                          updateFilters('price', priceRange.value, true);
                        }}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`price-${priceRange.value}`}
                        className="cursor-pointer"
                      >
                        {priceRange.range}
                      </label>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
          </section>

          {/* Color Section (Giữ nguyên) */}
          <section className="px-4 py-5 w-full text-black max-w-[234px]">
            {/* ... (code color section) ... */}
            <div
              className="flex gap-5 justify-between text-sm font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => toggleSection('color')}
            >
              <h3 className="my-auto">Color</h3>
              <img
                src={expandedSections.color ? "/UpArrow.svg" : "/DownArrow.svg"}
                alt="Toggle color"
                className="object-contain shrink-0 w-4 aspect-square"
              />
            </div>

            {expandedSections.color && (
              <div className="mt-4 text-sm leading-7 flex flex-col gap-1"> {/* Thêm flex-col và gap */}
                {colors.map((color) => (
                  <div key={color.value} className="flex items-center"> {/* Bỏ mt-1 vì đã có gap */}
                    <input
                      type="checkbox"
                      id={`color-${color.value}`}
                      checked={activeFilters.color.includes(color.value)}
                      onChange={(e) => updateFilters('color', color.value, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`color-${color.value}`}>{color.name}</label>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Thêm các section khác nếu cần (Size, Discount...) */}

        </section>
      </div>
    </aside>
  );
};

export default FilterSidebar;