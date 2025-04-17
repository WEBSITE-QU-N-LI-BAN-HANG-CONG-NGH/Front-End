import React from "react";
const CartSummary = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
        <p className="text-base">Phí vận chuyển:</p>
        <p className="text-base text-green-600">Miễn phí</p>
      </div>
      <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
        <p className="text-base font-medium">Tổng tiền:</p>
        <p className="text-2xl font-semibold text-red-600">107.570.000đ</p>
      </div>
      <button className="py-4 w-full text-base font-semibold text-white bg-rose-600 rounded">
        ĐẶT HÀNG NGAY
      </button>
    </div>
  );
};

export default CartSummary;
