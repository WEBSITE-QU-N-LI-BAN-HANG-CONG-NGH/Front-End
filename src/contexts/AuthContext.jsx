import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { authService } from '../services/auth.service'; // Đảm bảo đường dẫn đúng
import {
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
  clearAllTokens,
  extractTokensFromResponse
} from '../services/util'; // Đảm bảo đường dẫn đúng

// Tạo Context
const AuthContext = createContext(null);

// Tạo Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(getTokenFromLocalStorage());
  const [isLoading, setIsLoading] = useState(true); // Bắt đầu với isLoading true để checkAuthStatus
  const [error, setError] = useState(null);

  // Hàm checkAuthStatus được gọi khi provider mount
  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = getTokenFromLocalStorage();
    if (token) {
      setJwt(token); // Cập nhật jwt state nếu nó chưa được set từ initialState
      try {
        const response = await authService.getUserProfile();
        setUser(response.data?.data || response.data); // API của bạn có thể trả về user trong data.data
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng lúc khởi tạo:", err);
        // Nếu lỗi (ví dụ token hết hạn), xóa token và user
        clearAllTokens();
        setJwt(null);
        setUser(null);
        setError("Phiên đăng nhập đã hết hạn hoặc không hợp lệ.");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);


  const login = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(userData);
      const { accessToken } = extractTokensFromResponse(response);

      if (accessToken) {
        saveTokenToLocalStorage(accessToken);
        setJwt(accessToken);
        // Sau khi login thành công, gọi getUserProfile để lấy thông tin user
        const userProfileResponse = await authService.getUserProfile();
        setUser(userProfileResponse.data?.data || userProfileResponse.data);

        // Kiểm tra role SELLER và chuyển hướng (logic này đã có trong Redux action của bạn)
        const responseData = response.data.data || response.data;
        const userFromLogin = responseData.user || responseData;
        const roles = userFromLogin?.roles || (userFromLogin?.authorities?.map(auth => auth.authority.replace("ROLE_", ""))) || [];

        if (roles.includes("SELLER")) {
            // Thêm token vào URL khi chuyển hướng
            window.location.href = `http://localhost:5174/dashboard?token=${encodeURIComponent(accessToken)}`;
            return; // Dừng execution
        }

      } else {
        throw new Error("Đăng nhập thành công nhưng không nhận được token.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Đăng nhập thất bại.";
      setError(errorMessage);
      setUser(null); // Đảm bảo user là null khi đăng nhập thất bại
      setJwt(null);   // Và jwt cũng là null
      throw err; // Ném lỗi ra để component có thể bắt và hiển thị
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Logic đăng ký (gửi OTP, etc.) nằm trong authService.register
      // AuthContext không cần trực tiếp xử lý token ở bước này,
      // vì sau khi verify OTP thành công, người dùng sẽ login.
      await authService.register(userData);
      // Bạn có thể set một message thành công ở đây nếu muốn, hoặc để component xử lý
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Đăng ký thất bại.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.logout(); // Gọi API logout nếu có
    } catch (err) {
      console.error("Lỗi trong quá trình gọi API logout (có thể bỏ qua):", err);
    } finally {
      clearAllTokens();
      setUser(null);
      setJwt(null);
      setIsLoading(false);
      // Chuyển hướng về trang chủ sau khi logout
      if (window.location.pathname !== '/') {
         window.location.href = "/";
      }
    }
  };

  // Hàm này có thể không cần thiết nếu checkAuthStatus đã đủ,
  // nhưng giữ lại nếu bạn muốn có một cách fetch user thủ công.
  const fetchUserProfile = async () => {
    if (!jwt) {
        // Nếu không có jwt, không thể fetch user, reset state
        setUser(null);
        setError(null); // Hoặc set một lỗi cụ thể
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.getUserProfile();
      setUser(response.data?.data || response.data);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin người dùng:", err);
      setError("Không thể tải thông tin người dùng.");
      // Nếu lỗi, có thể token không hợp lệ, xóa đi
      clearAllTokens();
      setJwt(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    jwt,
    isLoading,
    error,
    isAuthenticated: !!jwt && !!user, // Chính xác hơn khi cả jwt và user đều có
    login,
    register,
    logout,
    fetchUserProfile, // Nếu bạn cần
    checkAuthStatus, // Để có thể gọi lại nếu cần từ bên ngoài
    clearAuthError: () => setError(null) // Thêm hàm để xóa lỗi
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Tạo Custom Hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};