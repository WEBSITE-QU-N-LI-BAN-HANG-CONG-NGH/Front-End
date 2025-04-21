"use client"; // Giữ lại nếu bạn dùng Next.js App Router
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GitHub from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";
import { useForm } from 'react-hook-form'; // ** Import useForm **
import { zodResolver } from '@hookform/resolvers/zod'; // ** Import Zod resolver **
import * as z from 'zod'; // ** Import Zod **
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  // Avatar, // Không thấy dùng
  // Menu, // Không thấy dùng
  // MenuItem, // Không thấy dùng
  CircularProgress,
  Alert
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../State/Auth/Action"; // Chỉ cần register
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/api"; // ** Kiểm tra lại đường dẫn này **
// Hoặc import từ file config nếu bạn có: import { API_BASE_URL } from "../../config/ApiConfig";

// ** Định nghĩa validation schema bằng Zod **
const registerSchema = z.object({
  firstName: z.string().min(1, { message: "Tên không được để trống" }),
  lastName: z.string().min(1, { message: "Họ không được để trống" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirmPassword: z.string().min(1, { message: "Vui lòng xác nhận mật khẩu" })
}).refine((data) => data.password === data.confirmPassword, {
  // Thêm kiểm tra confirmPassword phải khớp password
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"], // Chỉ định lỗi này thuộc về trường confirmPassword
});


function RegisterForm({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const { isLoading, error, jwt } = auth; // Lấy state từ Redux

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ** Khởi tạo react-hook-form **
  const { register: registerField, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Đóng modal nếu đã đăng nhập/đăng ký thành công
  useEffect(() => {
    if (jwt) {
      console.log("JWT đã được phát hiện, đóng form đăng ký");
      handleClose();
    }
  }, [jwt, handleClose]);

  // ** Hàm xử lý khi submit form (đã được validate) **
  const onSubmit = (data) => {
    console.log("Đang gửi yêu cầu đăng ký với:", data);
    // Loại bỏ confirmPassword trước khi gửi đi
    const { confirmPassword, ...userData } = data;
    dispatch(register(userData)); // Dispatch action register
  };

  // Toggle password visibility handlers
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // --- Các hàm xử lý sự kiện khác ---
   const handleGoogleSignUp = () => {
    console.log("Bắt đầu đăng ký với Google");
    const googleAuthUrl = `${API_BASE_URL}/oauth2/authorization/google`;
    console.log("Chuyển hướng đến:", googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  const handleGitHubSignUp = () => {
    console.log("Bắt đầu đăng ký với GitHub");
    const githubAuthUrl = `${API_BASE_URL}/oauth2/authorization/github`;
    console.log("Chuyển hướng đến:", githubAuthUrl);
    window.location.href = githubAuthUrl;
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    // Thay vì navigate, có lẽ bạn muốn gọi prop `toggleForm` nếu nó được truyền xuống
    // Hoặc nếu đây là modal riêng thì navigate là đúng
    navigate('/login'); // Điều hướng đến trang đăng nhập
    handleClose(); // Đóng modal hiện tại
  };

  // --- Render Component ---
  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 0 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
          Tạo tài khoản mới
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Điền thông tin bên dưới để đăng ký
        </Typography>

        {/* Hiển thị lỗi chung từ Redux */}
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Social Sign-up Buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <div className="flex w-full flex-col space-y-4">
            <div className="border shadow-md rounded-md border-gray-300">
              <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Google />}
                  onClick={handleGoogleSignUp}
                  sx={{ justifyContent: 'center', py: 1 }}
                  disabled={isLoading}
              >
                Google
              </Button>
            </div>
            <div className="border shadow-md rounded-md border-gray-300">
              <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GitHub />}
                  onClick={handleGitHubSignUp}
                  sx={{ justifyContent: 'center', py: 1 }}
                  disabled={isLoading}
               >
                GitHub
              </Button>
            </div>
          </div>
        </Stack>

        {/* Divider */}
        <Box sx={{ position: "relative", my: 3 }}>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              position: "absolute", top: -10, left: "50%",
              transform: "translateX(-50%)", bgcolor: "background.paper",
              px: 1, color: "text.secondary",
            }}
          >
            OR
          </Typography>
        </Box>

        {/* Sign-up Form */}
        {/* Sử dụng handleSubmit từ react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            {/* First Name Field */}
            <TextField
              label="Tên"
              variant="outlined"
              fullWidth
              {...registerField("firstName")} // Đăng ký field
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              placeholder="John"
              disabled={isLoading}
              autoComplete="given-name"
            />

            {/* Last Name */}
            <TextField
              label="Họ"
              variant="outlined"
              fullWidth
              {...registerField("lastName")} // Đăng ký field
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              placeholder="Doe"
              disabled={isLoading}
              autoComplete="family-name"
            />

            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              {...registerField("email")} // Đăng ký field
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="you@example.com"
              disabled={isLoading}
              autoComplete="email"
            />

            {/* Password Field */}
            <TextField
              label="Mật khẩu"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              {...registerField("password")} // Đăng ký field
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Xác nhận mật khẩu"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              {...registerField("confirmPassword")} // Đăng ký field
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading} // Disable khi đang loading
              sx={{ py: 1.5, mt: 1 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit"/> : "Đăng ký"}
            </Button>
          </Stack>
        </form>

        {/* Sign In Link */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Box component="span">
            Đã có tài khoản?{" "}
            <Button
              onClick={handleSignInClick}
              // className="text-primary font-bold" // Giữ lại nếu dùng Tailwind
              color="primary"
              disabled={isLoading}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Đăng nhập
            </Button>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}

RegisterForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  // Bỏ toggleForm nếu không dùng nữa
};

export default RegisterForm;