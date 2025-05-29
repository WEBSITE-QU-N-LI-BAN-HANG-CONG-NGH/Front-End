import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Typography, Box, Alert } from '@mui/material';
import { useAuthContext } from '../../contexts/AuthContext'; // Sử dụng AuthContext
import { saveTokenToLocalStorage, getTokenFromLocalStorage } from '../../services/util'; // getToken có thể không cần ở đây nữa

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Lấy hàm setAuthTokenAndFetchUser (hoặc tên tương tự) từ AuthContext
  // Giả sử bạn đã tạo hàm này trong AuthContext để xử lý token từ bên ngoài
  const { setAuthTokenAndFetchUser } = useAuthContext();

  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const oauthError = params.get('error');

      if (oauthError) {
        // Xử lý lỗi từ server OAuth
        console.error("Lỗi OAuth từ backend:", oauthError);
        setStatus('error');
        setErrorMessage(`Đăng nhập thất bại: ${oauthError}`);
        setTimeout(() => navigate('/'), 3000); // Chuyển hướng về trang chủ sau 3 giây
        return;
      }

      if (token) {
        // Nếu có token, xử lý nó
        try {
          if (typeof setAuthTokenAndFetchUser === 'function') {
            // Gọi hàm từ AuthContext để lưu token và fetch user
            await setAuthTokenAndFetchUser(token);
            setStatus('success');
            // AuthContext sẽ xử lý việc cập nhật isAuthenticated và user
            // Sau đó, useEffect trong các component khác (ví dụ Header, AuthForms)
            // sẽ nhận biết sự thay đổi và có thể tự động đóng modal hoặc cập nhật UI
            setTimeout(() => {
              navigate('/'); // Chuyển hướng về trang chủ
            }, 1500); // Đợi một chút để người dùng thấy thông báo
          } else {
            // Fallback nếu hàm trong context chưa sẵn sàng (cần kiểm tra lại AuthContext)
            console.error("Hàm setAuthTokenAndFetchUser không tồn tại trong AuthContext.");
            saveTokenToLocalStorage(token); // Lưu tạm token
            setStatus('success'); // Vẫn báo thành công ở UI
            setTimeout(() => {
              window.location.href = '/'; // Reload để AuthProvider đọc token từ localStorage
            }, 1500);
          }
        } catch (e) {
          // Xử lý lỗi trong quá trình set token hoặc fetch user
          console.error("Lỗi khi xử lý token hoặc fetch user:", e);
          setStatus('error');
          setErrorMessage('Có lỗi xảy ra khi xử lý thông tin đăng nhập.');
          setTimeout(() => navigate('/'), 3000);
        }
      } else {
        // Không tìm thấy token
        console.error("Không tìm thấy tham số 'token' trong URL redirect.");
        setStatus('error');
        setErrorMessage('Thông tin đăng nhập không hợp lệ từ máy chủ.');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleOAuthRedirect();
    // Dependencies: navigate, location.search và hàm từ context
  }, [navigate, location.search, setAuthTokenAndFetchUser]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh', // Chiều cao tối thiểu để căn giữa trang
        padding: 3,
      }}
    >
      {status === 'loading' && (
        <>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 4 }}>
            Đang xác thực...
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
          {errorMessage || 'Đã có lỗi xảy ra.'}. Đang chuyển hướng...
        </Alert>
      )}
    </Box>
  );
};

export default OAuthRedirect;