// src/contexts/OrderContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { orderService } from '../services/order.service';
import { useAuthContext } from './AuthContext';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, jwt } = useAuthContext();

  const fetchAddresses = useCallback(async () => {
    if (!isAuthenticated) {
      setAddresses([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.getAddresses();
      setAddresses(response.data?.data || response.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách địa chỉ (Context):", err);
      setError(err.response?.data?.message || err.message || "Không thể tải danh sách địa chỉ.");
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    } else {
      setAddresses([]);
    }
  }, [isAuthenticated, jwt, fetchAddresses]);

  const createNewOrder = async (addressId) => { // Chỉ nhận addressId
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để đặt hàng.");
      throw new Error("User not authenticated");
    }
    if (!addressId) { // Kiểm tra addressId
        setError("Vui lòng chọn địa chỉ giao hàng hợp lệ.");
        throw new Error("Address ID is required");
    }
    setIsLoading(true);
    setError(null);
    try {
      // Truyền addressId cho service
      const response = await orderService.createOrder(addressId); //
      const newOrderData = response.data?.data || response.data;
      setCurrentOrder(newOrderData);
      return newOrderData;
    } catch (err) {
      console.error("Lỗi khi tạo đơn hàng (Context):", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || "Không thể tạo đơn hàng.";
      setError(errorMessage);
      setCurrentOrder(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderById = async (orderId) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.getOrderById(orderId);
      setCurrentOrder(response.data?.data || response.data);
    } catch (err) {
      console.error(`Lỗi khi lấy chi tiết đơn hàng ${orderId} (Context):`, err);
      setError(err.response?.data?.message || err.message || "Không thể tải chi tiết đơn hàng.");
      setCurrentOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewAddress = async (addressData) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thêm địa chỉ.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.addAddress(addressData);
      await fetchAddresses();
      return response.data;
    } catch (err) {
      console.error("Lỗi khi thêm địa chỉ (Context):", err);
      const errorMessage = err.response?.data?.message || err.message || "Không thể thêm địa chỉ mới.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserOrders = async (status = "all") => {
    if (!isAuthenticated) {
        setOrders([]);
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
        let response;
        switch (status) {
          case "PENDING": response = await orderService.getPendingOrders(); break;
          case "SHIPPED": response = await orderService.getShippingOrders(); break;
          case "DELIVERED": response = await orderService.getDeliveredOrders(); break;
          case "CANCELLED": response = await orderService.getCancelledOrders(); break;
          case "CONFIRMED": response = await orderService.getConfirmedOrders(); break;
          case "all": default: response = await orderService.getAllOrders(); break;
        }
        setOrders(response.data?.data || response.data || []);
    } catch (err) {
        console.error(`Lỗi khi lấy danh sách đơn hàng (${status}) (Context):`, err);
        setError(err.response?.data?.message || err.message || "Không thể tải danh sách đơn hàng.");
        setOrders([]);
    } finally {
        setIsLoading(false);
    }
  };

  const cancelUserOrder = async (orderId) => {
    if (!isAuthenticated) {
        setError("Vui lòng đăng nhập để thực hiện thao tác này.");
        throw new Error("User not authenticated");
    }
    setIsLoading(true);
    setError(null);
    try {
        const response = await orderService.cancelOrder(orderId);
        if (currentOrder && currentOrder.id === orderId) {
            setCurrentOrder(prev => ({ ...prev, orderStatus: "CANCELLED" }));
        }
        return response.data;
    } catch (err) {
        console.error(`Lỗi khi hủy đơn hàng ${orderId} (Context):`, err);
        const errorMessage = err.response?.data?.message || err.message || "Không thể hủy đơn hàng.";
        setError(errorMessage);
        throw err;
    } finally {
        setIsLoading(false);
    }
  };

  const value = {
    orders,
    currentOrder,
    addresses,
    isLoading,
    error,
    fetchAddresses,
    createNewOrder,
    fetchOrderById,
    addNewAddress,
    fetchUserOrders,
    cancelUserOrder,
    clearOrderError: () => setError(null)
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};