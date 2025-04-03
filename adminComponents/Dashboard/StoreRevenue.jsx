import React from "react";
const StoreRevenue = () => {
  const storeData = [
    {
      rank: 1,
      store: "TechZone Hà Nội",
      currentRevenue: "1.250.000.000đ",
      previousRevenue: "1.100.000.000đ",
      growth: "+13.6%",
      contribution: "31.4%",
    },
    {
      rank: 2,
      store: "DigiWorld Sài Gòn",
      currentRevenue: "980.000.000đ",
      previousRevenue: "920.000.000đ",
      growth: "+6.5%",
      contribution: "24.6%",
    },
    {
      rank: 3,
      store: "SmartStore Đà Nẵng",
      currentRevenue: "720.000.000đ",
      previousRevenue: "650.000.000đ",
      growth: "+10.8%",
      contribution: "18.1%",
    },
    {
      rank: 4,
      store: "FutureGadget Cần Thơ",
      currentRevenue: "550.000.000đ",
      previousRevenue: "500.000.000đ",
      growth: "+10.0%",
      contribution: "13.8%",
    },
    {
      rank: 5,
      store: "TechHub Hải Phòng",
      currentRevenue: "480.000.000đ",
      previousRevenue: "450.000.000đ",
      growth: "+6.7%",
      contribution: "12.1%",
    },
  ];

  const total = {
    currentRevenue: "3.980.000.000đ",
    previousRevenue: "3.538.000.000đ",
    growth: "+12.5%",
    contribution: "100%",
  };

  return (
    <section className="p-6 rounded-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-indigo-900">
          Doanh thu theo cửa hàng
        </h2>
        <p className="text-sm text-slate-400">Xếp hạng từ cao đến thấp</p>
        <button className="flex items-center gap-2">
          <span>Tháng này</span>
          <i className="ti ti-chevron-down" />
        </button>
      </div>
      <div className="mt-6">
        <div className="grid p-3 font-medium border-b border-solid border-b-slate-200 grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr] text-slate-400 max-sm:gap-2 max-sm:text-xs max-sm:grid-cols-[0.5fr_1.5fr_1fr_1fr_0.8fr_0.8fr]">
          <div>Xếp hạng</div>
          <div>Cửa hàng</div>
          <div>Doanh thu hiện tại</div>
          <div>Doanh thu kỳ trước</div>
          <div>Tăng trưởng</div>
          <div>Tỷ lệ đóng góp</div>
        </div>
        {storeData.map((store, index) => (
          <div
            key={index}
            className="grid p-3 border-b border-solid border-b-slate-200 grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr] max-sm:gap-2 max-sm:text-xs max-sm:grid-cols-[0.5fr_1.5fr_1fr_1fr_0.8fr_0.8fr]"
          >
            <div>{store.rank}</div>
            <div>{store.store}</div>
            <div>{store.currentRevenue}</div>
            <div>{store.previousRevenue}</div>
            <div className="text-teal-500">{store.growth}</div>
            <div>{store.contribution}</div>
          </div>
        ))}
        <div className="grid p-3 font-medium border-t border-solid border-b-[none] border-t-slate-200 grid-cols-[0.5fr_2fr_1.5fr_1.5fr_1fr_1fr] max-sm:gap-2 max-sm:text-xs max-sm:grid-cols-[0.5fr_1.5fr_1fr_1fr_0.8fr_0.8fr]">
          <div>Tổng cộng</div>
          <div />
          <div>{total.currentRevenue}</div>
          <div>{total.previousRevenue}</div>
          <div className="text-teal-500">{total.growth}</div>
          <div>{total.contribution}</div>
        </div>
      </div>
    </section>
  );
};

export default StoreRevenue;
