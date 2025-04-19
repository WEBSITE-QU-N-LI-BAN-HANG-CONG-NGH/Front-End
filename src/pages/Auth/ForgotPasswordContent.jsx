// src/pages/Auth/ForgotPasswordContent.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';

// Component hiển thị nội dung quên mật khẩu ngay trong modal
const ForgotPasswordContent = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Xử lý khi người dùng gửi email
  const handleEmailSubmit = async (email) => {
    setLoading(true);
    setError('');
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Thay thế bằng API call thực tế
      // await authService.requestPasswordReset(email);
      
      setEmail(email);
      setStep(2);
    } catch (err) {
      setError('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi người dùng gửi mã OTP
  const handleOtpSubmit = async (otp) => {
    setLoading(true);
    setError('');
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Thay thế bằng API call thực tế
      // await authService.verifyOtp(email, otp);
      
      setStep(3);
    } catch (err) {
      setError('Mã OTP không hợp lệ hoặc đã hết hạn.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi người dùng đặt mật khẩu mới
  const handleResetPassword = async (password) => {
    setLoading(true);
    setError('');
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Thay thế bằng API call thực tế
      // await authService.resetPassword(email, password);
      
      setSuccess(true);
      setTimeout(() => {
        onBackToLogin();
      }, 3000);
    } catch (err) {
      setError('Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 1 }} onClick={e => e.stopPropagation()}>
      {success ? (
        <SuccessView />
      ) : (
        <>
          <Typography variant="h5" component="h2" gutterBottom onClick={e => e.stopPropagation()}>
            {step === 1 ? 'Quên mật khẩu' : 
             step === 2 ? 'Xác nhận mã OTP' : 'Đặt lại mật khẩu'}
          </Typography>
          
          {step === 1 && (
            <EmailForm 
              onSubmit={handleEmailSubmit}
              loading={loading}
              error={error}
              onBack={onBackToLogin}
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
    </Box>
  );
};

// Component hiển thị khi đặt lại mật khẩu thành công
const SuccessView = () => (
  <Box sx={{ textAlign: 'center', py: 2 }} onClick={e => e.stopPropagation()}>
    <Typography variant="h6" color="primary" gutterBottom onClick={e => e.stopPropagation()}>
      Đặt lại mật khẩu thành công!
    </Typography>
    <Typography variant="body1" paragraph onClick={e => e.stopPropagation()}>
      Mật khẩu của bạn đã được cập nhật.
    </Typography>
    <Typography variant="body2" color="text.secondary" onClick={e => e.stopPropagation()}>
      Bạn có thể đăng nhập với mật khẩu mới.
    </Typography>
  </Box>
);

// Form nhập email
const EmailForm = ({ onSubmit, loading, error, onBack }) => {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateForm = () => {
    if (!email) {
      setValidationError('Vui lòng nhập email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError('Email không hợp lệ');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateForm()) {
      onSubmit(email);
    }
  };

  const handleChange = (e) => {
    e.stopPropagation();
    setEmail(e.target.value);
    if (validationError) {
      setValidationError('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
      <Typography variant="body2" color="text.secondary" paragraph onClick={e => e.stopPropagation()}>
        Vui lòng nhập địa chỉ email của bạn để nhận mã xác thực.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClick={e => e.stopPropagation()}>
          {error}
        </Alert>
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
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        error={!!validationError}
        helperText={validationError}
        disabled={loading}
        inputProps={{ 
          onClick: e => e.stopPropagation(),
          onFocus: e => e.stopPropagation(),
          onMouseDown: e => e.stopPropagation()
        }}
      />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }} onClick={e => e.stopPropagation()}>
        <Button 
          color="inherit"
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          disabled={loading}
        >
          Quay lại đăng nhập
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
          {loading ? <CircularProgress size={24} /> : 'Tiếp tục'}
        </Button>
      </Box>
    </Box>
  );
};

// Form nhập mã OTP
const OtpForm = ({ onSubmit, loading, error, email, onBack }) => {
  const [otp, setOtp] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateForm = () => {
    if (!otp) {
      setValidationError('Vui lòng nhập mã OTP');
      return false;
    }
    if (!/^\d{6}$/.test(otp)) {
      setValidationError('Mã OTP phải gồm 6 chữ số');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateForm()) {
      onSubmit(otp);
    }
  };

  const handleChange = (e) => {
    e.stopPropagation();
    setOtp(e.target.value);
    if (validationError) {
      setValidationError('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
      <Typography variant="body2" color="text.secondary" paragraph onClick={e => e.stopPropagation()}>
        Chúng tôi đã gửi mã xác thực đến {email}. Vui lòng kiểm tra email và nhập mã 6 chữ số.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClick={e => e.stopPropagation()}>
          {error}
        </Alert>
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
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        error={!!validationError}
        helperText={validationError}
        inputProps={{ 
          maxLength: 6, 
          onClick: e => e.stopPropagation(),
          onFocus: e => e.stopPropagation(),
          onMouseDown: e => e.stopPropagation()
        }}
        disabled={loading}
      />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }} onClick={e => e.stopPropagation()}>
        <Button 
          color="inherit"
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
          {loading ? <CircularProgress size={24} /> : 'Xác nhận'}
        </Button>
      </Box>
    </Box>
  );
};

// Form đặt lại mật khẩu
const ResetPasswordForm = ({ onSubmit, loading, error, onBack }) => {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const errors = {
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!passwords.password) {
      errors.password = 'Vui lòng nhập mật khẩu mới';
      isValid = false;
    } else if (passwords.password.length < 8) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      isValid = false;
    }

    if (!passwords.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      isValid = false;
    } else if (passwords.confirmPassword !== passwords.password) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateForm()) {
      onSubmit(passwords.password);
    }
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
      <Typography variant="body2" color="text.secondary" paragraph onClick={e => e.stopPropagation()}>
        Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClick={e => e.stopPropagation()}>
          {error}
        </Alert>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mật khẩu mới"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoFocus
        value={passwords.password}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        error={!!validationErrors.password}
        helperText={validationErrors.password}
        disabled={loading}
        inputProps={{ 
          onClick: e => e.stopPropagation(),
          onFocus: e => e.stopPropagation(),
          onMouseDown: e => e.stopPropagation()
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={e => e.stopPropagation()}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
                onMouseDown={(e) => e.stopPropagation()}
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
        type={showConfirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        value={passwords.confirmPassword}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        error={!!validationErrors.confirmPassword}
        helperText={validationErrors.confirmPassword}
        disabled={loading}
        inputProps={{ 
          onClick: e => e.stopPropagation(),
          onFocus: e => e.stopPropagation(),
          onMouseDown: e => e.stopPropagation()
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={e => e.stopPropagation()}>
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }} onClick={e => e.stopPropagation()}>
        <Button 
          color="inherit"
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
          {loading ? <CircularProgress size={24} /> : 'Đặt lại mật khẩu'}
        </Button>
      </Box>
    </Box>
  );
};

// Khai báo prop types
EmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onBack: PropTypes.func.isRequired
};

OtpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  email: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
};

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onBack: PropTypes.func.isRequired
};

ForgotPasswordContent.propTypes = {
  onBackToLogin: PropTypes.func.isRequired
};

export default ForgotPasswordContent;