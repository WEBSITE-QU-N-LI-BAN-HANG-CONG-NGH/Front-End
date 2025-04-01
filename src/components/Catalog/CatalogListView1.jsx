"use client";
import React from "react";
import Header from "../shared/Header";
import FilterSidebar from "./FilterSidebar";
import ProductList from "./ProductList";
import Footer from "../shared/Footer";
import Features from "../shared/Features"
import ProductControls from "./ProductControls";
import BreadcrumbNav from "../shared/BreadcrumbNav";
import Pagination from "./Pagination";

const CatalogListView1 = () => {
  const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ed0540ca2cedf398ec97c2e925116c08623c0ff23c3006ceb816cb8a449926d?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088",
      sku: "D5515AI",
      title:
        "MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop",
      originalPrice: "499.00",
      currentPrice: "499.00",
      reviews: 4,
    },
    // Add more products as needed
  ];

  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <Header />

      <main className="flex flex-col self-center mt-4 w-full max-w-[1407px] max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/df009f648404a862f165ad0ca33b61acfeb57db1?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
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
                <div className="flex flex-row gap-2 justify-center items-center max-w-full text-sm font-semibold leading-loose text-black w-[611px]">
                <div className="flex flex-row grow gap-2.5 justify-center items-center px-4 py-3 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] max-w-[230px] max-md:pr-5">
                  <span>
                    CUSTOM PCS{" "}
                    <span className="font-normal text-gray-400">(24)</span>
                  </span>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fbaf90292c2ac43deb38a7173acaae088%2F0f00ee0f37754e83bffdc00659a5fc77"
                    alt="Remove filter"
                    className="box-border object-cover overflow-hidden shrink-0 aspect-square min-h-5 min-w-5 w-[0%]"
                  />
                </div>
                <div className="flex flex-row gap-2.5 justify-center items-center px-4 py-3 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] max-w-[230px] max-md:pr-5">
                  <span>
                    HP/COMPAQ PCS{" "}
                    <span className="font-normal text-gray-400">(24)</span>
                  </span>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fbaf90292c2ac43deb38a7173acaae088%2F0f00ee0f37754e83bffdc00659a5fc77"
                    alt="Remove filter"
                    className="box-border object-cover overflow-hidden shrink-0 aspect-square min-h-5 min-w-5 w-[0%]"
                  />
                </div>
                <button className="px-4 py-3.5 bg-white rounded-sm border border-solid border-[color:var(--Color---6,#CACDD8)] h-[53px]">
                  Clear All
                </button>
              </div>

                <ProductList />
                
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

      {/* Features section */}
      <section className="flex flex-col justify-center items-center px-16 py-14 mt-9 w-full bg-violet-50 max-md:px-5 max-md:max-w-full">
        <div className="max-w-full w-[1054px]">
          <div className="flex gap-5 max-md:flex-col">
            <Features />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CatalogListView1;