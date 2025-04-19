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
  InputAdornment
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../State/Auth/Action";
import { useNavigate } from "react-router-dom";

function LoginForm({ handleClose, onForgotPasswordClick }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  return (
    <Card sx={{ width: "100%", mx: "auto", boxShadow: 0 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Sign in to your account
        </Typography>

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
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <TextField
            fullWidth
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
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

          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
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
          >
            Sign In
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Box component="span">
            Don't have an account?{" "}
            <Button 
              onClick={handleSignUpClick} 
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
  onForgotPasswordClick: PropTypes.func
};

export default LoginForm;