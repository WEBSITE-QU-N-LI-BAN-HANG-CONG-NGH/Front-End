import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { orderService } from '../services/order.service'; // Đảm bảo đường dẫn đúng
import { useAuthContext } from './AuthContext'; // Để kiểm tra trạng thái đăng nhập và lấy token

// Tạo Context
const OrderContext = createContext(null);

// Tạo Provider Component
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // Danh sách đơn hàng của người dùng
  const [currentOrder, setCurrentOrder] = useState(null); // Đơn hàng đang được xem chi tiết hoặc vừa tạo
  const [addresses, setAddresses] = useState([]); // Danh sách địa chỉ của người dùng
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, jwt } = useAuthContext();

  // Fetch danh sách địa chỉ của người dùng
  const fetchAddresses = useCallback(async () => {
    if (!isAuthenticated) {
      setAddresses([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.getAddresses();
      setAddresses(response.data?.data || response.data || []); // API có thể trả về trong response.data hoặc response.data.data
    } catch (err) {
      console.error("Lỗi khi lấy danh sách địa chỉ (Context):", err);
      setError(err.response?.data?.message || err.message || "Không thể tải danh sách địa chỉ.");
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch địa chỉ khi người dùng đăng nhập/thay đổi
  useEffect(() => {
    if (isAuthenticated) {
      fetchAddresses();
    } else {
      setAddresses([]); // Xóa địa chỉ nếu không authenticated
    }
  }, [isAuthenticated, jwt, fetchAddresses]); // Thêm jwt làm dependency

  // Tạo đơn hàng mới
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
      setCurrentOrder(response.data); // Lưu đơn hàng vừa tạo
      // Gọi API gửi mail sau khi tạo đơn hàng thành công (nếu là COD)
      // Việc này có thể cần thêm logic kiểm tra phương thức thanh toán
      // Ví dụ, nếu response.data có paymentMethod === "COD"
      // if (response.data?.paymentMethod === "COD" && response.data?.id) {
      //   await orderService.sendOrderToEmail(response.data.id);
      // }
      return response.data; // Trả về dữ liệu đơn hàng
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

  // Lấy chi tiết một đơn hàng bằng ID
  const fetchOrderById = async (orderId) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.getOrderById(orderId);
      setCurrentOrder(response.data);
    } catch (err) {
      console.error(`Lỗi khi lấy chi tiết đơn hàng ${orderId} (Context):`, err);
      setError(err.response?.data?.message || err.message || "Không thể tải chi tiết đơn hàng.");
      setCurrentOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Thêm địa chỉ mới
  const addNewAddress = async (addressData) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thêm địa chỉ.");
      throw new Error("User not authenticated");
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderService.addAddress(addressData);
      // Sau khi thêm thành công, fetch lại danh sách địa chỉ
      // Hoặc có thể cập nhật state addresses trực tiếp nếu API trả về địa chỉ vừa thêm
      // setAddresses(prev => [...prev, response.data]);
      await fetchAddresses(); // Fetch lại để đảm bảo đồng bộ
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

  // Lấy tất cả đơn hàng của người dùng (hoặc các loại đơn hàng khác nhau)
  // Các hàm này có thể được gộp lại hoặc tách riêng tùy theo nhu cầu hiển thị
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
          case "PENDING":
            response = await orderService.getPendingOrders();
            break;
          case "SHIPPED":
            response = await orderService.getShippingOrders();
            break;
          case "DELIVERED":
            response = await orderService.getDeliveredOrders();
            break;
          case "CANCELLED":
            response = await orderService.getCancelledOrders();
            break;
          case "CONFIRMED":
            response = await orderService.getConfirmedOrders();
            break;
          case "all":
          default:
            response = await orderService.getAllOrders();
            break;
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

  // Hủy đơn hàng
  const cancelUserOrder = async (orderId) => {
    if (!isAuthenticated) {
        setError("Vui lòng đăng nhập để thực hiện thao tác này.");
        throw new Error("User not authenticated");
    }
    setIsLoading(true);
    setError(null);
    try {
        const response = await orderService.cancelOrder(orderId);
        // Sau khi hủy, cập nhật lại danh sách đơn hàng hoặc đơn hàng cụ thể
        // Ví dụ, nếu đang xem chi tiết đơn hàng đó:
        if (currentOrder && currentOrder.id === orderId) {
            setCurrentOrder(prev => ({ ...prev, orderStatus: "CANCELLED" })); // Cập nhật trạng thái tạm thời
        }
        // Hoặc fetch lại danh sách đơn hàng đang hiển thị
        // await fetchUserOrders(hiện tại_filter_status);
        // Tốt nhất là để component gọi lại fetchUserOrders
        return response.data; // Trả về message từ API
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

// Tạo Custom Hook
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};