// src/pages/Auth/AuthModal.jsx
import { Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';
import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import React, { useState } from 'react';
import ForgotPasswordContent from './ForgotPasswordContent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  maxWidth: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
  borderRadius: '8px',
  outline: 'none'
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const isSignUp = location.pathname === '/sign-up';
  // State để quản lý việc hiển thị form quên mật khẩu
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Hàm để chuyển đổi giữa form đăng nhập và form quên mật khẩu
  const handleToggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  // Hàm để quay lại form đăng nhập từ form quên mật khẩu
  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  const handleModalClick = (e) => {
    // Ngăn sự kiện click từ việc lan tỏa
    e.stopPropagation();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
      disableBackdropClick
    >
      <Box sx={style} onClick={handleModalClick}>
        {showForgotPassword ? (
          // Hiển thị form quên mật khẩu
          <ForgotPasswordContent onBackToLogin={handleBackToLogin} />
        ) : (
          // Hiển thị form đăng nhập hoặc đăng ký
          isSignUp ? (
            <RegisterForm handleClose={handleClose} />
          ) : (
            <LoginForm 
              handleClose={handleClose} 
              onForgotPasswordClick={handleToggleForgotPassword} 
            />
          )
        )}
      </Box>
    </Modal>
  );
}