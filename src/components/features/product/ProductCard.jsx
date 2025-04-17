import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";

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
  const { addToCart, loading } = useCart();
  const isInStock = stockStatus === "in_stock";

  // Handler to navigate to detail page
  const handleCardClick = () => {
    navigate(`/detail/${productId || id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    if (isInStock) {
      addToCart(productId || id, 1);
    }
  };

  // Create star rating display using Unicode stars
  const renderStarRating = () => {
    const starsValue = rating || parseInt(reviewCount) || 0; // Fallback if rating is not provided
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
          {stockStatus}
        </div>
        <img
          src={image}
          className="object-contain self-center max-w-full aspect-square w-[150px]"
          alt={title}
        />
        <div className="flex gap-2.5 py-2.5 max-w-full text-xs items-center leading-loose text-center text-gray-400 w-[152px]">
          {renderStarRating()}
          <div>Reviews ({reviewCount})</div>
        </div>
        <div className="text-sm">{title}</div>
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
              {originalPrice}
            </span>
          )}
          <br />{price}
        </div>
        
        <button 
          className="mt-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-[50px] hover:bg-blue-700 transition-colors"
          onClick={handleAddToCart}
          disabled={!isInStock || loading}
        >
          {loading ? "Đang thêm..." : "Thêm vào giỏ"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;