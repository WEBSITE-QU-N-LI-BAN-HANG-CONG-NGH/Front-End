"use client";
import React from "react";

const ReviewedForm = () => {
  return (
    <main className="flex flex-col items-center pt-12 h-[673px]">
      <h1 className="mb-10 text-3xl font-semibold">Viết bài đánh giá</h1>
      <section className="mb-12 text-center max-sm:px-5 max-sm:py-0">
        <div className="mt-28">
          <div
            className="relative mx-auto mt-0 mb-5 bg-blue-600 rounded-full h-[60px] w-[60px] flex items-center justify-center"
            role="img"
            aria-label="Success icon"
          >
            {/* Checkmark/Tick SVG */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="30" 
              height="30" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-appear"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
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