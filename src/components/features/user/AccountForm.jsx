"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authService } from "../../../services/auth.service";
import { useToast } from "../../../contexts/ToastContext";

const AccountForm = () => {  // Lấy thông tin người dùng từ redux store
  const userStore = useSelector((store) => store?.auth?.user) || {};
  const { showToast } = useToast();

  // State ban đầu
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    email: ""
  });
  
  // State để theo dõi dữ liệu ban đầu để so sánh thay đổi
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);

  // Cập nhật form khi userStore thay đổi
  useEffect(() => {
    if (userStore) {
      const fullName = userStore.firstName || ""; // Chỉ lấy firstName để hiển thị
      const formData = {
        fullName: fullName,
        phone: userStore.mobile || "",
        email: userStore.email || ""
      };
      
      setUser(formData);
      setInitialData(formData); // Lưu trạng thái ban đầu để kiểm tra thay đổi
    }
  }, [userStore]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  // Kiểm tra xem form có thay đổi không
  const hasChanges = () => {
    return user.fullName !== initialData.fullName || 
           user.phone !== initialData.phone;
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasChanges()) return;
    
    try {
      setLoading(true);
      
      // Chuẩn bị dữ liệu theo yêu cầu API
      const userData = {
        firstName: user.fullName, // Lưu toàn bộ họ tên vào firstName
        lastName: "", // Để trống lastName
        phoneNumber: user.phone
      };
      
      // Gọi API cập nhật thông tin
      // Thay thế phần này bằng cách gọi hàm cập nhật từ service hoặc redux action
      const response = await authService.updateProfile(userData);

      console.log("Phản hồi từ API:", response);
      
      setInitialData({...user});       // Cập nhật dữ liệu ban đầu sau khi lưu thành công
      showToast("Cập nhật thông tin thành công", "success");
      
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      // Hiển thị thông báo lỗi (có thể thêm state để hiển thị lỗi)
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex-1">
      <h1 className="mb-6 text-3xl font-bold text-black">{user.fullName || "Tài khoản của tôi"}</h1>
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
              readOnly
              value={user.email}
              className="p-3 w-full rounded border border-gray-300 bg-gray-50"
            />
          </div>
        </div>
        
          <button
            type="submit"
            disabled={loading || !hasChanges()}
            className={`px-6 py-3 mt-6 font-semibold text-white rounded ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }  ${!hasChanges() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "ĐANG LƯU..." : "LƯU THAY ĐỔI"}
          </button>

      </form>
    </div>
  );
};

export default AccountForm;