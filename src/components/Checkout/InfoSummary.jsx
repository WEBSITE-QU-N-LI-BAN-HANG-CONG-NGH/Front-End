import React from "react";

const InfoSummary = () => {
  return (
    <section className="mx-auto my-0 max-w-[800px] order-[info]">
      <h2 className="mb-5 items-center text-2xl font-semibold">Thông tin đặt hàng</h2>
      <div className="flex mb-4 text-sm">
        <dt className="text-stone-500 w-[150px]">Khách hàng:</dt>
        <dd className="flex-1">Sang</dd>
      </div>
      <div className="flex mb-4 text-sm">
        <dt className="text-stone-500 w-[150px]">Số điện thoại</dt>
        <dd className="flex-1">0379641588</dd>
      </div>
      <div className="flex mb-4 text-sm">
        <dt className="text-stone-500 w-[150px]">Địa chỉ nhận hàng</dt>
        <dd className="flex-1">
          gsfdgsdfgasdf, Xã Xuân Trường, Huyện Bảo Lạc, Cao Bằng
        </dd>
      </div>
      <div className="flex mb-4 text-sm">
        <dt className="text-stone-500 w-[150px]">Tạm tính</dt>
        <dd className="flex-1">3.690.000đ</dd>
      </div>
      <div className="flex mb-4 text-sm">
        <dt className="text-stone-500 w-[150px]">Phí vận chuyển</dt>
        <dd className="flex-1">40.000đ</dd>
      </div>
      <div className="flex mt-5 mb-4 text-sm font-semibold">
        <dt className="text-stone-500 w-[150px]">Tổng tiền</dt>
        <dd className="flex-1">3.730.000đ</dd>
      </div>
    </section>
  );
};

export default InfoSummary;

