import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HeaderAuth = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <div className="flex flex-col self-center max-w-full font-semibold text-center w-[1400px]">
        <div className="flex flex-wrap gap-9 justify-center items-center mt-8 w-full text-sm text-black max-md:mr-2 max-md:max-w-full">
          <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">
            <Link to="/catalog?category=laptops">Laptops</Link>
          </div>
          <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">
            <Link to="/catalog?category=desktops">Máy tính bàn</Link>
          </div>
          <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">
            <Link to="/catalog?category=accessories">Phụ kiện</Link>
          </div>
          <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">
            <Link to="/catalog?category=phones">Điện thoại</Link>
          </div>
          <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">
            <Link to="/catalog?category=components">Linh kiện máy tính</Link>
          </div>
          <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">
            <Link to="/catalog?category=others">Sản phẩm khác</Link>
          </div>
          <div className="gap-2.5 self-stretch px-7 py-2 text-blue-600 border-2 border-solid border-[color:var(--Color---3,#0156FF)] rounded-[50px] max-md:px-5 hover:bg-blue-600 hover:text-white transition-colors duration-300">
            <Link to="/catalog?sale=true">Our Deals</Link>
          </div>

          <div className="flex items-center border-2 border-solid border-[color:var(--Color---7,#000)] h-[37px] rounded-[50px] w-[250px] ml-4">
            <button className="flex items-center justify-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                />
              </svg>
            </button>
            <input
              type="text"
              className="flex-grow py-2 pl-2 pr-3 border-none rounded-[50px] focus:outline-none h-full"
              placeholder="Search"
            />
          </div>

          <Link
            to="/cart"
            className="relative inline-block"
            aria-label="Shopping Cart"
          >
            <img
              src="/CartIcon.png"
              className="object-contain shrink-0 self-start aspect-[1.18] w-[33px]"
              alt="Cart Icon"
            />
            <span
              className="absolute bottom-3 left-3 text-white bg-blue-600 rounded-full text-xs px-1.5 py-0.5"
            >
              0
            </span>
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 py-0.5 px-3 text-blue-600 border-2 border-solid border-blue-600 rounded-[50px] hover:bg-blue-600 hover:text-white transition-colors"
              >
                <span className="truncate max-w-[100px]">
                  {currentUser.firstName || 'Tài khoản'}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tài khoản của tôi
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đơn hàng
                    </Link>
                    {(currentUser.roles?.includes('ADMIN') || currentUser.roles?.includes('SELLER')) && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Quản trị
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link 
                to="/login"
                className="gap-2.5 self-stretch py-0.5 px-4 my-auto text-blue-600 border-2 border-solid border-blue-600 min-h-[25px] rounded-[50px] hover:bg-blue-600 hover:text-white transition-colors"
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register"
                className="gap-2.5 self-stretch py-0.5 px-4 my-auto text-white bg-blue-600 border-2 border-solid border-blue-600 min-h-[25px] rounded-[50px] hover:bg-blue-700 transition-colors"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
      <img
        src="/Bar.svg"
        className="object-contain mt-5 w-full aspect-[1000] stroke-[1px] stroke-gray-300 max-md:max-w-full"
      />
    </>
  );
};

export default HeaderAuth;