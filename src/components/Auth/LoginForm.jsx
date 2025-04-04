// src/components/Auth/LoginForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy đường dẫn chuyển hướng sau khi đăng nhập (nếu có)
  const from = location.state?.from?.pathname || '/';

  // Kiểm tra nếu đã đăng nhập thì chuyển hướng
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Lấy thông tin đăng nhập đã lưu (nếu có)
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Lưu email nếu chọn "Ghi nhớ tài khoản"
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    try {
      const result = await login(formData.email, formData.password);
      
      if (!result.success) {
        setError(result.error);
        return;
      }
      
      // Đăng nhập thành công, chuyển hướng
      navigate(from, { replace: true });
    } catch (err) {
      setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-8 mx-auto my-10 bg-white rounded-lg shadow-md w-full max-w-md">
      <h1 className="mb-6 text-3xl font-bold text-center">Đăng nhập</h1>
      
      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@techshop.vn"
            required
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rememberMe">Ghi nhớ tài khoản</label>
          </div>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="py-3 mt-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </form>
      
      <div className="relative flex items-center justify-center mt-6 mb-6">
        <hr className="w-full border-gray-300" />
        <span className="absolute px-3 text-sm text-gray-500 bg-white">
          Hoặc đăng nhập với
        </span>
      </div>
      
      <div className="flex gap-4">
        <a
          href="/api/v1/auth/oauth2/google"
          className="flex justify-center items-center py-2.5 w-full text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </a>
        
        <a
          href="/api/v1/auth/oauth2/github"
          className="flex justify-center items-center py-2.5 w-full text-white bg-gray-800 rounded hover:bg-gray-900"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
            />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
};

export default LoginForm;