import React from "react";
const RevenueDistribution = () => {
  const stores = [
    { name: "TechZone Hà Nội", percentage: "31.4%", color: "bg-indigo-600" },
    { name: "DigiWorld Sài Gòn", percentage: "24.6%", color: "bg-sky-300" },
    { name: "SmartStore Đà Nẵng", percentage: "18.1%", color: "bg-slate-100" },
    {
      name: "FutureGadget Cần Thơ",
      percentage: "13.8%",
      color: "bg-indigo-600",
    },
    { name: "TechHub Hải Phòng", percentage: "12.1%", color: "bg-sky-300" },
  ];

  return (
    <section className="p-6 rounded-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-indigo-900">
          Phân bổ doanh thu
        </h2>
        <p className="text-sm text-slate-400">Tỷ lệ đóng góp theo cửa hàng</p>
      </div>
      <div className="mx-auto my-0 h-[200px] w-[200px]">
        {/* Chart input here lmao */}
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {stores.map((store, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className={`w-4 h-4 ${store.color} rounded`} />
            <div>{store.name}</div>
            <div>{store.percentage}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RevenueDistribution;
