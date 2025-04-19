// src/components/features/auth/ForgotPasswordFlow.jsx
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Container
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from "prop-types";

// Form 1: Nhập email để yêu cầu reset mật khẩu
const EmailForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const validateForm = () => {
    if (!email) {
      setValidationError("Vui lòng nhập email");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError("Email không hợp lệ");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    
    if (validateForm()) {
      onSubmit(email);
    }
  };

  // Sửa lỗi: Xử lý onChange và ngăn chặn propagation
  const handleChange = (e) => {
    if (e) e.stopPropagation();
    setEmail(e.target.value);
    if (validationError) {
      setValidationError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <Typography variant="h6" gutterBottom>
        Quên mật khẩu
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Vui lòng nhập email để nhận mã xác thực
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        required
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        error={!!validationError}
        helperText={validationError}
        disabled={loading}
        inputProps={{ 
          onClick: e => e.stopPropagation()  // Thêm dòng này
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading}
        onClick={(e) => {
          e.stopPropagation();
          handleSubmit(e);
        }}
      >
        {loading ? <CircularProgress size={24} /> : "Tiếp tục"}
      </Button>
    </form>
  );
};

EmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
};

// Form 2: Nhập mã OTP
const OtpForm = ({ onSubmit, loading, error, email, onBack }) => {
  const [otp, setOtp] = useState("");
  const [validationError, setValidationError] = useState("");

  const validateForm = () => {
    if (!otp) {
      setValidationError("Vui lòng nhập mã OTP");
      return false;
    }
    if (!/^\d{6}$/.test(otp)) {
      setValidationError("Mã OTP phải gồm 6 chữ số");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    
    if (validateForm()) {
      onSubmit(otp);
    }
  };

  const handleChange = (e) => {
    if (e) e.stopPropagation();
    setOtp(e.target.value);
    if (validationError) {
      setValidationError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <Typography variant="h6" gutterBottom>
        Nhập mã xác thực
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Vui lòng nhập mã xác thực 6 chữ số đã được gửi đến {email}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        required
        label="Mã OTP"
        margin="normal"
        value={otp}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        error={!!validationError}
        helperText={validationError}
        inputProps={{ maxLength: 6 }}
        disabled={loading}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          disabled={loading}
        >
          Quay lại
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit(e);
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Xác nhận"}
        </Button>
      </Box>
    </form>
  );
};

OtpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  email: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
};

// Form 3: Đặt mật khẩu mới
const ResetPasswordForm = ({ onSubmit, loading, error, onBack }) => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: ""
  });
  const [validationErrors, setValidationErrors] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const errors = {
      password: "",
      confirmPassword: ""
    };
    let isValid = true;

    if (!passwords.password) {
      errors.password = "Vui lòng nhập mật khẩu mới";
      isValid = false;
    } else if (passwords.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
      isValid = false;
    }

    if (!passwords.confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      isValid = false;
    } else if (passwords.confirmPassword !== passwords.password) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();
    
    if (validateForm()) {
      onSubmit(passwords.password);
    }
  };

  const handleChange = (e) => {
    if (e) e.stopPropagation();
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <Typography variant="h6" gutterBottom>
        Đặt mật khẩu mới
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        required
        label="Mật khẩu mới"
        type={showPassword ? "text" : "password"}
        name="password"
        margin="normal"
        value={passwords.password}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        error={!!validationErrors.password}
        helperText={validationErrors.password}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        required
        label="Xác nhận mật khẩu"
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        margin="normal"
        value={passwords.confirmPassword}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        error={!!validationErrors.confirmPassword}
        helperText={validationErrors.confirmPassword}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          disabled={loading}
        >
          Quay lại
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit(e);
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Đặt lại mật khẩu"}
        </Button>
      </Box>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onBack: PropTypes.func.isRequired
};

// Component chính kết hợp cả 3 form
const ForgotPasswordFlow = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleEmailSubmit = async (email) => {
    setLoading(true);
    setError("");
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Thay thế bằng API call thực tế
      // await authService.requestPasswordReset(email);
      setEmail(email);
      setStep(2);
    } catch (err) {
      setError("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (otp) => {
    setLoading(true);
    setError("");
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Thay thế bằng API call thực tế
      // await authService.verifyOtp(email, otp);
      setStep(3);
    } catch (err) {
      setError("Mã OTP không hợp lệ hoặc đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (password) => {
    setLoading(true);
    setError("");
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Thay thế bằng API call thực tế
      // await authService.resetPassword(email, password);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" onClick={(e) => e.stopPropagation()}>
      <Box
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          p: 3
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          <Box sx={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <Typography variant="h6" color="primary" gutterBottom>
              Đặt lại mật khẩu thành công!
            </Typography>
            <Typography variant="body2">
              Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập với mật khẩu mới.
            </Typography>
            <Button 
              fullWidth 
              variant="contained" 
              sx={{ mt: 2 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              Quay lại đăng nhập
            </Button>
          </Box>
        ) : step === 1 ? (
          <EmailForm 
            onSubmit={handleEmailSubmit} 
            loading={loading} 
            error={error} 
          />
        ) : step === 2 ? (
          <OtpForm 
            onSubmit={handleOtpSubmit} 
            loading={loading} 
            error={error} 
            email={email}
            onBack={() => setStep(1)}
          />
        ) : (
          <ResetPasswordForm 
            onSubmit={handleResetPassword} 
            loading={loading} 
            error={error}
            onBack={() => setStep(2)}
          />
        )}
      </Box>
    </Container>
  );
};

ForgotPasswordFlow.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ForgotPasswordFlow;