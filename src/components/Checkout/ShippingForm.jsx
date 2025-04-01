"use client";
import React from "react";
import { useState } from "react";

const ShippingForm = () => {
  const [gender, setGender] = useState("male");
  const [shipping, setShipping] = useState("standard");

  return (
    <div className="flex-1 max-md:w-full">
      <h2 className="mb-2.5 text-xl font-bold">Shipping Address</h2>
      <div className="mb-5 h-px bg-gray-300" />
      <form className="flex flex-col gap-5">
        <div className="flex gap-5">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <span>Anh</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <span>Chị</span>
          </label>
        </div>
        <div className="flex gap-5 max-sm:flex-col">
          <input
            type="text"
            placeholder="Song"
            className="flex-1 p-2.5 rounded border border-gray-300 border-solid"
          />
          <input
            type="text"
            placeholder="0123456789"
            className="flex-1 p-2.5 rounded border border-gray-300 border-solid"
          />
        </div>
        <div className="mx-0 my-2.5">
          <label className="flex items-center gap-2">
            <input type="radio" name="delivery" checked readOnly />
            <span>Giao hàng tận nơi</span>
          </label>
        </div>
        <div className="flex flex-col gap-2.5">
          <select className="p-2.5 rounded border border-gray-300 border-solid">
            <option>Chọn Tỉnh, Thành phố</option>
          </select>
          <select className="p-2.5 rounded border border-gray-300 border-solid">
            <option>Chọn Quận, Huyện</option>
          </select>
          <select className="p-2.5 rounded border border-gray-300 border-solid">
            <option>Chọn Phường, Xã</option>
          </select>
          <input
            type="text"
            placeholder="Số nhà, tên đường"
            className="p-2.5 rounded border border-gray-300 border-solid"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Lưu ý yêu cầu khác (không bắt buộc)"
            className="p-2.5 w-full rounded border border-gray-300 border-solid"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Xuất hoá đơn cho đơn hàng</span>
          </label>
        </div>
        <div className="p-5 mx-0 my-5 bg-violet-50">
          <h3>Dịch vụ giao hàng</h3>
          <div className="flex justify-between mt-2.5">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={shipping === "standard"}
                onChange={(e) => setShipping(e.target.value)}
              />
              <span>Giao hàng tiêu chuẩn</span>
            </label>
            <span>40.000₫</span>
          </div>
        </div>
        <div className="flex justify-between mx-0 my-2.5">
          <span>Phí vận chuyển:</span>
          <span>40.000₫</span>
        </div>
        <div className="flex justify-between mx-0 my-2.5">
          <span>Tổng tiền:</span>
          <span className="font-semibold text-red-600">3.730.000₫</span>
        </div>
        <button
          type="submit"
          className="p-4 font-semibold text-white bg-red-600 rounded cursor-pointer border-none"
        >
          ĐẶT HÀNG NGAY
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
