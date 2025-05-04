"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AccountForm = () => {
  // The primary issue: useSelector called outside component body
  // We'll move this inside the component and handle the case where
  // the redux store might not be properly initialized
  const userStore = useSelector((store) => store?.auth?.user) || {};

  const [user, setUser] = useState({});

  const [showSuccess, setShowSuccess] = useState(false);

  // Use effect to update the form when userStore changes
  useEffect(() => {
    if (userStore?.fullName || userStore?.phone || userStore?.email) {
      setUser({
        fullName: userStore.firstName + userStore.lastName || "Your name",
        phone: userStore.phone || "*************",
        email: userStore.email || "*******@gmail.com",
      });
    }
  }, [userStore]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User data:", user);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex-1">
      <h1 className="mb-6 text-3xl font-bold text-black">{user.fullName}</h1>
      <h2 className="mb-4 text-lg font-bold text-neutral-800">
        Thông tin tài khoản
      </h2>
      
      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Thay đổi thành công!
        </div>
      )}
      
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
              onChange={handleChange}
              className="p-3 w-full rounded border border-gray-300"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-3 mt-6 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          LƯU THAY ĐỔI
        </button>
      </form>
    </div>
  );
};

export default AccountForm;