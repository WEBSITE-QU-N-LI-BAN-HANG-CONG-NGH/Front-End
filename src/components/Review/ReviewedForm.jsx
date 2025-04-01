"use client";
import React from "react";

const ReviewedForm = () => {
  return (
    <main className="flex flex-col items-center pt-12 h-[673px]">
      <h1 className="mb-10 text-3xl font-semibold">Viết bài đánh giá</h1>
      <section className="mb-12 text-center max-sm:px-5 max-sm:py-0">
        <div className="mt-28">
          <div
            className="mx-auto mt-0 mb-5 bg-blue-600 rounded-full h-[60px] w-[60px]"
            role="img"
            aria-label="Notification icon"
          />
          <div className="text-center">
            <h2 className="mb-2.5 text-2xl font-semibold">THÔNG BÁO</h2>
            <p className="text-lg text-zinc-800">
              Quý khách đã đánh giá sản phẩm thành công
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReviewedForm;
