import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Typography, Box, Alert } from '@mui/material';
import { loginSuccess, getUser } from '../../State/Auth/Action';
import { authService } from '../../services/auth.service';
import { getCodeFromUrl, saveTokenToLocalStorage, saveRefreshTokenToCookie } from '../../services/util';

const OAuthRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        const code = getCodeFromUrl();
        if (!code) {
          setStatus('error');
          setError('Không tìm thấy mã OAuth trong URL');
          return;
        }

        // Xác định provider từ đường dẫn
        const path = location.pathname;
        let provider = 'unknown';
        if (path.includes('google')) {
          provider = 'google';
        } else if (path.includes('github')) {
          provider = 'github';
        }

        console.log(`Đang xử lý đăng nhập ${provider} với code: ${code}`);
        
        // Gọi API xử lý OAuth
        const result = await authService.handleOAuthLogin(code, provider);
        
        if (result.success) {
          // Xử lý thành công
          const { accessToken } = result.data;
          if (accessToken) {
            dispatch(loginSuccess(accessToken));
            dispatch(getUser());
            setStatus('success');
            
            // Chuyển hướng đến trang chủ sau 2 giây
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else {
            throw new Error('Không nhận được token từ server');
          }
        } else {
          throw new Error(result.error || 'Đăng nhập không thành công');
        }
      } catch (error) {
        console.error('Lỗi khi xử lý đăng nhập OAuth:', error);
        setStatus('error');
        setError(error.message || 'Đã xảy ra lỗi khi đăng nhập');
        
        // Chuyển hướng đến trang đăng nhập sau 3 giây
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };

    handleOAuth();
  }, [dispatch, navigate, location.pathname]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: 3,
      }}
    >
      {status === 'loading' && (
        <>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 4 }}>
            Đang xử lý đăng nhập...
          </Typography>
        </>
      )}

      {status === 'success' && (
        <Alert
          severity="success"
          sx={{ width: '100%', maxWidth: 500, marginTop: 2 }}
        >
          Đăng nhập thành công! Đang chuyển hướng đến trang chủ...
        </Alert>
      )}

      {status === 'error' && (
        <Alert
          severity="error"
          sx={{ width: '100%', maxWidth: 500, marginTop: 2 }}
        >
          {error}. Đang chuyển hướng về trang đăng nhập...
        </Alert>
      )}
    </Box>
  );
};

export default OAuthRedirect; 