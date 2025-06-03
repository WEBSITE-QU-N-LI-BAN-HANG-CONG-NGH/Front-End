// src/components/features/product/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from "../../../contexts/CartContext";
import { useToast } from "../../../contexts/ToastContext";
import { Rating, CircularProgress, Button as MuiButton } from '@mui/material';

const ProductCard = ({
  productId,
  image,
  stockStatus = "in stock",
  title,
  price,
  originalPrice,
  reviewCount,
  ratingImage, // Đây là averageRating
  discountPercent
}) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { addItemToCart: addItemToCartFromContext, isLoading: isCartContextLoading } = useCartContext();

  const handleCardClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!productId || stockStatus !== "in stock") {
      if (stockStatus !== "in stock") {
        showToast("Sản phẩm hiện đã hết hàng.", "warning");
      }
      return;
    }
    const cartData = { productId, quantity: 1 };
    try {
      await addItemToCartFromContext(cartData);
      showToast(`${title || 'Sản phẩm'} đã được thêm vào giỏ hàng!`, "success");
    } catch (error) {
      console.error("Error adding to cart (ProductCard):", error);
      showToast(error.response?.data?.message || error.message || "Không thể thêm vào giỏ hàng.", "error");
    }
  };

  const handleBuyNow = async (e) => {
    e.stopPropagation();
    if (!productId || stockStatus !== "in stock") {
      if (stockStatus !== "in stock") {
        showToast("Sản phẩm hiện đã hết hàng.", "warning");
      }
      return;
    }
    const cartData = { productId, quantity: 1 };
    try {
      await addItemToCartFromContext(cartData);
      navigate('/checkout?step=2');
    } catch (error) {
      console.error("Error adding to cart before buying (ProductCard):", error);
      showToast(error.response?.data?.message || error.message || "Không thể tiến hành mua ngay.", "error");
    }
  };

  const isOutOfStock = stockStatus !== "in stock";
  const displayRating = typeof ratingImage === 'number' ? ratingImage : 0;

  return (
    <div
      className={`flex flex-col border rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl bg-white group flex-shrink-0 w-48 md:w-56 ${isOutOfStock ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`} // Thay đổi ở đây: Thêm w-48 md:w-56 và flex-shrink-0, bỏ w-full mx-auto
      onClick={!isOutOfStock ? handleCardClick : undefined}
      style={{ minHeight: '380px' }} // Giảm minHeight nếu cần
    >
      <div className="relative w-full pt-[80%] bg-gray-100"> {/* Giảm pt một chút để ảnh nhỏ hơn */}
        {isOutOfStock && (
          <div className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full z-10 shadow">Hết hàng</div>
        )}
        {discountPercent > 0 && !isOutOfStock && (
          <div className="absolute top-1.5 right-1.5 bg-yellow-400 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-full z-10 shadow">
            -{discountPercent}%
          </div>
        )}
        <img
          src={image || "/Placeholder2.png"}
          className="absolute top-0 left-0 w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" // Giảm padding
          alt={title || "Product Image"}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col p-2 flex-grow"> {/* Giảm padding */}
        <div className="flex items-center text-[10px] text-gray-500 mb-0.5"> {/* Giảm font-size, margin */}
          <Rating value={displayRating} readOnly precision={0.5} size="small" sx={{ color: '#faaf00', fontSize: '0.7rem' }} />
          <span className="ml-1">({reviewCount || 0})</span>
        </div>

        <h3
          className="text-xs font-medium text-gray-700 h-9 overflow-hidden mb-1 leading-tight group-hover:text-blue-600 transition-colors" // Giảm font-size, height, margin
          title={title || "Product Name"}
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {title || "Tên sản phẩm"}
        </h3>

        <div className="mt-auto">
          <div className="mb-1.5"> {/* Giảm margin */}
            <span className="text-sm font-semibold text-red-500"> {/* Giảm font-size */}
              {price || "Liên hệ"}
            </span>
            {originalPrice && price !== originalPrice && (
              <span className="ml-1 text-[9px] text-gray-400 line-through"> {/* Giảm font-size */}
                {originalPrice}
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;