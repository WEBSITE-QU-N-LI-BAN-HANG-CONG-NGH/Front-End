import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuthCallback = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Lấy token từ query parameters
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      const error = queryParams.get('error');
      
      if (error) {
        setError(decodeURIComponent(error));
        return;
      }
      
      if (!token) {
        setError('Không nhận được token xác thực. Vui lòng thử lại.');
        return;
      }
      
      try {
        // Lưu token và lấy thông tin người dùng
        localStorage.setItem('accessToken', token);
        
        // Chuyển hướng về trang chủ hoặc trang được yêu cầu trước đó
        const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/';
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectTo);
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError('Đã xảy ra lỗi khi xử lý đăng nhập. Vui lòng thử lại.');
        localStorage.removeItem('accessToken');
      }
    };

    handleOAuthCallback();
  }, [location, navigate, login]);

  // Hiển thị trạng thái đang xử lý hoặc lỗi
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {error ? (
        <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-center">Đăng nhập thất bại</h2>
          <p className="mb-6 text-center text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2.5 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Quay lại đăng nhập
          </button>
        </div>
      ) : (
        <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full text-center">
          <div className="mx-auto mb-4">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold">Đang xử lý đăng nhập</h2>
          <p className="mt-2 text-gray-600">Vui lòng đợi trong giây lát...</p>
        </div>
      )}
    </div>
  );
};

export default OAuthCallback;