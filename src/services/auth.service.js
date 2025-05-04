// src/services/auth.service.js
import axios from "axios";
import { API_BASE_URL } from "../config/ApiConfig";
import { api } from "../config/ApiConfig";
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
            /*
                "email": "sangshin0987@gmail.com",
                "firstName": "Tu",
                "lastName": "Ma Y",
                "password": "123456789"
            */
                console.log("Initiate registration response:", response.data);
                return response.data; // Thường chỉ là message { message: "OTP sent..." }
            } catch (error) {
                console.error("Initiate registration error:", error.response?.data || error.message);
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
    resendOtp: (email) =>
        axios.post(`${API_BASE_URL}/auth/register/resend-otp`, { email }),

    verifyOtp: (email, otp) =>
        axios.post(`${API_BASE_URL}/auth/register/verify`, { email, otp }),

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

    updateProfile: async (userData) => {
        try {
            const response = await api.put(`${API_BASE_URL}/users/update`, userData);
            console.log("Phản hồi cập nhật thông tin người dùng:", response.data);
            return response.message;
        } catch (error) {
            console.error("Lỗi cập nhật thông tin người dùng:", error);
            throw error;
        }
    }

};