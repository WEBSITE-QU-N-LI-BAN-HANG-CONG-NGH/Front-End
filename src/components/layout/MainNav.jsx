"use client";

import React from 'react';

const NavigationItem = ({ label, isButton = false }) => {
  if (isButton) {
    return (
      <button
        className="gap-2.5 px-7 py-2 text-blue-600 border-2 border-solid border-[#0156FF] duration-500 rounded-[50px] hover:bg-[#0156FF] hover:text-white transition-colors max-md:px-5"
        aria-label={label}
      >
        {label}
      </button>
    );
  }

  return (
    <a
      href="#"
      className="self-stretch my-auto hover:text-blue-600 transition-colors"
      aria-label={label}
    >
      {label}
    </a>
  );
};

const NavigationItems = () => {
  return (
    <nav className="flex flex-wrap gap-7 items-center text-black max-md:max-w-full">
      <NavigationItem label="Laptops" />
      <NavigationItem label="Desktop PCs" />
      <NavigationItem label="Networking Devices" />
      <NavigationItem label="Printers & Scanners" />
      <NavigationItem label="PC Parts" />
      <NavigationItem label="All Other Products" />
      <NavigationItem label="Repairs" />
      <NavigationItem label="Our Deals" isButton />
    </nav>
  );
};

const UserSection = () => {
  return (
    <div className="flex gap-7 self-start text-blue-600">
      <button
        aria-label="Search"
        className="flex items-center justify-center"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/9edd8cd2036453bb740e680adbc0e397b100cd4d853e8a8295186e4c513c8a91"
          className="object-contain shrink-0 my-auto aspect-square w-[19px]"
          alt="Search icon"
        />
      </button>
      <div className="flex gap-4 items-start">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/496b1ec1b29a4d7ab62e6343656956da/aa4c7aa8b88a889f49c4ee1088aaf9662b81e78ac35ffefc8ca1f002590915ba"
          className="object-contain shrink-0 aspect-[1.03] w-[33px]"
          alt="User icon"
        />
        <button
          className="gap-2.5 self-stretch py-1 pr-4 pl-7 mt-1.5 border-2 border-solid border-[#0156FF] duration-500 hover:text-white min-h-[29px] rounded-[50px] hover:bg-[#0156FF] transition-colors max-md:pl-5"
          aria-label="Sign in"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

const MainNav = () => {
  return (
    <header className="flex flex-col justify-center items-center px-16 py-7 w-full text-sm font-semibold text-center bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between ml-14 max-w-full w-[1284px]">
        <NavigationItems />
        <UserSection />
      </div>
    </header>
  );
};

export default MainNav;
