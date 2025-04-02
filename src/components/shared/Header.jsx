import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex flex-col self-center max-w-full font-semibold text-center w-[1400px]">
        <div className="flex flex-wrap gap-9 justify-center items-center mt-8 w-full text-sm text-black max-md:mr-2 max-md:max-w-full">
        <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">Laptops</div>
        <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">Máy tính bàn</div>
        <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">Phụ kiện</div>
        <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">Điện thoại</div>
        <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">Linh kiện máy tính</div>
        <div className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300">Sản phẩm khác</div>
        <div className="gap-2.5 self-stretch px-7 py-2 text-blue-600 border-2 border-solid border-[color:var(--Color---3,#0156FF)] rounded-[50px] max-md:px-5 hover:bg-blue-600 hover:text-white transition-colors duration-300">
  Our Deals
</div>

          <div className="flex items-center border-2 border-solid border-[color:var(--Color---7,#000)] h-[37px] rounded-[50px] w-[250px] ml-4">
  <button className="flex items-center justify-center px-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5 text-gray-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
      />
    </svg>
  </button>
          <input
            type="text"
            className="flex-grow py-2 pl-2 pr-3 border-none rounded-[50px] focus:outline-none h-full"
            placeholder="Search"
          />
        </div>

          <a
            href="#"
            className="relative inline-block"
            aria-label="Shopping Cart"
            onClick={() => alert("Shopping Cart clicked!")}
          >
            <img
              src="/CartIcon.png"
              className="object-contain shrink-0 self-start aspect-[1.18] w-[33px]"
              alt="Cart Icon"
            />
            <span
              className="absolute bottom-3 left-3 text-white bg-blue-600 rounded-full text-xs px-1.5 py-0.5"
            >
              0
            </span>
          </a>


          <button
           className="gap-2.5 self-stretch py-0.5 pr-5 pl-6 my-auto text-blue-600 border-2 border-solid border-[color:var(--Color---3,#0156FF)] min-h-[25px] rounded-[50px] max-md:pl-5 hover:bg-blue-600 hover:text-white transition-colors">
              Đăng nhập
          </button>

        </div>
      </div>
      <img
        src="/Bar.svg"
        className="object-contain mt-5 w-full aspect-[1000] stroke-[1px] stroke-gray-300 max-md:max-w-full"
      />
    </>
  );
};

export default Header;
