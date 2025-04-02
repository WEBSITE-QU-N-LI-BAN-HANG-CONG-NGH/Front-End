"use client";
import React from "react";
import Header from "../shared/Header";
import FilterSidebar from "./FilterSidebar";
import Footer from "../shared/Footer";
import Features from "../shared/Features"
import ProductControls from "./ProductControls";
import BreadcrumbNav from "../shared/BreadcrumbNav";
import Pagination from "./Pagination";
import Filter from "./Filter";
import ProductCardList from "./ProductCardList";

const CatalogListView1 = () => {
  const products = [
    {
      image:
        "/Placeholder2.png",
      sku: "D5515AI",
      title:
        "MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop",
      originalPrice: "499.00",
      currentPrice: "499.00",
      reviews: "/RatingPlaceholder.svg",
      available: "in stock",
      cpu: "N/A",
      featured: "N/A",
      ioport: "N/A",
    },
    // Add more products as needed
  ];

  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <Header />

      <main className="flex flex-col self-center mt-4 w-full max-w-[1407px] max-md:max-w-full">
        <img
          src="/BannerPlaceholder.png"
          className="object-contain w-full aspect-[13.51] max-md:max-w-full"
          alt="Banner"
        />

        <BreadcrumbNav />

        <h1 className="self-start mt-5 text-3xl font-semibold text-center text-black max-md:ml-2">
          MSI PS Series (20)
        </h1>

        <ProductControls />

        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <FilterSidebar />
            <section className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full max-md:mt-2.5 max-md:max-w-full">
                <Filter />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              </div>

              <div className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col mt-1.5 w-full max-md:mt-2.5 max-md:max-w-full">
                {products.map((product, index) => (
                  <ProductCardList key={index} {...product} />
                ))}
                </div>
              </div>
                
                <Pagination />

                <p className="mt-14 ml-5 text-xs text-neutral-400 max-md:mt-10 max-md:mr-1 max-md:max-w-full">
                  MSI has unveiled the Prestige Series line of business-class and gaming
                  notebooks. Tuned for color accuracy, the Prestige Series also
                  leverages True Color Technology, which allows users to adjust the
                  display profile to best fit their computing needs.
                  <br />
                  <br />
                  There are six different screen profiles, which are tuned for gaming,
                  reducing eye fatigue, sRGB color accuracy, increasing clarity for
                  words and lines, reducing harmful blue light, and optimizing contrast
                  for watching movies.
                  <br />
                  Given the various display profiles and discrete graphics chip, the
                  Prestige Series notebooks can be used for various design work as well
                  as for office tasks given that the screen can be adjusted for better
                  clarity, color accuracy, or for eye strain reduction. Users working
                  with video or 3D rendering will appreciate the "movie mode" for which
                  contrast is increased.
                  <br />
                  <br />
                  Home users or students can benefit from the "anti-blue" and the
                  "office mode" options, both of which are designed to reduce eye
                  strain. This is helpful when working on the computer for extended
                  periods of time. Additionally, in their down time, students can also
                  use the "gamer mode" to increase the screen brightness.
                </p>
                <button className="gap-2.5 self-center px-7 py-2 mt-3.5 text-sm font-semibold text-center text-gray-400 whitespace-nowrap border-2 border-solid border-[color:var(--Color---5,#A2A6B0)] rounded-[50px] max-md:px-5">
                        More
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
            <Features />

      <Footer />
    </div>
  );
};

export default CatalogListView1;