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

  const createNewOrder = async (addressId) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để đặt hàng.");
      throw new Error("User not authenticated");
    }
    if (!addressId) {
        setError("Vui lòng chọn địa chỉ giao hàng hợp lệ.");
        throw new Error("Address ID is required");
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.createOrder(addressId);
      console.log("[OrderContext] Phản hồi từ orderService.createOrder:", response);
      
      let newOrderData = response.data?.data || response.data;
      console.log("[OrderContext] Dữ liệu đơn hàng được trích xuất (newOrderData):", newOrderData); 
      
      if (!newOrderData || typeof newOrderData !== 'object') {
           console.error("[OrderContext] Dữ liệu đơn hàng không phải là object:", newOrderData);
           throw new Error("Dữ liệu đơn hàng trả về không hợp lệ.");
      }

      // Cố gắng tìm ID đơn hàng với các tên phổ biến
      // *** QUAN TRỌNG: Điều chỉnh các tên trường này (id, orderId, order_id) 
      // *** cho phù hợp với response thực tế từ backend của bạn
      const orderIdValue = newOrderData.id || newOrderData.orderId || newOrderData.order_id;

      if (!orderIdValue) {
           console.error("[OrderContext] ID đơn hàng không tìm thấy trong newOrderData. Các trường đã kiểm tra: id, orderId, order_id. Dữ liệu:", newOrderData);
           throw new Error("ID đơn hàng không tồn tại trong dữ liệu trả về.");
      }
      
      // Đảm bảo newOrderData.id luôn tồn tại để các component khác sử dụng thống nhất
      if (!newOrderData.id) {
        newOrderData.id = orderIdValue;
      }

      setCurrentOrder(newOrderData);
      return newOrderData;
    } catch (err) {
      console.error("Lỗi khi tạo đơn hàng (OrderContext):", err);
      const errorMessage = err.message || err.response?.data?.message || err.response?.data?.error || "Không thể tạo đơn hàng.";
      setError(errorMessage);
      setCurrentOrder(null);
      throw new Error(errorMessage);
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
      const orderData = response.data?.data || response.data;
      // Cũng chuẩn hóa ID ở đây nếu cần
      if (orderData && typeof orderData === 'object' && !orderData.id && (orderData.orderId || orderData.order_id)) {
        orderData.id = orderData.orderId || orderData.order_id;
      }
      setCurrentOrder(orderData);
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
        const fetchedOrders = response.data?.data || response.data || [];
        // Chuẩn hóa ID cho từng đơn hàng trong danh sách nếu cần
        const normalizedOrders = fetchedOrders.map(order => {
            if (order && typeof order === 'object' && !order.id && (order.orderId || order.order_id)) {
                return { ...order, id: order.orderId || order.order_id };
            }
            return order;
        });
        setOrders(normalizedOrders);
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
        // Cập nhật currentOrder nếu nó là đơn hàng vừa hủy
        if (currentOrder && (currentOrder.id === orderId || currentOrder.orderId === orderId || currentOrder.order_id === orderId)) {
             const actualId = currentOrder.id || currentOrder.orderId || currentOrder.order_id;
             if (actualId.toString() === orderId.toString()) {
                setCurrentOrder(prev => ({ ...prev, orderStatus: "CANCELLED", id: actualId }));
             }
        }
        // Fetch lại danh sách đơn hàng để cập nhật UI
        await fetchUserOrders(); // Hoặc trạng thái cụ thể nếu bạn muốn
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