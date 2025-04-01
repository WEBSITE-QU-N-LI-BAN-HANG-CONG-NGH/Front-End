"use client";
import React from "react";

const PaymentMethods = () => {
  return (
    <section className="mx-auto my-10 max-w-[800px]">
      <h2 className="mb-5 text-xl font-semibold">Chọn hình thức thanh toán</h2>
      <div className="flex flex-col gap-4 mb-8">
        <label className="flex gap-2.5 items-center cursor-pointer">
          <input type="radio" name="payment" value="cod" />
          <span>Thanh toán khi giao hàng (COD)</span>
        </label>
        <label className="flex gap-2.5 items-center cursor-pointer">
          <input type="radio" name="payment" value="vnpay" defaultChecked />
          <span>Thanh toán qua VN Pay</span>
        </label>
      </div>
      <button className="p-4 w-full text-base font-semibold text-white bg-red-600 rounded cursor-pointer border-[none]">
        THANH TOÁN NGAY
      </button>
    </section>
  );
};

export default PaymentMethods;
