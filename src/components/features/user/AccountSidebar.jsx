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
      
      {/* Banner đăng ký làm người bán */}
      <div className="mt-4 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-4 text-white shadow-md">
        <div className="font-bold text-lg mb-2">Trở thành người bán</div>
        <div className="text-sm mb-3">Mở rộng kinh doanh và tăng thu nhập của bạn với Tech Shop</div>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full font-bold text-sm transition-colors duration-300">
          Đăng ký ngay
        </button>
      </div>
    </div>
  </nav>
);

export default AccountSidebar;