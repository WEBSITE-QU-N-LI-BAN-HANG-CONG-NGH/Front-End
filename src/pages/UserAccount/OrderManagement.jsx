import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { orderService } from "../../services/order.service";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const auth = useSelector((state) => state.auth);
  
  // Fetch orders based on selected status
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        let response;
        
        switch (selectedStatus) {
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
        
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [selectedStatus]);
  
  // Format tiền theo định dạng Việt Nam
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  // Ánh xạ trạng thái đơn hàng sang tiếng Việt
  const getStatusText = (status) => {
    switch(status) {
      case "DELIVERED":
        return "Đã giao hàng";
      case "SHIPPED":
        return "Đang vận chuyển";
      case "PENDING":
        return "Đang xử lý";
      case "CONFIRMED":
        return "Đã xác nhận";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };
  
  // Lấy màu sắc tương ứng với trạng thái
  const getStatusColor = (status) => {
    switch(status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-purple-100 text-purple-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Xử lý xem chi tiết đơn hàng
  const handleViewOrderDetails = (orderId) => {
    navigate(`/account/orders/${orderId}`);
  };
  
  return (
    <div className="flex-1">
      <h1 className="mb-6 text-3xl font-bold text-black">Đơn hàng của tôi</h1>
      
      {/* Filter tabs */}
      <div className="flex mb-6 border-b">
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('all')}
        >
          Tất cả
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'CONFIRMED' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('CONFIRMED')}
        >
          Đã xác nhận
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'PENDING' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('PENDING')}
        >
          Đang xử lý
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'SHIPPED' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('SHIPPED')}
        >
          Đang vận chuyển
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'DELIVERED' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('DELIVERED')}
        >
          Đã giao hàng
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'CANCELLED' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('CANCELLED')}
        >
          Đã hủy
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-3">Đang tải đơn hàng...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-gray-600 mb-4">Không có đơn hàng nào</p>
          <button 
            onClick={() => navigate('/product/all')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div 
              key={order.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Order header */}
              <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                <div>
                  <h3 className="font-medium">Mã đơn hàng: {order.id}</h3>
                  
                  <p className="mb-2"><strong>Ngày đặt hàng:</strong> {order?.orderDate ? new Date(order.orderDate).toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  }) : "Đang cập nhật..."}</p>
                  
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                    {getStatusText(order.orderStatus)}
                  </span>
                </div>
              </div>
              
              {/* Order items */}
              <div className="p-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center py-3">
                    <img 
                      src={item.imageUrl} 
                      alt={item.productTitle}
                      className="w-20 h-20 object-contain"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{item.productTitle}</h4>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      <p className="font-medium text-blue-600">{formatCurrency(item.discountedPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order footer */}
              <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                <div>
                  <p className="text-sm text-gray-600">Phương thức thanh toán: {order.paymentMethod}</p>

                  <p className="text-sm text-gray-600"><strong>Địa chỉ giao hàng:</strong> {`${order?.shippingAddress?.street}, ${order?.shippingAddress?.ward}, ${order?.shippingAddress?.district}, ${order?.shippingAddress?.province}` }</p>

                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Tổng tiền: {formatCurrency(order.totalDiscountedPrice)}</p>
                  <button 
                    onClick={() => handleViewOrderDetails(order.id)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;