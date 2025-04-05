import axios from 'axios';

// Tạo instance của axios với cấu hình mặc định
const API = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Đường dẫn cơ sở cho tất cả API
  timeout: 15000,     // Thời gian chờ trước khi timeout (15 giây)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Thêm interceptor cho request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      // Debug header
      console.log('Request headers:', config.headers);
    } else {
      console.warn('Không tìm thấy token cho request:', config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
API.interceptors.response.use(
  (response) => {
    // Xử lý response thành công
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Nếu lỗi 401 (Unauthorized) và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Gọi API refresh token
        const response = await axios.post('/api/v1/auth/refresh-token', {}, {
          withCredentials: true // Đảm bảo gửi cookie refresh token
        });
        
        // Lưu token mới
        localStorage.setItem('accessToken', response.data.accessToken);
        
        // Cập nhật token trong request gốc và thử lại
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, xóa token và đăng xuất
        localStorage.removeItem('accessToken');
        
        // Chuyển hướng đến trang đăng nhập
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    // Xử lý các lỗi khác
    const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi';
    console.error('API Error:', errorMessage);
    
    return Promise.reject(error);
  }
);

export default API;