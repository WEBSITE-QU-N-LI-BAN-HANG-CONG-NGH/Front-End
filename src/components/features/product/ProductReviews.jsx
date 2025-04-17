import React from "react";
const ProductReviews = () => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <section className="px-64 py-10 bg-violet-50 max-md:p-5">
      <h2>Đánh giá & Nhận xét Laptop Acer Swift X14 SFX14 72G 79UW</h2>
      <div className="flex gap-10 mb-5">
        <div>0/5</div>
        <div className="flex-1">
          {ratings.map((rating) => (
            <div key={rating} className="flex gap-2.5 items-center mb-2.5">
              <span>{rating}★</span>
              <div className="flex-1 h-2.5 rounded-md bg-zinc-100">
                <div className="h-full bg-blue-600 rounded-md w-[0%]" />
              </div>
              <span>0 đánh giá</span>
            </div>
          ))}
        </div>
      </div>
      <button className="px-5 py-2.5 text-white bg-blue-600 cursor-pointer border-[none]">
        Gửi đánh giá của bạn
      </button>
    </section>
  );
};

export default ProductReviews;
