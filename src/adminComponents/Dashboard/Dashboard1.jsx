// src/adminComponents/Dashboard/Dashboard1.jsx
"use client";
import React, { useState, useEffect } from "react";
import TabNavigation from "./TabNavigation";
import RevenueOverview from "./RevenueOverview";
import RevenueDistribution from "./RevenueDistribution";
import StoreRevenue from "./StoreRevenue";
import RevenueTrends from "./RevenueTrends";
import Layout from "./Layout";
import adminService from "../../services/adminService";

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
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const overview = await adminService.getDashboardOverview();
        setDashboardData(overview);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Không thể tải dữ liệu bảng điều khiển");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center p-5 text-red-500">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader />
      <TabNavigation />
      <RevenueOverview data={dashboardData?.revenueOverview} />
      <RevenueDistribution data={dashboardData?.revenueDistribution} />
      <StoreRevenue data={dashboardData?.topSellers} />
      <RevenueTrends data={dashboardData?.revenueTrends} />
    </Layout>
  );
};

export default Dashboard1;