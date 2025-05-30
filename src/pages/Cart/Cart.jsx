// src/pages/Cart/Cart.jsx
import React, { useEffect } from "react"; // Thêm useEffect nếu cần
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import { CircularProgress, Typography, Button as MuiButton, Box, Alert } from "@mui/material"; // Thêm Alert và Box

// ... (CartItem và CartSummary giữ nguyên hoặc sửa lỗi nhỏ nếu cần)
const CartItem = ({ item, onRemove, onUpdateQuantity, formatCurrency, isLoading }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      // Chỉ truyền { quantity: newQuantity }
      onUpdateQuantity(item.id, { quantity: newQuantity });
    }
  };

  return (
    <article className="flex flex-col sm:flex-row justify-between items-center p-4 md:p-6 mb-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto mb-4 sm:mb-0">
        <img
          src={item?.imageUrl || "/Placeholder2.png"}
          alt={item?.productName || "Sản phẩm"}
          className="w-24 h-24 sm:w-[120px] sm:h-[120px] object-contain rounded-md border"
        />
        <div className="text-center sm:text-left">
          <h3 className="mb-1 text-base sm:text-lg font-medium text-gray-800 line-clamp-2" title={item?.productName || "Sản phẩm"}>{item?.productName || "Sản phẩm"}</h3> {/* Thêm line-clamp */}
          {item?.size && <p className="text-xs sm:text-sm text-gray-500 mb-1">Cấu hình: {item.size}</p>}
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
        <div className="text-lg sm:text-xl font-semibold text-red-600 order-first sm:order-none">
          {formatCurrency(item.discountedPrice * item.quantity)}
        </div>
        {item?.price > item.discountedPrice && (
          <div className="text-xs sm:text-sm line-through text-gray-500">
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
            readOnly // Giữ readOnly để tránh nhập liệu không mong muốn
            value={item.quantity}
            className="w-10 text-center border-x border-gray-300 py-1 sm:py-2 focus:outline-none bg-white" // Thêm bg-white
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
    <div className="w-full md:w-1/3 lg:w-1/4 mt-6 md:mt-0 md:sticky md:top-10">
      <div className="bg-white p-6 rounded-lg shadow-md"> {/* Đổi bg-gray-50 thành bg-white */}
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
            bgcolor: 'rgb(220 38 38)',
            '&:hover': { bgcolor: 'rgb(185 28 28)' },
            '&.Mui-disabled': { bgcolor: 'rgb(209 213 219)', color: 'rgb(107 114 128)'}
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
    isLoading: isCartLoading, // Đổi tên để tránh xung đột
    error: cartError,        // Đổi tên để tránh xung đột
    fetchCart,
    removeItemFromCart,
    updateCartItem,
    clearCartError // Thêm hàm để xóa lỗi
  } = useCartContext();

  // Gọi fetchCart khi component mount hoặc khi người dùng thay đổi (đã xử lý trong context)
  // useEffect(() => {
  //   fetchCart();
  // }, [fetchCart]);


  const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(amount || 0);

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItemFromCart(itemId);
    } catch (err) {
      // Lỗi đã được xử lý và log trong context, có thể hiển thị toast ở đây nếu muốn
      console.error("UI: Lỗi khi xóa sản phẩm:", err);
    }
  };

  const handleUpdateQuantity = async (itemId, updateData) => {
    if (updateData.quantity < 1) return;
    try {
      await updateCartItem(itemId, updateData);
    } catch (err) {
      console.error("UI: Lỗi khi cập nhật số lượng:", err);
    }
  };

  const handleCheckout = () => navigate('/checkout?step=2'); // Bắt đầu checkout từ bước 2

  if (isCartLoading && !cart) { // Chỉ hiển thị loading toàn trang khi chưa có dữ liệu cart
    return (
      <Box className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10">
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 4 }}>Đang tải giỏ hàng...</Typography>
      </Box>
    );
  }

  // Hiển thị lỗi nếu có và không đang loading
  if (cartError && !isCartLoading) {
    return (
      <Box className="text-center py-10 min-h-[calc(100vh-200px)] flex flex-col justify-center items-center px-4">
        <Alert severity="error" sx={{ width: '100%', maxWidth: 'md', mb: 2 }}>
          <Typography variant="h6" component="div">Đã xảy ra lỗi</Typography>
          <Typography>{cartError}</Typography>
        </Alert>
        <MuiButton variant="outlined" onClick={() => { clearCartError(); fetchCart(); }}>Thử lại</MuiButton>
      </Box>
    );
  }

  const hasItems = cart?.cartItems && cart.cartItems.length > 0;

  return (
    <main className="flex flex-col pt-3 bg-gray-50 min-h-screen">
      <section className="flex flex-col items-center px-4 md:px-10 lg:px-16 xl:px-24 py-10">
        <h1 className="mb-8 text-3xl sm:text-4xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
        {/* CheckoutProgress component */}
        <div className="flex justify-between mb-10 w-full max-w-3xl mx-auto">
          {["Giỏ hàng", "Thông tin", "Thanh toán", "Hoàn tất"].map((label, index) => (
            <div key={label} className={`flex items-center ${index > 0 ? 'flex-1 justify-center relative' : ''}`}>
              {index > 0 && <div className={`absolute left-0 w-1/2 h-0.5 ${index <= 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>} {/* Logic step cho progress bar */}
              <div className={`w-8 h-8 font-semibold text-white ${index <= 0 ? "bg-blue-600" : "bg-gray-300"} rounded-full flex items-center justify-center z-10 text-sm`}>
                {index + 1}
              </div>
              {index < 3 && <div className={`absolute right-0 w-1/2 h-0.5 ${index < 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>} {/* Logic step cho progress bar */}
              <div className="ml-2 text-xs sm:text-sm font-medium hidden sm:block text-gray-700">{label}</div>
            </div>
          ))}
        </div>

        {!hasItems ? (
          <div className="w-full py-16 text-center min-h-[40vh] flex flex-col justify-center items-center bg-white rounded-lg shadow-md"> {/* Thêm shadow-md */}
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
            <div className="w-full md:flex-grow">
              {isCartLoading && <Box sx={{display: 'flex', justifyContent: 'center', my:2}}><CircularProgress/></Box> /* Hiển thị loading khi cart đang cập nhật */}
              {cart.cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                  formatCurrency={formatCurrency}
                  isLoading={isCartLoading} // Truyền trạng thái loading
                />
              ))}
            </div>
            <CartSummary
              cartData={cart}
              formatCurrency={formatCurrency}
              onCheckout={handleCheckout}
              isLoading={isCartLoading} // Truyền trạng thái loading
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;