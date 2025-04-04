"use client";
import React from "react";

import TabNavigation from "./TabNavigation";
import RevenueOverview from "./RevenueOverview";
import RevenueDistribution from "./RevenueDistribution";
import StoreRevenue from "./StoreRevenue";
import RevenueTrends from "./RevenueTrends";
import Layout from "./Layout";

const PageHeader = () => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-gray-900">
        Tổng quan
      </h1>
      <p className="text-sm text-gray-500">
        Tổng quan về cửa hàng của bạn
      </p>
    </div>
    <div className="flex gap-2">
    <button
      className="flex gap-2 items-center px-4 py-2 rounded-2xl border-1 border-solid cursor-pointer hover:bg-gray-100 transition-colors"
      aria-label="Select date"
      type="button"
    >
      <span className="text-gray-900">Hôm nay</span>
      <i className="ti ti-chevron-down" aria-hidden="true" />
    </button>
      <button className="flex gap-2 items-center px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer border-none hover:bg-blue-700">
        <span>Tải báo cáo</span>
      </button>
    </div>
  </div>
);

const Dashboard1 = () => {
  return (
      <Layout>
        <PageHeader />
        <TabNavigation />
        <RevenueOverview />
        <RevenueDistribution />
        <StoreRevenue />
        <RevenueTrends />
      </Layout>
  );
};

export default Dashboard1;
