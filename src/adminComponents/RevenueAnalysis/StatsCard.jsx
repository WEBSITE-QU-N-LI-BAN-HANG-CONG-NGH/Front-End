import React from "react";

const StatsCard = ({ title, value, change, isPositive }) => {
  return (
    <article className="p-5 bg-white rounded-xl">
      <h3 className="mb-2 text-gray-500">{title}</h3>
      <p className="mb-2 text-2xl font-semibold">{value}</p>
      <p
        className={`text-sm ${isPositive ? "text-emerald-500" : "text-red-500"}`}
      >
        {change} so với tháng trước
      </p>
    </article>
  );
};

export default StatsCard;
