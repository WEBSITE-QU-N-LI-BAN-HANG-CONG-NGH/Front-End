// src/pages/Auth/AuthForm.jsx
import React, { useState, useEffect } from "react";
import Github from "@mui/icons-material/GitHub";
import Google from "@mui/icons-material/Google";
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  InputAdornment, 
  IconButton,
  Divider,
  Stack,
  Dialog,
  DialogContent
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser, register, logout } from "../../State/Auth/Action";
import ForgotPasswordFlow from "../../components/features/auth/ForgotPasswordFlow";

// Main component that contains both forms
const AuthForms = ({ handleClose }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  
  return (
    <div>
      {showLoginForm ? (
        <LoginForm handleClose={handleClose} toggleForm={toggleForm} />
      ) : (
        <RegisterForm handleClose={handleClose} toggleForm={toggleForm} />
      )}
    </div>
  );
};

AuthForms.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

// LoginForm Component
function LoginForm({ handleClose, toggleForm }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if(jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, auth.jwt, dispatch])

  useEffect(() => {
    if(auth.jwt) {
      handleClose()
    }
  }, [auth.jwt, handleClose])

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (formData.password.length < 1) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(login(formData));
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordOpen = (e) => {
    e.stopPropagation(); // Ngăn sự kiện bubble lên
    setShowForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  // Ngăn chặn sự kiện click từ Dialog lan tỏa ra ngoài
  const handleDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Welcome Back
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Sign in to your account
      </Typography>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="border shadow-md rounded-md border-gray-300">
            <Button variant="outline" className="w-full border" onClick={handleGoogleLogin}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
            </Button>
          </div>

          <div className="border shadow-md rounded-md border-gray-300">
            <Button fullWidth className="border" variant="" onClick={handleGitHubLogin} startIcon={<Github />} sx={{borderColor: "black"}}>
              GitHub
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <TextField
            fullWidth
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Box component="span">
            Don't have an account?{" "}
            <Button onClick={toggleForm} className="text-primary font-bold">
              Sign Up Now
            </Button>
          </Box>
        </Typography>
        
        {/* Nút Quên mật khẩu được đặt dưới dòng đăng ký */}
        <Typography variant="body2" align="center">
          <Button 
            onClick={handleForgotPasswordOpen}
            sx={{ p: 0, textTransform: 'none' }}
            color="primary"
          >
            Quên mật khẩu?
          </Button>
        </Typography>
      </CardContent>

      {/* Dialog hiển thị luồng quên mật khẩu */}
      <Dialog 
        open={showForgotPassword} 
        onClose={handleForgotPasswordClose}
        maxWidth="sm"
        fullWidth
        onClick={handleDialogClick}
      >
        <DialogContent>
          <ForgotPasswordFlow onClose={handleForgotPasswordClose} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

LoginForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

// RegisterForm Component
function RegisterForm({ handleClose, toggleForm }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { auth } = useSelector(store => store);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if(jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);

  useEffect(() => {
    if(auth.jwt) {
      handleClose();
    }
  }, [auth.jwt, handleClose]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate full name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const { confirmPassword, ...userData } = formData;
      dispatch(register(userData));

      setTimeout(() => {
        setIsSubmitting(false);
      }, 100);
    }
  };

  // Handle social sign-ups
  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleGitHubSignUp = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 0 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold">
          Create an Account
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Sign up to get started with our service
        </Typography>

        {/* Social Sign-up Buttons */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <div className="flex w-full flex-col space-y-4">
            <div className="border shadow-md rounded-md border-gray-300">
              <Button variant="" fullWidth startIcon={<Google />} onClick={handleGoogleSignUp} sx={{ py: 1 }}>
                Google
              </Button>
            </div>

            <div className="border shadow-md rounded-md border-gray-300">
              <Button variant="" fullWidth startIcon={<Github />} onClick={handleGitHubSignUp} sx={{ py: 1 }}>
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
            {/* First Name Field */}
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              placeholder="John"
            />

            {/* Last Name */}
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              placeholder="Doe"
            />

            {/* Email Field */}
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="you@example.com"
            />

            {/* Password Field */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ py: 1.5, mt: 1 }}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>
          </Stack>
        </form>

        {/* Sign In Link */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Box component="span">
            Already have an account?{" "}
            <Button onClick={toggleForm} className="text-primary font-bold">
              Sign In Now
            </Button>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}

RegisterForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
};

export default AuthForms;