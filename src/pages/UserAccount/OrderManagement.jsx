import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import AccountSidebar from "../../components/features/user/AccountSidebar";

const OrderManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  
  // Tạo dữ liệu mẫu cho đơn hàng
  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API để lấy danh sách đơn hàng
    // Đây chỉ là dữ liệu mẫu để demo
    const sampleOrders = [
      {
        id: "ORD123456",
        date: "2023-04-15",
        totalAmount: 52990000,
        status: "delivered", // Đã giao hàng
        items: [
          {
            name: "Laptop Acer Swift X14 SFX14 72G 79UW",
            quantity: 1,
            price: 52990000,
            image: "/Placeholder1.png"
          }
        ],
        address: "97 Man Thiện, Thủ Đức, TP. Hồ Chí Minh",
        paymentMethod: "COD"
      },
      {
        id: "ORD789012",
        date: "2023-04-10",
        totalAmount: 23490000,
        status: "shipping", // Đang vận chuyển
        items: [
          {
            name: "Card màn hình MSI RTX 3060",
            quantity: 1,
            price: 23490000,
            image: "/Placeholder2.png"
          }
        ],
        address: "97 Man Thiện, Thủ Đức, TP. Hồ Chí Minh",
        paymentMethod: "Banking"
      },
      {
        id: "ORD345678",
        date: "2023-04-05",
        totalAmount: 15990000,
        status: "processing", // Đang xử lý
        items: [
          {
            name: "Màn hình LG UltraGear 27\"",
            quantity: 1,
            price: 15990000,
            image: "/Placeholder2.png"
          }
        ],
        address: "97 Man Thiện, Thủ Đức, TP. Hồ Chí Minh",
        paymentMethod: "VNPAY"
      },
      {
        id: "ORD901234",
        date: "2023-03-28",
        totalAmount: 2990000,
        status: "cancelled", // Đã hủy
        items: [
          {
            name: "Chuột Logitech G Pro X Superlight",
            quantity: 1,
            price: 2990000,
            image: "/Placeholder2.png"
          }
        ],
        address: "97 Man Thiện, Thủ Đức, TP. Hồ Chí Minh",
        paymentMethod: "COD"
      },
      {
        id: "ORD567890",
        date: "2023-04-18",
        totalAmount: 48800000,
        status: "confirmed", // Đã xác nhận
        items: [
          {
            name: "MacBook Pro 14 M2 Pro",
            quantity: 1,
            price: 48800000,
            image: "/Placeholder1.png"
          }
        ],
        address: "97 Man Thiện, Thủ Đức, TP. Hồ Chí Minh",
        paymentMethod: "Banking"
      }
    ];
    
    // Giả lập API call
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Lọc đơn hàng theo trạng thái
  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);
  
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
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Xử lý xem chi tiết đơn hàng
  const handleViewOrderDetails = (orderId) => {
    // Trong thực tế, bạn sẽ điều hướng đến trang chi tiết đơn hàng
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
          className={`px-4 py-2 font-medium ${selectedStatus === 'confirmed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('confirmed')}
        >
          Đã xác nhận
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'processing' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('processing')}
        >
          Đang xử lý
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'shipping' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('shipping')}
        >
          Đang vận chuyển
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'delivered' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('delivered')}
        >
          Đã giao hàng
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedStatus === 'cancelled' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setSelectedStatus('cancelled')}
        >
          Đã hủy
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-3">Đang tải đơn hàng...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-lg text-gray-600 mb-4">Không có đơn hàng nào</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div 
              key={order.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Order header */}
              <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                <div>
                  <h3 className="font-medium">Đơn hàng: {order.id}</h3>
                  <p className="text-sm text-gray-600">Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
              
              {/* Order items */}
              <div className="p-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center py-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-contain"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      <p className="font-medium text-blue-600">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order footer */}
              <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                <div>
                  <p className="text-sm text-gray-600">Phương thức thanh toán: {order.paymentMethod}</p>
                  <p className="text-sm text-gray-600">Địa chỉ: {order.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Tổng tiền: {formatCurrency(order.totalAmount)}</p>
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