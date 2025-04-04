import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Features from "../shared/Features";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập OTP, 3: Đặt lại mật khẩu
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/v1/auth/forgot-password", { email });
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Không thể gửi OTP. Vui lòng kiểm tra lại email của bạn."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/v1/auth/verify-otp", { email, otp });
      setStep(3);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Mã OTP không hợp lệ hoặc đã hết hạn."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/v1/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Không thể đặt lại mật khẩu. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  // Form nhập email
  const renderEmailForm = () => (
    <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập email đã đăng ký"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="py-3 mt-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
      >
        {loading ? "Đang xử lý..." : "Gửi mã xác thực"}
      </button>

      <div className="mt-4 text-center">
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Quay lại đăng nhập
        </Link>
      </div>
    </form>
  );

  // Form nhập OTP
  const renderOtpForm = () => (
    <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
      <div className="mb-4 text-center">
        <p className="mb-2">
          Chúng tôi đã gửi mã OTP đến email <strong>{email}</strong>
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
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="p-2.5 text-center text-xl tracking-widest border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập mã OTP"
          required
          maxLength="6"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="py-3 mt-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
      >
        {loading ? "Đang xử lý..." : "Xác thực"}
      </button>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-gray-600 hover:text-gray-800"
        >
          Quay lại
        </button>
        
        <button
          type="button"
          onClick={handleSendOtp}
          className="text-blue-600 hover:underline"
        >
          Gửi lại mã OTP
        </button>
      </div>
    </form>
  );

  // Form đặt lại mật khẩu
  const renderResetPasswordForm = () => (
    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="newPassword" className="text-sm font-medium">
          Mật khẩu mới
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength="6"
        />
        <p className="text-xs text-gray-500">
          Mật khẩu phải có ít nhất 6 ký tự
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Xác nhận mật khẩu mới
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="py-3 mt-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
      >
        {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
      </button>
    </form>
  );

  return (
    <div className="flex flex-col pt-3 bg-white min-h-screen">
      <Header />
      <div className="flex-1">
        <div className="flex flex-col p-8 mx-auto my-10 bg-white rounded-lg shadow-md w-full max-w-md">
          <h1 className="mb-6 text-3xl font-bold text-center">
            {success ? "Thành công" : "Quên mật khẩu"}
          </h1>
          
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          
          {success ? renderSuccess() :
            step === 1 ? renderEmailForm() :
            step === 2 ? renderOtpForm() :
            renderResetPasswordForm()
          }
        </div>
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;