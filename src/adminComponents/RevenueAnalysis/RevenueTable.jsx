import React from "react";

const RevenueTable = () => {
  const tableData = [
    {
      month: "Tháng 12",
      revenue: "168,450,000đ",
      profit: "45,250,000đ",
      orders: "612",
      yearOverYear: "+18.5%",
      positive: true,
    },
    {
      month: "Tháng 11",
      revenue: "156,300,000đ",
      profit: "42,850,000đ",
      orders: "573",
      yearOverYear: "+20.1%",
      positive: true,
    },
    {
      month: "Tháng 10",
      revenue: "130,120,000đ",
      profit: "37,200,000đ",
      orders: "498",
      yearOverYear: "+12.3%",
      positive: true,
    },
    {
      month: "Tháng 9",
      revenue: "125,780,000đ",
      profit: "35,450,000đ",
      orders: "482",
      yearOverYear: "+6.7%",
      positive: true,
    },
    {
      month: "Tháng 8",
      revenue: "118,350,000đ",
      profit: "32,150,000đ",
      orders: "451",
      yearOverYear: "-2.3%",
      positive: false,
    },
    {
      month: "Tháng 7",
      revenue: "122,680,000đ",
      profit: "33,750,000đ",
      orders: "467",
      yearOverYear: "+5.2%",
      positive: true,
    },
  ];

  return (
    <section className="p-6 bg-white rounded-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Doanh thu theo tháng</h2>
        <p className="text-sm text-slate-400">Chi tiết doanh thu từng tháng trong năm</p>
        <button className="flex items-center gap-2 mt-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer">
          <span>2023</span>
          <i className="ti ti-chevron-down" />
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-solid border-b-slate-200">
              <th className="p-3 font-medium text-left text-slate-400">
                Tháng
              </th>
              <th className="p-3 font-medium text-left text-slate-400">
                Doanh thu
              </th>
              <th className="p-3 font-medium text-left text-slate-400">
                Lợi nhuận
              </th>
              <th className="p-3 font-medium text-left text-slate-400">
                Số đơn hàng
              </th>
              <th className="p-3 font-medium text-left text-slate-400">
                So với cùng kỳ
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b border-solid border-b-slate-200">
                <td className="p-3 text-left">{row.month}</td>
                <td className="p-3 text-left">{row.revenue}</td>
                <td className="p-3 text-left">{row.profit}</td>
                <td className="p-3 text-left">{row.orders}</td>
                <td className={`p-3 text-left ${row.positive ? "text-teal-500" : "text-red-500"}`}>
                  {row.yearOverYear}
                </td>
              </tr>
            ))}
            <tr className="border-t border-solid border-t-slate-200 font-medium">
              <td className="p-3 text-left">Tổng cộng</td>
              <td className="p-3 text-left">821,680,000đ</td>
              <td className="p-3 text-left">226,650,000đ</td>
              <td className="p-3 text-left">3,083</td>
              <td className="p-3 text-left text-teal-500">+10.1%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RevenueTable;