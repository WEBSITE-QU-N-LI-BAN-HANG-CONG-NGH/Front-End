"use client"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import GitHub from "@mui/icons-material/GitHub"
import Google from "@mui/icons-material/Google"
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
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
  Alert
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useDispatch, useSelector } from "react-redux"
import { getUser, register, logout } from "../../State/Auth/Action"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../../services/api"

function RegisterForm({ handleClose }) {
  const dispatch = useDispatch()
  const auth = useSelector((store) => store.auth)
  const { isLoading, error, jwt } = auth
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (jwt) {
      console.log("JWT đã được phát hiện, đóng form đăng ký")
      handleClose()
    }
  }, [jwt, handleClose])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleCloseMenu()
  }

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Error state
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user types
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null,
      })
    }
  }

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  // Validate form
  const validateForm = () => {
    let isValid = true
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }

    // Validate full name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Tên không được để trống"
      isValid = false
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Họ không được để trống"
      isValid = false
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email không được để trống"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
      isValid = false
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
      isValid = false
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
      isValid = false
    }

    setValidationErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Đang gửi yêu cầu đăng ký với:", formData)
      
      // Loại bỏ confirmPassword vì backend không cần
      const { confirmPassword, ...userData } = formData;
      dispatch(register(userData))
    } else {
      console.log("Form không hợp lệ, không thể đăng ký")
    }
  }

  // Handle social sign-ups
  const handleGoogleSignUp = () => {
    console.log("Bắt đầu đăng ký với Google");
    // Khởi tạo tham số trạng thái và URL chuyển hướng
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth2/redirect/google`);
    
    // Xây dựng URL đầy đủ
    const googleAuthUrl = `${API_BASE_URL}/oauth2/authorization/google?redirect_uri=${redirectUri}`;
    
    console.log("Chuyển hướng đến:", googleAuthUrl);
    window.location.href = googleAuthUrl;
  }

  const handleGitHubSignUp = () => {
    console.log("Bắt đầu đăng ký với GitHub");
    // Khởi tạo tham số trạng thái và URL chuyển hướng
    const redirectUri = encodeURIComponent(`${window.location.origin}/oauth2/redirect/github`);
    
    // Xây dựng URL đầy đủ
    const githubAuthUrl = `${API_BASE_URL}/oauth2/authorization/github?redirect_uri=${redirectUri}`;
    
    console.log("Chuyển hướng đến:", githubAuthUrl);
    window.location.href = githubAuthUrl;
  }

  const handleSignInClick = (e) => {
    e.preventDefault();
    navigate('/login');
    handleClose();
  };

  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 0 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
          Tạo tài khoản mới
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Điền thông tin bên dưới để đăng ký
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Social Sign-up Buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <div className="flex w-full flex-col space-y-4">
            <div className="border shadow-md rounded-md border-gray-300">
              <Button variant="" fullWidth startIcon={<Google />} onClick={handleGoogleSignUp} sx={{ py: 1 }}>
                Google
              </Button>
            </div>

            <div className="border shadow-md rounded-md border-gray-300">
              <Button variant="" fullWidth startIcon={<GitHub />} onClick={handleGitHubSignUp} sx={{ py: 1 }}>
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
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "background.paper",
              px: 1,
              color: "text.secondary",
            }}
          >
            OR
          </Typography>
        </Box>

        {/* Sign-up Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {/* Full Name Field */}
            <TextField
              label="Tên"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!validationErrors.firstName}
              helperText={validationErrors.firstName}
              placeholder="John"
              disabled={isLoading}
            />

            {/* last name */}
            <TextField
              label="Họ"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!validationErrors.lastName}
              helperText={validationErrors.lastName}
              placeholder="Doe"
              disabled={isLoading}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              placeholder="you@example.com"
              disabled={isLoading}
            />

            {/* Password Field */}
            <TextField
              label="Mật khẩu"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!validationErrors.confirmPassword}
              helperText={validationErrors.confirmPassword}
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
              disabled={isLoading}
              sx={{ py: 1.5, mt: 1 }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Đăng ký"}
            </Button>
          </Stack>
        </form>

        {/* Sign In Link */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Box component="span">
            Đã có tài khoản?{" "}
            <Button onClick={handleSignInClick} className="text-primary font-bold" disabled={isLoading}>
              Đăng nhập
            </Button>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}
RegisterForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default RegisterForm