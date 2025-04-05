import axios from 'axios';

// Axios instance với cấu hình mặc định
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 50000,
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
    console.log("authService - Đang gửi yêu cầu đăng ký:", {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role
    });
    
    try {
      const response = await api.post('/auth/register', userData);
      console.log("authService - Phản hồi từ API đăng ký:", response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("authService - Lỗi đăng ký:", error.response?.data || error);
      return {
        success: false,
        error: error.response?.data?.message || "Đăng ký không thành công"
      };
    }
  },
  
  // Xác thực OTP sau khi đăng ký
  verifyRegistration: async (email, otp) => {
    console.log("authService - Xác thực đăng ký:", { email, otp });
    try {
      const response = await api.post('/auth/register/verify', { email, otp });
      console.log("authService - Phản hồi từ server:", response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("authService - Lỗi xác thực:", error.response?.data || error);
      return {
        success: false,
        error: error.response?.data?.message || 'Xác thực không thành công'
      };
    }
  },
  
  // Đăng nhập
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Kiểm tra response có đúng định dạng không
      if (!response.data || !response.data.accessToken) {
        console.error('Lỗi đăng nhập: Response không có accessToken');
        throw new Error('Định dạng phản hồi không hợp lệ');
      }
      
      // Lưu token
      const { accessToken } = response.data;
      console.log("Token nhận được:", accessToken);
      localStorage.setItem('accessToken', accessToken);
      
      return response.data;
    } catch (error) {
      console.error('Lỗi đăng nhập:', error.response?.data || error);
      throw error;
    }
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
    try {
      // Kiểm tra token trước khi gửi request
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.warn('Không thể lấy thông tin người dùng: Token không tồn tại');
        throw new Error('Chưa đăng nhập');
      }
      
      console.log('Gửi request với token:', token.substring(0, 10) + '...');
      const response = await api.get('/auth/current-user');
      
      console.log('Thông tin người dùng nhận được:', response.data);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error.response?.data || error);
      throw error;
    }
  },

  verifyTokenStorage: () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('Không tìm thấy token trong localStorage');
      return false;
    }
    console.log('Token đã được lưu trong localStorage');
    return true;
  },
  
  validateToken: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return false;
      }
      
      // Gọi API kiểm tra token
      await api.get('/auth/validate-token');
      return true;
    } catch (error) {
      console.error('Token không hợp lệ:', error.response?.status);
      return false;
    }
  }
};

export default authService;