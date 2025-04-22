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
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Alert
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser, register, logout } from "../../State/Auth/Action";
import ForgotPassword from "./ForgotPassword";
import { authService } from "../../services/auth.service";

// Main component that contains both forms
const AuthForms = ({ handleClose }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  
  const handleForgotPasswordOpen = () => {
    setShowForgotPassword(true);
  };
  
  const handleForgotPasswordClose = () => {
    console.log("handleForgotPasswordClose called");
    setShowForgotPassword(false);
  };
  
  const handleModalClick = (e) => {
    // Prevent event propagation
    e.stopPropagation();
  };
  
  return (
    <div onClick={handleModalClick}>
      {showLoginForm ? (
        <LoginForm 
          handleClose={handleClose} 
          toggleForm={toggleForm} 
          onForgotPasswordClick={handleForgotPasswordOpen}
        />
      ) : (
        <RegisterForm 
          handleClose={handleClose} 
          toggleForm={toggleForm}
        />
      )}
      
      {/* Dialog for forgot password flow */}
     <Dialog
        open={showForgotPassword}
        onClose={(event, reason) => {
          console.log('Dialog onClose triggered. Reason:', reason);
          handleForgotPasswordClose();
        }}
        maxWidth="sm"
        fullWidth
        onClick={handleModalClick}
      >
        <DialogContent onClick={handleModalClick}>
          <ForgotPassword onBackToLogin={handleForgotPasswordClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

AuthForms.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

// LoginForm Component
function LoginForm({ handleClose, toggleForm, onForgotPasswordClick }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
    e.stopPropagation();
    if (validateForm()) {
      dispatch(login(formData));
    }
  };

  const handleTogglePassword = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onForgotPasswordClick) {
      onForgotPasswordClick();
    }
  };

  const handleGoogleLogin = (e) => {
    e.stopPropagation();
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleGitHubLogin = (e) => {
    e.stopPropagation();
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3 }} onClick={(e) => e.stopPropagation()}>
      <Typography variant="h5" gutterBottom onClick={(e) => e.stopPropagation()}>
        Welcome Back
      </Typography>
      <Typography variant="body2" color="textSecondary" onClick={(e) => e.stopPropagation()}>
        Sign in to your account
      </Typography>

      <CardContent className="space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="border shadow-md rounded-md border-gray-300" onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="outline" 
              className="w-full border" 
              onClick={handleGoogleLogin}
              fullWidth
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" onClick={(e) => e.stopPropagation()}>
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

          <div className="border shadow-md rounded-md border-gray-300" onClick={(e) => e.stopPropagation()}>
            <Button 
              fullWidth 
              className="border" 
              variant="" 
              onClick={handleGitHubLogin}
              startIcon={<Github />}
              sx={{borderColor: "black"}}
            >
              GitHub
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <TextField
            fullWidth
            required
            label="Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => {
              e.stopPropagation();
              setFormData({ ...formData, email: e.target.value });
            }}
            error={!!errors.email}
            helperText={errors.email}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            inputProps={{ 
              onClick: e => e.stopPropagation(),
              onFocus: e => e.stopPropagation(),
              onMouseDown: e => e.stopPropagation()
            }}
          />
          
          <TextField
            fullWidth
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formData.password}
            onChange={(e) => {
              e.stopPropagation();
              setFormData({ ...formData, password: e.target.value });
            }}
            error={!!errors.password}
            helperText={errors.password}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            inputProps={{ 
              onClick: e => e.stopPropagation(),
              onFocus: e => e.stopPropagation(),
              onMouseDown: e => e.stopPropagation()
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    onMouseDown={(e) => e.stopPropagation()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }} onClick={(e) => e.stopPropagation()}>
            <Button 
              onClick={handleForgotPasswordClick}
              sx={{ textTransform: 'none' }}
              color="primary"
            >
              Quên mật khẩu?
            </Button>
          </Box>

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3 }}
            onClick={(e) => e.stopPropagation()}
          >
            Sign In
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }} onClick={(e) => e.stopPropagation()}>
          <Box component="span" onClick={(e) => e.stopPropagation()}>
            Don't have an account?{" "}
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                toggleForm();
              }} 
              className="text-primary font-bold"
            >
              Sign Up Now
            </Button>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}

LoginForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  onForgotPasswordClick: PropTypes.func
};

// RegisterForm Component
function RegisterForm({ handleClose, toggleForm }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { auth } = useSelector(store => store);
  
  // Form steps
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Account Details', 'OTP Verification'];
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  // Error and status states
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Loading state
  const [loading, setLoading] = useState({ 
    register: false,
    verifyOtp: false,
    resendOtp: false 
  });

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

  // Handle input changes
  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear error for the field being updated
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ""
      }));
    }
  };

  // Toggle password visibility
  const handleTogglePassword = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = (e) => {
    e.stopPropagation();
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validate the form data for first step
  const validateAccountDetails = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Validate the OTP
  const validateOtp = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
      isValid = false;
    } else if (formData.otp.length !== 6 || !/^\d+$/.test(formData.otp)) {
      newErrors.otp = "OTP must be 6 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // First step submission - Register the account
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (validateAccountDetails()) {
      setLoading({ ...loading, register: true });
      setStatusMessage("");
      setMessageType("");

      try {
        // Register the user - this should send an OTP
        const userData = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password
        };

        const response = await authService.register(userData);
        console.log("Registration initiated response:", response);
        
        // Move to OTP verification step
        setActiveStep(1);
        setStatusMessage("Registration initiated. Please check your email for OTP.");
        setMessageType("success");
      } catch (error) {
        console.error("Registration error:", error);
        setStatusMessage(error.response?.data?.message || "Failed to register. Please try again.");
        setMessageType("error");
      } finally {
        setLoading({ ...loading, register: false });
      }
    }
  };

  // Verify OTP submission
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (validateOtp()) {
      setLoading({ ...loading, verifyOtp: true });
      setStatusMessage("");
      setMessageType("");

      try {
        const response = await authService.verifyOtp(formData.email, formData.otp);
        console.log("OTP verification response:", response);
        
        // If successful, show message and prepare for auto-login or redirect
        setStatusMessage("Account verified successfully! You can now log in.");
        setMessageType("success");
        
        // Optionally auto-login the user or redirect to login
        setTimeout(() => {
          toggleForm(); // Switch to login form
        }, 2000);
      } catch (error) {
        console.error("OTP verification error:", error);
        setStatusMessage(error.response?.data?.message || "Failed to verify OTP. Please try again.");
        setMessageType("error");
      } finally {
        setLoading({ ...loading, verifyOtp: false });
      }
    }
  };

  // Resend OTP
  const handleResendOtp = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading({ ...loading, resendOtp: true });
    setStatusMessage("");
    setMessageType("");

    try {
      const response = await authService.resendOtp(formData.email);
      console.log("Resend OTP response:", response);
      
      setStatusMessage("OTP resent successfully. Please check your email.");
      setMessageType("success");
    } catch (error) {
      console.error("Resend OTP error:", error);
      setStatusMessage(error.response?.data?.message || "Failed to resend OTP. Please try again.");
      setMessageType("error");
    } finally {
      setLoading({ ...loading, resendOtp: false });
    }
  };

  // Go back to account details step
  const handleBackToDetails = () => {
    setActiveStep(0);
  };

  // Handle social sign-ups
  const handleGoogleSignUp = (e) => {
    e.stopPropagation();
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleGitHubSignUp = (e) => {
    e.stopPropagation();
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 0 }} onClick={(e) => e.stopPropagation()}>
      <CardContent sx={{ p: 2 }} onClick={(e) => e.stopPropagation()}>
        <Typography variant="h5" component="h1" gutterBottom align="center" fontWeight="bold" onClick={(e) => e.stopPropagation()}>
          Create an Account
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }} onClick={(e) => e.stopPropagation()}>
          Sign up to get started with our service
        </Typography>

        {/* Stepper showing progress */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Status message display */}
        {statusMessage && (
          <Alert 
            severity={messageType} 
            sx={{ mb: 2 }}
            onClose={() => {
              setStatusMessage("");
              setMessageType("");
            }}
          >
            {statusMessage}
          </Alert>
        )}

        {activeStep === 0 ? (
          <>
            {/* Social Sign-up Buttons */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }} onClick={(e) => e.stopPropagation()}>
              <div className="flex w-full flex-col space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="border shadow-md rounded-md border-gray-300" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="" 
                    fullWidth 
                    startIcon={<Google />} 
                    onClick={handleGoogleSignUp} 
                    sx={{ py: 1 }}
                  >
                    Google
                  </Button>
                </div>

                <div className="border shadow-md rounded-md border-gray-300" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="" 
                    fullWidth 
                    startIcon={<Github />} 
                    onClick={handleGitHubSignUp} 
                    sx={{ py: 1 }}
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </Stack>

            {/* Divider */}
            <Box sx={{ position: "relative", my: 3 }} onClick={(e) => e.stopPropagation()}>
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
                onClick={(e) => e.stopPropagation()}
              >
                OR
              </Typography>
            </Box>

            {/* Account Details Form */}
            <form onSubmit={handleRegisterSubmit} onClick={(e) => e.stopPropagation()}>
              <Stack spacing={2.5} onClick={(e) => e.stopPropagation()}>
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
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                  inputProps={{ 
                    onClick: e => e.stopPropagation(),
                    onFocus: e => e.stopPropagation(),
                    onMouseDown: e => e.stopPropagation()
                  }}
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
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                  inputProps={{ 
                    onClick: e => e.stopPropagation(),
                    onFocus: e => e.stopPropagation(),
                    onMouseDown: e => e.stopPropagation()
                  }}
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
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                  inputProps={{ 
                    onClick: e => e.stopPropagation(),
                    onFocus: e => e.stopPropagation(),
                    onMouseDown: e => e.stopPropagation()
                  }}
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
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                  inputProps={{ 
                    onClick: e => e.stopPropagation(),
                    onFocus: e => e.stopPropagation(),
                    onMouseDown: e => e.stopPropagation()
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={(e) => e.stopPropagation()}>
                        <IconButton 
                          aria-label="toggle password visibility" 
                          onClick={handleTogglePassword} 
                          onMouseDown={(e) => e.stopPropagation()}
                          edge="end"
                        >
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
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                  inputProps={{ 
                    onClick: e => e.stopPropagation(),
                    onFocus: e => e.stopPropagation(),
                    onMouseDown: e => e.stopPropagation()
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={(e) => e.stopPropagation()}>
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleToggleConfirmPassword}
                          onMouseDown={(e) => e.stopPropagation()}
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
                  disabled={loading.register}
                  sx={{ py: 1.5, mt: 1 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {loading.register ? "Registering..." : "Continue"}
                </Button>
              </Stack>
            </form>
          </>
        ) : (
          /* OTP Verification Step */
          <form onSubmit={handleVerifyOtp} onClick={(e) => e.stopPropagation()}>
            <Stack spacing={2.5} onClick={(e) => e.stopPropagation()}>
              {/* Email display */}
              <Typography variant="body1" align="center" sx={{ mb: 1 }} onClick={(e) => e.stopPropagation()}>
                Enter the verification code sent to:
              </Typography>
              <Typography variant="body1" align="center" fontWeight="bold" sx={{ mb: 2 }} onClick={(e) => e.stopPropagation()}>
                {formData.email}
              </Typography>
              
              {/* OTP Field */}
              <TextField
                label="Verification Code"
                variant="outlined"
                fullWidth
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                error={!!errors.otp}
                helperText={errors.otp}
                placeholder="Enter 6-digit code"
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                inputProps={{ 
                  maxLength: 6,
                  onClick: e => e.stopPropagation(),
                  onFocus: e => e.stopPropagation(),
                  onMouseDown: e => e.stopPropagation()
                }}
              />

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleBackToDetails}
                  disabled={loading.verifyOtp || loading.resendOtp}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading.verifyOtp}
                >
                  {loading.verifyOtp ? "Verifying..." : "Verify Account"}
                </Button>
              </Stack>
              
              {/* Resend OTP Button */}
              <Button
                color="primary"
                onClick={handleResendOtp}
                disabled={loading.resendOtp}
                sx={{ mt: 1 }}
              >
                {loading.resendOtp ? "Sending..." : "Resend Verification Code"}
              </Button>
            </Stack>
          </form>
        )}

        {/* Sign In Link */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }} onClick={(e) => e.stopPropagation()}>
          <Box component="span" onClick={(e) => e.stopPropagation()}>
            Already have an account?{" "}
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                toggleForm();
              }} 
              className="text-primary font-bold"
            >
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