import axios from 'axios';

// Axios instance với cấu hình mặc định
const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi 401 (token hết hạn)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Gọi API refresh token
        const response = await axios.post('/api/v1/auth/refresh-token');
        
        // Lưu token mới
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        
        // Cập nhật token trong request gốc và thử lại
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, đăng xuất người dùng
        authService.logout();
        
        // Chuyển hướng đến trang đăng nhập (cần xử lý bên ngoài)
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

const authService = {
  // Đăng ký tài khoản
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  // Xác thực OTP sau khi đăng ký
  verifyRegistration: async (email, otp) => {
    console.log("authService - Xác thực đăng ký:", { email, otp });
    try {
      const response = await api.post('/auth/register/verify', { email, otp });
      console.log("authService - Phản hồi từ server:", response.data);
      return response.data;
    } catch (error) {
      console.error("authService - Lỗi xác thực:", error.response?.data || error);
      throw error;
    }
  },
  
  // Đăng nhập
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    
    // Lưu token
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    
    return response.data;
  },
  
  // Đăng xuất
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) { 
      console.error('Lỗi đăng xuất:', error);
    } finally {
      // Xóa token khỏi localStorage
      localStorage.removeItem('accessToken');
    }
  },
  
  // Quên mật khẩu - gửi OTP
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  
  // Xác thực OTP quên mật khẩu
  verifyOtp: async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },
  
  // Đặt lại mật khẩu
  resetPassword: async (email, otp, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      email,
      otp,
      newPassword,
    });
    return response.data;
  },
  
  // Kiểm tra trạng thái đăng nhập
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
  
  // Lấy thông tin người dùng đã đăng nhập
  getCurrentUser: async () => {
    const response = await api.get('/auth/current-user');
    return response.data;
  },
};

export default authService;