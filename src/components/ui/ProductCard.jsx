import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  image,
  stockStatus = "in stock",
  title,
  price,
  originalPrice,
  reviewCount,
  ratingImage,
  productId, 
}) => {
  const isInStock = stockStatus === "in stock";
  const navigate = useNavigate();

  // Handler to navigate to detail page
  const handleCardClick = () => {
    navigate(`/detail/${productId}`);
  };

  // Determine if we should render stars based on ratingImage
  const renderStars = !isNaN(Number(ratingImage));
  const rating = renderStars ? Number(ratingImage) : 0;

  // Create star rating display using Unicode stars
  const renderStarRating = () => {
    const totalStars = 5;
    const stars = [];
    
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span 
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
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
          {renderStars ? (
            renderStarRating()
          ) : (
            <img
              src={ratingImage}
              className="object-contain shrink-0 aspect-[5.68] w-[74px]"
              alt="Rating"
            />
          )}
          <div>Reviews ({reviewCount})</div>
        </div>
        <div className="text-sm">{title}</div>
        <div className="text-lg font-semibold leading-6">
          <span
            style={{
              fontWeight: 400,
              textDecoration: "line-through",
              fontSize: "14px",
              lineHeight: "20px",
              color: "rgba(102,102,102,1)",
            }}
          >
            ${originalPrice}
          </span>
          <br />${price}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;