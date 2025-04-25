import React from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from '@mui/material'
import { useDispatch } from "react-redux"; // Assuming Redux is set up
// import { addItemToCart } from "../../../State/Cart/Action"; // Correct path?

// Mock dispatch and action if Redux isn't fully set up yet for testing
const useMockDispatch = () => (action) => {
  console.log("Dispatching Action:", action);
  // Mock async behavior
  return new Promise((resolve, reject) => {
     if (action.type === 'ADD_ITEM_TO_CART_FAILURE') { // Example failure condition
        reject({ message: "Mock Cart Error" });
     } else {
        resolve();
     }
  });
};

// Mock action creator
const mockAddItemToCart = (data) => ({
    type: 'ADD_ITEM_TO_CART_REQUEST', // Or whatever your action type is
    payload: data
});


const ProductCard = ({
  productId, // Use productId passed from Catalog
  image,
  stockStatus = "in stock",
  title,
  price, // Now expects formatted string (e.g., "32.890.600 ₫")
  originalPrice, // Now expects formatted string
  reviewCount,
  ratingImage,
  discountPercent // Optional: pass rating image name based on averageRating
}) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch(); // Use real dispatch if Redux is ready
  const dispatch = useMockDispatch(); // Use mock dispatch for now if needed
  // const addItemToCartAction = addItemToCart; // Use real action
  const addItemToCartAction = mockAddItemToCart; // Use mock action

  // Handler to navigate to product details page
  const handleCardClick = () => {
    if (productId) {
        navigate(`/product/${productId}`);
    } else {
        console.warn("ProductCard clicked without a valid productId");
        // Optionally navigate to a default or error page
        // navigate('/products/not-found');
    }
  };

  // Handler to add item to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering handleCardClick
    if (!productId) return; // Don't proceed without ID

    const cartData = { productId, quantity: 1 }; // Use productId

    dispatch(addItemToCartAction(cartData)) // Use the action creator
      .then(() => {
        alert("Đã thêm sản phẩm vào giỏ hàng! (Mock)"); // Use a better notification system later
      })
      .catch(error => {
        console.error("Error adding to cart:", error);
        alert(`Có lỗi xảy ra khi thêm vào giỏ hàng: ${error.message || 'Unknown error'} (Mock)`);
      });
  };

  // Handler for "Buy Now"
  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!productId) return;

    const cartData = { productId, quantity: 1 };

    dispatch(addItemToCartAction(cartData))
      .then(() => {
        // alert("Adding to cart, then redirecting to checkout... (Mock)");
        // Redirect to checkout after successful addition
        navigate('/checkout');
      })
      .catch(error => {
        console.error("Error adding to cart before buying:", error);
        alert(`Có lỗi xảy ra: ${error.message || 'Could not proceed to buy'} (Mock)`);
      });
  };

  return (
    <div
      className="flex flex-col flex-1 items-center border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white max-w-[235px]" // Added border and improved hover
      onClick={handleCardClick}
      style={{ minHeight: '400px' }} // Give cards a consistent min height
    >
      {/* Image container */}
      <div className="relative w-full bg-gray-100 flex items-center justify-center aspect-square">
         {stockStatus !== "in stock" && (
             <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">Hết hàng</div>
         )}
          {originalPrice && price !== originalPrice && ( // Show discount % if applicable
              <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded z-10">Sale {discountPercent}%</div> // Example Sale Badge
          )}
        <img
          src={image || "/Placeholder2.png"}
          className="object-contain h-full w-full p-4" // Ensure image fits well
          alt={title || "Product Image"}
          loading="lazy" // Lazy load images
        />
      </div>

      {/* Content container */}
      <div className="flex flex-col p-4 w-full text-left">
        {/* Ratings and Reviews */}
        <div className="flex gap-1.5 items-center text-xs text-gray-500 mb-1">
            <Rating value={ratingImage} name='half-rating' readOnly precision={.5}/>
            <span>({reviewCount || 0}) đánh giá </span>
        </div>

        {/* Title */}
        <div className="text-[1.2rem] font-medium text-gray-800 h-15 overflow-hidden mb-2" title={title || "Product Name"}> {/* Fixed height, tooltip */}
             {title || "Product Name"}
        </div>

        {/* Price */}
        <div className="text-base font-semibold text-red-600 leading-tight mb-2">
            {price || "Liên hệ"} {/* Show price or fallback */}
            {originalPrice && price !== originalPrice && ( // Show original price if different
                <span className="ml-2 text-xs font-normal text-gray-500 line-through">
                    {originalPrice}
                </span>
            )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto pt-2"> {/* Push buttons to bottom */}
          <button
            className="w-full px-3 py-2 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
            onClick={handleAddToCart}
            disabled={stockStatus !== "in stock"} // Disable if out of stock
          >
            {stockStatus === "in stock" ? "Thêm vào giỏ" : "Hết hàng"}
          </button>

          <button
            className="w-full px-3 py-2 text-sm text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
            onClick={handleBuyNow}
            disabled={stockStatus !== "in stock"} // Disable if out of stock
          >
             {stockStatus === "in stock" ? "Mua ngay" : "Hết hàng"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;