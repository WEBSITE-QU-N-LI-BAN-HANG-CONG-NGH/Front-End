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
    console.log("AuthContext - Bắt đầu đăng ký với:", userData.email);
    try {
      const response = await authService.register(userData);
      console.log("AuthContext - Kết quả từ authService:", response);
      
      // Kiểm tra xem response có đúng format không
      if (typeof response === 'object') {
        // Nếu response đã có thuộc tính success
        if ('success' in response) {
          return response;
        }
        
        // Nếu response không có thuộc tính success, giả định là thành công
        return { success: true, data: response };
      }
      
      // Nếu response không phải là object, coi như thành công
      return { success: true, data: response };
    } catch (error) {
      console.error("AuthContext - Lỗi khi đăng ký:", error);
      return {
        success: false,
        error: error.message || 'Đăng ký không thành công'
      };
    }
  };

  // Xác thực OTP đăng ký
  const verifyRegistration = async (email, otp) => {
    console.log("AuthContext - Xác thực đăng ký với email:", email, "và OTP:", otp);
    try {
      const result = await authService.verifyRegistration(email, otp);
      console.log("AuthContext - Kết quả xác thực:", result);
      return result;
    } catch (error) {
      console.error("AuthContext - Lỗi xác thực:", error);
      return {
        success: false,
        error: error.message || 'Xác thực không thành công',
      };
    }
  };

  // Đăng nhập
  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      // Kiểm tra token
      if (!authService.verifyTokenStorage()) {
        return {
          success: false,
          error: 'Không thể lưu token đăng nhập'
        };
      }
  
      // Lấy dữ liệu người dùng từ kết quả đăng nhập nếu có
      if (result.user) {
        setCurrentUser(result.user);
        console.log('Đăng nhập thành công, dữ liệu người dùng:', result.user);
      } else {
        // Nếu không có dữ liệu người dùng trong kết quả đăng nhập, gọi API riêng
        const userData = await authService.getCurrentUser();
        setCurrentUser(userData);
        console.log('Đăng nhập thành công, dữ liệu người dùng:', userData);
      }
  
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

  const debugAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    console.group('Debug Auth Status');
    console.log('User đã đăng nhập:', !!currentUser);
    console.log('Token tồn tại:', !!token);
    if (token) {
      console.log('Token bắt đầu với:', token.substring(0, 15) + '...');
    }
    console.log('Thông tin người dùng:', currentUser);
    console.groupEnd();
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
    debugAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;