"use client";
import React from "react";
import Header from "../shared/Header";
import ReviewForm from "./ReviewForm";
import Features from "../shared/Features";
import Footer from "../shared/Footer";

const Review1 = () => {
  return (
    <div className="flex flex-col bg-white min-h-[screen] pt-3">
      <Header />
      <main className="flex flex-col px-64 py-10 max-md:px-10 max-sm:px-5">

        <h1 className="mb-10 mt-10 text-3xl font-semibold">Đánh giá sản phẩm</h1>

        <ReviewForm />
      </main>

      <Features />
      <Footer />
    </div>
  );
};

export default Review1;
