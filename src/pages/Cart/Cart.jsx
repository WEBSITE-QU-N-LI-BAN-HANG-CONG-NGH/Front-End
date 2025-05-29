// src/pages/Cart/Cart.jsx
import React from "react"; // Bỏ useEffect nếu không dùng
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import { CircularProgress, Typography, Button as MuiButton } from "@mui/material";

const CartItem = ({ item, onRemove, onUpdateQuantity, formatCurrency, isLoading }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, { quantity: newQuantity });
    }
  };

  return (
    <article className="flex flex-col sm:flex-row justify-between items-center p-4 md:p-6 mb-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto mb-4 sm:mb-0">
        <img
          src={item?.imageUrl || "/Placeholder2.png"}
          alt={item?.productName || "Sản phẩm"}
          className="w-24 h-24 sm:w-[120px] sm:h-[120px] object-contain rounded-md border"
        />
        <div className="text-center sm:text-left">
          <h3 className="mb-1 text-lg sm:text-xl font-medium text-gray-800">{item?.productName || "Sản phẩm"}</h3>
          {item?.size && <p className="text-sm text-gray-500 mb-1">Cấu hình: {item.size}</p>}
          <button
            className="text-xs sm:text-sm text-red-600 hover:text-red-700 transition-colors font-medium disabled:opacity-50"
            onClick={() => onRemove(item.id)}
            disabled={isLoading}
          >
            Xoá
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
        <div className="text-xl sm:text-2xl font-semibold text-red-600 order-first sm:order-none">
          {formatCurrency(item.discountedPrice * item.quantity)}
        </div>
        {item?.price > item.discountedPrice && (
          <div className="text-sm sm:text-base line-through text-gray-500">
            {formatCurrency(item.price * item.quantity)}
          </div>
        )}
        <div className="flex items-center rounded border border-gray-300">
          <button
            className="px-3 py-1 sm:py-2 text-base hover:bg-gray-100 disabled:opacity-50"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isLoading || item.quantity <= 1}
          >
            -
          </button>
          <input
            type="text"
            readOnly
            value={item.quantity}
            className="w-10 text-center border-x border-gray-300 py-1 sm:py-2 focus:outline-none"
          />
          <button
            className="px-3 py-1 sm:py-2 text-base hover:bg-gray-100 disabled:opacity-50"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isLoading}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};

const CartSummary = ({ cartData, formatCurrency, onCheckout, isLoading }) => {
  if (!cartData) return null;
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 mt-6 md:mt-0 md:sticky md:top-10"> {/* Sticky summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">Tóm tắt đơn hàng</h2>
        <div className="space-y-3 mb-5">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Tạm tính:</p>
            <p className="font-medium text-gray-800">{formatCurrency(cartData?.totalOriginalPrice || 0)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Giảm giá:</p>
            <p className="font-medium text-green-600">-{formatCurrency(cartData?.discount || 0)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Phí vận chuyển:</p>
            <p className="font-medium text-green-600">Miễn phí</p>
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-between items-center text-lg font-bold mb-6">
          <p className="text-gray-800">Tổng cộng:</p>
          <p className="text-red-600 text-xl">{formatCurrency(cartData?.totalDiscountedPrice || 0)}</p>
        </div>
        <MuiButton
          variant="contained"
          fullWidth
          onClick={onCheckout}
          disabled={isLoading || !cartData?.cartItems?.length}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
            bgcolor: 'rgb(220 38 38)', // red-600
            '&:hover': { bgcolor: 'rgb(185 28 28)' }, // red-700
            '&.Mui-disabled': { bgcolor: 'rgb(209 213 219)', color: 'rgb(107 114 128)'} // gray-300, gray-500
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit"/> : "ĐẶT HÀNG"}
        </MuiButton>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    isLoading,
    error,
    fetchCart,
    removeItemFromCart,
    updateCartItem
  } = useCartContext();

  const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(amount || 0);

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItemFromCart(itemId);
    } catch (err) {
      alert("Lỗi khi xóa sản phẩm: " + (err.message || "Unknown error"));
    }
  };

  const handleUpdateQuantity = async (itemId, updateData) => {
    if (updateData.quantity < 1) return;
    try {
      await updateCartItem(itemId, updateData);
    } catch (err) {
      alert("Lỗi khi cập nhật số lượng: " + (err.message || "Unknown error"));
    }
  };

  const handleCheckout = () => navigate('/checkout?step=2');

  if (isLoading && !cart) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 4 }}>Đang tải giỏ hàng...</Typography>
      </div>
    );
  }

  if (error && !cart) {
    return (
      <div className="text-center py-10 min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <Typography variant="h5" color="error">Đã xảy ra lỗi</Typography>
        <Typography sx={{mb: 2}}>{error}</Typography>
        <MuiButton variant="outlined" onClick={() => fetchCart()}>Thử lại</MuiButton>
      </div>
    );
  }

  const hasItems = cart?.cartItems && cart.cartItems.length > 0;

  return (
    <main className="flex flex-col pt-3 bg-gray-50 min-h-screen">
      <section className="flex flex-col items-center px-4 md:px-10 lg:px-16 xl:px-24 py-10"> {/* Adjusted padding */}
        <h1 className="mb-8 text-3xl sm:text-4xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
        <div className="flex justify-between mb-10 w-full max-w-3xl mx-auto">
          {["Giỏ hàng", "Thông tin", "Thanh toán", "Hoàn tất"].map((label, index) => (
            <div key={label} className={`flex items-center ${index > 0 ? 'flex-1 justify-center relative' : ''}`}>
              {index > 0 && <div className={`absolute left-0 w-1/2 h-0.5 ${index <= 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>}
              <div className={`w-8 h-8 font-semibold text-white ${index <= 0 ? "bg-blue-600" : "bg-gray-300"} rounded-full flex items-center justify-center z-10 text-sm`}>
                {index + 1}
              </div>
              {index < 3 && <div className={`absolute right-0 w-1/2 h-0.5 ${index < 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>}
              <div className="ml-2 text-xs sm:text-sm font-medium hidden sm:block text-gray-700">{label}</div>
            </div>
          ))}
        </div>

        {!hasItems ? (
          <div className="w-full py-16 text-center min-h-[40vh] flex flex-col justify-center items-center bg-white rounded-lg shadow">
            <img src="/empty-cart.svg" alt="Empty Cart" className="w-48 h-48 mb-6 text-gray-400" />
            <Typography variant="h5" className="mb-4 text-gray-700">Giỏ hàng của bạn trống</Typography>
            <Typography variant="body1" className="mb-6 text-gray-500">Thêm sản phẩm vào giỏ để tiếp tục mua sắm.</Typography>
            <MuiButton
              variant="contained"
              color="primary"
              onClick={() => navigate('/product/all')}
              sx={{ py: 1.5, px: 6, fontSize: '1rem', bgcolor: 'rgb(37 99 235)', '&:hover': { bgcolor: 'rgb(29 78 216)' } }}
            >
              Khám phá sản phẩm
            </MuiButton>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row gap-6">
            <div className="w-full md:flex-grow"> {/* flex-grow để chiếm không gian còn lại */}
              {cart.cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                  formatCurrency={formatCurrency}
                  isLoading={isLoading}
                />
              ))}
            </div>
            <CartSummary
              cartData={cart}
              formatCurrency={formatCurrency}
              onCheckout={handleCheckout}
              isLoading={isLoading}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;