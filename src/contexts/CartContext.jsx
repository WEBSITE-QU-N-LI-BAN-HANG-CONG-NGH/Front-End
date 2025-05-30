// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { cartService } from '../services/cart.service';
import { useAuthContext } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nên là true ban đầu nếu bạn muốn fetch ngay
  const [error, setError] = useState(null);
  const { isAuthenticated, jwt, user } = useAuthContext(); // Thêm user để theo dõi thay đổi user

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !user) { // Thêm điều kiện !user
      setCart(null);
      setIsLoading(false); // Dừng loading nếu không authenticated
      return;
    }
    console.log("[CartContext] Fetching cart..."); // Log khi bắt đầu fetch
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.getCart();
      console.log("[CartContext] Cart data fetched:", response.data); // Log dữ liệu nhận được
      setCart(response.data);
    } catch (err) {
      console.error("[CartContext] Lỗi khi lấy giỏ hàng:", err);
      setError(err.response?.data?.message || err.message || "Không thể tải giỏ hàng.");
      setCart(null);
    } finally {
      setIsLoading(false);
      console.log("[CartContext] Finished fetching cart. Loading:", false); // Log khi kết thúc fetch
    }
  }, [isAuthenticated, user]); // Thêm user vào dependencies

  useEffect(() => {
    if (isAuthenticated && user) { // Chỉ fetch khi đã authenticated và có user
      fetchCart();
    } else {
      setCart(null); // Xóa giỏ hàng nếu không authenticated hoặc không có user
      setIsLoading(false); // Đảm bảo loading được set false
      console.log("[CartContext] User not authenticated or no user, cart cleared.");
    }
  }, [isAuthenticated, user, fetchCart]); // jwt có thể không cần thiết nếu user đã đủ


  const addItemToCart = async (cartData) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.addToCart(cartData);
      setCart(response.data); // Cập nhật state giỏ hàng sau khi thêm thành công
      console.log("[CartContext] Item added, cart updated:", response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể thêm vào giỏ hàng.";
      setError(errorMessage);
      console.error("[CartContext] Error adding item to cart:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItemFromCart = async (itemId) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.removeFromCart(itemId);
      setCart(response.data);
      console.log("[CartContext] Item removed, cart updated:", response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa sản phẩm.";
      setError(errorMessage);
      console.error("[CartContext] Error removing item from cart:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (itemId, cartUpdateData) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      // Trong CartContext.jsx, hàm updateCartItem
      // Đảm bảo cartUpdateData chỉ chứa quantity
      const payload = { quantity: cartUpdateData.quantity };
      const response = await cartService.updateCartItem(payload, itemId);
      setCart(response.data);
      console.log("[CartContext] Item updated, cart updated:", response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể cập nhật số lượng.";
      setError(errorMessage);
      console.error("[CartContext] Error updating cart item:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };


  const clearCartContext = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      await cartService.clearCart();
      // Cập nhật state ở client để phản ánh giỏ hàng rỗng ngay lập tức
      setCart(prevCart => ({
        ...(prevCart || {}), // Giữ lại cấu trúc cũ nếu có, hoặc tạo object mới
        cartItems: [],
        totalOriginalPrice: 0,
        totalDiscountedPrice: 0,
        discount: 0,
        totalItems: 0,
      }));
      console.log("[CartContext] Cart cleared.");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa giỏ hàng.";
      setError(errorMessage);
      console.error("[CartContext] Error clearing cart:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    cart,
    isLoading,
    error,
    fetchCart,
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