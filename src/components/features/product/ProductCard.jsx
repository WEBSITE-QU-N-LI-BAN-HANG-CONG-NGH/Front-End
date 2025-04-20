import React from "react";
import { useNavigate } from "react-router-dom";
import { useSimpleCart } from "../../../hooks/useSimpleCart";

const ProductCard = ({
  id,
  image,
  stockStatus = "in_stock",
  title,
  price,
  originalPrice,
  reviewCount,
  rating,
  productId
}) => {
  const navigate = useNavigate();
  const { addToCart, isLoading, formatCurrency } = useSimpleCart();
  const isInStock = stockStatus === "in_stock";

  // Parse price từ string sang number nếu cần
  const parsePrice = (priceString) => {
    if (typeof priceString === 'number') return priceString;
    if (!priceString) return 0;
    
    // Xóa tất cả ký tự không phải số
    return parseInt(priceString.replace(/\D/g, '')) || 0;
  };

  // Handler để chuyển hướng đến trang chi tiết
  const handleCardClick = () => {
    navigate(`/detail/${productId || id || 1}`);
  };

  // Handler để thêm vào giỏ hàng
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn chặn việc điều hướng đến trang chi tiết
    
    if (isInStock && !isLoading) {
      const productToAdd = {
        id: productId || id || Date.now(),
        title: title || "Sản phẩm",
        price: parsePrice(price),
        discountPercent: originalPrice ? Math.round((1 - parsePrice(price) / parsePrice(originalPrice)) * 100) : 0,
        imageUrl: image || "/Placeholder2.png"
      };
      
      addToCart(productToAdd, 1);
    }
  };

  // Handler để mua ngay
  const handleBuyNow = (e) => {
    e.stopPropagation(); // Ngăn chặn việc điều hướng đến trang chi tiết
    
    if (isInStock && !isLoading) {
      const productToAdd = {
        id: productId || id || Date.now(),
        title: title || "Sản phẩm",
        price: parsePrice(price),
        discountPercent: originalPrice ? Math.round((1 - parsePrice(price) / parsePrice(originalPrice)) * 100) : 0,
        imageUrl: image || "/Placeholder2.png"
      };
      
      // Thêm vào giỏ hàng và chuyển đến trang thanh toán
      addToCart(productToAdd, 1);
      navigate('/checkout');
    }
  };

  // Hiển thị đánh giá sao
  const renderStarRating = () => {
    const starsValue = rating || parseInt(reviewCount) || 4; // Mặc định là 4 sao
    const totalStars = 5;
    const stars = [];
    
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span 
          key={i}
          className={i <= starsValue ? "text-yellow-400" : "text-gray-300"}
          style={{ fontSize: '16px' }}
        >
          ★
        </span>
      );
    }
    
    return (
      <div className="flex">
        {stars}
      </div>
    );
  };

  // Format giá tiền nếu hiển thị dưới dạng số
  const displayPrice = typeof price === 'number' ? formatCurrency(price) : price;
  const displayOriginalPrice = typeof originalPrice === 'number' ? formatCurrency(originalPrice) : originalPrice;

  return (
    <div 
      className="flex overflow-hidden flex-col flex-1 items-center cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div className="flex flex-col px-6 w-full bg-white max-w-[235px] max-md:px-5">
        <div
          className={`px-6 py-2.5 text-xs leading-loose text-center bg-white ${
            isInStock ? "text-neutral-500" : "text-red-500"
          } w-[71px] max-md:pl-5`}
        >
          {isInStock ? "in stock" : "out of stock"}
        </div>
        <img
          src={image || "/Placeholder2.png"}
          className="object-contain self-center max-w-full aspect-square w-[150px]"
          alt={title || "Product"}
        />
        <div className="flex gap-2.5 py-2.5 max-w-full text-xs items-center leading-loose text-center text-gray-400 w-[152px]">
          {renderStarRating()}
          <div>Reviews ({reviewCount || 0})</div>
        </div>
        <div className="text-sm">{title || "Product Name"}</div>
        <div className="text-lg font-semibold leading-6">
          {originalPrice && (
            <span
              style={{
                fontWeight: 400,
                textDecoration: "line-through",
                fontSize: "14px",
                lineHeight: "20px",
                color: "rgba(102,102,102,1)",
              }}
            >
              {displayOriginalPrice}
            </span>
          )}
          <br />{displayPrice || "0đ"}
        </div>
        
        <div className="flex flex-col gap-2 mt-2">
          <button 
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-[50px] hover:bg-blue-700 transition-colors"
            onClick={handleAddToCart}
            disabled={!isInStock || isLoading}
          >
            {isLoading ? "Đang thêm..." : "Thêm vào giỏ"}
          </button>
          
          <button 
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-[50px] hover:bg-red-700 transition-colors"
            onClick={handleBuyNow}
            disabled={!isInStock || isLoading}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;