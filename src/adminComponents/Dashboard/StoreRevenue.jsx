import React from "react";

const StoreRevenue = () => {
  const storeData = [
    {
      rank: 1,
      store: "TechZone Hà Nội",
      currentRevenue: "1,250,000,000đ",
      previousRevenue: "1,100,000,000đ",
      growth: "+13.6%",
      contribution: "31.4%",
    },
    {
      rank: 2,
      store: "DigiWorld Sài Gòn",
      currentRevenue: "980,000,000đ",
      previousRevenue: "920,000,000đ",
      growth: "+6.5%",
      contribution: "24.6%",
    },
    {
      rank: 3,
      store: "SmartStore Đà Nẵng",
      currentRevenue: "720,000,000đ",
      previousRevenue: "650,000,000đ",
      growth: "+10.8%",
      contribution: "18.1%",
    },
    {
      rank: 4,
      store: "FutureGadget Cần Thơ",
      currentRevenue: "550,000,000đ",
      previousRevenue: "500,000,000đ",
      growth: "+10.0%",
      contribution: "13.8%",
    },
    {
      rank: 5,
      store: "TechHub Hải Phòng",
      currentRevenue: "480,000,000đ",
      previousRevenue: "450,000,000đ",
      growth: "+6.7%",
      contribution: "12.1%",
    },
  ];

  const total = {
    currentRevenue: "3,980,000,000đ",
    previousRevenue: "3,538,000,000đ",
    growth: "+12.5%",
    contribution: "100%",
  };

  return (
    <section className="p-6 bg-white rounded-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Doanh thu theo cửa hàng</h2>
        <p className="text-sm text-slate-400">Xếp hạng từ cao đến thấp</p>
        <button className="flex items-center gap-2 mt-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer">
          <span>Tháng này</span>
          <i className="ti ti-chevron-down" />
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-solid border-b-slate-200">
              <th className="p-3 font-medium text-left text-slate-400">Xếp hạng</th>
              <th className="p-3 font-medium text-left text-slate-400">Cửa hàng</th>
              <th className="p-3 font-medium text-left text-slate-400">Doanh thu hiện tại</th>
              <th className="p-3 font-medium text-left text-slate-400">Doanh thu kỳ trước</th>
              <th className="p-3 font-medium text-left text-slate-400">Tăng trưởng</th>
              <th className="p-3 font-medium text-left text-slate-400">Tỷ lệ đóng góp</th>
            </tr>
          </thead>
          <tbody>
            {storeData.map((store, index) => (
              <tr key={index} className="border-b border-solid border-b-slate-200">
                <td className="p-3 text-left">{store.rank}</td>
                <td className="p-3 text-left">{store.store}</td>
                <td className="p-3 text-left">{store.currentRevenue}</td>
                <td className="p-3 text-left">{store.previousRevenue}</td>
                <td className="p-3 text-left text-teal-500">{store.growth}</td>
                <td className="p-3 text-left">{store.contribution}</td>
              </tr>
            ))}
            <tr className="border-t border-solid border-t-slate-200 font-medium">
              <td className="p-3 text-left">Tổng cộng</td>
              <td className="p-3 text-left"></td>
              <td className="p-3 text-left">{total.currentRevenue}</td>
              <td className="p-3 text-left">{total.previousRevenue}</td>
              <td className="p-3 text-left text-teal-500">{total.growth}</td>
              <td className="p-3 text-left">{total.contribution}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StoreRevenue;