import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import AccountSidebar from "../../components/features/user/AccountSidebar";
import { orderService } from "../../services/order.service";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await orderService.getOrderById(orderId);
        setOrder(response?.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  console.log('order :>> ', order);
  
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
  
  if (loading) {
    return (
      <div className="flex flex-col pt-3 bg-white min-h-screen">
        <main className="flex flex-col px-10 py-6 max-sm:px-5">
          <BreadcrumbNav />
          <div className="flex gap-10 mt-10 max-md:flex-col">
            <AccountSidebar />
            <div className="flex justify-center items-center py-20 flex-1">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3">Đang tải thông tin đơn hàng...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="flex flex-col pt-3 bg-white min-h-screen">
        <main className="flex flex-col px-10 py-6 max-sm:px-5">
          <BreadcrumbNav />
          <div className="flex gap-10 mt-10 max-md:flex-col">
            <AccountSidebar />
            <div className="flex flex-col items-center justify-center py-20 flex-1">
              <p className="text-lg text-red-600 mb-4">Không tìm thấy thông tin đơn hàng</p>
              <button 
                onClick={() => navigate('/account/orders')}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Quay lại danh sách đơn hàng
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Create order history timeline from available data
  const orderHistory = [];
  
  // Add order placed event
  if (order.orderDate) {
    orderHistory.push({
      status: "PENDING",
      description: "Đơn hàng đã được đặt",
      date: order.orderDate
    });
  }
  
  // Add payment completed event if payment is completed
  if (order.paymentStatus === "COMPLETED") {
    orderHistory.push({
      status: "CONFIRMED",
      description: "Thanh toán đã hoàn tất",
      date: order.orderDate // Using order date as payment date if not available
    });
  }
  
  // Add shipping event
  if (order.orderStatus === "SHIPPED" || order.orderStatus === "DELIVERED") {
    orderHistory.push({
      status: "SHIPPED",
      description: "Đơn hàng đang được vận chuyển",
      date: order.orderDate // Using a date between order and delivery
    });
  }
  
  // Add delivery event
  if (order.orderStatus === "DELIVERED" && order.deliveryDate) {
    orderHistory.push({
      status: "DELIVERED",
      description: "Đơn hàng đã được giao thành công",
      date: order.deliveryDate
    });
  }
  
  return (
    <div className="flex flex-col pt-3 bg-white min-h-screen">
      <main className="flex flex-col px-10 py-6 max-sm:px-5">
        <BreadcrumbNav />
        <div className="flex gap-10 mt-10 max-md:flex-col">
          <AccountSidebar />
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">Chi tiết đơn hàng #{order.id}</h1>
              <button 
                onClick={() => navigate('/account/orders')}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Quay lại danh sách
              </button>
            </div>
            
            {/* Order Status */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-lg font-medium mr-3">Trạng thái:</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                  {getStatusText(order.orderStatus)}
                </span>
              </div>
              
              {/* Order Timeline */}
              <div className="border-l-2 border-gray-200 ml-4">
                {orderHistory.map((event, index) => (
                  <div key={index} className="relative mb-6">
                    <div className={`absolute -left-2 mt-1.5 w-4 h-4 rounded-full ${event.status === order.orderStatus ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className="ml-6">
                      <p className="font-medium">{getStatusText(event.status)}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Sản phẩm trong đơn hàng</h2>
              
              <div className="border rounded-lg overflow-hidden">
                {order.orderItems.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex p-4 ${index < order.orderItems.length - 1 ? 'border-b' : ''}`}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.productTitle}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-lg">{item.productTitle}</h3>
                      <p className="text-sm text-gray-600 mb-2">Số lượng: {item.quantity}</p>
                      
                      {/* Display specifications if available */}
                      {item.size && (
                        <div className="mt-2">
                          <div className="flex">
                            <span className="text-sm text-gray-600 mr-2">Cấu hình:</span>
                            <span className="text-sm">{item.size}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="font-medium text-blue-600 text-lg">{formatCurrency(item.discountedPrice)}</p>
                      {item.price > item.discountedPrice && (
                        <p className="text-sm text-gray-500 line-through">{formatCurrency(item.price)}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Order summary */}
                <div className="bg-gray-50 p-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Tổng phụ:</p>
                    <p>{formatCurrency(order.originalPrice)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">Giảm giá:</p>
                    <p className="text-green-600">-{formatCurrency(order.discount)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">Phí vận chuyển:</p>
                    <p className="text-green-600">Miễn phí</p>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-lg font-medium">
                    <p>Tổng cộng:</p>
                    <p>{formatCurrency(order.totalDiscountedPrice)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Information */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-medium mb-3">Thông tin giao hàng</h2>
                <p className="mb-2"><strong>Người nhận:</strong> {order.shippingAddress.fullName}</p>
                <p className="mb-2"><strong>Địa chỉ:</strong> {order.shippingAddress.street}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.province}</p>
                <p className="mb-2"><strong>Số điện thoại:</strong> {order.shippingAddress.phoneNumber}</p>
                {order.shippingAddress.note && (
                  <p className="mb-2"><strong>Ghi chú:</strong> {order.shippingAddress.note}</p>
                )}
              </div>
              
              {/* Payment Information */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-medium mb-3">Thông tin thanh toán</h2>
                <p className="mb-2"><strong>Phương thức:</strong> {order.paymentMethod === "COD" ? "Thanh toán khi nhận hàng (COD)" : order.paymentMethod}</p>
                <p className="mb-2"><strong>Trạng thái:</strong> {order.paymentStatus === "COMPLETED" ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                <p><strong>Ngày đặt hàng:</strong> {new Date(order.orderDate).toLocaleString('vi-VN')}</p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-8 flex justify-end">
              {order.orderStatus === "DELIVERED" && (
                <button 
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-4"
                  // onClick={}
                >
                  Đánh giá sản phẩm
                </button>
              )}
              
              {["PENDING", "CONFIRMED"].includes(order.orderStatus) && (
                <button 
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => {
                    // Xử lý hủy đơn hàng
                    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
                      alert("Đã gửi yêu cầu hủy đơn hàng!");
                    }
                  }}
                >
                  Hủy đơn hàng
                </button>
              )}
              
              {order.orderStatus === "DELIVERED" && (
                <button 
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => navigate(`/information/contact-us?orderId=${order.id}`)}
                >
                  Khiếu nại sản phẩm
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;