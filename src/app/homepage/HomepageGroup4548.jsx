import { Text, Heading } from "../../components";
import HomeOneFrame82 from "../../components/HomeOneFrame82";
import React, { Suspense } from "react";

const data = [
  {
    inStock: "in stock",
    reviews4: "Reviews (4)",
    eXDISPLAYMSI: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    p4990049900: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    inStock: "in stock",
    reviews4: "Reviews (4)",
    eXDISPLAYMSI: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    p4990049900: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    inStock: "in stock",
    reviews4: "Reviews (4)",
    eXDISPLAYMSI: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    p4990049900: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    inStock: "in stock",
    reviews4: "Reviews (4)",
    eXDISPLAYMSI: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    p4990049900: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    inStock: "in stock",
    reviews4: "Reviews (4)",
    eXDISPLAYMSI: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    p4990049900: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    inStock: "in stock",
    reviews4: "Reviews (4)",
    eXDISPLAYMSI: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    p4990049900: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
];

export default function HomepageGroup4548() {
  return (
    <div className="flex justify-center self-stretch">
      <div className="container-xs flex justify-center lg:px-5 md:px-5">
        <div className="flex w-full flex-col gap-3.5">
          <div className="ml-2 flex flex-wrap items-center justify-between gap-5 md:ml-0">
            <Heading size="heading5xl" as="h1" className="text-[22px] font-semibold lg:text-[18px]">
              New Products
            </Heading>
            <Text size="textlg" as="p" className="self-end text-[13px] font-normal !text-color___3 underline">
              See All New Products
            </Text>
          </div>
          <div className="flex md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {data.map((d, index) => (
                <HomeOneFrame82 {...d} key={"group4543" + index} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
