import React from "react";
const RevenueOverview = () => {
  return (
    <section className="p-6 rounded-3xl w-[1049.9px]">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Tổng quan doanh thu
        </h2>
        <p className="text-sm text-slate-400">Tổng doanh thu và tăng trưởng</p>
      </div>
      <div className="flex gap-12 mt-6 max-md:flex-col">
        <div className="text-3xl font-semibold">
          <span>3.980.000.000đ</span>
          <div className="gap-1 mt-2 text-sm text-teal-500">
            +12.5% so với kỳ trước
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Tăng 442.000.000đ so với kỳ trước (3.538.000.000đ)
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="mx-auto -mt-px w-[200px]">
            {/* Chart input here lmao */}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-400">
            <div>
              <span>Doanh thu cao nhất</span>
              <div>TechZone Hà Nội</div>
            </div>
            <div>
              <span>Tăng trưởng nhanh nhất</span>
              <div>SmartStore Đà Nẵng (+10.8%)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueOverview;
