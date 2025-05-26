"use client";
import React from "react";
import { Link } from "react-router-dom";

const FooterLinkSection = ({ title, links, pathPrefix = "" }) => {
  return (
    <nav className="mr-10 mb-8 min-w-[200px] max-md:mr-5 max-md:min-w-[150px] max-sm:mb-6 max-sm:w-full">
      <h2 className="mb-5 text-xl font-bold max-md:text-lg">{title}</h2>
      <ul className="flex flex-col gap-3">
        {links.map((link, index) => {
          const linkPath = link.toLowerCase().replace(/\s+/g, '-');
          const fullPath = `${pathPrefix}/${linkPath}`;
          
          return (
            <li key={index}>
              <Link 
                to={fullPath}
                className="text-xl font-light cursor-pointer duration-[0.2s] transition-[color] hover:text-gray-300 max-md:text-lg"
              >
                {link}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const FooterAddressSection = () => {
  return (
    <address className="mr-10 mb-8 min-w-[200px] max-md:mr-5 max-md:min-w-[150px] max-sm:mb-6 max-sm:w-full not-italic">
      <h2 className="mb-5 text-sm font-bold text-white text-opacity-50">
        Address
      </h2>
      <div className="text-sm">
        <p className="mb-2.5">
          Address: 97 Man Thiện, Thủ Đức, TP. Hồ Chí Minh
        </p>
        <p className="mb-2.5">
          <span>Phone: </span>
          <a href="tel:0012345678" className="text-sky-500">
            (00) 1234 5678
          </a>
        </p>
        <p className="mb-2.5">
          <span>E-mail: </span>
          <a href="mailto:shop@email.com" className="text-sky-500">
            shop@email.com
          </a>
        </p>
      </div>
    </address>
  );
};

const FooterCopyright = () => {
  return (
    <div className="absolute right-5 bottom-5 text-xs font-medium opacity-60 max-sm:relative max-sm:right-auto max-sm:bottom-auto max-sm:mt-5 max-sm:text-center">
      Copyright © 2025 Shop Pty. Ltd.
    </div>
  );
};

const Footer = () => {
  const informationLinks = [
    "Báo cáo vấn đề",
  ];

  const componentsLinks = [
    "CPU",
    "Ổ cứng",
    "Card đồ họa",
    "Vỏ case/ Nguồn",
    "RAM",
    "Tai nghe / Loa",
    "Bàn phím / Chuột",
  ];

  const desktopLinks = [
    "Custom PC",
    "MSI All-In-One PC",
    "HP/Compaq PC",
    "AUS PC",
    "Tecs PC",
  ];

  const phoneLinks = [
    "iPhone series",
    "Oppo",
    "Xiaomi",
    "Samsung",
    "Vivo",
    "Gaming phone",
  ];

  const laptopLinks = [
    "Acer",
    "Asus",
    "Dell",
    "HP",
    "MSI",
    "Lenovo",
    "Macbook",
  ];

  const accessoryLinks = [
    "Tai nghe không dây",
    "Cáp sạc",
    "Sạc dự phòng",
    "Ốp lưng",
    "Kính cường lực",
  ];

  return (
    <footer className="flex relative flex-wrap justify-between px-12 py-10 bg-black text-[white] max-md:px-4 max-md:py-8 max-sm:flex-col max-sm:p-5">
      <FooterLinkSection title="Linh kiện" links={componentsLinks} pathPrefix="/components" />
      <FooterLinkSection title="Máy tính bàn" links={desktopLinks} pathPrefix="/desktop" />
      <FooterLinkSection title="Điện thoại" links={phoneLinks} pathPrefix="/phone" />
      <FooterLinkSection title="Laptop" links={laptopLinks} pathPrefix="/laptop" />
      <FooterLinkSection title="Phụ kiện" links={accessoryLinks} pathPrefix="/accessories" />
      <FooterLinkSection title="Liên hệ" links={informationLinks} pathPrefix="/information" />
      <FooterCopyright />
      <div className="flex shrink-0 mt-14 max-w-full h-px bg-white w-full max-md:mt-10" />
        <div className="flex flex-wrap gap-10 items-start mt-9 w-full max-w-[1360px] max-md:max-w-full">
          <div className="flex gap-10">
          <FooterAddressSection />
            <a href="https://www.facebook.com/EdenHoangKim/">
              <img
                src="/FacebookIcon.svg"
                className="object-contain shrink-0 aspect-[1.06] w-[40px]"
                alt="Social icon 1"
              />
            </a>

            <a href="https://www.instagram.com/edenhoangkim/">
              <img
                src="/InstagramIcon.svg"
                className="object-contain shrink-0 aspect-[1.06] w-[40px]"
                alt="Social icon 2"
              />
            </a>

            <a href="https://vnpay.vn">
              <img
                src="/VNPayIcon.jpg"
                className="object-contain shrink-0 aspect-[1.06] w-[40px]"
                alt="Payment methods"
              />
            </a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;