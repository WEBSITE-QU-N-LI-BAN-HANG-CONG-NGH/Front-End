"use client";

import { Slider, Text, Img, Button, Heading, BreadcrumbLink, Breadcrumb, BreadcrumbItem } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductdetailsComponent20 from "./ProductdetailsComponent20";
import ProductdetailsGroup1985 from "./ProductdetailsGroup1985";
import ProductdetailsGroup29 from "./ProductdetailsGroup29";
import ProductdetailsGroup4291 from "./ProductdetailsGroup4291";
import ProductdetailsGroup47 from "./ProductdetailsGroup47";
import Link from "next/link";
import React from "react";

export default function ProductDetailsPage() {
  const [sliderState1, setSliderState1] = React.useState(0);
  const sliderRef1 = React.useRef(null);
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="w-full bg-white-a700">
      <Header className="relative z-[2]" />
      <div className="relative z-[3] bg-white-a700">
        <ProductdetailsGroup4291 />
      </div>
      <div className="flex md:flex-col">
        <div className="flex-1 md:self-stretch md:px-5">
          <div className="flex justify-center bg-gray-50 px-14 py-[60px] md:p-5 sm:p-4">
            <div className="mt-1.5 flex w-[86%] flex-col items-start lg:w-full md:w-full">
              <Breadcrumb
                separator={<Text className="h-[18px] w-[6px] text-[12px] font-light !text-colors">›</Text>}
                className="ml-[264px] flex w-[58%] flex-wrap justify-between gap-9 lg:w-full md:ml-0 md:w-full"
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" as={Link}>
                    <Text as="p" className="text-[12px] font-light !text-gray-500">
                      Home
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" as={Link}>
                    <Text as="p" className="text-[12px] font-light !text-gray-500">
                      Laptops
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#" as={Link}>
                    <Text as="p" className="text-[12px] font-light !text-gray-500">
                      MSI WS Series
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Heading
                size="text6xl"
                as="h2"
                className="ml-[262px] mt-6 text-[32px] font-medium lg:text-[27px] md:ml-0 md:text-[26px] sm:text-[24px]"
              >
                MSI MPG Trident 3
              </Heading>
              <Text as="p" className="ml-[264px] mt-3 text-[12px] font-normal !text-color___3 md:ml-0">
                Be the first to review this product
              </Text>
              <Text size="textxl" as="p" className="mt-7 self-end text-[14px] font-light leading-6">
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    Intel Core i7-10700F
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    Intel H410
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    WHITE
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    NVIDIA MSI GeForce RTX 2060 SUPER 8GB AERO ITX GDDR6
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    SO-DIMM 16GB (16GB x 1) DDR4 2666MHz
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    2 total slots (64GB Max)
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    512GB (1 x 512GB) M.2 NVMe PCIe GEN3x4 SSD 2TB (2.5) 5400RPM
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    Gaming Keyboard GK30 + Gaming Mouse GM11
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    3.5 HDD (0/0), 2.5 HDD/SSD(1/0), M.2 (1/0)
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    Intel WGI219Vethernet (10/100/1000M)
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    AX200 (WIFI 6)+BT5.1
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp;&nbsp;</span>
                <span className="text-color___8">
                  <>
                    PSU 330W
                    <br />
                  </>
                </span>
                <span className="text-color___8">•</span>
                <span className="text-color___5-1">&nbsp; Fan Cooler</span>
              </Text>
              <div className="mt-[38px] flex flex-wrap justify-between gap-5 self-stretch">
                <Text as="p" className="ml-[260px] flex text-[12px] font-light !text-color___3">
                  <span className="font-semibold text-color___8">Have a Question?&nbsp;</span>
                  <span className="text-color___3">&nbsp;</span>
                  <a href="#" className="inline font-normal text-color___3 underline">
                    Contact Us
                  </a>
                </Text>
                <Text as="p" className="text-[12px] font-light">
                  SKU D5515AI
                </Text>
              </div>
              <Text size="textxl" as="p" className="ml-36 mt-[82px] text-[14px] font-normal md:ml-0">
                <span>+&nbsp;</span>
                <span className="font-bold uppercase">More information</span>
              </Text>
            </div>
          </div>
        </div>
        <div className="relative h-[746px] w-[44%] content-center lg:h-auto md:h-auto md:w-full md:px-5">
          <div className="Group61 mx-auto flex w-full">
            <Slider
              autoPlay
              autoPlayInterval={2000}
              responsive={{ 0: { items: 1 }, 551: { items: 1 }, 1051: { items: 1 }, 1441: { items: 1 } }}
              renderDotsItem={(props) => {
                return props?.isActive ? (
                  <div className="mr-[11px] inline-block h-[10px] w-[10px] cursor-pointer rounded-[50%] bg-color___3" />
                ) : (
                  <div className="mr-[11px] inline-block h-[10px] w-[10px] cursor-pointer rounded-[50%] bg-color___6-1" />
                );
              }}
              activeIndex={sliderState}
              onSlideChanged={(e) => {
                setSliderState(e?.item);
              }}
              ref={sliderRef}
              items={[...Array(3)].map(() => (
                <React.Fragment key={Math.random()}>
                  <div className="relative h-[746px]">
                    <div className="absolute left-0 right-0 top-[8%] mx-auto flex flex-1 flex-col items-start gap-5">
                      <div className="flex w-[54%] items-start bg-white-a700 px-[22px] py-2.5 lg:w-full md:w-full sm:px-4">
                        <div className="mt-6 flex flex-col items-start gap-1.5">
                          <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1.5">
                            <Img src="img_settings_color_5_1.svg" width={14} height={12} />
                          </Button>
                          <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1.5">
                            <Img src="img_user_color_5_1.svg" width={8} height={12} />
                          </Button>
                          <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1">
                            <Img src="img_lock_color_5_1.svg" width={20} height={20} />
                          </Button>
                        </div>
                        <Img
                          src="img_image_9.png"
                          width={254}
                          height={444}
                          alt="Image 9"
                          className="h-[444px] w-[60%] self-center object-contain"
                        />
                      </div>
                      <div className="mx-[124px] flex items-center gap-[13px] self-stretch md:mx-0 sm:flex-col">
                        <div className="flex items-center gap-2.5">
                          <Img
                            src="img_primary_1.svg"
                            width={76}
                            height={26}
                            alt="Primary 1"
                            className="h-[26px] w-[96%] object-contain"
                          />
                          <div className="h-[22px] w-[2px] self-end bg-cyan-600_01" />
                        </div>
                        <Text as="p" className="w-[26%] text-[12px] font-light leading-[120.5%] sm:w-full">
                          <span>own it now, up to 6 months interest free&nbsp;</span>
                          <a href="#" className="inline underline">
                            learn more
                          </a>
                        </Text>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 top-0 m-auto w-full flex-col bg-white-a700">
                      <Slider
                        autoPlay
                        autoPlayInterval={2000}
                        responsive={{ 0: { items: 1 }, 551: { items: 1 }, 1051: { items: 0 }, 1441: { items: 0 } }}
                        disableDotsControls
                        activeIndex={sliderState1}
                        onSlideChanged={(e) => {
                          setSliderState1(e?.item);
                        }}
                        ref={sliderRef1}
                        items={[...Array(0)].map(() => (
                          <React.Fragment key={Math.random()}></React.Fragment>
                        ))}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            />
          </div>
        </div>
      </div>
      <ProductdetailsGroup29 />
      <ProductdetailsComponent20 />
      <ProductdetailsGroup47 />
      <ProductdetailsGroup1985 />
      <Footer />
    </div>
  );
}
