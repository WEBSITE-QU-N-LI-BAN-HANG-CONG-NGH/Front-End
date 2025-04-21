// src/pages/Auth/LoginForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Github from "@mui/icons-material/GitHub";
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
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../State/Auth/Action"; // Chỉ cần login ở đây
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/ApiConfig";

// ** Định nghĩa validation schema bằng Zod **
const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email không được để trống" }) // Thêm kiểm tra rỗng
    .email({ message: "Email không hợp lệ" }),
  password: z.string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
});

function LoginForm({ handleClose, onForgotPasswordClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const { isLoading, error, jwt } = auth; // Lấy các state cần thiết từ Redux

  const [showPassword, setShowPassword] = useState(false);

  // ** Khởi tạo react-hook-form **
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema), // Sử dụng Zod resolver
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Kiểm tra nếu đã đăng nhập thì đóng form
  useEffect(() => {
    if (jwt) {
      console.log("JWT đã được phát hiện, đóng form đăng nhập");
      handleClose();
    }
  }, [jwt, handleClose]);

  // ** Hàm xử lý khi submit form (đã được validate bởi react-hook-form) **
  const onSubmit = (data) => {
    console.log("Đang gửi yêu cầu đăng nhập với:", data);
    dispatch(login(data)); // Gửi dữ liệu đã được validate
  };

  // --- Các hàm xử lý sự kiện khác ---
  const handleSignUpClick = (e) => {
    e.preventDefault();
    handleClose();
    navigate('/sign-up');
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    if (onForgotPasswordClick) {
      onForgotPasswordClick();
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    console.log("Bắt đầu đăng nhập với Google");

    const googleAuthUrl = `${API_BASE_URL}/oauth2/authorization/google`;
    console.log("Chuyển hướng đến:", googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  const handleGitHubLogin = () => {
    console.log("Bắt đầu đăng nhập với GitHub");

    const githubAuthUrl = `${API_BASE_URL}/oauth2/authorization/github`;
    console.log("Chuyển hướng đến:", githubAuthUrl);
    window.location.href = githubAuthUrl;
  };

  // --- Render Component ---
  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 0 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Chào mừng trở lại
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Đăng nhập vào tài khoản của bạn
        </Typography>

        {/* Hiển thị lỗi chung từ Redux */}
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-4 mt-4">
          <div className="border shadow-md rounded-md border-gray-300">
            <Button
              variant="outlined" // Sử dụng outlined để có border
              className="w-full" // Loại bỏ border mặc định nếu cần
              onClick={handleGoogleLogin}
              fullWidth
              disabled={isLoading} // Disable khi đang loading
              startIcon={<Google />} // Thêm startIcon cho nhất quán
              sx={{ justifyContent: 'center' }} // Căn giữa nội dung nút
            >
              Google
            </Button>
          </div>

          <div className="border shadow-md rounded-md border-gray-300 mt-2">
            <Button
              fullWidth
              variant="outlined" // Sử dụng outlined
              onClick={handleGitHubLogin}
              startIcon={<Github />}
              disabled={isLoading} // Disable khi đang loading
              sx={{ justifyContent: 'center' }} // Căn giữa
            >
              GitHub
            </Button>
          </div>
        </div>

        {/* Form Đăng nhập */}
        {/* Sử dụng handleSubmit từ react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '16px' }}>
          <TextField
            fullWidth
            // required // Không cần thiết vì Zod đã handle
            label="Email"
            type="email"
            margin="normal"
            {...register("email")} // ** Đăng ký field với react-hook-form **
            error={!!errors.email} // ** Lấy lỗi từ react-hook-form **
            helperText={errors.email?.message} // ** Hiển thị message lỗi từ Zod/react-hook-form **
            disabled={isLoading}
            autoComplete="email" // Thêm autocomplete
          />

          <TextField
            fullWidth
            // required // Không cần thiết
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            margin="normal"
            {...register("password")} // ** Đăng ký field **
            error={!!errors.password} // ** Lấy lỗi **
            helperText={errors.password?.message} // ** Hiển thị message lỗi **
            disabled={isLoading}
            autoComplete="current-password" // Thêm autocomplete
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password Button */}
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleForgotPasswordClick}
              sx={{ textTransform: 'none' }}
              color="primary"
              disabled={isLoading}
            >
              Quên mật khẩu?
            </Button>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isLoading} // Disable khi đang loading
          >
            {/* Hiển thị CircularProgress khi isLoading */}
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Đăng nhập"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Box component="span">
            Chưa có tài khoản?{" "}
            <Button
              onClick={handleSignUpClick}
              className="text-primary font-bold" // Giữ nguyên class nếu bạn dùng Tailwind
              color="primary" // Hoặc dùng màu primary của MUI
              disabled={isLoading}
              sx={{ textTransform: 'none', fontWeight: 'bold' }} // Style tương tự
            >
              Đăng ký ngay
            </Button>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}

LoginForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  onForgotPasswordClick: PropTypes.func
};

export default LoginForm;