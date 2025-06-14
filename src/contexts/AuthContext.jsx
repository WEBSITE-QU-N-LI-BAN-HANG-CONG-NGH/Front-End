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
  const [isLoading, setIsLoading] = useState(true); // Ban đầu là true để checkAuthStatus chạy
  const [error, setError] = useState(null);

  const fetchUserProfileInternal = useCallback(async (currentToken) => {
    if (!currentToken) {
      setUser(null);
      setJwt(null);
      // setError(null); // Không nên reset lỗi ở đây nếu không muốn mất lỗi từ login/register
      return;
    }
    // Không setIsLoading ở đây để tránh nhấp nháy khi chỉ fetch user sau khi đã có token
    try {
      const response = await authService.getUserProfile();
      setUser(response.data?.data || response.data);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin người dùng (AuthContext - fetchUserProfileInternal):", err);
      clearAllTokens();
      setJwt(null);
      setUser(null);
      setError("Phiên làm việc hết hạn hoặc token không hợp lệ.");
    }
  }, []);


  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = getTokenFromLocalStorage();
    if (token) {
      setJwt(token);
      await fetchUserProfileInternal(token);
    } else {
      setUser(null); // Đảm bảo user là null nếu không có token
      setJwt(null);
    }
    setIsLoading(false);
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

        // Get user data from response
        const responseData = response.data.data || response.data;
        const userFromLogin = responseData.user || responseData;

        // Check seller role before setting user state
        const roles = userFromLogin?.roles ||
            (userFromLogin?.authorities?.map(auth => auth.authority.replace("ROLE_", ""))) ||
            [];

        // Check if user is seller
        if (roles.includes("SELLER") || userFromLogin?.role === "SELLER") {
          console.log("Seller detected, redirecting to seller app");

          // Redirect to seller app with token
          const sellerUrl = `http://localhost:5174/dashboard?token=${encodeURIComponent(accessToken)}`;
          window.location.href = sellerUrl;
          return; // Exit early, don't continue customer flow
        }

        // Continue normal customer flow
        await fetchUserProfileInternal(accessToken);
      } else {
        throw new Error("Đăng nhập thành công nhưng không nhận được token.");
      }
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Đăng nhập thất bại.";
      setError(errorMessage);
      setUser(null);
      setJwt(null);
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(userData);
      // Sau khi đăng ký thành công (thường là chỉ gửi OTP), không tự động login ở đây
      // Việc login sẽ xảy ra sau khi xác thực OTP thành công trong RegisterForm
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Đăng ký thất bại.";
      setError(errorMessage);
      throw err; // Ném lỗi để RegisterForm xử lý
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Không cần setIsLoading(true) vì đây là hành động nhanh và chủ động từ người dùng
    setError(null);
    try {
      await authService.logout();
    } catch (err) {
      console.error("Lỗi trong quá trình gọi API logout (có thể bỏ qua):", err);
    } finally {
      clearAllTokens();
      setUser(null);
      setJwt(null);
      // Không cần setIsLoading(false)
      if (window.location.pathname !== '/') {
         window.location.href = "/"; // Chuyển hướng về trang chủ
      }
    }
  };

  const setAuthTokenAndFetchUser = useCallback(async (token) => {
    setIsLoading(true); // Bắt đầu loading khi set token mới
    setError(null);
    if (token) {
      saveTokenToLocalStorage(token);
      setJwt(token);
      await fetchUserProfileInternal(token);
    } else {
      clearAllTokens();
      setJwt(null);
      setUser(null);
      setError("Không nhận được token xác thực hợp lệ.");
    }
    setIsLoading(false); // Kết thúc loading
  }, [fetchUserProfileInternal]);


  const upgradeToSellerAndLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.changeRoleToSeller();
      alert("Nâng cấp thành Người bán thành công! Vui lòng đăng nhập lại để truy cập trang quản lý.");

      await logout();

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Nâng cấp tài khoản thất bại.";
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };

  const value = {
    user,
    jwt,
    isLoading,
    error,
    isAuthenticated: !!jwt && !!user, // User phải tồn tại và có JWT
    login,
    register,
    logout,
    upgradeToSellerAndLogout,
    fetchUserProfile: useCallback(() => { // Bọc trong useCallback nếu fetchUserProfileInternal là callback
        if(jwt) return fetchUserProfileInternal(jwt);
        return Promise.resolve();
    }, [jwt, fetchUserProfileInternal]),
    checkAuthStatus,
    clearAuthError: () => setError(null),
    setAuthTokenAndFetchUser,
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