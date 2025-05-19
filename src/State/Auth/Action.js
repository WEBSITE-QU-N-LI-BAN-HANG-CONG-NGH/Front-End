import { authService } from "../../services/auth.service";
import {
  clearAllTokens,
  extractTokensFromResponse,
  getTokenFromLocalStorage,
} from "../../services/util";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (token) => ({ type: REGISTER_SUCCESS, payload: token });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    console.log("Đang đăng ký với dữ liệu:", userData);
    const response = await authService.register(userData);

    console.log("Message từ phản hồi đăng ký:", response);
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(registerFailure(errorMessage));
  }
};

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    console.log("Đang đăng nhập với dữ liệu:", userData);
    const response = await authService.login(userData);
    console.log("Phản hồi đăng nhập đầy đủ:", response);
    console.log("Phản hồi đăng nhập data:", response.data);

    // Xử lý token từ phản hồi
    const { accessToken } = extractTokensFromResponse(response);

    if (accessToken) {
      // Lưu token vào localStorage ngay từ đầu
      localStorage.setItem("jwt", accessToken);

      // Cập nhật store redux
      dispatch(loginSuccess(accessToken));

      // Kiểm tra cấu trúc dữ liệu để truy cập đúng đối tượng user
      const responseData = response.data.data || response.data;
      console.log("Response data chi tiết:", responseData);

      // Lấy thông tin user từ responseData
      const user = responseData.user || responseData;
      console.log("User data chi tiết:", user);

      // Kiểm tra JWT token để extract thông tin
      try {
        const tokenParts = accessToken.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log("JWT payload giải mã:", payload);
          console.log("JWT roles từ payload:", payload.roles);

          // Kiểm tra role từ JWT payload
          // Trong hàm login khi phát hiện role SELLER
          if (
            payload.roles &&
            Array.isArray(payload.roles) &&
            payload.roles.includes("SELLER")
          ) {
            const token = localStorage.getItem("jwt");

            // Thêm token vào URL khi chuyển hướng
            window.location.href =
              "http://localhost:5174/dashboard?token=" +
              encodeURIComponent(token);

            // Hoặc lưu vào sessionStorage để chia sẻ giữa các domain
            sessionStorage.setItem("temp_auth_token", token);

            return; // Dừng execution flow ở đây
          }
        }
      } catch (tokenError) {
        console.error("Lỗi khi giải mã JWT token:", tokenError);
      }

      // Kiểm tra roles từ user object
      console.log("Kiểm tra roles từ user object:", user.roles);
      if (
        user.roles &&
        Array.isArray(user.roles) &&
        user.roles.includes("SELLER")
      ) {
        console.log("Xác nhận SELLER role từ user object");

        try {
          localStorage.setItem("redirecting_to_seller", "true");
          window.location.href = "http://localhost:5174/dashboard";

          // Backup với setTimeout
          setTimeout(() => {
            if (localStorage.getItem("redirecting_to_seller") === "true") {
              window.open("http://localhost:5174/dashboard", "_self");
            }
          }, 500);

          return; // Dừng execution flow ở đây
        } catch (redirectError) {
          console.error("Lỗi khi chuyển hướng:", redirectError);
          localStorage.removeItem("redirecting_to_seller");
        }
      }

      // Kiểm tra role từ user object (trường role đơn)
      console.log("Kiểm tra role đơn từ user object:", user.role);
      if (user.role === "SELLER") {
        console.log("Xác nhận SELLER role từ trường role đơn");

        try {
          localStorage.setItem("redirecting_to_seller", "true");
          window.location.href = "http://localhost:5174/dashboard";

          setTimeout(() => {
            if (localStorage.getItem("redirecting_to_seller") === "true") {
              window.open("http://localhost:5174/dashboard", "_self");
            }
          }, 500);

          return; // Dừng execution flow ở đây
        } catch (redirectError) {
          console.error("Lỗi khi chuyển hướng:", redirectError);
          localStorage.removeItem("redirecting_to_seller");
        }
      }

      // Kiểm tra authorities
      console.log("Kiểm tra authorities:", user.authorities);
      if (
        user.authorities &&
        Array.isArray(user.authorities) &&
        user.authorities.some((auth) => auth.authority === "ROLE_SELLER")
      ) {
        console.log("Xác nhận SELLER role từ authorities");

        try {
          localStorage.setItem("redirecting_to_seller", "true");
          window.location.href = "http://localhost:5174/dashboard";

          setTimeout(() => {
            if (localStorage.getItem("redirecting_to_seller") === "true") {
              window.open("http://localhost:5174/dashboard", "_self");
            }
          }, 500);

          return; // Dừng execution flow ở đây
        } catch (redirectError) {
          console.error("Lỗi khi chuyển hướng:", redirectError);
          localStorage.removeItem("redirecting_to_seller");
        }
      }

      console.log(
        "Không phát hiện role SELLER, tiếp tục luồng đăng nhập thông thường"
      );

      // Nếu không phải seller, tiếp tục luồng đăng nhập customer thông thường
      dispatch(getUser());
      console.log("Đăng nhập thành công với token");
    } else {
      console.error("Đăng nhập thành công nhưng không có token trong phản hồi");
      dispatch(
        loginFailure("Đăng nhập thành công nhưng không nhận được token")
      );
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(loginFailure(errorMessage));
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = () => async (dispatch) => {
  const jwt = getTokenFromLocalStorage();

  if (!jwt) {
    console.warn("Không có JWT để lấy thông tin người dùng");
    return;
  }

  dispatch(getUserRequest());
  console.log("Đang lấy thông tin người dùng");

  try {
    const response = await authService.getUserProfile();
    console.log("Phản hồi thông tin người dùng:", response.data);

    if (response.status === 200) {
      let userData = response.data;

      // Kiểm tra nếu dữ liệu người dùng nằm trong thuộc tính data
      if (!userData.id && !userData.email && response.data.data) {
        userData = response.data.data;
      }

      console.log("Thông tin user từ getUser:", userData);
      console.log(
        "Roles từ getUser:",
        userData.roles || userData.role || "Không tìm thấy roles"
      );

      dispatch(getUserSuccess(userData));
    } else {
      dispatch(getUserFailure("Phản hồi không mong đợi từ server"));
    }
  } catch (error) {
    console.error("Lỗi lấy thông tin người dùng:", error);

    let errorMessage = "Lỗi không xác định";
    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        `Lỗi ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "Lỗi mạng - không nhận được phản hồi từ server";
    } else {
      errorMessage = error.message;
    }

    // Nếu lỗi trả về 401 hoặc 403, interceptor trong api.js sẽ xử lý refresh token hoặc logout
    dispatch(getUserFailure(errorMessage));
  }
};

const LOGOUT_REQUEST = () => ({ type: "LOGOUT_REQUEST" });
const LOGOUT_SUCCESS = () => ({ type: LOGOUT });

export const logout = () => async (dispatch) => {
  try {
    dispatch(LOGOUT_REQUEST());
    await authService.logout();
    clearAllTokens();
    localStorage.removeItem("redirecting_to_seller");
    dispatch(LOGOUT_SUCCESS());
    window.location.href = "/";
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
    clearAllTokens();
    localStorage.removeItem("redirecting_to_seller");
    // Vẫn đăng xuất ở phía client ngay cả khi có lỗi từ server
    dispatch(LOGOUT_SUCCESS());
    window.location.href = "/";
  }
};

// Action kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
export const checkAuthStatus = () => async (dispatch) => {
  const jwt = getTokenFromLocalStorage(); // Dùng helper function

  if (jwt) {
    console.log("Tìm thấy token đã lưu, khôi phục phiên đăng nhập");
    dispatch(loginSuccess(jwt)); // Cập nhật token vào state
    dispatch(getUser()); // Lấy thông tin user
  } else {
    console.log("Không tìm thấy token đã lưu.");
    // Có thể dispatch action logout hoặc không làm gì cả
    // dispatch({ type: LOGOUT });
  }
};
