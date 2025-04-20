import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Cart/Action";

const ProductCard = ({
  id,
  image,
  stockStatus = "in stock",
  title,
  price,
  originalPrice,
  reviewCount,
  ratingImage,
  productId
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Handler để chuyển hướng đến trang chi tiết
  const handleCardClick = () => {
    navigate(`/product/${productId || id || 1}`);
  };

  // Handler để thêm vào giỏ hàng
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn chặn việc điều hướng đến trang chi tiết
    
    const cartData = {
      productId: productId || id,
      quantity: 1
    };
    
    dispatch(addItemToCart(cartData))
      .then(() => {
        // Hiển thị thông báo thành công nếu cần
        alert("Đã thêm sản phẩm vào giỏ hàng!");
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
        alert("Có lỗi xảy ra khi thêm vào giỏ hàng");
      });
  };

  // Handler để mua ngay
  const handleBuyNow = (e) => {
    e.stopPropagation(); // Ngăn chặn việc điều hướng đến trang chi tiết
    
    const cartData = {
      productId: productId || id,
      quantity: 1
    };
    
    dispatch(addItemToCart(cartData))
      .then(() => {
        // Chuyển hướng đến trang thanh toán
        navigate('/checkout');
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
        alert("Có lỗi xảy ra khi thêm vào giỏ hàng");
      });
  };

  return (
    <div 
      className="flex overflow-hidden flex-col flex-1 items-center cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div className="flex flex-col px-6 w-full bg-white max-w-[235px] max-md:px-5">
        <div
          className={`px-6 py-2.5 text-xs leading-loose text-center bg-white ${
            stockStatus === "in stock" ? "text-neutral-500" : "text-red-500"
          } w-[71px] max-md:pl-5`}
        >
          {stockStatus}
        </div>
        <img
          src={image || "/Placeholder2.png"}
          className="object-contain self-center max-w-full aspect-square w-[150px]"
          alt={title || "Product"}
        />
        <div className="flex gap-2.5 py-2.5 max-w-full text-xs items-center leading-loose text-center text-gray-400 w-[152px]">
          <img
            src={ratingImage ? `/${ratingImage}.svg` : "/4.svg"}
            className="object-contain shrink-0 aspect-[5.62] w-[73px]"
            alt="Rating"
          />
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
              {originalPrice}
            </span>
          )}
          <br />{price || "0đ"}
        </div>
        
        <div className="flex flex-col gap-2 mt-2 mb-4">
          <button 
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-[50px] hover:bg-blue-700 transition-colors"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ
          </button>
          
          <button 
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-[50px] hover:bg-red-700 transition-colors"
            onClick={handleBuyNow}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;