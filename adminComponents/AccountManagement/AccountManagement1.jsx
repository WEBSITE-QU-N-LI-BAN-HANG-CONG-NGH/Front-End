"use client";
import React from "react";
import Layout from "./Layout";
import TabNavigation from "./TabNavigation";
import UserTable from "./UserTable";
import Header from "../shared/Header";

const PageHeader = () => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-gray-900">
        Quản lý tài khoản
      </h1>
      <p className="text-sm text-gray-500">
        Quản lý người dùng, phân quyền và xử lý báo cáo
      </p>
    </div>
    <button className="flex gap-2 items-center px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer border-none hover:bg-blue-700">
      <i className="ti ti-plus" />
      <span>Thêm tài khoản</span>
    </button>
  </div>
);

const AccountManagement1 = () => {
  const users = [
    {
      name: "Nguyễn Văn Admin",
      email: "admin@techshop.com",
      role: "Quản trị viên",
      status: "Hoạt động",
      createdAt: "15/01/2023",
    },
    {
      name: "Trần Thị Seller",
      email: "seller1@techshop.com",
      role: "Người bán hàng",
      status: "Hoạt động",
      createdAt: "20/02/2023",
    },
    {
      name: "Lê Văn Staff",
      email: "staff1@techshop.com",
      role: "Nhân viên",
      status: "Hoạt động",
      createdAt: "05/03/2023",
    },
    {
      name: "Phạm Thị Seller",
      email: "seller2@techshop.com",
      role: "Người bán hàng",
      status: "Vô hiệu",
      createdAt: "12/04/2023",
    },
    {
      name: "Hoàng Văn Staff",
      email: "staff2@techshop.com",
      role: "Nhân viên",
      status: "Hoạt động",
      createdAt: "18/05/2023",
    },
  ];

  return (
    <Layout>
      <PageHeader />
      <TabNavigation />
      <UserTable users={users} />
    </Layout>
  );
};

export default AccountManagement1;
