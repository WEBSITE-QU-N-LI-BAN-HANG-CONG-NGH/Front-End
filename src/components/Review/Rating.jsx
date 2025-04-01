"use client";
import React from "react";

const StarRating = ({ rating, onRatingChange, showError }) => {
  const handleStarClick = (index) => {
    onRatingChange(index + 1);
  };

  return (
    <div className="flex gap-4 items-center mb-5">
      <label className="text-sm text-black">Mức độ đánh giá *</label>
      <span className="text-xs text-stone-500">Click vào để review!</span>
      {showError && (
        <span className="text-xs text-[red]">
          Vui lòng chọn mức độ đánh giá
        </span>
      )}
    </div>
  );
};

export default StarRating;
