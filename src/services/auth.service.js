// src/services/auth.service.js
import axios from "axios";
import { API_BASE_URL } from "./api";
import { api } from "./api";
import {
    saveRefreshTokenToCookie,
    getRefreshTokenFromCookie,
    removeRefreshTokenFromCookie,
    saveTokenToLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage,
    clearAllTokens,
    extractTokensFromResponse
} from "./util";

export const authService = {
    register: async (userData) => {
        try {
            console.log("Đang gửi yêu cầu đăng ký:", userData);
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
            console.log("Phản hồi từ đăng ký:", response.data);
            
            // Xử lý token từ phản hồi
            const { accessToken, refreshToken } = extractTokensFromResponse(response);
            
            if (accessToken) {
                saveTokenToLocalStorage(accessToken);
                
                if (refreshToken) {
                    saveRefreshTokenToCookie(refreshToken);
                }
                
                console.log("Đăng ký thành công, đã lưu token");
            }
            
            return response;
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            console.error("Dữ liệu lỗi:", error.response?.data);
            throw error;
        }
    },
    
    login: async (userData) => {
        try {
            console.log("Đang gửi yêu cầu đăng nhập:", userData);
            const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
            console.log("Phản hồi từ đăng nhập:", response.data);
            
            // Xử lý token từ phản hồi
            const { accessToken, refreshToken } = extractTokensFromResponse(response);
            
            if (accessToken) {
                saveTokenToLocalStorage(accessToken);
                
                if (refreshToken) {
                    saveRefreshTokenToCookie(refreshToken);
                }
                
                console.log("Đăng nhập thành công, đã lưu token");
            } else {
                console.warn("Đăng nhập thành công nhưng không nhận được token");
            }
            
            return response;
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            console.error("Dữ liệu lỗi:", error.response?.data);
            throw error;
        }
    },
    
    getUserProfile: () => 
        api.get(`${API_BASE_URL}/users/profile`),
        
    refreshToken: async () => {
        try {
            const refreshToken = getRefreshTokenFromCookie();
            
            if (!refreshToken) {
                console.error("Không có refresh token để làm mới token");
                throw new Error("Không có refresh token");
            }
            
            console.log("Đang làm mới token với refreshToken:", refreshToken);
            const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
            console.log("Phản hồi làm mới token:", response.data);
            
            // Xử lý token từ phản hồi
            const { accessToken, refreshToken: newRefreshToken } = extractTokensFromResponse(response);
            
            if (accessToken) {
                saveTokenToLocalStorage(accessToken);
                
                if (newRefreshToken) {
                    saveRefreshTokenToCookie(newRefreshToken);
                }
                
                console.log("Làm mới token thành công");
                return accessToken;
            } else {
                throw new Error("Không tìm thấy token trong phản hồi");
            }
        } catch (error) {
            console.error("Lỗi làm mới token:", error);
            // Xóa token khi refresh thất bại
            clearAllTokens();
            throw error;
        }
    },
        
    logout: async () => {
        try {
            // Thử gọi API logout nếu cần
            const token = getTokenFromLocalStorage();
            if (token) {
                await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        } finally {
            // Luôn xóa token dù có lỗi hay không
            clearAllTokens();
            return Promise.resolve();
        }
    },

    // Thêm các phương thức cho chức năng quên mật khẩu
    requestPasswordReset: (email) => 
        axios.post(`${API_BASE_URL}/auth/forgot-password`, { email }),
    
    verifyOtp: (email, otp) => 
        axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp }),
    
    resetPassword: (email, newPassword, otp) => 
        axios.post(`${API_BASE_URL}/auth/register/forgot-password`, { 
            email, 
            newPassword,
            otp
        }),
        
    // Kiểm tra trạng thái đăng nhập
    isAuthenticated: () => {
        return !!getTokenFromLocalStorage();
    },
    
    // Hàm lấy refresh token
    getRefreshToken: getRefreshTokenFromCookie,
    
    // Thêm hàm xử lý đăng nhập OAuth2
    handleOAuthLogin: async (code, provider) => {
        try {
            console.log(`Đang xử lý đăng nhập ${provider} với code:`, code);
            const response = await axios.get(`${API_BASE_URL}/oauth2/callback/${provider}?code=${code}`);
            console.log(`Phản hồi từ đăng nhập ${provider}:`, response.data);
            
            // Xử lý token từ phản hồi
            const { accessToken, refreshToken } = extractTokensFromResponse(response);
            
            if (accessToken) {
                saveTokenToLocalStorage(accessToken);
                
                if (refreshToken) {
                    saveRefreshTokenToCookie(refreshToken);
                }
                
                console.log(`Đăng nhập ${provider} thành công, đã lưu token`);
                return { success: true, data: response.data };
            } else {
                console.warn(`Đăng nhập ${provider} thành công nhưng không nhận được token`);
                return { success: false, error: "Không nhận được token" };
            }
        } catch (error) {
            console.error(`Lỗi đăng nhập ${provider}:`, error);
            console.error("Dữ liệu lỗi:", error.response?.data);
            return { success: false, error: error.response?.data?.message || error.message };
        }
    }
};