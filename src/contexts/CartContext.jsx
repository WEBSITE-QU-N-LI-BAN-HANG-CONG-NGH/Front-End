import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { cartService } from '../services/cart.service';
import { useAuthContext } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, jwt } = useAuthContext(); // Sử dụng jwt để fetch cart khi jwt thay đổi

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.getCart();
      setCart(response.data);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng (Context):", err);
      setError(err.response?.data?.message || err.message || "Không thể tải giỏ hàng.");
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]); // Phụ thuộc vào isAuthenticated

  useEffect(() => {
    // Fetch giỏ hàng khi người dùng được xác thực hoặc khi jwt token thay đổi (sau khi login/logout)
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null); // Xóa giỏ hàng nếu không authenticated
    }
  }, [isAuthenticated, jwt, fetchCart]); // Thêm jwt làm dependency

  const addItemToCart = async (cartData) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await cartService.addToCart(cartData);
      setCart(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể thêm vào giỏ hàng.";
      setError(errorMessage);
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
      setCart(response.data); // Giả sử API trả về cart mới
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa sản phẩm.";
      setError(errorMessage);
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
      const response = await cartService.updateCartItem(cartUpdateData, itemId);
      setCart(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể cập nhật số lượng.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCartContext = async () => { // Đổi tên để tránh xung đột với service
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      await cartService.clearCart(); // Gọi API để xóa cart ở backend
      // Sau khi xóa thành công ở backend, cập nhật state ở client
      setCart({
        id: cart?.id, // Giữ lại id của cart nếu cần, hoặc để backend quyết định
        cartItems: [],
        totalOriginalPrice: 0,
        totalDiscountedPrice: 0,
        discount: 0,
        totalItems: 0,
        // Thêm các trường khác của cart object về giá trị mặc định nếu cần
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Không thể xóa giỏ hàng.";
      setError(errorMessage);
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
    clearCartContext, // Sử dụng tên hàm mới
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