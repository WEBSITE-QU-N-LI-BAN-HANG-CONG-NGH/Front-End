import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// Tạo context
const AuthContext = createContext(null);

// Custom hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Kiểm tra và lấy thông tin người dùng khi component được mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setCurrentUser(userData);
        }
      } catch (error) {
        // Nếu có lỗi (ví dụ: token không hợp lệ), xóa token
        console.error('Lỗi xác thực:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Đăng ký
  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đăng ký không thành công',
      };
    }
  };

  // Xác thực OTP đăng ký
  const verifyRegistration = async (email, otp) => {
    try {
      const result = await authService.verifyRegistration(email, otp);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Xác thực không thành công',
      };
    }
  };

  // Đăng nhập
  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      const userData = await authService.getCurrentUser();
      setCurrentUser(userData);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đăng nhập không thành công',
      };
    }
  };

  // Đăng xuất
  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    navigate('/login');
  };

  // Quên mật khẩu
  const forgotPassword = async (email) => {
    try {
      const result = await authService.forgotPassword(email);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Không thể gửi yêu cầu đặt lại mật khẩu',
      };
    }
  };

  // Xác thực OTP quên mật khẩu
  const verifyOtp = async (email, otp) => {
    try {
      const result = await authService.verifyOtp(email, otp);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Xác thực OTP không thành công',
      };
    }
  };

  // Đặt lại mật khẩu
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const result = await authService.resetPassword(email, otp, newPassword);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đặt lại mật khẩu không thành công',
      };
    }
  };

  // Cập nhật thông tin người dùng
  const updateUserProfile = async (userData) => {
    try {
      // Giả sử có API cập nhật thông tin người dùng
      const result = await authService.updateProfile(userData);
      // Cập nhật thông tin người dùng trong state
      setCurrentUser((prev) => ({ ...prev, ...result }));
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Cập nhật thông tin không thành công',
      };
    }
  };

  // Kiểm tra quyền truy cập
  const hasRole = (role) => {
    return currentUser?.roles?.includes(role);
  };

  // Context value
  const value = {
    currentUser,
    loading,
    register,
    verifyRegistration,
    login,
    logout,
    forgotPassword,
    verifyOtp,
    resetPassword,
    updateUserProfile,
    isAuthenticated: !!currentUser,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;