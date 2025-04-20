import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Kiểm tra đăng nhập (giả lập)
    setTimeout(() => {
      // Thông tin admin mẫu để test
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        // Lưu token vào localStorage
        localStorage.setItem('adminToken', 'admin-token-sample');
        // Chuyển hướng đến trang dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-8">
            <img src="/ShopIcon.png" alt="Tech Shop Admin" className="h-16" />
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Đăng nhập quản trị
          </h2>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Tên đăng nhập
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={credentials.username}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </span>
              ) : 'Đăng nhập'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            <a href="/" className="text-blue-600 hover:text-blue-500">
              ← Quay lại trang chính
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;