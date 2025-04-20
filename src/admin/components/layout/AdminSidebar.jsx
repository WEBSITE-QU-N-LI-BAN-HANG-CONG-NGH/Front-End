import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin/dashboard', icon: 'ti ti-dashboard', label: 'Trang chủ' },
    { path: '/admin/products', icon: 'ti ti-box', label: 'Sản phẩm' },
    { path: '/admin/categories', icon: 'ti ti-tag', label: 'Danh mục' },
    { path: '/admin/orders', icon: 'ti ti-shopping-cart', label: 'Đơn hàng' },
    { path: '/admin/users', icon: 'ti ti-users', label: 'Người dùng' },
    { path: '/admin/reviews', icon: 'ti ti-star', label: 'Đánh giá' },
    { path: '/admin/settings', icon: 'ti ti-settings', label: 'Cài đặt' },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Tech Shop Admin</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              location.pathname === item.path ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <i className={`${item.icon} mr-3`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;