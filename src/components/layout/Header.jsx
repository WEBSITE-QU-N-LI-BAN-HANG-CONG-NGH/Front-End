import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthForms from '../../pages/Auth/AuthForm';
import { logout, getUser } from '../../State/Auth/Action';
import { Menu, MenuItem, Avatar, CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCart } from '../../State/Cart/Action';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const modalRef = useRef(null);
  
  // Lấy thông tin người dùng từ Redux store
  const auth = useSelector(store => store.auth);
  const { user, isLoading, jwt } = auth;
  const { cart } = useSelector(store => store.cart);
  
  // Kiểm tra đã đăng nhập chưa
  const isAuthenticated = !!jwt;

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch]);

  
  // Lấy thông tin giỏ hàng và người dùng khi component được tạo
  useEffect(() => {
    // Nếu có JWT token nhưng chưa có thông tin user, gọi API để lấy thông tin
    if (jwt && !user) {
      console.log("Có JWT nhưng chưa có thông tin người dùng, đang lấy thông tin...");
      dispatch(getUser());
    }
  }, [dispatch, jwt, user]);
  
  const handleButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowLoginForm(false);
    }
  };
  
  const handleClose = () => {
    setShowLoginForm(false);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };
  
  // Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Đang đăng xuất...");
    dispatch(logout());
    handleUserMenuClose();
  };
  
  // Xử lý menu người dùng
  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleProfileClick = () => {
    navigate('/account');
    handleUserMenuClose();
  };

  useEffect(() => {
    if (showLoginForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginForm]);
  
  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalItems = cart?.totalItems || 0;
  
  // Format tên hiển thị của người dùng
  const getDisplayName = () => {
    if (!user) return '';
    
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.firstName) {
      return user.firstName;
    } else if (user.lastName) {
      return user.lastName;
    } else if (user.email) {
      // Nếu không có tên, hiển thị email nhưng che bớt
      const emailParts = user.email.split('@');
      if (emailParts.length === 2) {
        return emailParts[0].length > 3 
          ? `${emailParts[0].substring(0, 3)}...@${emailParts[1]}`
          : user.email;
      }
      return user.email;
    }
    
    return 'Người dùng';
  };
  
  // Xác định có hiển thị avatar hay không
  const renderUserDisplay = () => {
    if (isLoading) {
      return <CircularProgress size={24} color="primary" />;
    }
    
    if (isAuthenticated && user) {
      return (
        <div className="flex items-center">
          <button
            onClick={handleUserMenuOpen}
            className="flex items-center space-x-2 focus:outline-none px-3 py-1 rounded-full hover:bg-blue-50 transition duration-300"
          >
            {user?.imageUrl ? (
              <Avatar 
                src={user?.imageUrl} 
                alt={getDisplayName()} 
                className="w-8 h-8"
              />
            ) : (
              <AccountCircleIcon className="w-8 h-8 text-blue-600" />
            )}
            <span className="text-sm hidden md:inline ml-2 text-blue-600 font-medium">{getDisplayName()}</span>
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                mt: 1.5,
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>Thông tin cá nhân</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </div>
      );
    } else {
      return (
        <button
          className="py-2 px-6 text-blue-600 cursor-pointer border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
          onClick={handleButtonClick}
        >
          Đăng nhập
        </button>
      );
    }
  };

  return (
    <>
      <div className="flex flex-col self-center max-w-full font-semibold text-center w-full">
        <div className="flex flex-wrap gap-5 justify-center items-center mt-8 w-full text-sm text-black max-md:mr-2 max-md:max-w-full">
          <img
            src="/ShopIcon.png"
            className="object-contain aspect-square w-[65px]"
            alt="Tech Shop"
          />
          <>
            <Link
              to="/"
              className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              Trang chủ
            </Link>
            <Link
              to="/laptop"
              className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              Laptop
            </Link>
            <Link
              to="/desktop-computers"
              className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              Máy tính bàn
            </Link>
            <Link
              to="/accessories"
              className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              Phụ kiện
            </Link>
            <Link
              to="/phone"
              className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              Điện thoại
            </Link>
            <Link
              to="/computer-parts"
              className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              Linh kiện máy tính
            </Link>
            <Link
              to="/other-products"
              className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              Sản phẩm khác
            </Link>
            <Link
              to="/our-deals"
              className="gap-2.5 self-stretch my-auto px-7 py-2 text-blue-600 border-2 border-solid border-[color:var(--Color---3,#0156FF)] rounded-[50px] max-md:px-5 hover:bg-blue-600 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Our Deals
            </Link>
          </>

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

          <div
            className="relative inline-block cursor-pointer"
            aria-label="Shopping Cart"
            onClick={handleCartClick}
          >
            <img
              src="/CartIcon.png"
              className="object-contain shrink-0 self-start aspect-[1.18] w-[33px]"
              alt="Cart Icon"
            />
            <span
              className="absolute bottom-3 left-3 text-white bg-blue-600 rounded-full text-xs px-1.5 py-0.5"
            >
              {totalItems}
            </span>
          </div>

          <div>
            {renderUserDisplay()}
            {showLoginForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
                <div
                  ref={modalRef}
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-20 rounded-lg shadow-lg"
                >
                  <AuthForms handleClose={handleClose} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <img
        src="/Bar.svg"
        className="object-contain mt-5 w-full aspect-[1000] stroke-[1px] stroke-gray-300 max-md:max-w-full"
      />
    </>
  );
};

export default Header;