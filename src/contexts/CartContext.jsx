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
  const [isLoading, setIsLoading] = useState(false); // Loading chung cho các action của cart
  const [error, setError] = useState(null);
  const { isAuthenticated, user, isLoading: authIsLoading } = useAuthContext(); // Thêm authIsLoading

  const normalizeCartData = (dataFromApi) => {
    // ... (giữ nguyên)
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

  const fetchCart = useCallback(async (isActionLoadingSetter) => {
    // Đợi AuthContext load xong trước khi fetch cart
    if (authIsLoading) {
        console.log("[CartContext] AuthContext is loading, deferring fetchCart.");
        if (isActionLoadingSetter) isActionLoadingSetter(false); else setIsLoading(false);
        return;
    }

    if (!isAuthenticated || !user) {
      setCart(initialCartState);
      if (isActionLoadingSetter) isActionLoadingSetter(false); else setIsLoading(false);
      setError(null);
      return;
    }

    if (!isActionLoadingSetter) setIsLoading(true);
    setError(null);

    try {
      const response = await cartService.getCart();
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
  }, [isAuthenticated, user, cart?.id, authIsLoading]); // Thêm authIsLoading

  useEffect(() => {
    // Chỉ fetch cart khi authIsLoading là false và user đã được xác thực
    if (!authIsLoading) {
        if (isAuthenticated && user) {
            fetchCart();
        } else {
            setCart(initialCartState);
            setIsLoading(false);
            setError(null);
        }
    }
  }, [isAuthenticated, user, fetchCart, authIsLoading]); // Thêm authIsLoading

  const addItemToCart = async (cartData) => {
    if (authIsLoading) {
        setError("Đang kiểm tra thông tin đăng nhập, vui lòng thử lại sau giây lát.");
        throw new Error("Authentication in progress");
    }
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      throw new Error("User not authenticated");
    }
    // ... (phần còn lại của hàm giữ nguyên)
    setIsLoading(true);
    setError(null);
    try {
      console.log("[CartContext] Đang thêm sản phẩm vào giỏ:", cartData);
      const response = await cartService.addToCart(cartData);
      console.log("[CartContext] Phản hồi sau khi thêm sản phẩm:", response.data);
      const updatedCartData = response.data.data || response.data;
      setCart(normalizeCartData(updatedCartData));
      return updatedCartData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể thêm vào giỏ hàng.";
      setError(errorMessage);
      console.error("[CartContext] Lỗi khi thêm vào giỏ hàng:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItemFromCart = async (cartItemId) => {
    if (authIsLoading) throw new Error("Authentication in progress");
    if (!isAuthenticated) throw new Error("User not authenticated");
    // ... (phần còn lại của hàm giữ nguyên)
    setIsLoading(true);
    setError(null);
    try {
      console.log(`[CartContext] Đang xóa sản phẩm khỏi giỏ: ${cartItemId}`);
      await cartService.removeFromCart(cartItemId);
      console.log("[CartContext] Xóa sản phẩm thành công, đang fetch lại giỏ hàng...");
      await fetchCart(setIsLoading);
    } catch (err) {
      // ...
      setIsLoading(false);
      throw err;
    }
  };

  const updateCartItem = async (cartItemId, newQuantity) => {
    if (authIsLoading) throw new Error("Authentication in progress");
    if (!isAuthenticated) throw new Error("User not authenticated");
    // ... (phần còn lại của hàm giữ nguyên)
     setIsLoading(true);
    setError(null);
    try {
      const payload = { quantity: newQuantity };
      console.log(`[CartContext] Đang cập nhật sản phẩm ${cartItemId} với số lượng ${newQuantity}`);
      await cartService.updateCartItem(payload, cartItemId);
      console.log("[CartContext] Cập nhật sản phẩm thành công, đang fetch lại giỏ hàng...");
      await fetchCart(setIsLoading);
    } catch (err) {
      // ...
      setIsLoading(false);
      throw err;
    }
  };

  const clearCartContext = async () => {
    if (authIsLoading) {
        console.warn("[CartContext] clearCartContext called while auth is loading. Aborting.");
        setError("Đang kiểm tra thông tin đăng nhập, không thể xóa giỏ hàng lúc này.");
        throw new Error("Authentication in progress, cannot clear cart.");
    }
    if (!isAuthenticated) {
      console.warn("[CartContext] clearCartContext called but user is not authenticated.");
      setError("Vui lòng đăng nhập để thực hiện thao tác này.");
      throw new Error("User not authenticated"); // Lỗi này sẽ được bắt ở Checkout.jsx
    }
    setIsLoading(true);
    setError(null);
    try {
      console.log("[CartContext] Đang xóa toàn bộ giỏ hàng (đã xác thực)...");
      await cartService.clearCart();
      console.log("[CartContext] Xóa toàn bộ giỏ hàng thành công.");
      setCart({ ...initialCartState, id: cart?.id });
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
    fetchCart: useCallback(() => { // Đảm bảo fetchCart gọi phiên bản mới nhất
        if (!authIsLoading) { // Chỉ fetch nếu auth không loading
            fetchCart();
        } else {
            console.log("[CartContext] Auth is loading, fetchCart deferred by manual call.");
        }
    }, [authIsLoading, fetchCart]),
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