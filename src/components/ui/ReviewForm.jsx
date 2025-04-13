"use client";
import React, { useState } from "react";
import Rating from "./Rating";
import TextArea from "./TextArea";
import ImageUpload from "./ImageUpload";
import ReviewedForm from "./ReviewedForm"

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showError, setShowError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, review });
    setIsSubmitted(true);
  };

  const handleImageUpload = () => {

  };

  if (isSubmitted) {
    return <ReviewedForm />;
  }

  return (
    <main className="p-10 text-center max-sm:p-5">
      <h1 className="mb-10 text-3xl font-bold text-black">Viết bài đánh giá</h1>
      <form
        onSubmit={handleSubmit}
        className="flex gap-10 p-5 mx-auto my-0 bg-white max-w-[1200px] max-md:flex-col"
      >
        <figure className="flex-[0_0_400px] max-md:flex-[0_0_auto]">
          <img
            src="/Placeholder7.jpg"
            className="w-full h-auto"
            alt="Laptop gaming Lenovo LOQ 15IAX9E"
          />
        </figure>
        <section className="flex-1 text-left">
          <h2 className="mb-5 text-base font-medium">
            Đánh giá của bạn về: Laptop gaming Lenovo LOQ 15IAX9E 83LK0036VN
          </h2>

          <Rating
            rating={rating}
            onRatingChange={(newRating) => {
              setRating(newRating);
              setShowError(false);
            }}
            showError={showError}
          />
          <div className="mt-5">
          <TextArea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          </div>
          <ImageUpload onUpload={handleImageUpload} />

          <button
            type="submit"
            className="px-10 py-4 text-base text-white bg-red-600 rounded cursor-pointer border-[none] hover:bg-red-700 transition-colors"
          >
            Gửi đánh giá
          </button>
        </section>
      </form>
    </main>
  );
};

export default ReviewForm;