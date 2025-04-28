import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { authService } from "../../services/auth.service";
import { getTokenFromLocalStorage, extractTokensFromResponse, clearAllTokens } from "../../services/util";

const registerRequest = () => ({type:REGISTER_REQUEST});
const registerSuccess = (token) => ({type:REGISTER_SUCCESS, payload:token});
const registerFailure = (error) => ({type:REGISTER_FAILURE, payload:error});

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        console.log("Đang đăng ký với dữ liệu:", userData);
        const response = await authService.register(userData);

        console.log("Message từ phản hồi đăng ký:", response);
        
    } catch(error) {
        console.error("Lỗi đăng ký:", error);
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(registerFailure(errorMessage));
    }
}

export const loginRequest = () => ({type:LOGIN_REQUEST});
export const loginSuccess = (token) => ({type:LOGIN_SUCCESS, payload:token});
export const loginFailure = (error) => ({type:LOGIN_FAILURE, payload:error});

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        console.log("Đang đăng nhập với dữ liệu:", userData);
        const response = await authService.login(userData);
        console.log("Phản hồi đăng nhập:", response.data);
        
        // Xử lý token từ phản hồi
        const { accessToken } = extractTokensFromResponse(response);
        
        if(accessToken) {
            dispatch(loginSuccess(accessToken));

            const userData = response.data.data || response.data;
            // Nếu user có role là SELLER hoặc có isSeller = true
            if (userData.roles?.includes('SELLER') || userData.isSeller === true) {
                // Lưu token vào localStorage để frontend seller có thể sử dụng
                localStorage.setItem("jwt", accessToken);

                // Chuyển hướng sang trang seller
                window.location.href = "http://localhost:5174/dashboard"; // Thay đổi port tùy theo cấu hình
                return; // Dừng execution flow ở đây
            }

            // Nếu không phải seller, tiếp tục luồng đăng nhập customer thông thường
            dispatch(getUser());
            console.log("Đăng nhập thành công với token");
        } else {
            console.error("Đăng nhập thành công nhưng không có token trong phản hồi");
            dispatch(loginFailure("Đăng nhập thành công nhưng không nhận được token"));
        }
    } catch(error) {
        console.error("Lỗi đăng nhập:", error);
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(loginFailure(errorMessage));
    }
}

const getUserRequest = () => ({type:GET_USER_REQUEST});
const getUserSuccess = (user) => ({type:GET_USER_SUCCESS, payload:user});
const getUserFailure = (error) => ({type:GET_USER_FAILURE, payload:error});

export const getUser = () => async (dispatch) => {
    const jwt = getTokenFromLocalStorage();
    
    if (!jwt) {
        console.warn("Không có JWT để lấy thông tin người dùng");
        return;
    }
    
    dispatch(getUserRequest());
    console.log("Đang lấy thông tin người dùng");
    
    try {
        const response = await authService.getUserProfile();
        console.log("Phản hồi thông tin người dùng:", response.data);
        
        if (response.status === 200) {
            let userData = response.data;
            
            // Kiểm tra nếu dữ liệu người dùng nằm trong thuộc tính data
            if (!userData.id && !userData.email && response.data.data) {
                userData = response.data.data;
            }
            
            dispatch(getUserSuccess(userData));
        } else {
            dispatch(getUserFailure("Phản hồi không mong đợi từ server"));
        }
    } catch(error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
        
        let errorMessage = "Lỗi không xác định";
        if (error.response) {
            errorMessage = error.response.data?.message || error.response.data?.error || `Lỗi ${error.response.status}: ${error.response.statusText}`;
        } else if (error.request) {
            errorMessage = "Lỗi mạng - không nhận được phản hồi từ server";
        } else {
            errorMessage = error.message;
        }
        
        // Nếu lỗi trả về 401 hoặc 403, interceptor trong api.js sẽ xử lý refresh token hoặc logout
        dispatch(getUserFailure(errorMessage));
    }
}

const LOGOUT_REQUEST = () => ({type: 'LOGOUT_REQUEST'});
const LOGOUT_SUCCESS = () => ({type: LOGOUT});

export const logout = () => async (dispatch) => {
    try {
        dispatch(LOGOUT_REQUEST());
        await authService.logout();
        clearAllTokens();
        dispatch(LOGOUT_SUCCESS());
        window.location.href = '/';
    } catch (error) {
        console.error("Lỗi đăng xuất:", error);
        clearAllTokens();
        // Vẫn đăng xuất ở phía client ngay cả khi có lỗi từ server
        dispatch(LOGOUT_SUCCESS());
        window.location.href = '/';
    }
}

// Action kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
export const checkAuthStatus = () => async (dispatch) => {
    const jwt = getTokenFromLocalStorage(); // Dùng helper function

    if (jwt) {
        console.log("Tìm thấy token đã lưu, khôi phục phiên đăng nhập");
        dispatch(loginSuccess(jwt)); // Cập nhật token vào state
        dispatch(getUser()); // Lấy thông tin user
    } else {
        console.log("Không tìm thấy token đã lưu.");
        // Có thể dispatch action logout hoặc không làm gì cả
        // dispatch({ type: LOGOUT });
    }
};

