// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { cartService } from '../services/cart.service';
import { useAuthContext } from './AuthContext';

const CartContext = createContext(null);

// Cấu trúc giỏ hàng mặc định/rỗng
const initialCartState = {
  cartItems: [],
  totalOriginalPrice: 0,
  totalDiscountedPrice: 0,
  discount: 0,
  totalItems: 0,
  id: null
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCartState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuthContext();

  // Hàm xử lý và chuẩn hóa dữ liệu giỏ hàng từ API
  const normalizeCartData = (dataFromApi) => {
    if (dataFromApi && typeof dataFromApi === 'object') {
      return {
        cartItems: dataFromApi.cartItems || [],
        totalOriginalPrice: dataFromApi.totalOriginalPrice || 0,
        totalDiscountedPrice: dataFromApi.totalDiscountedPrice || 0,
        discount: dataFromApi.discount || 0,
        totalItems: dataFromApi.totalItems || 0,
        id: dataFromApi.id || cart?.id || null,
      };
    }
    console.warn("[CartContext] Dữ liệu giỏ hàng từ API không đúng định dạng hoặc rỗng:", dataFromApi);
    return initialCartState; // Trả về giỏ hàng rỗng nếu dữ liệu không hợp lệ
  };

  const fetchCart = useCallback(async (isActionLoadingSetter) => {
    if (!isAuthenticated || !user) {
      setCart(initialCartState);
      if (isActionLoadingSetter) isActionLoadingSetter(false); else setIsLoading(false);
      setError(null);
      return;
    }
    // Nếu không phải là action loading, thì set isLoading chung
    if (!isActionLoadingSetter) setIsLoading(true);
    setError(null);

    try {
      console.log("[CartContext] Đang fetch giỏ hàng...");
      const response = await cartService.getCart();
      console.log("[CartContext] Dữ liệu giỏ hàng đã fetch:", response.data);
      const cartDataFromApi = response.data.data || response.data;
      setCart(normalizeCartData(cartDataFromApi));
    } catch (err) {
      console.error("[CartContext] Lỗi khi lấy giỏ hàng:", err);
      const errorMessage = err.response?.data?.message || err.message || "Không thể tải giỏ hàng.";
      setError(errorMessage);
      setCart(initialCartState);
    } finally {
      if (isActionLoadingSetter) isActionLoadingSetter(false); else setIsLoading(false);
    }
  }, [isAuthenticated, user, cart?.id]); // Thêm cart?.id để normalizeCartData có thể lấy ID cũ

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    } else {
      setCart(initialCartState);
      setIsLoading(false);
      setError(null);
    }
  }, [isAuthenticated, user, fetchCart]); // fetchCart là dependency ổn định

  const addItemToCart = async (cartData) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true); // Sử dụng isLoading chung cho action này
    setError(null);
    try {
      console.log("[CartContext] Đang thêm sản phẩm vào giỏ:", cartData);
      const response = await cartService.addToCart(cartData);
      console.log("[CartContext] Phản hồi sau khi thêm sản phẩm:", response.data);
      const updatedCartData = response.data.data || response.data;
      // API addToCart thường trả về giỏ hàng đã cập nhật
      setCart(normalizeCartData(updatedCartData));
      return updatedCartData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể thêm vào giỏ hàng.";
      setError(errorMessage);
      console.error("[CartContext] Lỗi khi thêm vào giỏ hàng:", err);
      throw err; // Ném lỗi để component gọi có thể xử lý (ví dụ: hiển thị toast)
    } finally {
      setIsLoading(false);
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thực hiện thao tác này.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true); // Sử dụng isLoading chung
    setError(null);
    try {
      console.log(`[CartContext] Đang xóa sản phẩm khỏi giỏ: ${cartItemId}`);
      await cartService.removeFromCart(cartItemId); // Gọi API xóa
      console.log("[CartContext] Xóa sản phẩm thành công, đang fetch lại giỏ hàng...");
      // Sau khi xóa thành công, fetch lại toàn bộ giỏ hàng để đảm bảo dữ liệu mới nhất
      await fetchCart(setIsLoading); // Truyền setIsLoading để fetchCart quản lý cờ loading này
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa sản phẩm.";
      setError(errorMessage);
      console.error("[CartContext] Lỗi khi xóa khỏi giỏ hàng:", err);
      setIsLoading(false); // Đảm bảo set loading false nếu có lỗi trước khi gọi fetchCart
      throw err;
    }
    // setIsLoading(false) sẽ được gọi trong finally của fetchCart
  };

  const updateCartItem = async (cartItemId, newQuantity) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thực hiện thao tác này.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true); // Sử dụng isLoading chung
    setError(null);
    try {
      const payload = { quantity: newQuantity };
      console.log(`[CartContext] Đang cập nhật sản phẩm ${cartItemId} với số lượng ${newQuantity}`);
      await cartService.updateCartItem(payload, cartItemId);
      console.log("[CartContext] Cập nhật sản phẩm thành công, đang fetch lại giỏ hàng...");
      // Sau khi cập nhật thành công, fetch lại toàn bộ giỏ hàng
      await fetchCart(setIsLoading); // Truyền setIsLoading
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể cập nhật số lượng.";
      setError(errorMessage);
      console.error("[CartContext] Lỗi khi cập nhật giỏ hàng:", err);
      setIsLoading(false);
      throw err;
    }
  };

  const clearCartContext = async () => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thực hiện thao tác này.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true); // Sử dụng isLoading chung
    setError(null);
    try {
      console.log("[CartContext] Đang xóa toàn bộ giỏ hàng...");
      await cartService.clearCart();
      console.log("[CartContext] Xóa toàn bộ giỏ hàng thành công.");
      setCart({ ...initialCartState, id: cart?.id }); // Reset về giỏ hàng rỗng, giữ ID cũ nếu có
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa giỏ hàng.";
      setError(errorMessage);
      console.error("[CartContext] Lỗi khi xóa sạch giỏ hàng:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    cart,
    isLoading,
    error,
    fetchCart: () => fetchCart(), // Bọc lại để không cần truyền isActionLoadingSetter từ bên ngoài nếu gọi thủ công
    addItemToCart,
    removeItemFromCart,
    updateCartItem,
    clearCartContext,
    clearCartError: () => setError(null)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};