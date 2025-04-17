import React from "react";
const AccountSidebar = () => (
  <nav className="w-[326px] max-md:w-full">
    <div className="flex flex-col gap-4 p-5 bg-violet-50">
      <h2 className="text-base font-bold text-neutral-800">
        Thông tin tài khoản
      </h2>
      <a href="#" className="text-base text-stone-500 hover:text-blue-600">
        Quản lý đơn hàng
      </a>
      <a href="#" className="text-base text-stone-500 hover:text-blue-600">
        Đăng xuất
      </a>
    </div>
  </nav>
);

export default AccountSidebar;