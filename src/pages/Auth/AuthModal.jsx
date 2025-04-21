// src/pages/Auth/AuthModal.jsx
import { Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm'; // ** Đảm bảo import đúng file này **
import { useLocation, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import LoginForm from './LoginForm';       // ** Đảm bảo import đúng file này **
import React, { useState } from 'react';
import ForgotPassword from './ForgotPassword';

// ... style

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const navigate = useNavigate(); // Thêm hook navigate

  // Xác định xem nên hiển thị form nào dựa trên URL hiện tại
  // Hoặc bạn có thể truyền prop `initialView` vào modal
  const isSignUpView = location.pathname.includes('/sign-up');

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleToggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    // Nếu đang ở /sign-up mà quay lại từ forgot password, chuyển về login view
    if (isSignUpView) {
        navigate('/login'); // Hoặc path đăng nhập của bạn
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Hàm để chuyển đổi giữa Login và Register view ngay trong modal
  // Bạn có thể gọi hàm này từ nút "Đăng ký ngay" / "Đăng nhập" trong các form con
  const toggleAuthView = () => {
      if (isSignUpView) {
          navigate('/login'); // Chuyển URL sang login
      } else {
          navigate('/sign-up'); // Chuyển URL sang sign-up
      }
      // Không cần state nội bộ để quản lý showLoginForm/showRegisterForm nữa
      // vì ta dựa vào URL
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
      // disableBackdropClick // Có thể cho phép đóng khi click ra ngoài
    >
      <Box sx={style} onClick={handleModalClick}>
        {showForgotPassword ? (
          <ForgotPassword onBackToLogin={handleBackToLogin} />
        ) : (
          // Hiển thị form dựa trên URL
          isSignUpView ? (
            <RegisterForm
                handleClose={handleClose}
                // Có thể truyền toggleAuthView nếu cần nút "Đăng nhập" trong RegisterForm
                // onSwitchToLogin={toggleAuthView}
            />
          ) : (
            <LoginForm
              handleClose={handleClose}
              onForgotPasswordClick={handleToggleForgotPassword}
              // Có thể truyền toggleAuthView nếu cần nút "Đăng ký ngay" trong LoginForm
              // onSwitchToRegister={toggleAuthView}
            />
          )
        )}
      </Box>
    </Modal>
  );
}

AuthModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};