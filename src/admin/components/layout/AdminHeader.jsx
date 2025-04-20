import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Xử lý đăng xuất và chuyển hướng về trang đăng nhập admin
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <header className="bg-white h-16 px-6 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        <h2 className="text-lg font-medium">Quản trị hệ thống</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <i className="ti ti-bell text-xl"></i>
          </button>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <div className="flex items-center">
          <img src="/admin-avatar.png" alt="Admin Avatar" className="w-8 h-8 rounded-full mr-2" />
          <div className="text-sm">
            <p className="font-medium">Admin</p>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;