"use client";

import { Heading, Img, Input } from "../../components";
import HoveredMenuOne from "../../components/HoveredMenuOne";
import HoveredMenuOneFrame44 from "../../components/HoveredMenuOneFrame44";
import HoveredmenuGroup112 from "./HoveredmenuGroup112";
import React from "react";

export default function HoveredMenuPage() {
  return (
    <div className="w-full">
      <div className="mt-[22px] flex flex-col items-start gap-[26px]">
        <div className="ml-[92px] flex w-[6%] justify-center rounded-[18px] bg-color___3 p-1 md:ml-0 md:w-full">
          <Heading as="h1" className="self-end text-[14px] font-semibold !text-white-a700">
            Laptops
          </Heading>
        </div>
        <div className="flex flex-col items-center self-stretch border border-solid border-color___6-1 bg-white-a700 shadow-sm">
          <div className="relative z-[1] mx-auto flex w-full max-w-[1372px] items-center self-stretch md:flex-col md:px-5">
            <div className="flex w-[26%] flex-col gap-2 self-start md:w-full">
              <Input
                size="sm"
                shape="square"
                name="Group 2"
                placeholder={`Everyday Use Notebooks`}
                className="px-[26px] font-semibold sm:px-5"
              />
              <div className="ml-7 mr-6 flex flex-col items-start gap-[22px] md:mx-0">
                <div className="flex items-center justify-between gap-5 self-stretch">
                  <Heading as="h2" className="text-[14px] font-semibold">
                    MSI Workstation Series
                  </Heading>
                  <Img src="img_vector_12.svg" width={2} height={4} alt="Vector 12" className="h-[4px]" />
                </div>
                <Heading as="h3" className="text-[14px] font-semibold">
                  MSI Prestige Series
                </Heading>
                <Heading as="h4" className="text-[14px] font-semibold">
                  Gaming Notebooks
                </Heading>
                <Heading as="h5" className="text-[14px] font-semibold">
                  Tablets And Pads
                </Heading>
                <Heading as="h6" className="text-[14px] font-semibold">
                  Netbooks
                </Heading>
                <Heading as="p" className="text-[14px] font-semibold">
                  Infinity Gaming Notebooks
                </Heading>
              </div>
            </div>
            <div className="flex flex-1 md:flex-row md:self-stretch sm:flex-col">
              <HoveredMenuOne />
              <HoveredMenuOne
                inStock="in stock"
                reviews4="Reviews (4)"
                eXDISPLAYMSI="EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On..."
              />
            </div>
            <div className="ml-1.5 flex w-[36%] gap-5 md:ml-0 md:w-full md:flex-row sm:flex-col">
              <HoveredMenuOneFrame44 />
              <HoveredMenuOneFrame44 className="bg-white-a700 px-6 sm:px-5" />
            </div>
          </div>
          <HoveredmenuGroup112 />
        </div>
      </div>
    </div>
  );
}
