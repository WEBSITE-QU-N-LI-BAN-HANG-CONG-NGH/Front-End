// src/pages/Auth/ForgotPasswordPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box } from '@mui/material';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  
  const handleGoBack = () => {
    navigate('/sign-in');
  };
  
  // Xử lý khi người dùng gửi email để lấy mã OTP
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

  // Xử lý khi người dùng gửi mã OTP
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

  // Xử lý khi người dùng đặt lại mật khẩu
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
        navigate('/sign-in');
      }, 3000);
    } catch (err) {
      setError("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ my: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {success ? (
            <SuccessView onBackToLogin={handleGoBack} />
          ) : (
            <>
              <Typography variant="h5" component="h1" gutterBottom>
                {step === 1 ? "Quên mật khẩu" : 
                 step === 2 ? "Xác thực mã OTP" : "Đặt lại mật khẩu"}
              </Typography>
              
              {step === 1 && (
                <EmailForm 
                  onSubmit={handleEmailSubmit}
                  loading={loading}
                  error={error}
                  onBack={handleGoBack}
                />
              )}
              
              {step === 2 && (
                <OtpForm
                  onSubmit={handleOtpSubmit}
                  loading={loading}
                  error={error}
                  email={email}
                  onBack={() => setStep(1)}
                />
              )}
              
              {step === 3 && (
                <ResetPasswordForm
                  onSubmit={handleResetPassword}
                  loading={loading}
                  error={error}
                  onBack={() => setStep(2)}
                />
              )}
            </>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

// Component hiển thị khi đặt lại mật khẩu thành công
const SuccessView = ({ onBackToLogin }) => (
  <Box sx={{ textAlign: 'center', py: 2 }}>
    <Typography variant="h6" color="primary" gutterBottom>
      Đặt lại mật khẩu thành công!
    </Typography>
    <Typography variant="body1" paragraph>
      Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập với mật khẩu mới.
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Đang chuyển hướng về trang đăng nhập...
    </Typography>
  </Box>
);

// Form nhập email để lấy mã OTP
const EmailForm = ({ onSubmit, loading, error, onBack }) => {
  const [email, setEmail] = React.useState("");
  const [validationError, setValidationError] = React.useState("");

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
    e.preventDefault();
    if (validateForm()) {
      onSubmit(email);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary" paragraph>
        Vui lòng nhập địa chỉ email của bạn để nhận mã xác thực.
      </Typography>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1, mb: 1 }}>
          {error}
        </Typography>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (validationError) setValidationError("");
        }}
        error={!!validationError}
        helperText={validationError}
        disabled={loading}
      />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          color="inherit"
          onClick={onBack}
          disabled={loading}
        >
          Quay lại đăng nhập
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Tiếp tục"}
        </Button>
      </Box>
    </Box>
  );
};

// Form nhập mã OTP
const OtpForm = ({ onSubmit, loading, error, email, onBack }) => {
  const [otp, setOtp] = React.useState("");
  const [validationError, setValidationError] = React.useState("");

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
    e.preventDefault();
    if (validateForm()) {
      onSubmit(otp);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary" paragraph>
        Chúng tôi đã gửi mã xác thực đến {email}. Vui lòng kiểm tra email và nhập mã 6 chữ số.
      </Typography>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1, mb: 1 }}>
          {error}
        </Typography>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="otp"
        label="Mã OTP"
        id="otp"
        autoFocus
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value);
          if (validationError) setValidationError("");
        }}
        error={!!validationError}
        helperText={validationError}
        inputProps={{ maxLength: 6 }}
        disabled={loading}
      />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          color="inherit"
          onClick={onBack}
          disabled={loading}
        >
          Quay lại
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Xác nhận"}
        </Button>
      </Box>
    </Box>
  );
};

// Form đặt lại mật khẩu
const ResetPasswordForm = ({ onSubmit, loading, error, onBack }) => {
  const [passwords, setPasswords] = React.useState({
    password: "",
    confirmPassword: ""
  });
  const [validationErrors, setValidationErrors] = React.useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
    e.preventDefault();
    if (validateForm()) {
      onSubmit(passwords.password);
    }
  };

  const handleChange = (e) => {
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary" paragraph>
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
      </Typography>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1, mb: 1 }}>
          {error}
        </Typography>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mật khẩu mới"
        type={showPassword ? "text" : "password"}
        id="password"
        autoFocus
        value={passwords.password}
        onChange={handleChange}
        error={!!validationErrors.password}
        helperText={validationErrors.password}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        type={showConfirmPassword ? "text" : "password"}
        id="confirmPassword"
        value={passwords.confirmPassword}
        onChange={handleChange}
        error={!!validationErrors.confirmPassword}
        helperText={validationErrors.confirmPassword}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          color="inherit"
          onClick={onBack}
          disabled={loading}
        >
          Quay lại
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Đặt lại mật khẩu"}
        </Button>
      </Box>
    </Box>
  );
};

// Thêm import các component cần thiết
import { 
  TextField, 
  Button, 
  CircularProgress, 
  InputAdornment, 
  IconButton 
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default ForgotPasswordPage;