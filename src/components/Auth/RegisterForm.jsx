// src/components/Auth/RegisterForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  // Sử dụng state cho các bước
  const [formState, setFormState] = useState({
    step: 1, // 1: Form đăng ký, 2: Xác thực OTP
    formData: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: "CUSTOMER", // Mặc định là khách hàng
    },
    otp: "",
    error: "",
    loading: false,
    countdown: 0
  });
  
  const { register, verifyRegistration, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Debug: Log khi step thay đổi
  useEffect(() => {
    console.log("Current step:", formState.step);
  }, [formState.step]);

  // Kiểm tra nếu đã đăng nhập thì chuyển hướng về trang chủ
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Countdown cho việc gửi lại OTP
  useEffect(() => {
    if (formState.countdown > 0) {
      const timer = setTimeout(() => 
        setFormState(prev => ({
          ...prev,
          countdown: prev.countdown - 1
        })),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [formState.countdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value
      }
    }));
  };

  const validatePassword = (password) => {
    // Kiểm tra độ mạnh mật khẩu (ít nhất 6 ký tự, có số và chữ)
    const hasMinLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    
    if (!hasMinLength) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    
    if (!hasNumber || !hasLetter) {
      return "Mật khẩu phải bao gồm cả số và chữ";
    }
    
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Bắt đầu xử lý đăng ký");

    const { formData } = formState;
    
    // Kiểm tra mật khẩu
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setFormState(prev => ({ ...prev, error: passwordError }));
      console.log("Lỗi mật khẩu:", passwordError);
      return;
    }
    
    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      setFormState(prev => ({ ...prev, error: "Mật khẩu xác nhận không khớp" }));
      console.log("Mật khẩu xác nhận không khớp");
      return;
    }
    
    // Set loading state
    setFormState(prev => ({ ...prev, loading: true, error: "" }));
    console.log("Đang gửi yêu cầu đăng ký đến API...");

    try {
      console.log("Dữ liệu gửi đi:", {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      });
      
      // Gửi yêu cầu đăng ký
      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      });
      
      console.log("Kết quả từ API đăng ký:", result);
      
      if (!result.success) {
        console.log("Đăng ký thất bại:", result.error);
        setFormState(prev => ({ 
          ...prev, 
          error: result.error,
          loading: false
        }));
        return;
      }
      
      console.log("Đăng ký thành công, chuyển sang bước nhập OTP");
      
      // Cập nhật state trong một lần update duy nhất
      setFormState(prev => ({
        ...prev,
        step: 2,
        countdown: 60,
        loading: false
      }));
      
      console.log("Đã cập nhật state: step=2, countdown=60");
    } catch (err) {
      console.error("Lỗi khi đăng ký:", err);
      setFormState(prev => ({
        ...prev,
        error: "Đăng ký không thành công. Vui lòng thử lại sau.",
        loading: false
      }));
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log("Đang xác thực OTP:", formState.otp, "cho email:", formState.formData.email);

    setFormState(prev => ({ ...prev, loading: true, error: "" }));

    try {
      // Gửi yêu cầu xác thực OTP
      const result = await verifyRegistration(formState.formData.email, formState.otp);
      console.log("Kết quả xác thực OTP:", result);
      
      // Hiển thị thông báo thành công và điều hướng đến trang đăng nhập
      alert("Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.");
      navigate("/login");
    } catch (err) {
      console.error("Lỗi xác thực OTP:", err);
      setFormState(prev => ({
        ...prev,
        error: "Xác thực OTP không thành công. Vui lòng kiểm tra lại mã OTP.",
        loading: false
      }));
    }
  };

  const handleResendOtp = async () => {
    if (formState.countdown > 0) return;
    
    setFormState(prev => ({ ...prev, loading: true, error: "" }));
    
    try {
      // Gửi lại yêu cầu đăng ký để nhận OTP mới
      const result = await register({
        email: formState.formData.email,
        password: formState.formData.password,
        firstName: formState.formData.firstName,
        lastName: formState.formData.lastName,
        role: formState.formData.role,
      });
      
      if (!result.success) {
        setFormState(prev => ({ 
          ...prev, 
          error: result.error,
          loading: false
        }));
        return;
      }
      
      setFormState(prev => ({
        ...prev,
        countdown: 60,
        loading: false
      }));
      
      alert("Mã OTP mới đã được gửi đến email của bạn.");
    } catch (err) {
      setFormState(prev => ({
        ...prev,
        error: "Không thể gửi lại mã OTP. Vui lòng thử lại sau.",
        loading: false
      }));
    }
  };

  const handleOtpChange = (e) => {
    setFormState(prev => ({ ...prev, otp: e.target.value }));
  };

  const goBackToRegisterForm = () => {
    setFormState(prev => ({ ...prev, step: 1 }));
  };

  // Render form đăng ký
  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Họ
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.formData.firstName}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nguyễn"
            required
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Tên
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formState.formData.lastName}
            onChange={handleChange}
            className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Văn A"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.formData.email}
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
          value={formState.formData.password}
          onChange={handleChange}
          className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength="6"
        />
        <p className="text-xs text-gray-500">
          Mật khẩu phải có ít nhất 6 ký tự, bao gồm cả chữ và số
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Xác nhận mật khẩu
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formState.formData.confirmPassword}
          onChange={handleChange}
          className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="role" className="text-sm font-medium">
          Vai trò
        </label>
        <select
          id="role"
          name="role"
          value={formState.formData.role}
          onChange={handleChange}
          className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="CUSTOMER">Khách hàng</option>
          <option value="SELLER">Người bán</option>
        </select>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input 
          type="checkbox" 
          id="terms" 
          required 
          className="rounded text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="terms" className="text-sm">
          Tôi đồng ý với{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Điều khoản dịch vụ
          </Link>{" "}
          và{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Chính sách bảo mật
          </Link>
        </label>
      </div>

      <button
        type="submit"
        disabled={formState.loading}
        className="py-3 mt-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
      >
        {formState.loading ? "Đang xử lý..." : "Đăng ký"}
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );

  // Render form xác thực OTP
  const renderOtpForm = () => (
    <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
      <div className="mb-4 text-center">
        <p className="mb-2">
          Chúng tôi đã gửi mã OTP đến email <strong>{formState.formData.email}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Vui lòng kiểm tra hộp thư đến (và thư mục spam) để lấy mã xác thực
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="otp" className="text-sm font-medium">
          Mã OTP
        </label>
        <input
          type="text"
          id="otp"
          value={formState.otp}
          onChange={handleOtpChange}
          className="p-2.5 text-center text-xl tracking-widest border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập mã OTP"
          required
          maxLength="6"
        />
      </div>

      <button
        type="submit"
        disabled={formState.loading}
        className="py-3 mt-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
      >
        {formState.loading ? "Đang xử lý..." : "Xác thực"}
      </button>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          type="button"
          onClick={goBackToRegisterForm}
          className="text-gray-600 hover:text-gray-800"
        >
          Quay lại
        </button>
        
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={formState.countdown > 0}
          className={`text-blue-600 hover:underline ${formState.countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {formState.countdown > 0 ? `Gửi lại sau ${formState.countdown}s` : 'Gửi lại mã OTP'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="flex flex-col p-8 mx-auto my-10 bg-white rounded-lg shadow-md w-full max-w-md">
      <h1 className="mb-6 text-3xl font-bold text-center">
        {formState.step === 1 ? "Đăng ký" : "Xác thực OTP"}
      </h1>
      
      {formState.error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
          {formState.error}
        </div>
      )}
      
      {formState.step === 1 ? renderRegisterForm() : renderOtpForm()}
    </div>
  );
};

export default RegisterForm;