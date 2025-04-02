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
