// src/components/features/product/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Rating, CircularProgress, Button as MuiButton } from '@mui/material'; // Thêm CircularProgress, Button
// Xóa: import { useDispatch } from "react-redux";
// Xóa: import { addItemToCart } from "../../../State/Cart/Action";
import { useCartContext } from "../../../contexts/CartContext"; // THAY ĐỔI
import { useToast } from "../../../contexts/ToastContext"; // THAY ĐỔI: Để hiển thị thông báo

// Xóa: Mock dispatch và action
// const useMockDispatch = () => (action) => { ... };
// const mockAddItemToCart = (data) => ({ ... });

const ProductCard = ({
  productId,
  image,
  stockStatus = "in stock",
  title,
  price,
  originalPrice,
  reviewCount,
  ratingImage, // Giả sử đây là averageRating dạng số
  discountPercent
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast(); // THAY ĐỔI: Lấy showToast
  // THAY ĐỔI: Sử dụng useCartContext
  const { addItemToCart: addItemToCartFromContext, isLoading: isCartContextLoading } = useCartContext();
  // Xóa: const dispatch = useMockDispatch();
  // Xóa: const addItemToCartAction = mockAddItemToCart;

  const handleCardClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    } else {
      console.warn("ProductCard clicked without a valid productId");
      showToast("Sản phẩm không hợp lệ hoặc đã bị xóa.", "warning");
    }
  };

  const handleAddToCart = async (e) => { // THAY ĐỔI: async/await
    e.stopPropagation();
    if (!productId || stockStatus !== "in stock") return;

    const cartData = { productId, quantity: 1 }; // Sử dụng productId

    try {
      // THAY ĐỔI: Gọi hàm từ context
      await addItemToCartFromContext(cartData);
      showToast(`${title || 'Sản phẩm'} đã được thêm vào giỏ hàng!`, "success");
    } catch (error) {
      console.error("Error adding to cart (ProductCard):", error);
      showToast(error.response?.data?.message || error.message || "Không thể thêm vào giỏ hàng.", "error");
    }
  };

  const handleBuyNow = async (e) => { // THAY ĐỔI: async/await
    e.stopPropagation();
    if (!productId || stockStatus !== "in stock") return;

    const cartData = { productId, quantity: 1 };
    try {
      // THAY ĐỔI: Gọi hàm từ context
      await addItemToCartFromContext(cartData);
      // Không cần alert ở đây, CartContext có thể đã xử lý
      navigate('/checkout?step=2'); // Chuyển đến trang checkout, bước thông tin
    } catch (error) {
      console.error("Error adding to cart before buying (ProductCard):", error);
      showToast(error.response?.data?.message || error.message || "Không thể tiến hành mua ngay.", "error");
    }
  };

  const isOutOfStock = stockStatus !== "in stock";
  // Xác định rating thực tế để hiển thị (giả sử ratingImage là averageRating)
  const displayRating = typeof ratingImage === 'number' ? ratingImage : 0;

  return (
    <div
      className={`flex flex-col border rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl bg-white max-w-xs w-full mx-auto group ${isOutOfStock ? 'opacity-70' : ''}`}
      onClick={!isOutOfStock ? handleCardClick : undefined} // Chỉ cho click nếu còn hàng
      style={{ minHeight: '420px', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
    >
      <div className="relative w-full pt-[100%] bg-gray-100"> {/* pt-[100%] để tạo aspect ratio 1:1 */}
        {isOutOfStock && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10 shadow-md">Hết hàng</div>
        )}
        {discountPercent > 0 && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2.5 py-1 rounded-full z-10 shadow">
            -{discountPercent}%
          </div>
        )}
        <img
          src={image || "/Placeholder2.png"}
          className="absolute top-0 left-0 w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          alt={title || "Product Image"}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col p-4 flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-1.5">
          <Rating value={displayRating} readOnly precision={0.5} size="small" />
          <span className="ml-1.5">({reviewCount || 0})</span>
        </div>

        <h3
          className="text-sm font-semibold text-gray-800 h-12 overflow-hidden mb-2 leading-tight" // Giới hạn 2 dòng
          title={title || "Product Name"}
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {title || "Product Name"}
        </h3>

        <div className="mt-auto"> {/* Đẩy giá và nút xuống dưới */}
          <div className="mb-3">
            <span className="text-lg font-bold text-red-600">
              {price || "Liên hệ"}
            </span>
            {originalPrice && price !== originalPrice && (
              <span className="ml-2 text-xs text-gray-500 line-through">
                {originalPrice}
              </span>
            )}
          </div>

          {!isOutOfStock && (
             <div className="flex flex-col gap-2">
                <MuiButton
                    variant="contained"
                    fullWidth
                    size="small"
                    onClick={handleAddToCart}
                    disabled={isCartContextLoading} // Disable khi context đang loading
                    sx={{
                        bgcolor: 'rgb(37 99 235)', // blue-600
                        '&:hover': { bgcolor: 'rgb(29 78 216)' }, // blue-700
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        py: 0.8
                    }}
                >
                    {isCartContextLoading ? <CircularProgress size={20} color="inherit" /> : "Thêm vào giỏ"}
                </MuiButton>
                <MuiButton
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={handleBuyNow}
                    disabled={isCartContextLoading} // Disable khi context đang loading
                    sx={{
                        borderColor: 'rgb(220 38 38)', // red-600
                        color: 'rgb(220 38 38)',
                        '&:hover': {
                            borderColor: 'rgb(185 28 28)', // red-700
                            backgroundColor: 'rgba(220, 38, 38, 0.04)'
                        },
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        py: 0.8
                    }}
                >
                    Mua ngay
                </MuiButton>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;