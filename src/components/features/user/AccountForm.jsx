// src/components/features/user/AccountForm.jsx
import React, { useState, useEffect } from "react";
// Xóa: import { useSelector } from "react-redux";
import { useAuthContext } from "../../../contexts/AuthContext"; // THAY ĐỔI
import { authService } from "../../../services/auth.service";
import { useToast } from "../../../contexts/ToastContext";

const AccountForm = () => {
  // THAY ĐỔI: Sử dụng useAuthContext
  const { user: userFromContext, isLoading: authContextLoading, fetchUserProfile, clearAuthError } = useAuthContext();
  const { showToast } = useToast();

  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    email: ""
  });

  const [initialData, setInitialData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false); // State loading riêng cho việc cập nhật

  useEffect(() => {
    // THAY ĐỔI: Sử dụng userFromContext
    if (userFromContext) {
      const fullName = userFromContext.firstName || ""; // Chỉ lấy firstName
      const formData = {
        fullName: fullName,
        phone: userFromContext.mobile || "",
        email: userFromContext.email || ""
      };
      setUser(formData);
      setInitialData(formData);
    } else {
      // Nếu không có userFromContext (ví dụ, chưa đăng nhập hoặc đang load)
      // Bạn có thể reset form hoặc giữ nguyên, tùy theo logic mong muốn
      const defaultForm = { fullName: "", phone: "", email: "" };
      setUser(defaultForm);
      setInitialData(defaultForm);
    }
  }, [userFromContext]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const hasChanges = () => {
    return user.fullName !== initialData.fullName ||
           user.phone !== initialData.phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges() || isUpdating) return;

    clearAuthError(); // Xóa lỗi cũ từ context nếu có
    setIsUpdating(true);
    try {
      const userData = {
        firstName: user.fullName,
        lastName: "", // Backend có thể yêu cầu lastName, nếu không thì bỏ trống
        phoneNumber: user.phone
      };

      await authService.updateProfile(userData); // Gọi service
      await fetchUserProfile(); // THAY ĐỔI: Fetch lại user profile từ context để cập nhật state global

      // Cập nhật initialData sau khi lưu thành công
      setInitialData({
        fullName: user.fullName,
        phone: user.phone,
        email: user.email // Giữ lại email vì nó không thay đổi
      });
      showToast("Cập nhật thông tin thành công", "success");

    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      const errorMessage = error.response?.data?.message || error.message || "Cập nhật thất bại";
      showToast(errorMessage, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  // Disable form khi context đang load user ban đầu hoặc khi đang update
  const formDisabled = authContextLoading || isUpdating;

  return (
    <div className="flex-1">
      <h1 className="mb-6 text-3xl font-bold text-black">
        {/* Sử dụng initialData.fullName để tránh FOUC khi userFromContext chưa load */}
        {initialData.fullName || user.fullName || "Tài khoản của tôi"}
      </h1>
      <h2 className="mb-4 text-lg font-bold text-neutral-800">
        Thông tin tài khoản
      </h2>

      <form className="pt-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              className="text-base font-medium text-black"
              htmlFor="fullName"
            >
              Họ Tên
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              className="p-3 w-full rounded border border-gray-300"
              disabled={formDisabled}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-black" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="p-3 w-full rounded border border-gray-300"
              placeholder="Vui lòng nhập số điện thoại"
              disabled={formDisabled}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-black" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              readOnly // Email không nên cho sửa ở đây
              value={user.email}
              className="p-3 w-full rounded border border-gray-300 bg-gray-100 cursor-not-allowed" // Style cho trường readonly
              disabled={formDisabled} // Vẫn disable cùng form
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={formDisabled || !hasChanges()} // Disable cả khi không có thay đổi
          className={`px-6 py-3 mt-6 font-semibold text-white rounded transition-colors duration-150
            ${(formDisabled || !hasChanges())
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isUpdating ? "ĐANG LƯU..." : "LƯU THAY ĐỔI"}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;