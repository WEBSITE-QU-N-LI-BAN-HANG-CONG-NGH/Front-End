"use client";
import React from "react";

const AccountForm = () => {
  return (
    <div className="flex-1">
      <h1 className="mb-6 text-3xl font-bold text-black">Your name</h1>
      <h2 className="mb-4 text-lg font-bold text-neutral-800">
        Thông tin tài khoản
      </h2>
      <form className="pt-6">
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
              value="Your name"
              className="p-3 w-full rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-black">
              Giới tính
            </label>
            <div className="flex gap-6">
              <label className="flex gap-2 items-center">
                <input type="radio" name="gender" value="male" />
                <span>Nam</span>
              </label>
              <label className="flex gap-2 items-center">
                <input type="radio" name="gender" value="female" />
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
              value="********"
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
              value="d*******@gmail.com"
              className="p-3 w-full rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-black">
              Ngày sinh
            </label>
            <div className="flex gap-4">
              <select className="p-3 rounded border border-gray-300">
                <option>Ngày</option>
              </select>
              <select className="p-3 rounded border border-gray-300">
                <option>Tháng</option>
              </select>
              <select className="p-3 rounded border border-gray-300">
                <option>Năm</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-3 mt-6 font-semibold text-white bg-blue-600 rounded"
        >
          LƯU THAY ĐỔI
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
