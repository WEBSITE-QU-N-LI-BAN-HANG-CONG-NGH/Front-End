// src/pages/OAuthRedirect.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Typography, Box, Alert } from '@mui/material';
import { loginSuccess, getUser } from '../../State/Auth/Action';
import { saveTokenToLocalStorage } from '../../services/util'; // Chỉ cần saveToken

const OAuthRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Dùng để lấy search params
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [error, setError] = useState('');

  useEffect(() => {
    // ** Hàm xử lý token từ URL **
    const handleOAuthRedirect = () => {
      console.log("Đang xử lý chuyển hướng OAuth tại:", location.search);
      // Sử dụng URLSearchParams để lấy tham số từ query string
      const params = new URLSearchParams(location.search);
      const token = params.get('token'); // ** Lấy tham số 'token' **
      const oauthError = params.get('error'); // ** Kiểm tra xem có tham số 'error' không **

      if (oauthError) {
        // Nếu backend redirect về với lỗi
        console.error("Lỗi OAuth từ backend:", oauthError);
        setStatus('error');
        setError(`Đăng nhập thất bại: ${oauthError}`);
        // Chuyển hướng về trang đăng nhập/trang chủ sau khi báo lỗi
        setTimeout(() => {
          navigate('/'); // Hoặc '/login' tùy bạn muốn
        }, 3000);
        return;
      }

      if (token) {
        // ** Tìm thấy token **
        console.log("Đã nhận được Access Token:", token);
        try {
          // Lưu token vào localStorage
          saveTokenToLocalStorage(token);
          // Dispatch action báo đăng nhập thành công với token mới
          dispatch(loginSuccess(token));
          // Dispatch action để lấy thông tin user với token vừa lưu
          dispatch(getUser()); // getUser sẽ sử dụng token từ localStorage thông qua interceptor

          setStatus('success');
          console.log("Đăng nhập OAuth thành công, đang chuyển hướng...");
          // Chuyển hướng đến trang chủ ngay lập tức hoặc sau một khoảng ngắn
          setTimeout(() => {
            navigate('/');
          }, 1500); // Giảm thời gian chờ

        } catch (e) {
            console.error("Lỗi khi xử lý token hoặc dispatch:", e);
            setStatus('error');
            setError('Có lỗi xảy ra khi xử lý thông tin đăng nhập.');
            setTimeout(() => { navigate('/'); }, 3000);
        }
      } else {
        // ** Không tìm thấy token trong URL **
        console.error("Không tìm thấy tham số 'token' trong URL redirect.");
        setStatus('error');
        setError('Thông tin đăng nhập không hợp lệ từ máy chủ.');
        // Chuyển hướng về trang đăng nhập/trang chủ
        setTimeout(() => {
          navigate('/'); // Hoặc '/login'
        }, 3000);
      }
    };

    handleOAuthRedirect();
    // Chỉ cần chạy một lần khi component mount và location.search thay đổi
  }, [dispatch, navigate, location.search]);

  // --- Render Component ---
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
            Đang xác thực... {/* Thay đổi text */}
          </Typography>
        </>
      )}

      {status === 'success' && (
        <Alert
          severity="success"
          sx={{ width: '100%', maxWidth: 500, marginTop: 2 }}
        >
          Xác thực thành công! Đang chuyển hướng...
        </Alert>
      )}

      {status === 'error' && (
        <Alert
          severity="error"
          sx={{ width: '100%', maxWidth: 500, marginTop: 2 }}
        >
          {error}. Đang chuyển hướng...
        </Alert>
      )}
    </Box>
  );
};

export default OAuthRedirect;