// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { cartService } from '../services/cart.service';
import { useAuthContext } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuthContext();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setCart(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.getCart();
      setCart(response.data.data || response.data);
    } catch (err) {
      console.error("[CartContext] Lỗi khi lấy giỏ hàng:", err);
      setError(err.response?.data?.message || err.message || "Không thể tải giỏ hàng.");
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    } else {
      setCart(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, user, fetchCart]);


  const addItemToCart = async (cartData) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.addToCart(cartData);
      setCart(response.data.data || response.data);
      return response.data.data || response.data;
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
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.removeFromCart(cartItemId);
      setCart(response.data.data || response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa sản phẩm.";
      setError(errorMessage);
      console.error("[CartContext] Lỗi khi xóa khỏi giỏ hàng:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (cartItemId, newQuantity) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const payload = { quantity: newQuantity };
      const response = await cartService.updateCartItem(payload, cartItemId);
      setCart(response.data.data || response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể cập nhật số lượng.";
      setError(errorMessage);
      console.error("[CartContext] Lỗi khi cập nhật giỏ hàng:", err);
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
      setCart({
        cartItems: [],
        totalOriginalPrice: 0,
        totalDiscountedPrice: 0,
        discount: 0,
        totalItems: 0,
        id: cart?.id
      });
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