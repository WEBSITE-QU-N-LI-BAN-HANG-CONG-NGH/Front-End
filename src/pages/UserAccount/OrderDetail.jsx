import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import AccountSidebar from "../../components/features/user/AccountSidebar";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API để lấy chi tiết đơn hàng theo orderId
    // Đây chỉ là dữ liệu mẫu để demo
    
    // Giả lập API call
    setTimeout(() => {
      // Giả sử chúng ta có một đơn hàng mẫu
      const sampleOrder = {
        id: orderId || "ORD123456",
        date: "2023-04-15",
        totalAmount: 52990000,
        status: "delivered", // Đã giao hàng
        items: [
          {
            id: "ITEM001",
            name: "Laptop Acer Swift X14 SFX14 72G 79UW",
            quantity: 1,
            price: 52990000,
            originalPrice: 55990000,
            image: "/Placeholder1.png",
            specifications: [
              { name: "CPU", value: "Intel Core i7-12700H" },
              { name: "RAM", value: "32GB LPDDR5" },
              { name: "Ổ cứng", value: "1TB PCIe NVMe SSD" },
              { name: "Card đồ họa", value: "NVIDIA GeForce RTX 4050 6GB" },
              { name: "Màn hình", value: '14.5" 2.8K OLED 120Hz' }
            ]
          }
        ],
        history: [
          { date: "2023-04-15 08:30:00", status: "ordered", description: "Đơn hàng đã được đặt" },
          { date: "2023-04-15 09:15:00", status: "confirmed", description: "Đơn hàng đã được xác nhận" },
          { date: "2023-04-16 10:00:00", status: "processing", description: "Đơn hàng đang được xử lý" },
          { date: "2023-04-17 14:30:00", status: "shipping", description: "Đơn hàng đang được vận chuyển" },
          { date: "2023-04-18 16:45:00", status: "delivered", description: "Đơn hàng đã được giao" }
        ],
        shippingInfo: {
          fullName: "Nguyễn Văn A",
          address: "97 Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh",
          phone: "0912345678",
          email: "example@gmail.com"
        },
        paymentInfo: {
          method: "COD",
          status: "Đã thanh toán",
          date: "2023-04-18 16:45:00"
        }
      };
      
      setOrder(sampleOrder);
      setLoading(false);
    }, 1000);
  }, [orderId]);
  
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
      case "delivered":
        return "Đã giao hàng";
      case "shipping":
        return "Đang vận chuyển";
      case "processing":
        return "Đang xử lý";
      case "confirmed":
        return "Đã xác nhận";
      case "ordered":
        return "Đã đặt hàng";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };
  
  // Lấy màu sắc tương ứng với trạng thái
  const getStatusColor = (status) => {
    switch(status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipping":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-purple-100 text-purple-800";
      case "ordered":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
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
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              
              {/* Order Timeline */}
              <div className="border-l-2 border-gray-200 ml-4">
                {order.history.map((event, index) => (
                  <div key={index} className="relative mb-6">
                    <div className={`absolute -left-2 mt-1.5 w-4 h-4 rounded-full ${event.status === order.status ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className="ml-6">
                      <p className="font-medium">{getStatusText(event.status)}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-xs text-gray-500">{new Date(event.date).toLocaleString('vi-VN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Sản phẩm trong đơn hàng</h2>
              
              <div className="border rounded-lg overflow-hidden">
                {order.items.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex p-4 ${index < order.items.length - 1 ? 'border-b' : ''}`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-contain"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">Số lượng: {item.quantity}</p>
                      
                      {/* Display specifications if available */}
                      {item.specifications && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {item.specifications.map((spec, idx) => (
                            <div key={idx} className="flex">
                              <span className="text-sm text-gray-600 mr-2">{spec.name}:</span>
                              <span className="text-sm">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="font-medium text-blue-600 text-lg">{formatCurrency(item.price)}</p>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <p className="text-sm text-gray-500 line-through">{formatCurrency(item.originalPrice)}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Order summary */}
                <div className="bg-gray-50 p-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Tổng phụ:</p>
                    <p>{formatCurrency(order.totalAmount)}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">Phí vận chuyển:</p>
                    <p className="text-green-600">Miễn phí</p>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-lg font-medium">
                    <p>Tổng cộng:</p>
                    <p>{formatCurrency(order.totalAmount)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Information */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-medium mb-3">Thông tin giao hàng</h2>
                <p className="mb-2"><strong>Người nhận:</strong> {order.shippingInfo.fullName}</p>
                <p className="mb-2"><strong>Địa chỉ:</strong> {order.shippingInfo.address}</p>
                <p className="mb-2"><strong>Số điện thoại:</strong> {order.shippingInfo.phone}</p>
                <p><strong>Email:</strong> {order.shippingInfo.email}</p>
              </div>
              
              {/* Payment Information */}
              <div className="border rounded-lg p-4">
                <h2 className="text-lg font-medium mb-3">Thông tin thanh toán</h2>
                <p className="mb-2"><strong>Phương thức:</strong> {order.paymentInfo.method}</p>
                <p className="mb-2"><strong>Trạng thái:</strong> {order.paymentInfo.status}</p>
                <p><strong>Ngày thanh toán:</strong> {new Date(order.paymentInfo.date).toLocaleString('vi-VN')}</p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-8 flex justify-end">
              {order.status === "delivered" && (
                <button 
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-4"
                  onClick={() => navigate(`/review?orderId=${order.id}`)}
                >
                  Đánh giá sản phẩm
                </button>
              )}
              
              {["ordered", "confirmed"].includes(order.status) && (
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
              
              {order.status === "delivered" && (
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