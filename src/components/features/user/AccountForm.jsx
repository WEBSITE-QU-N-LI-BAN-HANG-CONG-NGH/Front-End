"use client";
import React, { useState } from "react";

const AccountForm = () => {
  const [user, setUser] = useState({
    fullName: "Your name",
    gender: "",
    phone: "********",
    email: "d*******@gmail.com",
    birthDay: "",
    birthMonth: "",
    birthYear: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleRadioChange = (e) => {
    setUser({
      ...user,
      gender: e.target.value
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
      <h1 className="mb-6 text-3xl font-bold text-black">Your name</h1>
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
            <label className="text-base font-medium text-black">
              Giới tính
            </label>
            <div className="flex gap-6">
              <label className="flex gap-2 items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="male" 
                  checked={user.gender === "male"}
                  onChange={handleRadioChange}
                />
                <span>Nam</span>
              </label>
              <label className="flex gap-2 items-center">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female" 
                  checked={user.gender === "female"}
                  onChange={handleRadioChange}
                />
                <span>Nữ</span>
              </label>
            </div>
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
              value={user.email}
              onChange={handleChange}
              className="p-3 w-full rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-black">
              Ngày sinh
            </label>
            <div className="flex gap-4">
              <select 
                className="p-3 rounded border border-gray-300"
                name="birthDay"
                value={user.birthDay}
                onChange={handleChange}
              >
                <option value="">Ngày</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select 
                className="p-3 rounded border border-gray-300"
                name="birthMonth"
                value={user.birthMonth}
                onChange={handleChange}
              >
                <option value="">Tháng</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select 
                className="p-3 rounded border border-gray-300"
                name="birthYear"
                value={user.birthYear}
                onChange={handleChange}
              >
                <option value="">Năm</option>
                {[...Array(100)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
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