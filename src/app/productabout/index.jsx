"use client";

import { Text, Img, Button, Slider, Heading, BreadcrumbLink, Breadcrumb, BreadcrumbItem } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductaboutComponent20 from "./ProductaboutComponent20";
import ProductaboutGroup29 from "./ProductaboutGroup29";
import ProductaboutGroup4307 from "./ProductaboutGroup4307";
import ProductaboutGroup47 from "./ProductaboutGroup47";
import Link from "next/link";
import React from "react";

export default function ProductAboutPage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="w-full bg-white-a700">
      <div>
        <Header className="relative z-[2]" />
        <div className="relative z-[3] flex justify-center border-b-[0.5px] border-solid border-black-900_33 bg-white-a700 py-[26px] sm:py-4">
          <div className="container-xs flex items-center justify-center lg:px-5 md:flex-col md:px-5">
            <div className="mb-2.5 flex w-[38%] items-center self-end px-2 md:w-full">
              <div className="flex w-[22%] flex-col items-center">
                <Heading as="h1" className="text-[14px] font-semibold">
                  About Product
                </Heading>
                <div className="h-[2px] w-full self-stretch bg-color___3" />
              </div>
              <Heading as="h2" className="ml-[30px] text-[14px] font-semibold !text-color___11">
                Details
              </Heading>
              <Heading as="h3" className="ml-[30px] text-[14px] font-semibold !text-color___11">
                Specs
              </Heading>
            </div>
            <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
              <Text size="textxl" as="p" className="text-[14px] font-normal">
                <span>On Sale from&nbsp;</span>
                <span className="font-semibold">$3,299.00</span>
              </Text>
              <div className="flex w-[48%] justify-center sm:w-full sm:flex-col">
                <div className="flex w-[18%] items-center justify-center gap-4 rounded-md bg-color___1 p-2 sm:w-full">
                  <Heading size="headinglg" as="h4" className="text-[13px] font-semibold">
                    1
                  </Heading>
                  <div className="flex-1">
                    <Img
                      src="img_frame_98_color_5_1.svg"
                      width={16}
                      height={16}
                      alt="Frame 98"
                      className="h-[16px] w-full"
                    />
                    <Img
                      src="img_frame_97_color_5_1.svg"
                      width={16}
                      height={16}
                      alt="Frame 97"
                      className="h-[16px] w-full"
                    />
                  </div>
                </div>
                <Button
                  size="4xl"
                  variant="fill"
                  className="ml-5 min-w-[150px] rounded-[24px] px-[34px] font-semibold sm:ml-0 sm:px-4"
                >
                  Add to Cart
                </Button>
                <Button size="3xl" variant="fill" className="ml-3 w-[140px] rounded-[24px] px-4 sm:ml-0">
                  <Img src="img_frame_159.svg" width={72} height={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-col">
          <div className="flex flex-1 flex-col items-start justify-center gap-[166px] bg-color___1 py-[60px] pl-[118px] pr-14 lg:gap-[124px] lg:pl-8 md:gap-[124px] md:self-stretch md:p-5 sm:gap-[83px] sm:px-5 sm:py-4">
            <div className="mt-1.5 flex w-[92%] justify-end lg:w-full md:w-full">
              <div className="flex w-[68%] flex-col items-start lg:w-full md:w-full">
                <Breadcrumb
                  separator={<Text className="h-[18px] w-[6px] text-[12px] font-light !text-colors">›</Text>}
                  className="flex flex-wrap gap-9 self-stretch"
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
                  className="mt-6 text-[32px] font-medium lg:text-[27px] md:text-[26px] sm:text-[24px]"
                >
                  MSI MPG Trident 3
                </Heading>
                <div className="mt-3 flex flex-col items-start gap-6 self-stretch">
                  <Text as="p" className="text-[12px] font-normal !text-color___3">
                    Be the first to review this product
                  </Text>
                  <Heading
                    size="text4xl"
                    as="h3"
                    className="w-full text-[18px] font-light leading-[30px] lg:text-[15px]"
                  >
                    MSI MPG Trident 3 10SC-005AU Intel i7 10700F, 2060 SUPER, 16GB RAM, 512GB SSD, 2TB HDD, Windows 10
                    Home, Gaming Keyboard and Mouse 3 Years Warranty Gaming Desktop
                  </Heading>
                </div>
                <div className="mt-11 flex items-center gap-[19px] self-stretch">
                  <Img src="img_contrast_color_3.svg" width={34} height={34} alt="Contrast" className="h-[34px]" />
                  <div className="h-[30px] w-[30px] rotate-[-180deg] rounded-[14px] bg-deep_orange-50" />
                  <div className="h-[30px] w-[30px] rotate-[-180deg] rounded-[14px] bg-gray-200" />
                </div>
                <div className="mt-7 flex flex-wrap justify-between gap-5 self-stretch">
                  <Text as="p" className="flex text-[12px] font-light !text-color___3">
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
              </div>
            </div>
            <Text size="textxl" as="p" className="ml-36 text-[14px] font-normal md:ml-0">
              <span>+&nbsp;</span>
              <span className="font-bold uppercase">More information</span>
            </Text>
          </div>
          <div className="relative h-[674px] w-[44%] content-center lg:h-auto md:h-auto md:w-full md:px-5">
            <div className="Group4570 mx-auto flex w-full">
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
                    <div className="flex flex-col items-start gap-5 bg-white-a700 py-[60px] md:py-5 sm:py-4">
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
                      <div className="mx-[124px] mb-9 flex items-center gap-3 self-stretch md:mx-0 sm:flex-col">
                        <Img
                          src="img_primary_1.svg"
                          width={76}
                          height={26}
                          alt="Primary 1"
                          className="h-[26px] w-[12%] object-contain sm:w-full"
                        />
                        <div className="h-[22px] w-[2px] bg-cyan-600_01 sm:h-[2px] sm:w-[22px]" />
                        <Text as="p" className="w-[28%] text-[12px] font-light leading-[120.5%] sm:w-full">
                          <span>own it now, up to 6 months interest free&nbsp;</span>
                          <a href="#" className="inline underline">
                            learn more
                          </a>
                        </Text>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              />
            </div>
          </div>
        </div>
        <ProductaboutGroup29 />
        <ProductaboutComponent20 />
        <ProductaboutGroup47 />
        <ProductaboutGroup4307 />
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
