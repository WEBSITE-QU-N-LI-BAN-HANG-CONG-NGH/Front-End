// src/components/features/product/ProductCard.jsx
// ... các imports khác ...
import { useCartContext } from "../../../contexts/CartContext";
import { useToast } from "../../../contexts/ToastContext";
import { Rating, CircularProgress, Button as MuiButton } from '@mui/material';

const ProductCard = ({
  productId,
  image,
  stockStatus = "in stock", // Mặc định là "in stock" nếu không có
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
    // ... (giữ nguyên)
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!productId || stockStatus !== "in stock") {
        if (stockStatus !== "in stock") {
            showToast("Sản phẩm hiện đã hết hàng.", "warning");
        }
        return;
    }

    const cartData = { productId, quantity: 1 }; // Chỉ cần productId và quantity

    try {
      await addItemToCartFromContext(cartData);
      showToast(`${title || 'Sản phẩm'} đã được thêm vào giỏ hàng!`, "success");
    } catch (error) {
      console.error("Error adding to cart (ProductCard):", error);
      showToast(error.response?.data?.message || error.message || "Không thể thêm vào giỏ hàng.", "error");
    }
  };

  const handleBuyNow = async (e) => {
    // ... (logic tương tự như handleAddToCart rồi navigate) ...
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
      navigate('/checkout?step=2'); // Chuyển đến trang checkout, bước thông tin
    } catch (error) {
      console.error("Error adding to cart before buying (ProductCard):", error);
      showToast(error.response?.data?.message || error.message || "Không thể tiến hành mua ngay.", "error");
    }
  };

  const isOutOfStock = stockStatus !== "in stock";
  const displayRating = typeof ratingImage === 'number' ? ratingImage : 0;

  return (
    // ... JSX của ProductCard ...
    // Đảm bảo các nút "Thêm vào giỏ" và "Mua ngay" gọi đúng hàm
    // và disabled dựa trên isCartContextLoading và isOutOfStock
    <div
      className={`flex flex-col border rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl bg-white w-full mx-auto group ${isOutOfStock ? 'opacity-60' : ''}`}
      onClick={!isOutOfStock ? handleCardClick : undefined}
      style={{ minHeight: '430px', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }} // Tăng minHeight một chút
    >
      <div className="relative w-full pt-[85%]  bg-gray-100">
        {isOutOfStock && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10 shadow-md">Hết hàng</div>
        )}
        {discountPercent > 0 && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full z-10 shadow">
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

      <div className="flex flex-col p-2.5 flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <Rating value={displayRating} readOnly precision={0.5} size="small" sx={{ color: '#faaf00', fontSize: '0.8rem' }} />
          <span className="ml-1 text-[11px]">({reviewCount || 0})</span>
        </div>

        <h3
          className="text-xs font-semibold text-gray-800 h-8 overflow-hidden mb-1.5 leading-tight group-hover:text-blue-600 transition-colors" 
          title={title || "Product Name"}
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {title || "Tên sản phẩm"}
        </h3>

        <div className="mt-auto">
          <div className="mb-2">
            <span className="text-lg font-bold text-red-600">
              {price || "Liên hệ"}
            </span>
            {originalPrice && price !== originalPrice && (
              <span className="ml-1.5 text-[10px] text-gray-500 line-through">
                {originalPrice}
              </span>
            )}
          </div>

          {!isOutOfStock && (
             <div className="flex flex-col gap-1.5">
                <MuiButton
                    variant="contained"
                    fullWidth
                    size="small"
                    onClick={handleAddToCart}
                    disabled={isCartContextLoading}
                    sx={{
                        bgcolor: 'rgb(37 99 235)',
                        '&:hover': { bgcolor: 'rgb(29 78 216)' },
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '0.7rem',
                        py: 0.6
                    }}
                >
                    {isCartContextLoading ? <CircularProgress size={16} color="inherit" /> : "Thêm vào giỏ"}
                </MuiButton>
                <MuiButton
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={handleBuyNow}
                    disabled={isCartContextLoading}
                    sx={{
                        borderColor: 'rgb(220 38 38)',
                        color: 'rgb(220 38 38)',
                        '&:hover': {
                            borderColor: 'rgb(185 28 28)',
                            backgroundColor: 'rgba(220, 38, 38, 0.04)'
                        },
                        textTransform: 'none',
                        fontSize: '0.7rem',
                        py: 0.6
                    }}
                >
                    Mua ngay
                </MuiButton>
             </div>
          )}
           {isOutOfStock && ( 
            <div className="text-center text-[11px] text-red-500 font-semibold py-1.5 border border-red-300 rounded-md bg-red-50">
              Sản phẩm tạm hết hàng
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;