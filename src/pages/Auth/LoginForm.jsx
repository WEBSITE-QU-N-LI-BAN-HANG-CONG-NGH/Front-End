// src/pages/Auth/LoginForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Github from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";
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
import { getUser, login } from "../../State/Auth/Action";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/api";

function LoginForm({ handleClose, onForgotPasswordClick }) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const { isLoading, error, jwt } = auth;
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  // Kiểm tra nếu đã đăng nhập thì đóng form
  useEffect(() => {
    if(jwt) {
      console.log("JWT đã được phát hiện, đóng form đăng nhập");
      handleClose();
    }
  }, [jwt, handleClose]);

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    // Kiểm tra email
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }
    
    // Kiểm tra password
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Đang gửi yêu cầu đăng nhập với:", formData);
      dispatch(login(formData));
    } else {
      console.log("Form không hợp lệ, không thể đăng nhập");
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    handleClose();
    navigate('/sign-up');
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    // Gọi hàm từ prop để chuyển đến form quên mật khẩu
    if (onForgotPasswordClick) {
      onForgotPasswordClick();
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    console.log("Bắt đầu đăng nhập với Google");
    // Khởi tạo tham số trạng thái và URL chuyển hướng
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth2/redirect/google`);
    
    // Xây dựng URL đầy đủ (Lưu ý: Đường dẫn này phải khớp với cấu hình Spring Security OAuth2)
    const googleAuthUrl = `${API_BASE_URL}/oauth2/authorization/google?redirect_uri=${redirectUri}`;
    
    console.log("Chuyển hướng đến:", googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  const handleGitHubLogin = () => {
    console.log("Bắt đầu đăng nhập với GitHub");
    // Khởi tạo tham số trạng thái và URL chuyển hướng
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth2/redirect/github`);
    
    // Xây dựng URL đầy đủ (Lưu ý: Đường dẫn này phải khớp với cấu hình Spring Security OAuth2)
    const githubAuthUrl = `${API_BASE_URL}/oauth2/authorization/github?redirect_uri=${redirectUri}`;
    
    console.log("Chuyển hướng đến:", githubAuthUrl);
    window.location.href = githubAuthUrl;
  };

  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 0 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Chào mừng trở lại
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Đăng nhập vào tài khoản của bạn
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        <div className="space-y-4 mt-4">
          <div className="border shadow-md rounded-md border-gray-300">
            <Button 
              variant="outline" 
              className="w-full border" 
              onClick={handleGoogleLogin}
              fullWidth
            >
              <Google className="mr-2" />
              Google
            </Button>
          </div>

          <div className="border shadow-md rounded-md border-gray-300 mt-2">
            <Button 
              fullWidth 
              className="border" 
              variant="" 
              onClick={handleGitHubLogin}
              startIcon={<Github />}
            >
              GitHub
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <TextField
            fullWidth
            required
            label="Email"
            type="email"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            disabled={isLoading}
          />
          
          <TextField
            fullWidth
            required
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            name="password"
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            disabled={isLoading}
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

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Đăng nhập"}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Box component="span">
            Chưa có tài khoản?{" "}
            <Button 
              onClick={handleSignUpClick} 
              className="text-primary font-bold"
              disabled={isLoading}
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