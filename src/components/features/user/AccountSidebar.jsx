// src/components/features/user/AccountSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
// Xóa: import { useDispatch } from "react-redux";
// Xóa: import { logout } from "../../../State/Auth/Action";
import { useAuthContext } from "../../../contexts/AuthContext"; // THAY ĐỔI

const AccountSidebar = () => {
  const location = useLocation();
  // Xóa: const dispatch = useDispatch();
  const { logout: contextLogout } = useAuthContext(); // THAY ĐỔI

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      // Xóa: dispatch(logout());
      contextLogout(); // THAY ĐỔI: Gọi hàm logout từ AuthContext
    }
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="w-[326px] max-md:w-full">
      <div className="flex flex-col gap-4 p-5 bg-violet-50 rounded-lg shadow"> {/* Thêm rounded-lg và shadow */}
        <h2 className="text-base font-bold text-neutral-800">
          Thông tin tài khoản
        </h2>
        <Link
          to="/account"
          className={`block px-3 py-2 rounded-md text-base transition-colors duration-150 ${isActive('/account') && !location.pathname.includes('/my-order') ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-stone-600 hover:bg-gray-100 hover:text-gray-800'}`}
        >
          Thông tin cá nhân
        </Link>
        <Link
          to="/my-order"
          className={`block px-3 py-2 rounded-md text-base transition-colors duration-150 ${isActive('/my-order') ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-stone-600 hover:bg-gray-100 hover:text-gray-800'}`}
        >
          Quản lý đơn hàng
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-md text-base text-stone-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-150"
        >
          Đăng xuất
        </button>

        <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-5 text-white shadow-lg">
          <h3 className="font-bold text-lg mb-2">Trở thành người bán!</h3>
          <p className="text-sm mb-4 opacity-90">
            Mở rộng kinh doanh và tăng thu nhập của bạn cùng Tech Shop.
          </p>
          <button
            onClick={() => window.open('http://localhost:5174/register', '_blank')} // Mở link seller trong tab mới
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 py-2.5 px-4 rounded-md font-semibold text-sm transition-colors duration-300 shadow hover:shadow-md"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AccountSidebar;