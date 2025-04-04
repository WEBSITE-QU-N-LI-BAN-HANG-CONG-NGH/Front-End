import React from "react";

const AnalyticsSection = () => {
  return (
    <>
      <div className="grid gap-5 mb-6 grid-cols-[1fr_1fr] max-md:grid-cols-[1fr]">
        <section className="p-5 bg-white rounded-xl">
          <h2 className="mb-2 font-medium">Xu hướng doanh thu</h2>
          <p className="mb-5 text-sm text-gray-500">
            Doanh thu theo tháng gần đây (6 tháng gần nhất)
          </p>
          <div className="bg-gray-100 rounded-lg h-[300px]" />
        </section>

        <section className="p-5 bg-white rounded-xl">
          <h2 className="mb-2 font-medium">
            Phân tích doanh thu theo danh mục
          </h2>
          <p className="mb-5 text-sm text-gray-500">
            Tỷ lệ đóng góp doanh thu theo danh mục
          </p>
          <div className="bg-gray-100 rounded-lg h-[300px]" />
        </section>
      </div>

      <section className="p-5 mb-6 bg-white rounded-xl">
        <h2 className="mb-2 font-medium">So sánh doanh thu</h2>
        <p className="mb-5 text-sm text-gray-500">
          So sánh doanh thu với cùng kỳ năm trước
        </p>
        <div className="bg-gray-100 rounded-lg h-[300px]" />
      </section>
    </>
  );
};

export default AnalyticsSection;
