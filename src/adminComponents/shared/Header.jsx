"use client";
import React from "react";
import SearchBar from "./SearchBar";

const NotificationBadge = ({ count }) => (
  <div className="relative">
    <i className="ti ti-bell" />
    <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-xs text-white bg-red-500 rounded-[full]">
      {count}
    </span>
  </div>
);

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-solid">
      <SearchBar
        placeholder="Tìm kiếm..."
        className="w-[300px] max-md:w-60 max-sm:w-40"
      />

      <div className="flex gap-6 items-center max-sm:gap-4">
        <NotificationBadge count={3} />

        <div className="relative">
          <i className="ti ti-shopping-cart" />
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-xs text-white bg-red-500 rounded-[full]">
            0
          </span>
        </div>

        <div className="px-2 py-1 bg-gray-100 rounded">AD</div>
      </div>
    </header>
  );
};

export default Header;
