import React from "react";
const RevenueTrends = () => {
  return (
    <section className="p-6 rounded-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-indigo-900">
          Phân tích xu hướng doanh thu
        </h2>
        <p className="text-sm text-slate-400">
          Biểu đồ doanh thu theo thời gian của các cửa hàng
        </p>
      </div>
      <div className="mt-6 h-[200px]">
        {/* Chart input here lmao */}
      </div>
      <div className="flex gap-6 justify-center mt-6 text-xs max-sm:flex-wrap">
        <div className="gap-2">TechZone Hà Nội</div>
        <div className="gap-2">DigiWorld Sài Gòn</div>
        <div className="gap-2">SmartStore Đà Nẵng</div>
        <div className="gap-2">FutureGadget Cần Thơ</div>
        <div className="gap-2">TechHub Hải Phòng</div>
      </div>
    </section>
  );
};

export default RevenueTrends;
