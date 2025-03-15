"use client";

import { Img, Heading, Text, RatingBar, Button, Slider } from "../../components";
import Footer from "../../components/Footer";
import HomeOneFrame821 from "../../components/HomeOneFrame821";
import ProductDetails2 from "../../components/ProductDetails2";
import HomepageGroup3207 from "./HomepageGroup3207";
import HomepageGroup4545 from "./HomepageGroup4545";
import HomepageGroup4548 from "./HomepageGroup4548";
import HomepageGroup4553 from "./HomepageGroup4553";
import Link from "next/link";
import React, { Suspense } from "react";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

const data = [
  {
    inStock: "in stock",
    image29: "img_image_29_11.png",
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
    image29: "img_image_29_11.png",
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
    image29: "img_image_29_11.png",
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
    image29: "img_image_29_14.png",
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
    image29: "img_image_29_11.png",
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

export default function HomepagePage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="relative w-full content-center lg:h-auto md:h-auto">
      <div className="w-full bg-white-a700">
        <header>
          <div className="flex justify-center bg-black-900_04 py-2">
            <div className="container-xs flex items-center justify-between gap-5 self-end lg:px-5 md:flex-col md:px-5">
              <div className="flex w-[66%] items-center justify-between gap-5 md:w-full md:flex-col">
                <div className="flex items-center gap-1">
                  <Heading size="headingmd" as="p" className="text-[12px] font-semibold !text-white-a700">
                    Mon-Thu: 9:00 AM - 5:30 PM
                  </Heading>
                  <Img
                    src="img_frame_97_white_a700.svg"
                    width={16}
                    height={14}
                    alt="Frame 97"
                    className="h-[14px] self-end"
                  />
                </div>
                <div className="flex w-[46%] flex-col items-end md:w-full">
                  <Heading size="headingmd" as="p" className="text-[12px] font-semibold !text-white-a700">
                    Visit our showroom in 1234 Street Adress City Address, 1234 Contact Us
                  </Heading>
                  <div className="h-[2px] w-[16%] bg-white-a700" />
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <Heading size="headingmd" as="p" className="self-end text-[12px] font-semibold !text-white-a700">
                  Call Us: (00) 1234 5678
                </Heading>
                <div className="flex gap-2">
                  <Link href="#">
                    <Img
                      src="img_ant_design_facebook_filled_white_a700_20x20.svg"
                      width={20}
                      height={20}
                      alt="Ant Design Facebook Filled"
                      className="h-[20px]"
                    />
                  </Link>
                  <Link href="#">
                    <Img
                      src="img_ant_design_instagram_filled_white_a700_20x20.svg"
                      width={20}
                      height={20}
                      alt="Ant Design Instagram Filled"
                      className="h-[20px]"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center border-b-[0.5px] border-solid border-color___6-1 bg-white-a700 py-2.5">
            <div className="container-xs flex items-center justify-between gap-5 lg:px-5 md:flex-col md:px-5">
              <div className="flex w-[78%] items-center justify-center md:w-full md:flex-col">
                <Img
                  src="img_logo.svg"
                  width={84}
                  height={68}
                  alt="Logo"
                  className="h-[68px] w-[8%] object-contain md:w-full"
                />
                <div className="ml-[34px] flex flex-1 justify-center md:ml-0 md:self-stretch">
                  <ul className="flex flex-wrap gap-[26px]">
                    <li>
                      <Link href="#">
                        <Heading as="p" className="text-[14px] font-semibold">
                          Laptops
                        </Heading>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Heading as="p" className="text-[14px] font-semibold">
                          Desktop PCs
                        </Heading>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Heading as="p" className="text-[14px] font-semibold">
                          Networking Devices
                        </Heading>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Heading as="p" className="text-[14px] font-semibold">
                          Printers & Scanners
                        </Heading>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Heading as="p" className="text-[14px] font-semibold">
                          PC Parts
                        </Heading>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Heading as="p" className="text-[14px] font-semibold">
                          All Other Products
                        </Heading>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Heading as="p" className="text-[14px] font-semibold">
                          Repairs
                        </Heading>
                      </Link>
                    </li>
                  </ul>
                </div>
                <Button className="ml-6 min-w-[120px] rounded-[18px] !border-2 font-semibold md:ml-0">Our Deals</Button>
              </div>
              <div className="flex w-[12%] items-end justify-center md:w-full">
                <Link href="#">
                  <Img src="img_search_color_8.svg" width={18} height={18} alt="Search" className="mb-1.5 h-[18px]" />
                </Link>
                <div className="relative ml-7 h-[32px] w-[22%] self-center">
                  <Link href="#">
                    <Img
                      src="img_jam_shopping_cart_color_8.svg"
                      width={24}
                      height={24}
                      alt="Jam Shopping Cart"
                      className="absolute bottom-px left-0 m-auto h-[24px]"
                    />
                  </Link>
                  <Heading
                    size="headingxs"
                    as="p"
                    className="absolute right-[-1px] top-0 m-auto flex h-[16px] w-[16px] items-center justify-center rounded-lg bg-color___3 text-center text-[10px] font-bold !text-white-a700"
                  >
                    2
                  </Heading>
                </div>
                <Button size="md" shape="round" className="ml-3.5 min-w-[90px] rounded-[14px] !border-2 font-semibold">
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-col items-center gap-9">
          <div className="container-xs lg:px-5 md:px-5">
            <div className="relative h-[328px] content-center lg:h-auto md:h-auto">
              <div className="mx-auto flex w-full">
                <Slider
                  autoPlay
                  autoPlayInterval={2000}
                  responsive={{ 0: { items: 1 }, 551: { items: 1 }, 1051: { items: 1 }, 1441: { items: 1 } }}
                  disableDotsControls
                  activeIndex={sliderState}
                  onSlideChanged={(e) => {
                    setSliderState(e?.item);
                  }}
                  ref={sliderRef}
                  items={[...Array(3)].map(() => (
                    <React.Fragment key={Math.random()}>
                      <Img
                        src="img_image_26.png"
                        width={1398}
                        height={328}
                        alt="Image 26"
                        className="h-[328px] object-cover"
                      />
                    </React.Fragment>
                  ))}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 justify-between gap-5">
                <Button
                  size="6xl"
                  shape="square"
                  onClick={() => {
                    sliderRef?.current?.slidePrev();
                  }}
                  className="ml-2 w-[46px]"
                >
                  <Img src="img_checkmark_blue_gray_900_01.svg" width={46} height={78} />
                </Button>
                <Button
                  size="6xl"
                  shape="square"
                  onClick={() => {
                    sliderRef?.current?.slideNext();
                  }}
                  className="w-[46px] rotate-[-180deg]"
                >
                  <Img src="img_arrow_left.svg" width={46} height={78} />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center self-stretch">
            <HomepageGroup4548 />
            <div className="container-xs mt-[18px] flex flex-col gap-[30px] lg:px-5 md:px-5">
              <div className="flex flex-col gap-[34px]">
                <div className="ml-1.5 flex flex-col gap-3.5 md:ml-0">
                  <div className="flex items-center justify-center gap-3 bg-color___1 p-4 sm:flex-col">
                    <Img
                      src="img_primary_1.svg"
                      width={76}
                      height={26}
                      alt="Primary 1"
                      className="h-[26px] w-[6%] object-contain sm:w-full"
                    />
                    <div className="h-[22px] w-[2px] bg-cyan-600_01 sm:h-[2px] sm:w-[22px] sm:px-5" />
                    <Heading
                      size="text4xl"
                      as="h2"
                      className="mt-1 flex self-end text-[18px] font-normal !text-indigo-900 lg:text-[15px] sm:mt-0"
                    >
                      <span className="font-semibold">own</span>
                      <span>&nbsp;it now, up to 6 months interest free&nbsp;</span>
                      <a href="#" className="inline text-[14px] underline">
                        learn more
                      </a>
                    </Heading>
                  </div>
                  <div className="flex items-center md:flex-col">
                    <div className="relative z-[2] h-[350px] w-[16%] content-center lg:h-auto md:h-auto md:w-full">
                      <Img
                        src="img_image_30.png"
                        width={232}
                        height={350}
                        alt="Image 30"
                        className="h-[350px] w-full flex-1 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[350px] flex-1 content-center lg:h-auto md:h-auto">
                        <Heading
                          size="heading5xl"
                          as="h3"
                          className="text-center text-[22px] font-bold leading-[130%] !text-white-a700 lg:text-[18px]"
                        >
                          <>
                            Custome
                            <br />
                            Builds
                          </>
                        </Heading>
                        <Text
                          size="textlg"
                          as="p"
                          className="absolute bottom-[9%] left-0 right-0 mx-auto w-max text-[13px] font-normal !text-white-a700 underline"
                        >
                          See All Products
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-1 md:flex-col md:self-stretch">
                      <Suspense fallback={<div>Loading feed...</div>}>
                        {data.map((d, index) => (
                          <HomeOneFrame821 {...d} key={"group5662" + index} className="bg-white-a700" />
                        ))}
                      </Suspense>
                    </div>
                  </div>
                </div>
                <Tabs
                  className="ml-1.5 flex flex-col gap-[18px] self-stretch md:ml-0"
                  selectedTabClassName="!text-color___8"
                  selectedTabPanelClassName="!relative tab-panel--selected"
                >
                  <TabList className="flex flex-wrap gap-6">
                    <Tab className="text-[16px] font-semibold text-gray-600 lg:text-[13px]">MSI GS Series</Tab>
                    <Tab className="text-[16px] font-semibold text-gray-600 lg:text-[13px]">MSI GT Series</Tab>
                    <Tab className="text-[16px] font-semibold text-gray-600 lg:text-[13px]">MSI GL Series</Tab>
                    <Tab className="text-[16px] font-semibold text-gray-600 lg:text-[13px]">MSI GE Series</Tab>
                  </TabList>
                  {[...Array(4)].map((_, index) => (
                    <TabPanel key={`tab-panel${index}`} className="absolute justify-center">
                      <div className="w-full">
                        <div className="flex md:flex-col">
                          <div className="relative z-[3] h-[346px] w-full content-center lg:h-auto md:h-auto">
                            <Img
                              src="img_image_30_346x232.png"
                              width={232}
                              height={346}
                              alt="Image 30"
                              className="h-[346px] w-full flex-1 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[346px] flex-1 content-center lg:h-auto md:h-auto">
                              <Heading
                                size="heading5xl"
                                as="h4"
                                className="text-center text-[22px] font-bold leading-[130%] !text-white-a700 lg:text-[18px]"
                              >
                                <>
                                  MSI
                                  <br />
                                  Laptops
                                </>
                              </Heading>
                              <Text
                                size="textlg"
                                as="p"
                                className="absolute bottom-[10%] left-0 right-0 mx-auto w-max text-[13px] font-normal !text-white-a700 underline"
                              >
                                See All Products
                              </Text>
                            </div>
                          </div>
                          <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                            <div className="self-stretch">
                              <div className="flex flex-col items-start">
                                <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                  <div className="flex w-full items-center justify-center">
                                    <Img
                                      src="img_checkmark.svg"
                                      width={10}
                                      height={10}
                                      alt="Checkmark"
                                      className="h-[10px]"
                                    />
                                    <Text
                                      size="textxs"
                                      as="p"
                                      className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                    >
                                      in stock
                                    </Text>
                                  </div>
                                </div>
                                <Img
                                  src="img_image_29_16.png"
                                  width={150}
                                  height={150}
                                  alt="Image 29"
                                  className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2.5 py-1.5">
                                  <RatingBar value={1} isEditable={true} size={12} className="flex gap-2.5 self-end" />
                                  <Text
                                    as="p"
                                    className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                  >
                                    Reviews (4)
                                  </Text>
                                </div>
                                <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                  EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                </Text>
                              </div>
                            </div>
                            <Heading
                              size="heading4xl"
                              as="h5"
                              className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                            >
                              <span className="text-[14px] font-normal text-color___11 line-through">
                                <>
                                  $499.00
                                  <br />
                                </>
                              </span>
                              <span className="text-color___8">$499.00</span>
                            </Heading>
                          </div>
                          <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                            <div className="self-stretch">
                              <div className="flex flex-col items-start">
                                <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                  <div className="flex w-full items-center justify-center">
                                    <Img
                                      src="img_checkmark.svg"
                                      width={10}
                                      height={10}
                                      alt="Checkmark"
                                      className="h-[10px]"
                                    />
                                    <Text
                                      size="textxs"
                                      as="p"
                                      className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                    >
                                      in stock
                                    </Text>
                                  </div>
                                </div>
                                <Img
                                  src="img_image_29_17.png"
                                  width={150}
                                  height={150}
                                  alt="Image 29"
                                  className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2.5 py-1.5">
                                  <RatingBar value={1} isEditable={true} size={12} className="flex gap-2.5 self-end" />
                                  <Text
                                    as="p"
                                    className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                  >
                                    Reviews (4)
                                  </Text>
                                </div>
                                <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                  EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                </Text>
                              </div>
                            </div>
                            <Heading
                              size="heading4xl"
                              as="h6"
                              className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                            >
                              <span className="text-[14px] font-normal text-color___11 line-through">
                                <>
                                  $499.00
                                  <br />
                                </>
                              </span>
                              <span className="text-color___8">$499.00</span>
                            </Heading>
                          </div>
                          <div className="relative ml-[-2px] flex w-full flex-col items-center bg-white-a700 px-6 md:ml-0 sm:px-4">
                            <div className="self-stretch">
                              <div className="flex flex-col items-start">
                                <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                  <div className="flex w-full items-center justify-center">
                                    <Img
                                      src="img_checkmark.svg"
                                      width={10}
                                      height={10}
                                      alt="Checkmark"
                                      className="h-[10px]"
                                    />
                                    <Text
                                      size="textxs"
                                      as="p"
                                      className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                    >
                                      in stock
                                    </Text>
                                  </div>
                                </div>
                                <Img
                                  src="img_image_29_18.png"
                                  width={150}
                                  height={150}
                                  alt="Image 29"
                                  className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2.5 py-1.5">
                                  <RatingBar value={1} isEditable={true} size={12} className="flex gap-2.5 self-end" />
                                  <Text
                                    as="p"
                                    className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                  >
                                    Reviews (4)
                                  </Text>
                                </div>
                                <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                  EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                </Text>
                              </div>
                            </div>
                            <Heading
                              size="heading4xl"
                              as="h6"
                              className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                            >
                              <span className="text-[14px] font-normal text-color___11 line-through">
                                <>
                                  $499.00
                                  <br />
                                </>
                              </span>
                              <span className="text-color___8">$499.00</span>
                            </Heading>
                          </div>
                          <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                            <div className="self-stretch">
                              <div className="flex flex-col items-start">
                                <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                  <div className="flex w-full items-center justify-center">
                                    <Img
                                      src="img_checkmark.svg"
                                      width={10}
                                      height={10}
                                      alt="Checkmark"
                                      className="h-[10px]"
                                    />
                                    <Text
                                      size="textxs"
                                      as="p"
                                      className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                    >
                                      in stock
                                    </Text>
                                  </div>
                                </div>
                                <Img
                                  src="img_image_29_18.png"
                                  width={150}
                                  height={150}
                                  alt="Image 29"
                                  className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                />
                              </div>
                              <div className="flex items-center gap-2.5 py-1.5">
                                <RatingBar
                                  value={1}
                                  isEditable={true}
                                  size={12}
                                  starCount={2}
                                  className="flex gap-2.5 self-end"
                                />
                                <Text
                                  as="p"
                                  className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                >
                                  Reviews (4)
                                </Text>
                              </div>
                              <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                              </Text>
                            </div>
                            <Heading
                              size="heading4xl"
                              as="h6"
                              className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                            >
                              <span className="text-[14px] font-normal text-color___11 line-through">
                                <>
                                  $499.00
                                  <br />
                                </>
                              </span>
                              <span className="text-color___8">$499.00</span>
                            </Heading>
                          </div>
                          <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                            <div className="self-stretch">
                              <div className="flex flex-col items-start">
                                <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                  <div className="flex w-full items-center justify-center">
                                    <Img
                                      src="img_checkmark.svg"
                                      width={10}
                                      height={10}
                                      alt="Checkmark"
                                      className="h-[10px]"
                                    />
                                    <Text
                                      size="textxs"
                                      as="p"
                                      className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                    >
                                      in stock
                                    </Text>
                                  </div>
                                </div>
                                <Img
                                  src="img_image_29_19.png"
                                  width={150}
                                  height={150}
                                  alt="Image 29"
                                  className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                />
                              </div>
                              <div className="flex items-center gap-2.5 py-1.5">
                                <RatingBar value={1} isEditable={true} size={12} className="flex gap-2.5 self-end" />
                                <Text
                                  as="p"
                                  className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                >
                                  Reviews (4)
                                </Text>
                              </div>
                              <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                              </Text>
                            </div>
                            <Heading
                              size="heading4xl"
                              as="h6"
                              className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                            >
                              <span className="text-[14px] font-normal text-color___11 line-through">
                                <>
                                  $499.00
                                  <br />
                                </>
                              </span>
                              <span className="text-color___8">$499.00</span>
                            </Heading>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  ))}
                </Tabs>
                <Tabs
                  className="ml-1.5 flex flex-col gap-[18px] self-stretch md:ml-0"
                  selectedTabClassName="!text-color___8"
                  selectedTabPanelClassName="!relative tab-panel--selected"
                >
                  <TabList className="flex flex-wrap gap-[26px]">
                    <Tab className="text-[16px] font-semibold text-gray-600 lg:text-[13px]">MSI Infinute Series</Tab>
                    <Tab className="text-[16px] font-semibold text-gray-600 lg:text-[13px]">MSI Triden</Tab>
                    <Tab className="text-[16px] font-semibold text-gray-600 lg:text-[13px]">MSI GL Series</Tab>
                    <Tab className="text-[16px] font-semibold text-gray-600 lg:text-[13px]">MSI Nightblade</Tab>
                  </TabList>
                  <div>
                    <div className="flex md:flex-col">
                      {[...Array(4)].map((_, index) => (
                        <TabPanel key={`tab-panel${index}`} className="absolute flex-1 md:self-stretch">
                          <div className="w-full flex-1 md:self-stretch">
                            <div className="flex flex-col gap-[30px]">
                              <div className="flex md:flex-col">
                                <div className="relative z-[4] h-[346px] w-full">
                                  <Img
                                    src="img_image_30_1.png"
                                    width={232}
                                    height={346}
                                    alt="Image 30"
                                    className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[346px] w-full flex-1 object-cover"
                                  />
                                  <div className="absolute bottom-[9%] left-0 right-0 mx-auto flex flex-1 flex-col items-center gap-[98px] px-14 lg:gap-[98px] md:gap-[73px] md:px-5 sm:gap-[49px] sm:px-4">
                                    <Heading
                                      size="heading5xl"
                                      as="h5"
                                      className="text-[22px] font-bold !text-white-a700 lg:text-[18px]"
                                    >
                                      Desktops
                                    </Heading>
                                    <Text
                                      size="textlg"
                                      as="p"
                                      className="text-[13px] font-normal !text-white-a700 underline"
                                    >
                                      See All Products
                                    </Text>
                                  </div>
                                </div>
                                <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                                  <div className="flex flex-col items-start self-stretch">
                                    <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                      <div className="flex w-full items-center justify-center">
                                        <Img
                                          src="img_checkmark.svg"
                                          width={10}
                                          height={10}
                                          alt="Checkmark"
                                          className="h-[10px]"
                                        />
                                        <Text
                                          size="textxs"
                                          as="p"
                                          className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                        >
                                          in stock
                                        </Text>
                                      </div>
                                    </div>
                                    <Img
                                      src="img_image_29_20.png"
                                      width={150}
                                      height={150}
                                      alt="Image 29"
                                      className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2.5 self-stretch py-1.5">
                                    <RatingBar
                                      value={1}
                                      isEditable={true}
                                      size={12}
                                      className="flex gap-2.5 self-end"
                                    />
                                    <Text
                                      as="p"
                                      className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                    >
                                      Reviews (4)
                                    </Text>
                                  </div>
                                  <Text size="textlg" as="p" className="w-full text-[13px] font-normal leading-[19px]">
                                    EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                  </Text>
                                  <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                                  >
                                    <span className="text-[14px] font-normal text-color___11 line-through">
                                      <>
                                        $499.00
                                        <br />
                                      </>
                                    </span>
                                    <span className="text-color___8">$499.00</span>
                                  </Heading>
                                </div>
                                <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                                  <div className="flex flex-col items-start self-stretch">
                                    <div className="flex w-[38%] items-center justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                      <Img
                                        src="img_checkmark.svg"
                                        width={10}
                                        height={10}
                                        alt="Checkmark"
                                        className="h-[10px]"
                                      />
                                      <Text
                                        size="textxs"
                                        as="p"
                                        className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                      >
                                        in stock
                                      </Text>
                                    </div>
                                    <Img
                                      src="img_image_29_21.png"
                                      width={150}
                                      height={150}
                                      alt="Image 29"
                                      className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                    />
                                  </div>
                                  <div className="self-stretch">
                                    <div className="flex items-center gap-2.5 py-1.5">
                                      <RatingBar
                                        value={1}
                                        isEditable={true}
                                        size={12}
                                        className="flex gap-2.5 self-end"
                                      />
                                      <Text
                                        as="p"
                                        className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                      >
                                        Reviews (4)
                                      </Text>
                                    </div>
                                    <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                      EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                    </Text>
                                  </div>
                                  <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                                  >
                                    <span className="text-[14px] font-normal text-color___11 line-through">
                                      <>
                                        $499.00
                                        <br />
                                      </>
                                    </span>
                                    <span className="text-color___8">$499.00</span>
                                  </Heading>
                                </div>
                                <div className="relative ml-[-2px] flex w-full flex-col items-center bg-white-a700 px-6 md:ml-0 sm:px-4">
                                  <div className="flex flex-col items-start self-stretch">
                                    <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                      <div className="flex w-full items-center justify-center">
                                        <Img
                                          src="img_checkmark.svg"
                                          width={10}
                                          height={10}
                                          alt="Checkmark"
                                          className="h-[10px]"
                                        />
                                        <Text
                                          size="textxs"
                                          as="p"
                                          className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                        >
                                          in stock
                                        </Text>
                                      </div>
                                    </div>
                                    <Img
                                      src="img_image_29_22.png"
                                      width={150}
                                      height={150}
                                      alt="Image 29"
                                      className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                    />
                                  </div>
                                  <div className="self-stretch">
                                    <div className="flex items-center gap-2.5 py-1.5">
                                      <RatingBar
                                        value={1}
                                        isEditable={true}
                                        size={12}
                                        className="flex gap-2.5 self-end"
                                      />
                                      <Text
                                        as="p"
                                        className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                      >
                                        Reviews (4)
                                      </Text>
                                    </div>
                                    <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                      EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                    </Text>
                                  </div>
                                  <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                                  >
                                    <span className="text-[14px] font-normal text-color___11 line-through">
                                      <>
                                        $499.00
                                        <br />
                                      </>
                                    </span>
                                    <span className="text-color___8">$499.00</span>
                                  </Heading>
                                </div>
                                <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                                  <div className="self-stretch">
                                    <div className="flex flex-col items-start">
                                      <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                        <div className="flex w-full items-center justify-center">
                                          <Img
                                            src="img_checkmark.svg"
                                            width={10}
                                            height={10}
                                            alt="Checkmark"
                                            className="h-[10px]"
                                          />
                                          <Text
                                            size="textxs"
                                            as="p"
                                            className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                          >
                                            in stock
                                          </Text>
                                        </div>
                                      </div>
                                      <Img
                                        src="img_image_29_22.png"
                                        width={150}
                                        height={150}
                                        alt="Image 29"
                                        className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                      />
                                    </div>
                                    <div className="flex items-center gap-2.5 py-1.5">
                                      <RatingBar
                                        value={1}
                                        isEditable={true}
                                        size={12}
                                        className="flex gap-2.5 self-end"
                                      />
                                      <Text
                                        as="p"
                                        className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                      >
                                        Reviews (4)
                                      </Text>
                                    </div>
                                    <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                      EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                    </Text>
                                  </div>
                                  <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                                  >
                                    <span className="text-[14px] font-normal text-color___11 line-through">
                                      <>
                                        $499.00
                                        <br />
                                      </>
                                    </span>
                                    <span className="text-color___8">$499.00</span>
                                  </Heading>
                                </div>
                              </div>
                              <div className="flex md:flex-col">
                                <div className="relative z-[5] h-[346px] w-full content-center lg:h-auto md:h-auto">
                                  <Img
                                    src="img_image_30_2.png"
                                    width={232}
                                    height={346}
                                    alt="Image 30"
                                    className="h-[346px] w-full flex-1 object-cover"
                                  />
                                  <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[346px] flex-1 content-center lg:h-auto md:h-auto">
                                    <Heading
                                      size="heading5xl"
                                      as="h5"
                                      className="text-center text-[22px] font-bold leading-[130%] !text-white-a700 lg:text-[18px]"
                                    >
                                      <>
                                        Gaming
                                        <br />
                                        Monitors
                                      </>
                                    </Heading>
                                    <Text
                                      size="textlg"
                                      as="p"
                                      className="absolute bottom-[10%] left-0 right-0 mx-auto w-max text-[13px] font-normal !text-white-a700 underline"
                                    >
                                      See All Products
                                    </Text>
                                  </div>
                                </div>
                                <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                                  <div className="self-stretch">
                                    <div className="flex flex-col items-start">
                                      <div className="flex w-[38%] items-center justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                        <Img
                                          src="img_checkmark.svg"
                                          width={10}
                                          height={10}
                                          alt="Checkmark"
                                          className="h-[10px]"
                                        />
                                        <Text
                                          size="textxs"
                                          as="p"
                                          className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                        >
                                          in stock
                                        </Text>
                                      </div>
                                      <Img
                                        src="img_image_29_23.png"
                                        width={150}
                                        height={150}
                                        alt="Image 29"
                                        className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                      />
                                    </div>
                                    <div className="flex items-center gap-2.5 py-1.5">
                                      <RatingBar
                                        value={1}
                                        isEditable={true}
                                        size={12}
                                        className="flex gap-2.5 self-end"
                                      />
                                      <Text
                                        as="p"
                                        className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                      >
                                        Reviews (4)
                                      </Text>
                                    </div>
                                    <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                      EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                    </Text>
                                  </div>
                                  <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                                  >
                                    <span className="text-[14px] font-normal text-color___11 line-through">
                                      <>
                                        $499.00
                                        <br />
                                      </>
                                    </span>
                                    <span className="text-color___8">$499.00</span>
                                  </Heading>
                                </div>
                                <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                                  <div className="flex flex-col items-center self-stretch">
                                    <div className="flex w-[38%] items-center justify-center self-start bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                      <Img
                                        src="img_checkmark.svg"
                                        width={10}
                                        height={10}
                                        alt="Checkmark"
                                        className="h-[10px]"
                                      />
                                      <Text
                                        size="textxs"
                                        as="p"
                                        className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                      >
                                        in stock
                                      </Text>
                                    </div>
                                    <Img
                                      src="img_image_29_24.png"
                                      width={150}
                                      height={150}
                                      alt="Image 29"
                                      className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                    />
                                    <div className="self-stretch">
                                      <div className="flex items-center gap-2.5 py-1.5">
                                        <RatingBar
                                          value={1}
                                          isEditable={true}
                                          size={12}
                                          className="flex gap-2.5 self-end"
                                        />
                                        <Text
                                          as="p"
                                          className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                        >
                                          Reviews (4)
                                        </Text>
                                      </div>
                                      <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                        EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                      </Text>
                                    </div>
                                  </div>
                                  <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                                  >
                                    <span className="text-[14px] font-normal text-color___11 line-through">
                                      <>
                                        $499.00
                                        <br />
                                      </>
                                    </span>
                                    <span className="text-color___8">$499.00</span>
                                  </Heading>
                                </div>
                                <div className="relative ml-[-2px] flex w-full flex-col items-center bg-white-a700 px-6 md:ml-0 sm:px-4">
                                  <div className="flex flex-col items-center self-stretch">
                                    <div className="flex w-[38%] items-center justify-center self-start bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                      <Img
                                        src="img_checkmark.svg"
                                        width={10}
                                        height={10}
                                        alt="Checkmark"
                                        className="h-[10px]"
                                      />
                                      <Text
                                        size="textxs"
                                        as="p"
                                        className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                      >
                                        in stock
                                      </Text>
                                    </div>
                                    <Img
                                      src="img_image_29_25.png"
                                      width={150}
                                      height={150}
                                      alt="Image 29"
                                      className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                    />
                                    <div className="self-stretch">
                                      <div className="flex items-center gap-2.5 py-1.5">
                                        <RatingBar
                                          value={1}
                                          isEditable={true}
                                          size={12}
                                          className="flex gap-2.5 self-end"
                                        />
                                        <Text
                                          as="p"
                                          className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                        >
                                          Reviews (4)
                                        </Text>
                                      </div>
                                      <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                        EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                      </Text>
                                    </div>
                                  </div>
                                  <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                                  >
                                    <span className="text-[14px] font-normal text-color___11 line-through">
                                      <>
                                        $499.00
                                        <br />
                                      </>
                                    </span>
                                    <span className="text-color___8">$499.00</span>
                                  </Heading>
                                </div>
                                <div className="flex w-full flex-col items-center bg-white-a700 px-6 sm:px-4">
                                  <div className="self-stretch">
                                    <div className="flex flex-col items-start">
                                      <div className="flex w-[38%] items-center justify-center bg-white-a700 px-1 py-1.5 lg:w-full md:w-full">
                                        <Img
                                          src="img_checkmark.svg"
                                          width={10}
                                          height={10}
                                          alt="Checkmark"
                                          className="h-[10px]"
                                        />
                                        <Text
                                          size="textxs"
                                          as="p"
                                          className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                                        >
                                          in stock
                                        </Text>
                                      </div>
                                      <Img
                                        src="img_image_29_26.png"
                                        width={150}
                                        height={150}
                                        alt="Image 29"
                                        className="mx-4 h-[150px] w-full object-cover lg:h-auto md:mx-0 md:h-auto"
                                      />
                                    </div>
                                    <div className="flex items-center gap-2.5 py-1.5">
                                      <RatingBar
                                        value={1}
                                        isEditable={true}
                                        size={12}
                                        className="flex gap-2.5 self-end"
                                      />
                                      <Text
                                        as="p"
                                        className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
                                      >
                                        Reviews (4)
                                      </Text>
                                    </div>
                                    <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
                                      EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
                                    </Text>
                                  </div>
                                  <Heading
                                    size="heading4xl"
                                    as="h6"
                                    className="text-[18px] font-semibold leading-[140%] lg:text-[15px]"
                                  >
                                    <span className="text-[14px] font-normal text-color___11 line-through">
                                      <>
                                        $499.00
                                        <br />
                                      </>
                                    </span>
                                    <span className="text-color___8">$499.00</span>
                                  </Heading>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                      ))}
                      <div className="relative z-[6] flex w-[16%] flex-col gap-[30px] md:w-full md:flex-row sm:flex-col">
                        <ProductDetails2 />
                        <ProductDetails2 />
                      </div>
                    </div>
                  </div>
                </Tabs>
              </div>
              <div className="flex justify-center md:flex-col">
                <div className="flex bg-white-a700 px-[22px] py-[34px] sm:p-4">
                  <Img
                    src="img_image_33.png"
                    width={152}
                    height={78}
                    alt="Image 33"
                    className="h-[78px] w-full object-cover lg:h-auto md:h-auto"
                  />
                </div>
                <div className="flex bg-white-a700 px-6 py-[34px] sm:p-4">
                  <Img
                    src="img_image_33_78x152.png"
                    width={152}
                    height={78}
                    alt="Image 33"
                    className="h-[78px] w-full object-cover lg:h-auto md:h-auto"
                  />
                </div>
                <div className="flex bg-white-a700 px-[22px] py-[34px] sm:p-4">
                  <Img
                    src="img_image_33_1.png"
                    width={152}
                    height={78}
                    alt="Image 33"
                    className="h-[78px] w-full object-cover lg:h-auto md:h-auto"
                  />
                </div>
                <div className="flex bg-white-a700 px-[22px] py-[34px] sm:p-4">
                  <Img
                    src="img_image_33_2.png"
                    width={152}
                    height={78}
                    alt="Image 33"
                    className="h-[78px] w-full object-cover lg:h-auto md:h-auto"
                  />
                </div>
                <div className="flex flex-1 md:self-stretch sm:flex-col">
                  <div className="w-full bg-white-a700 px-6 py-[34px] sm:w-full sm:p-4">
                    <Img
                      src="img_image_33_3.png"
                      width={152}
                      height={78}
                      alt="Image 33"
                      className="h-[78px] w-full object-cover lg:h-auto md:h-auto"
                    />
                  </div>
                  <div className="w-full bg-white-a700 px-6 py-[34px] sm:w-full sm:p-4">
                    <Img
                      src="img_image_33_4.png"
                      width={152}
                      height={78}
                      alt="Image 33"
                      className="h-[78px] w-full object-cover lg:h-auto md:h-auto"
                    />
                  </div>
                </div>
                <div className="flex bg-white-a700 px-[22px] py-[34px] sm:p-4">
                  <Img
                    src="img_image_33_5.png"
                    width={152}
                    height={78}
                    alt="Image 33"
                    className="h-[78px] w-full object-cover lg:h-auto md:h-auto"
                  />
                </div>
              </div>
            </div>
            <HomepageGroup4553 />
            <HomepageGroup4545 />
            <HomepageGroup3207 />
          </div>
        </div>
        <Footer />
      </div>
      <div className="absolute right-[2%] top-[26%] m-auto h-[60px] w-[3%] rounded-[30px] object-contain" />
    </div>
  );
}
