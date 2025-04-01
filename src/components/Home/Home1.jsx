"use client";
import React from "react";
import Header from "../shared/Header";
import FlashSale from "./FlashSale";
import CustomBuilds from "./CustomBuilds";
import Desktops from "./Desktops";
import GamingMonitors from "./GamingMonitors";
import Features from "../shared/Features";
import Footer from "../shared/Footer";
import TabMenu from "./TabMenu";
import Slider from "./Slider";

const Home1 = () => {
  const desktopProducts = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/821479d907471ed41755b81c77da15bfd660f3433f54c08b9224cc78f5d67830?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/821eff83ac660e17650bf9722556d63f4920036eda8838ac07ef0a445d7fbd90?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c1a0a83a21dde0ff6192348a4b0b7ea5c091968e754610cd9953782f913d76c4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c1a0a83a21dde0ff6192348a4b0b7ea5c091968e754610cd9953782f913d76c4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c1a0a83a21dde0ff6192348a4b0b7ea5c091968e754610cd9953782f913d76c4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
  ];

  const gamingMonitorProducts = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6e5856cfb7de00e03268f5940aed4937e9fc64c41deb4ac4b93d7a029405b73b?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ed0540ca2cedf398ec97c2e925116c08623c0ff23c3006ceb816cb8a449926d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9b7de62500504e9ef56874e64f38789198ecdd6147210406d0ab82c09f3853b5?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/88f73a65bce1151287094e77cf67027d40ca04d77298288b51cc5e2706c02d2f?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ed0540ca2cedf398ec97c2e925116c08623c0ff23c3006ceb816cb8a449926d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      title: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
      price: "499.00",
      originalPrice: "499.00",
    },
  ];

  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <Header />

      <div className="flex flex-col items-center self-end mt-3 w-full max-w-[1652px] max-md:mr-2 max-md:max-w-full">
        <Slider />

        <FlashSale />

        <TabMenu/>

        <CustomBuilds />

        <TabMenu/>

        <Desktops />

        <TabMenu/>

        <GamingMonitors />
      </div>

      <Features />
      <Footer />
    </div>
  );
};

export default Home1;
