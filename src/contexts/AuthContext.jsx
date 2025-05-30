// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { authService } from '../services/auth.service';
import {
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
  clearAllTokens,
  extractTokensFromResponse
} from '../services/util';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(getTokenFromLocalStorage());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfileInternal = useCallback(async (currentToken) => {
    if (!currentToken) {
      setUser(null);
      setJwt(null); // Đảm bảo jwt cũng null nếu không có token
      // Không cần setError ở đây trừ khi muốn báo lỗi "không có token"
      return; // Thoát sớm nếu không có token
    }
    // setIsLoading(true); // Không set loading ở đây để tránh nhấp nháy khi chỉ fetch user
    // setError(null); // Không reset error ở đây để giữ lại lỗi từ login/register nếu có
    try {
      const response = await authService.getUserProfile(); // getUserProfile sẽ dùng token từ interceptor
      setUser(response.data?.data || response.data);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin người dùng (fetchUserProfileInternal):", err);
      // Nếu lỗi khi fetch user (ví dụ token hết hạn sau khi đã set), thì logout
      clearAllTokens();
      setJwt(null);
      setUser(null);
      setError("Phiên làm việc hết hạn hoặc token không hợp lệ.");
    } finally {
      // setIsLoading(false); // Không set loading ở đây
    }
  }, []);


  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true); // Bắt đầu loading chính cho việc kiểm tra auth ban đầu
    setError(null);
    const token = getTokenFromLocalStorage();
    if (token) {
      setJwt(token);
      await fetchUserProfileInternal(token); // Gọi hàm nội bộ
    }
    setIsLoading(false); // Kết thúc loading chính
  }, [fetchUserProfileInternal]);

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
        await fetchUserProfileInternal(accessToken); // Gọi hàm nội bộ sau khi có token mới

        const responseData = response.data.data || response.data;
        const userFromLogin = responseData.user || responseData;
        const roles = userFromLogin?.roles || (userFromLogin?.authorities?.map(auth => auth.authority.replace("ROLE_", ""))) || [];

        if (roles.includes("SELLER")) {
            window.location.href = `http://localhost:5174/dashboard?token=${encodeURIComponent(accessToken)}`;
            return;
        }
      } else {
        throw new Error("Đăng nhập thành công nhưng không nhận được token.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Đăng nhập thất bại.";
      setError(errorMessage);
      setUser(null);
      setJwt(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(userData);
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
      await authService.logout();
    } catch (err) {
      console.error("Lỗi trong quá trình gọi API logout (có thể bỏ qua):", err);
    } finally {
      clearAllTokens();
      setUser(null);
      setJwt(null);
      setIsLoading(false);
      if (window.location.pathname !== '/') {
         window.location.href = "/";
      }
    }
  };

  // HÀM MỚI ĐƯỢC THÊM
  const setAuthTokenAndFetchUser = useCallback(async (token) => {
    setIsLoading(true);
    setError(null);
    if (token) {
      saveTokenToLocalStorage(token);
      setJwt(token);
      await fetchUserProfileInternal(token); // Sử dụng hàm nội bộ
    } else {
      // Nếu không có token được truyền vào, coi như là lỗi hoặc logout
      clearAllTokens();
      setUser(null);
      setJwt(null);
      setError("Không nhận được token xác thực.");
    }
    setIsLoading(false);
  }, [fetchUserProfileInternal]);


  const value = {
    user,
    jwt,
    isLoading,
    error,
    isAuthenticated: !!jwt && !!user,
    login,
    register,
    logout,
    fetchUserProfile: () => fetchUserProfileInternal(jwt), // fetchUserProfile giờ sẽ gọi hàm nội bộ với jwt hiện tại
    checkAuthStatus,
    clearAuthError: () => setError(null),
    setAuthTokenAndFetchUser, // Cung cấp hàm mới
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};