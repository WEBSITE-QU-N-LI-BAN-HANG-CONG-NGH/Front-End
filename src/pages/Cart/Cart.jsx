import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import { getCart, removeItemToCart, updateItemToCart } from "../../State/Cart/Action";
import { CircularProgress, Typography } from "@mui/material";

const CartItem = ({ item, removeFromCart, updateQuantity, formatCurrency }) => {
  return (
    <article className="flex justify-between items-center p-6 mb-4 border border-gray-300">
      <div className="flex gap-6 items-center">
        <img
          src={item?.imageUrl || "/Placeholder2.png"}
          alt={item?.productName || "Sản phẩm"}
          className="w-[120px] h-[120px] object-contain"
        />
        <div>
          <h3 className="mb-2 text-xl">{item?.productName  || "Sản phẩm"}</h3>
          {/* Hiển thị size nếu có */}
          {item?.size && <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>}
          <button
            className="text-xs sm:text-sm text-red-500 hover:text-red-700 transition-colors font-medium" // Style nút xóa
            onClick={() => removeFromCart(item.id)}
          >
            Xoá
          </button>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="text-2xl font-semibold text-red-600">
          {formatCurrency(item.price)}
        </div>
        {item?.discountPercent > 0 && (
          <div className="text-base line-through text-stone-500">
            {formatCurrency(item.price / (1 - item?.discountPercent / 100))}
          </div>
        )}
        <div className="flex items-center rounded border border-gray-300">
          <button
            className="px-3 py-2 text-base"
            onClick={() => updateQuantity(item.id, item?.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <input
            type="text"
            readOnly
            value={item.quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) {
                updateQuantity(item.id, value);
              }
            }}
            className="w-10 text-center border-x border-gray-300"
          />
          <button
            className="px-3 py-2 text-base"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};

const CartSummary = ({ item, formatCurrency }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
        <p className="text-base font-medium">Tổng tiền hàng:</p>
        <p className="text-2xl font-semibold text-red-600">{formatCurrency(item?.totalOriginalPrice || 0)}</p>
      </div>
      <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
        <p className="text-base">Phí vận chuyển:</p>
        <p className="text-base text-green-600">Miễn phí</p>
      </div>
      <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
        <p className="text-base font-medium">Mã giảm giá:</p>
        <p className="text-2xl font-semibold text-red-600">-{formatCurrency(item?.discount)}</p>
      </div>
      <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
        <p className="text-base font-medium">Tổng thanh toán:</p>
        <p className="text-2xl font-semibold text-red-600">{formatCurrency(item?.totalDiscountedPrice)}</p>
      </div>
      <button 
        className="py-4 w-full text-base font-semibold text-white bg-rose-600 rounded hover:bg-rose-700 transition-colors"
        onClick={() => window.location.href = "/checkout"}
      >
        ĐẶT HÀNG NGAY
      </button>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, loading, error] = useSelector( (store) => [store.cart.cart, store.cart.loading, store.cart.error]);

  
  // Format tiền theo định dạng Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };
  
  // Lấy thông tin giỏ hàng khi component được tạo
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  
  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = async (itemId) => { // Thêm async
    try {
      console.log("Dispatching removeItemToCart for item:", itemId);
      // Đợi action xóa hoàn thành
      await dispatch(removeItemToCart(itemId));
      console.log("removeItemToCart finished, dispatching getCart...");
      // Chỉ gọi getCart sau khi xóa thành công
      dispatch(getCart());
    } catch (error) {
      // Lỗi đã được log trong action creator, có thể hiển thị thông báo ở đây
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng (Component):", error);
      // Ví dụ: set một state lỗi để hiển thị trên UI
      // setCartError("Không thể xóa sản phẩm.");
    }
  };
  
  // Xử lý cập nhật số lượng sản phẩm
  const handleUpdateQuantity = async (itemId, quantity) => { // Thêm async
    if (quantity < 1) return;
  
    try {
      console.log(`Dispatching updateItemToCart for item ${itemId} with quantity ${quantity}`);
      // Đợi action cập nhật hoàn thành
      await dispatch(updateItemToCart({ itemId: itemId, quantity: quantity }));
      console.log("updateItemToCart finished, dispatching getCart...");
      // Chỉ gọi getCart sau khi cập nhật thành công
      dispatch(getCart());
    } catch (error) {
      // Lỗi đã được log trong action creator
      console.error("Lỗi khi cập nhật số lượng sản phẩm (Component):", error);
      // Ví dụ: set một state lỗi
      // setCartError("Không thể cập nhật số lượng.");
    }
  };
  
  
  // Xử lý nếu không có giỏ hàng hoặc giỏ hàng trống
  const handleEmptyCart = () => {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-lg mb-6">Giỏ hàng của bạn đang trống</p>
        <button 
          className="py-3 px-6 text-base font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/product/all')}
        >
          TIẾP TỤC MUA SẮM
        </button>
      </div>
    );
  };
  
  
  const hasItems = cart?.cartItems && cart.cartItems.length > 0;
  
  return (
    <main className="flex flex-col pt-3 bg-white min-h-screen">
      <section className="flex flex-col items-center px-4 md:px-10 lg:px-64 py-10 max-md:px-10 max-sm:px-5">
        <BreadcrumbNav />
        <h1 className="mb-10 text-4xl md:text-6xl font-semibold">Shopping Cart</h1>
        
        <div className="flex justify-between mb-10 w-full">
          <div className="flex items-center">
            <div className="w-8 h-8 font-semibold text-white bg-blue-600 rounded-full flex items-center justify-center">
              1
            </div>
            <div className="ml-2 text-sm font-medium">Giỏ hàng</div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 font-semibold text-white bg-gray-300 rounded-full flex items-center justify-center">
              2
            </div>
            <div className="ml-2 text-sm font-medium">Thông tin đặt hàng</div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 font-semibold text-white bg-gray-300 rounded-full flex items-center justify-center">
              3
            </div>
            <div className="ml-2 text-sm font-medium">Thanh toán</div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 font-semibold text-white bg-gray-300 rounded-full flex items-center justify-center">
              4
            </div>
            <div className="ml-2 text-sm font-medium">Hoàn tất</div>
          </div>
        </div>
        
        {loading ? (
          <>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" sx={{ mt: 4 }}>
              Đang tải giỏ hàng... {/* Thay đổi text */}
            </Typography>
          </>
        ): error ? (
          <div className="text-center py-10 text-red-500">
              <p>Đã xảy ra lỗi: {error}</p>
              <p className="text-sm">Vui lòng thử lại sau</p>
          </div>
        ) : !hasItems ? (
          handleEmptyCart()
        ) : (
          <div className="w-full">
            {cart.cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                removeFromCart={handleRemoveFromCart} 
                updateQuantity={handleUpdateQuantity}
                formatCurrency={formatCurrency}
              />
            ))}
            <CartSummary 
              item={cart}
              formatCurrency={formatCurrency}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;