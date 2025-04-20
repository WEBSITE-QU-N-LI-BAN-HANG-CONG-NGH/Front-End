import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD123456', customerName: 'Nguyễn Văn A', date: '20/04/2025', total: '52.990.000đ', status: 'Đang giao hàng' },
    { id: 'ORD123457', customerName: 'Trần Thị B', date: '19/04/2025', total: '22.990.000đ', status: 'Đã hoàn thành' },
    { id: 'ORD123458', customerName: 'Lê Văn C', date: '18/04/2025', total: '29.490.000đ', status: 'Chờ xác nhận' },
    { id: 'ORD123459', customerName: 'Phạm Thị D', date: '17/04/2025', total: '18.490.000đ', status: 'Đã hủy' },
    { id: 'ORD123460', customerName: 'Hoàng Văn E', date: '16/04/2025', total: '48.800.000đ', status: 'Đã hoàn thành' },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Tạo dữ liệu chi tiết đơn hàng giả định
  const getOrderDetails = (orderId) => {
    return {
      items: [
        { id: 1, productName: 'Laptop Acer Swift X14', price: '52.990.000đ', quantity: 1 },
        { id: 2, productName: 'Tai nghe không dây', price: '2.490.000đ', quantity: 1 },
      ],
      shipping: {
        address: '97 Man Thiện, Thủ Đức, TP. Hồ Chí Minh',
        phone: '0912345678',
        method: 'Giao hàng tiêu chuẩn'
      },
      payment: 'Thanh toán khi nhận hàng (COD)'
    };
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Quản lý đơn hàng</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-800' :
                    order.status === 'Đang giao hàng' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Chờ xác nhận' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => handleViewDetails(order)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal xem chi tiết đơn hàng */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Chi tiết đơn hàng #{selectedOrder.id}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ti ti-x text-xl"></i>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Trạng thái hiện tại:</span>
                <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                  selectedOrder.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-800' :
                  selectedOrder.status === 'Đang giao hàng' ? 'bg-blue-100 text-blue-800' :
                  selectedOrder.status === 'Chờ xác nhận' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedOrder.status}
                </span>
              </div>
              
              <div className="flex items-center mb-4">
                <span className="font-medium mr-2">Đổi trạng thái:</span>
                <select 
                  className="border rounded p-1"
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                >
                  <option value="Chờ xác nhận">Chờ xác nhận</option>
                  <option value="Đang giao hàng">Đang giao hàng</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-b py-4 mb-4">
              <h3 className="font-medium mb-2">Thông tin đơn hàng</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Khách hàng:</p>
                  <p>{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày đặt:</p>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng tiền:</p>
                  <p className="font-semibold">{selectedOrder.total}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Sản phẩm</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                    <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                    <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase">Đơn giá</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getOrderDetails(selectedOrder.id).items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3">{item.productName}</td>
                      <td className="py-3">{item.quantity}</td>
                      <td className="py-3">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-medium mb-2">Thông tin giao hàng</h3>
                <p className="text-sm">Địa chỉ: {getOrderDetails(selectedOrder.id).shipping.address}</p>
                <p className="text-sm">Số điện thoại: {getOrderDetails(selectedOrder.id).shipping.phone}</p>
                <p className="text-sm">Phương thức: {getOrderDetails(selectedOrder.id).shipping.method}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Thông tin thanh toán</h3>
                <p className="text-sm">Phương thức: {getOrderDetails(selectedOrder.id).payment}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => setShowDetailsModal(false)}
              >
                Đóng
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  // Xử lý in hóa đơn
                  alert("Tính năng in hóa đơn sẽ được triển khai sau");
                }}
              >
                In hóa đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;