"use client";
import React from "react";

const TabNavigation = () => {
  const tabs = ["Doanh thu", "Sản phẩm", "Kênh bán hàng", "Khách hàng"];

  return (
    <nav className="flex gap-6 mb-6 border-b border-solid">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="relative px-0 py-3 text-gray-500 cursor-pointer hover:text-gray-700"
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;
