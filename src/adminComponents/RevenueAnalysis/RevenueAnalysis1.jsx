"use client";
import React from "react";

import TabNavigation from "./TabNavigation";
import Layout from "./Layout";
import OverviewTab from "./OverviewTab";
import AnalyticsSection from "./AnalyticsSection";
import RevenueTable from "./RevenueTable"

const PageHeader = () => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-gray-900">
        Phân tích doanh thu
      </h1>
      <p className="text-sm text-gray-500">
        Phân tích chi tiết về doanh thu và hiệu suất kinh doanh
      </p>
    </div>
    <div className="flex gap-2">
    <button
      className="flex gap-2 items-center px-4 py-2 rounded-2xl border-1 border-solid cursor-pointer hover:bg-gray-100 transition-colors"
      aria-label="Select date"
      type="button"
    >
      <span className="text-gray-900">Tháng này</span>
      <i className="ti ti-chevron-down" aria-hidden="true" />
    </button>
      <button className="flex gap-2 items-center px-4 py-2 text-black bg-white rounded-md cursor-pointer border-none">
        <span>Chọn ngày</span>
      </button>
      <button className="flex gap-2 items-center px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer border-none hover:bg-blue-700">
        <span>Xuất báo cáo</span>
      </button>
    </div>
  </div>
);

const RevenueAnalysis1 = () => {
  return (
      <Layout>
        <PageHeader />
        <OverviewTab />
        <TabNavigation />
        <AnalyticsSection />
        <RevenueTable />
      </Layout>
  );
};

export default RevenueAnalysis1;
