// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { cartService } from '../services/cart.service';
import { useAuthContext } from './AuthContext';

const CartContext = createContext(null);

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
  const [isLoading, setIsLoading] = useState(false); // Loading chung cho các hoạt động của CartContext
  const [error, setError] = useState(null);
  const { isAuthenticated, user, isLoading: authIsLoading } = useAuthContext();

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
    return initialCartState;
  };

  // Hàm fetch cốt lõi, được gọi nội bộ
  const internalFetchCart = useCallback(async () => {
    // console.log("[CartContext] internalFetchCart called. authIsLoading:", authIsLoading, "isAuthenticated:", isAuthenticated);
    if (authIsLoading) {
      // console.log("[CartContext] AuthContext is loading, deferring internalFetchCart.");
      return; // Đợi AuthContext xử lý xong
    }

    if (!isAuthenticated || !user) {
      // console.log("[CartContext] Not authenticated or no user, setting cart to initial state.");
      setCart(initialCartState);
      setIsLoading(false); // Đảm bảo isLoading là false
      setError(null);
      return;
    }

    // console.log("[CartContext] Attempting to fetch cart via internalFetchCart.");
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.getCart();
      const cartDataFromApi = response.data.data || response.data;
      setCart(normalizeCartData(cartDataFromApi));
    } catch (err) {
      console.error("[CartContext] Lỗi khi lấy giỏ hàng:", err);
      const errorMessage = err.response?.data?.message || err.message || "Không thể tải giỏ hàng.";
      setError(errorMessage);
      setCart(initialCartState); // Vẫn reset về initial nếu lỗi
    } finally {
      setIsLoading(false);
      // console.log("[CartContext] internalFetchCart finished.");
    }
  }, [isAuthenticated, user, authIsLoading]); // Chỉ phụ thuộc vào các yếu tố xác thực


  // Effect chính: Chạy khi trạng thái xác thực thay đổi hoặc khi auth loading hoàn tất
  useEffect(() => {
    // console.log("[CartContext Main Effect] Auth state changed. authIsLoading:", authIsLoading, "isAuthenticated:", isAuthenticated);
    if (!authIsLoading) { // Chỉ fetch khi auth đã xử lý xong
      if (isAuthenticated && user) {
        // console.log("[CartContext Main Effect] User authenticated, calling internalFetchCart.");
        internalFetchCart();
      } else {
        // console.log("[CartContext Main Effect] User not authenticated, resetting cart.");
        setCart(initialCartState);
        setIsLoading(false);
        setError(null);
      }
    }
    // Bỏ internalFetchCart ra khỏi dependency array này để tránh vòng lặp không cần thiết.
    // Effect này chỉ nên re-run khi trạng thái xác thực thay đổi.
  }, [isAuthenticated, user, authIsLoading, internalFetchCart]);


  const addItemToCart = async (cartData) => {
    if (authIsLoading) { throw new Error("Authentication in progress"); }
    if (!isAuthenticated) { throw new Error("User not authenticated"); }
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.addToCart(cartData);
      const updatedCartData = response.data.data || response.data;
      setCart(normalizeCartData(updatedCartData)); // Cập nhật state ngay lập tức
      return updatedCartData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể thêm vào giỏ hàng.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    if (authIsLoading) throw new Error("Authentication in progress");
    if (!isAuthenticated) throw new Error("User not authenticated");
    setIsLoading(true); // Bắt đầu loading cho action này
    setError(null);
    try {
      await cartService.removeFromCart(cartItemId);
      await internalFetchCart(); // Fetch lại toàn bộ giỏ hàng sau khi xóa
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa sản phẩm.";
      setError(errorMessage);
      setIsLoading(false); // Đảm bảo set false nếu internalFetchCart không được gọi hoặc lỗi
      throw err;
    }
    // setIsLoading(false) sẽ được xử lý bởi internalFetchCart nếu nó chạy thành công
  };

  const updateCartItem = async (cartItemId, newQuantity) => {
    if (authIsLoading) throw new Error("Authentication in progress");
    if (!isAuthenticated) throw new Error("User not authenticated");
    setIsLoading(true);
    setError(null);
    try {
      const payload = { quantity: newQuantity };
      await cartService.updateCartItem(payload, cartItemId);
      await internalFetchCart(); // Fetch lại toàn bộ giỏ hàng sau khi cập nhật
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể cập nhật số lượng.";
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const clearCartContext = async () => {
    if (authIsLoading) { throw new Error("Authentication in progress, cannot clear cart."); }
    if (!isAuthenticated) { throw new Error("User not authenticated"); }
    setIsLoading(true);
    setError(null);
    try {
      await cartService.clearCart();
      setCart({ ...initialCartState, id: cart?.id }); // Giữ lại ID của cart nếu có
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa giỏ hàng.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm fetchCart được export ra để component khác có thể gọi khi cần (ví dụ, pull-to-refresh)
  // Nó sẽ chỉ gọi internalFetchCart nếu auth không còn loading.
  const exportedFetchCart = useCallback(() => {
    // console.log("[CartContext] exportedFetchCart called. authIsLoading:", authIsLoading);
    if (!authIsLoading) {
      internalFetchCart();
    } else {
      // console.log("[CartContext] Auth is loading, exportedFetchCart deferred.");
    }
  }, [authIsLoading, internalFetchCart]); // Phụ thuộc vào internalFetchCart để có phiên bản mới nhất


  const value = {
    cart,
    isLoading, // State loading của CartContext
    error,
    fetchCart: exportedFetchCart, // Export hàm fetch đã được tối ưu
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