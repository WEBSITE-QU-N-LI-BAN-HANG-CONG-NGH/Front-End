// src/pages/Home/Home.jsx
import React from "react";
import { useState, useEffect } from "react";
import CustomBuilds from "../../components/features/product/CustomBuilds";
import Slider from "../../components/features/product/Slider";
import FlashSale from "../../components/features/product/FlashSale";
import TabMenu from "../../components/features/catalog/TabMenu";
import Desktops from "../../components/features/product/Desktops";
import GamingMonitors from "../../components/features/product/GamingMonitors";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="ml-3">Đang tải...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white mr-37">
      <div className="flex flex-col items-center self-end mt-3 w-full max-w-[1652px] max-md:mr-2 max-md:max-w-full">
        <Slider />
        <FlashSale />
        {/* <TabMenu/> */}
        <CustomBuilds />
        {/* <TabMenu/> */}
        <Desktops />
        {/* <TabMenu/> */}
        {/* <GamingMonitors /> */}
      </div>
    </div>
  );
};

export default Home;