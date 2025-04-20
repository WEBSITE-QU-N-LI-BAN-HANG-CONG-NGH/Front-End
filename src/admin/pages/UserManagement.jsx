import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0912345678', dateJoined: '01/01/2025', status: 'Hoạt động' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', phone: '0923456789', dateJoined: '15/01/2025', status: 'Hoạt động' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', phone: '0934567890', dateJoined: '02/02/2025', status: 'Khóa' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', phone: '0945678901', dateJoined: '20/02/2025', status: 'Hoạt động' },
    { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com', phone: '0956789012', dateJoined: '10/03/2025', status: 'Hoạt động' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Quản lý người dùng</h1>
      
      <div className="mb-6 flex justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
            className="pl-10 pr-4 py-2 border rounded-lg w-80"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ti ti-search text-gray-500"></i>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tham gia
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
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.dateJoined}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => handleViewDetails(user)}
                  >
                    Chi tiết
                  </button>
                  <button 
                    className={`${user.status === 'Hoạt động' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    onClick={() => handleStatusChange(user.id, user.status === 'Hoạt động' ? 'Khóa' : 'Hoạt động')}
                  >
                    {user.status === 'Hoạt động' ? 'Khóa' : 'Mở khóa'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết người dùng */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Chi tiết người dùng</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ti ti-x text-xl"></i>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-gray-600">{selectedUser.name.charAt(0)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tên:</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email:</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại:</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ngày tham gia:</p>
                  <p className="font-medium">{selectedUser.dateJoined}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trạng thái:</p>
                  <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                    selectedUser.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đơn hàng:</p>
                  <p className="font-medium">5 đơn hàng</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                className={`py-2 px-4 rounded font-medium ${
                  selectedUser.status === 'Hoạt động' 
                    ? 'bg-red-500 hover:bg-red-700 text-white' 
                    : 'bg-green-500 hover:bg-green-700 text-white'
                }`}
                onClick={() => {
                  handleStatusChange(selectedUser.id, selectedUser.status === 'Hoạt động' ? 'Khóa' : 'Hoạt động');
                  setShowDetailsModal(false);
                }}
              >
                {selectedUser.status === 'Hoạt động' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
                onClick={() => setShowDetailsModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;