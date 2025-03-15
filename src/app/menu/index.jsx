"use client";

import { Heading, Img, Input } from "../../components";
import ProductDetails21 from "../../components/ProductDetails21";
import MenuGroup1456 from "./MenuGroup1456";
import React, { Suspense } from "react";

const data = [
  {
    inStock: "in stock",
    reviewText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    productPrice: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    inStock: "in stock",
    reviewText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    productPrice: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    inStock: "in stock",
    reviewText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    productPrice: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    inStock: "in stock",
    reviewText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    productPrice: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
];

export default function MenuPage() {
  return (
    <div className="w-full">
      <div className="mt-[22px] flex flex-col items-start gap-[26px]">
        <div className="ml-[92px] flex w-[6%] justify-center rounded-[18px] bg-color___3 p-1 md:ml-0 md:w-full">
          <Heading as="h1" className="self-end text-[14px] font-semibold !text-white-a700">
            Laptops
          </Heading>
        </div>
        <div className="flex flex-col items-center self-stretch border border-solid border-color___6-1 bg-white-a700 shadow-xs">
          <div className="mx-auto flex w-full max-w-[1370px] items-center gap-[18px] self-stretch md:flex-col md:px-5">
            <div className="flex w-[26%] items-start justify-center md:w-full">
              <a href="https://www.youtube.com/embed/bv8Fxk0sz7I" target="_blank">
                <div className="flex flex-1 flex-col items-start">
                  <Input
                    size="sm"
                    shape="square"
                    name="Group 117"
                    placeholder={`Everyday Use Notebooks`}
                    className="self-stretch px-[26px] font-semibold sm:px-5"
                  />
                  <div className="ml-[26px] mr-[22px] mt-2 flex items-center justify-between gap-5 self-stretch md:mx-0">
                    <Heading as="h2" className="text-[14px] font-semibold">
                      MSI Workstation Series
                    </Heading>
                    <Img
                      src="img_vector_12.svg"
                      width={2}
                      height={4}
                      alt="Vector 14"
                      className="mb-1.5 h-[4px] self-end"
                    />
                  </div>
                  <Heading as="h3" className="ml-[26px] mt-[22px] text-[14px] font-semibold md:ml-0">
                    MSI Prestige Series
                  </Heading>
                  <Heading as="h4" className="ml-[26px] mt-[22px] text-[14px] font-semibold md:ml-0">
                    Gaming Notebooks
                  </Heading>
                  <Heading as="h5" className="ml-[26px] mt-[22px] text-[14px] font-semibold md:ml-0">
                    Tablets And Pads
                  </Heading>
                  <Heading as="h6" className="ml-[26px] mt-[22px] text-[14px] font-semibold md:ml-0">
                    Netbooks
                  </Heading>
                  <Heading as="p" className="ml-[26px] mt-[22px] text-[14px] font-semibold md:ml-0">
                    Infinity Gaming Notebooks
                  </Heading>
                </div>
              </a>
              <div className="h-[394px] w-px self-center bg-black-900_33" />
            </div>
            <div className="ml-[18px] flex flex-1 gap-5 md:ml-0 md:flex-col md:self-stretch">
              <Suspense fallback={<div>Loading feed...</div>}>
                {data.map((d, index) => (
                  <ProductDetails21 {...d} key={"group4070" + index} className="bg-white-a700" />
                ))}
              </Suspense>
            </div>
          </div>
          <MenuGroup1456 />
        </div>
      </div>
    </div>
  );
}
