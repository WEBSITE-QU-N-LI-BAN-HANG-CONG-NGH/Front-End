"use client";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import Features from "../../components/layout/Features"
import CustomBuilds from "../../components/ui/CustomBuilds"
import Slider from "../../components/ui/Slider"
import FlashSale from "../../components/ui/FlashSale"
import TabMenu from "../../components/ui/TabMenu"
import Desktops from "../../components/ui/Desktops"
import GamingMonitors from "../../components/ui/GamingMonitors"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Exit loading state after data is fetched
    }, 1000);
  }, []);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <CircularProgress />
        <p className="ml-3">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }
  
  if (error) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p>{error}</p>
      <p>Vui lòng quay lại bước trước và thử lại.</p>
    </div>
  );
}

  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white z-50">
      <div className="z-50">
      <Header />
      </div>
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

export default Home;
