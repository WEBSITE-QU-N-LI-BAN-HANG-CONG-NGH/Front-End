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
      
      console.log("[OrderContext] RAW API Response for Create Order:", response);
      const responseBody = response.data; // Đây là đối tượng JSON từ console log của bạn
      console.log("[OrderContext] API Response Body for Create Order (response.data):", JSON.stringify(responseBody, null, 2));

      let actualOrderObject = null;

      // Logic mới dựa trên cấu trúc bạn cung cấp
      if (responseBody && Array.isArray(responseBody.orders) && responseBody.orders.length > 0) {
        actualOrderObject = responseBody.orders[0]; // Lấy đơn hàng đầu tiên trong mảng "orders"
        console.log("[OrderContext] Extracted order object from responseBody.orders[0]:", JSON.stringify(actualOrderObject, null, 2));
      } else {
        // Nếu cấu trúc không như mong đợi (ví dụ, backend thay đổi response)
        const errorMsg = `Cấu trúc phản hồi API tạo đơn hàng không đúng. Mảng "orders" không tìm thấy hoặc rỗng. Dữ liệu nhận được: ${JSON.stringify(responseBody, null, 2)}`;
        console.error("[OrderContext]", errorMsg);
        throw new Error(errorMsg);
      }
      
      if (!actualOrderObject || typeof actualOrderObject !== 'object') {
           const errorMsg = `Đối tượng đơn hàng (actualOrderObject) không hợp lệ sau khi trích xuất. Giá trị: ${JSON.stringify(actualOrderObject)}`;
           console.error("[OrderContext]", errorMsg);
           throw new Error(errorMsg);
      }

      // Lấy ID từ actualOrderObject
      const orderIdValue = actualOrderObject.id || actualOrderObject.orderId || actualOrderObject.order_id;

      if (!orderIdValue) {
           const errorMessage = `ID đơn hàng không tồn tại trong đối tượng đơn hàng đã trích xuất. Các trường đã kiểm tra: id, orderId, order_id. Đối tượng đơn hàng: ${JSON.stringify(actualOrderObject, null, 2)}`;
           console.error("[OrderContext]", errorMessage);
           throw new Error(errorMessage);
      }
      
      // Đảm bảo đối tượng trả về có thuộc tính 'id' là ID chính
      actualOrderObject.id = orderIdValue; 

      setCurrentOrder(actualOrderObject);
      console.log("[OrderContext] Order created and context updated successfully:", actualOrderObject);
      return actualOrderObject; // Trả về đối tượng đơn hàng đã có ID
    } catch (err) {
      console.error("[OrderContext] Error in createNewOrder function:", err);
      const errorMessage = err.message || err.response?.data?.message || err.response?.data?.error || "Không thể tạo đơn hàng do lỗi không xác định.";
      setError(errorMessage);
      setCurrentOrder(null);
      throw err; 
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderById = async (orderId) => {
    if (!isAuthenticated || !orderId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.getOrderById(orderId);
      const responseBody = response.data;
      console.log(`[OrderContext] Raw API Response for Get Order By ID ${orderId}:`, JSON.stringify(responseBody, null, 2));

      let orderData = null;

      // Giả sử API getOrderById có thể trả về đơn hàng trực tiếp hoặc lồng trong 'data'
      // hoặc có cấu trúc tương tự như createOrder (có mảng 'orders')
      if (responseBody && Array.isArray(responseBody.orders) && responseBody.orders.length > 0) {
          orderData = responseBody.orders[0]; // Nếu nó trả về mảng orders
      } else if (responseBody && typeof responseBody.data === 'object' && responseBody.data !== null && responseBody.data.id) {
          orderData = responseBody.data; // Nếu nó nằm trong responseBody.data
      } else if (responseBody && typeof responseBody === 'object' && responseBody !== null && responseBody.id) {
          orderData = responseBody; // Nếu nó là đối tượng gốc
      } else {
          throw new Error(`Cấu trúc dữ liệu chi tiết đơn hàng ${orderId} không hợp lệ hoặc không tìm thấy đơn hàng.`);
      }
      
      console.log(`[OrderContext] Extracted orderData for Get Order By ID ${orderId}:`, JSON.stringify(orderData, null, 2));

      if (!orderData || typeof orderData !== 'object') {
        throw new Error(`Dữ liệu chi tiết đơn hàng ${orderId} nhận được không phải là object.`);
      }

      const idValue = orderData.id || orderData.orderId || orderData.order_id;
      if (!idValue) {
        console.warn(`[OrderContext] Order ID missing in getOrderById response for order ${orderId}. Data:`, JSON.stringify(orderData, null, 2));
        // throw new Error(`Không tìm thấy ID trong dữ liệu chi tiết đơn hàng ${orderId}`);
      } else {
        orderData.id = idValue;
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
        
        if (currentOrder && (currentOrder.id === orderId || currentOrder.orderId === orderId || currentOrder.order_id === orderId)) {
             const actualId = currentOrder.id || currentOrder.orderId || currentOrder.order_id;
             if (actualId.toString() === orderId.toString()) {
                setCurrentOrder(prev => ({ ...prev, orderStatus: "CANCELLED", id: actualId }));
             }
        }
        
        await fetchUserOrders(); 
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