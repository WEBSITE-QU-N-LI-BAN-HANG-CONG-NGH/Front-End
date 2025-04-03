"use client";
import React from "react";

const NavItem = ({ icon, children }) => (
  <div className="flex gap-3 items-center p-2 text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
    <i className={`ti ti-${icon} text-xl`} />
    <span>{children}</span>
  </div>
);

const NavSection = ({ title, children }) => (
  <div className="flex flex-col gap-1">
    <div className="p-2 text-xs font-medium text-gray-500 uppercase">
      {title}
    </div>
    {children}
  </div>
);

const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-6 p-4 bg-white border-r border-solid w-[280px] max-md:w-60 max-sm:hidden">
      <div className="flex gap-2 items-center p-2 text-xl font-semibold text-gray-900">
        <i className="ti ti-shopping-cart text-2xl text-indigo-600" />
        <span>TechShop</span>
      </div>

      <NavSection title="Tổng quan">
        <NavItem icon="dashboard">Dashboard</NavItem>
        <NavItem icon="chart-bar">Phân tích</NavItem>
        <NavItem icon="coin">Doanh thu</NavItem>
      </NavSection>

      <NavSection title="Quản lý">
        <NavItem icon="box">Sản phẩm</NavItem>
        <NavItem icon="shopping-cart">Đơn hàng</NavItem>
        <NavItem icon="list">Danh mục</NavItem>
        <NavItem icon="users">Khách hàng</NavItem>
        <NavItem icon="report">Báo cáo sản phẩm</NavItem>
      </NavSection>

      <NavSection title="Quản trị">
        <NavItem icon="user-circle">Quản lý tài khoản</NavItem>
        <NavItem icon="file-report">Báo cáo</NavItem>
      </NavSection>

      <div className="mt-auto">
        <NavItem icon="user">AD Admin</NavItem>
      </div>
    </nav>
  );
};

export default Sidebar;
