import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import LoginForm from '../../pages/Auth/LoginForm';

const Header = () => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const modalRef = useRef(null);

  const handleButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowLoginForm(false);
    }
  };

  useEffect(() => {
    if (showLoginForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginForm]);


  return (
    <>
      <div className="flex flex-col self-center max-w-full font-semibold text-center w-full">
        <div className="flex flex-wrap gap-5 justify-center items-center mt-8 w-full text-sm text-black max-md:mr-2 max-md:max-w-full">
        <img
                src="/ShopIcon.png"
                className="object-contain aspect-square w-[65px]"
                alt="Tech Shop"
              />
       <>
      <div
        className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Trang chủ
      </div>
      <div
        className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/laptops")}
      >
        Laptops
      </div>
      <div
        className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/desktop-computers")}
      >
        Máy tính bàn
      </div>
      <div
        className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/accessories")}
      >
        Phụ kiện
      </div>
      <div
        className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/phones")}
      >
        Điện thoại
      </div>
      <div
        className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/computer-parts")}
      >
        Linh kiện máy tính
      </div>
      <div
        className="self-stretch my-auto hover:text-blue-600 transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/other-products")}
      >
        Sản phẩm khác
      </div>
      <div
        className="gap-2.5 self-stretch my-auto px-7 py-2 text-blue-600 border-2 border-solid border-[color:var(--Color---3,#0156FF)] rounded-[50px] max-md:px-5 hover:bg-blue-600 hover:text-white transition-colors duration-300 cursor-pointer"
        onClick={() => navigate("/our-deals")}
      >
        Our Deals
      </div>
    </>

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
            href="/Cart"
            className="relative inline-block"
            aria-label="Shopping Cart"
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


          <div>
      <button
        className="py-2 px-6 text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
        onClick={handleButtonClick}
      >
        Đăng nhập
      </button>
      {showLoginForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div
            ref={modalRef}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-20 rounded-lg shadow-lg"
          >
            <LoginForm />
          </div>
        </div>
      )}
    </div>


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