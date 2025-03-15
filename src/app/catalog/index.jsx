"use client";

import {
  Button,
  Text,
  Heading,
  Img,
  ChipView,
  SelectBox,
  BreadcrumbLink,
  Breadcrumb,
  BreadcrumbItem,
} from "../../components";
import CatalogOneFrame22 from "../../components/CatalogOneFrame22";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductDetails1 from "../../components/ProductDetails1";
import CatalogGroup2709 from "./CatalogGroup2709";
import CatalogGroup4438 from "./CatalogGroup4438";
import Link from "next/link";
import React, { Suspense } from "react";

const data = [
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29_36.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29_4.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
  {
    stockStatusText: "in stock",
    productImage: "img_image_29.png",
    reviewsText: "Reviews (4)",
    productDescription: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    priceText: (
      <>
        $499.00
        <br />
        $499.00
      </>
    ),
  },
];
const data1 = [
  { image33: "img_image_33.png" },
  { image33: "img_image_33_78x152.png" },
  { image33: "img_image_33_2.png" },
  { image33: "img_image_33_3.png" },
  { image33: "img_image_33_4.png" },
  { image33: "img_image_33_5.png" },
];
const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function CatalogPage() {
  const [chipOptions, setChipOptions] = React.useState(() => [
    { value: 1, label: `CUSTOM PCS (24)` },
    { value: 2, label: `HP/COMPAQ PCS (24)` },
    { value: 3, label: `Clear All` },
  ]);
  const [selectedChipOptions, setSelectedChipOptions] = React.useState([]);

  return (
    <div className="w-full bg-white-a700">
      <div className="flex flex-col items-center">
        <Header className="relative z-[1] self-stretch" />
        <CatalogGroup4438 />
        <div className="container-xs mt-[18px] flex flex-col items-start gap-[18px] lg:px-5 md:px-5">
          <Breadcrumb
            separator={<Text className="h-[18px] w-[16.23px] text-[12px] font-light !text-colors">›</Text>}
            className="mx-2 flex flex-wrap gap-12 self-stretch md:mx-0"
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
            <BreadcrumbItem>
              <BreadcrumbLink href="#" as={Link}>
                <Text as="p" className="text-[12px] font-light !text-gray-500">
                  Everyday Use Notebooks
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" as={Link}>
                <Text as="p" className="text-[12px] font-light !text-gray-500">
                  MSI Prestige Series
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
            size="heading7xl"
            as="h1"
            className="ml-2 text-[32px] font-semibold lg:text-[27px] md:ml-0 md:text-[26px] sm:text-[24px]"
          >
            MSI PS Series (20)
          </Heading>
          <div className="flex items-start gap-1.5 self-stretch md:flex-col">
            <div className="w-[16%] md:w-full">
              <Button
                size="4xl"
                variant="fill"
                shape="square"
                className="self-stretch px-[34px] font-semibold text-color___8 sm:px-4"
              >
                ‹ Back
              </Button>
              <div>
                <div>
                  <div className="relative h-[698px] content-end lg:h-auto md:h-auto">
                    <Img
                      src="img_frame_97_color_8.svg"
                      width={16}
                      height={16}
                      alt="Frame 100"
                      className="mb-[46px] ml-auto mr-4 h-[16px] lg:mr-0 md:mr-0"
                    />
                    <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-max flex-1 bg-color___1">
                      <div className="flex flex-col items-center gap-1.5 bg-color___1 p-2.5">
                        <Heading size="heading3xl" as="h2" className="text-[16px] font-bold lg:text-[13px]">
                          Filters
                        </Heading>
                        <Button className="mb-1 self-stretch rounded-[18px] !border-2 font-semibold">
                          Clear Filter
                        </Button>
                      </div>
                      <div className="mx-4 mt-3 md:mx-0">
                        <div>
                          <div className="flex items-center justify-between gap-5">
                            <Heading as="h3" className="text-[14px] font-semibold">
                              Category
                            </Heading>
                            <Img
                              src="img_frame_97_color_8_14x16.svg"
                              width={16}
                              height={14}
                              alt="Frame 97"
                              className="h-[14px] self-end"
                            />
                          </div>
                          <div className="relative mt-[-2px] flex items-center justify-center">
                            <Text size="textlg" as="p" className="text-[13px] font-normal leading-[210%]">
                              <>
                                CUSTOM PCS
                                <br />
                                MSI ALL-IN-ONE PCS
                                <br />
                                HP/COMPAQ PCS
                              </>
                            </Text>
                            <Text
                              size="textlg"
                              as="p"
                              className="w-[22%] text-right text-[13px] font-normal leading-[210%]"
                            >
                              <>
                                15
                                <br />
                                45
                                <br />1
                              </>
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div className="mx-4 mt-3 flex flex-col gap-5 md:mx-0">
                        <div className="flex items-center justify-between gap-5">
                          <Heading as="h4" className="text-[14px] font-semibold">
                            Price
                          </Heading>
                          <Img
                            src="img_frame_97_color_8_14x16.svg"
                            width={16}
                            height={16}
                            alt="Frame 98"
                            className="h-[16px] self-end"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <Text size="textlg" as="p" className="text-[13px] font-normal leading-[210%]">
                            <>
                              $0.00 - $1,000.00
                              <br />
                              $1,000.00 - $2,000.00
                              <br />
                              $2,000.00 - $3,000.00
                              <br />
                              $3,000.00 - $4,000.00
                              <br />
                              $4,000.00 - $5,000.00
                              <br />
                              $5,000.00 - $6,000.00
                              <br />
                              $6,000.00 - $7,000.00
                              <br />
                              $7,000.00 And Above
                            </>
                          </Text>
                          <Text
                            size="textlg"
                            as="p"
                            className="w-[22%] text-right text-[13px] font-normal leading-[210%]"
                          >
                            <>
                              19
                              <br />
                              21
                              <br />9<br />6<br />3<br />1<br />1<br />1
                            </>
                          </Text>
                        </div>
                      </div>
                      <div className="mx-4 mt-8 flex flex-col gap-2.5 md:mx-0">
                        <div className="flex items-center justify-between gap-5">
                          <Heading as="h5" className="text-[14px] font-semibold">
                            Color
                          </Heading>
                          <Img
                            src="img_frame_97_color_8_14x16.svg"
                            width={16}
                            height={16}
                            alt="Frame 99"
                            className="h-[16px] self-end"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-[22px] w-[22px] rounded-[10px] bg-color___8" />
                          <Img src="img_contrast.svg" width={26} height={26} alt="Contrast" className="h-[26px]" />
                        </div>
                      </div>
                      <div className="mx-4 mb-5 mt-7 flex flex-col gap-3 md:mx-0">
                        <div className="flex items-center justify-between gap-5">
                          <Heading as="h6" className="text-[14px] font-semibold">
                            Filter Name
                          </Heading>
                          <Img
                            src="img_frame_97_color_8.svg"
                            width={16}
                            height={16}
                            alt="Frame 99"
                            className="h-[16px] self-end"
                          />
                        </div>
                        <Button variant="fill" className="self-stretch rounded-[18px] font-semibold">
                          Apply Filters (2)
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1.5 flex flex-col items-center gap-1.5 bg-color___1 p-2.5">
                    <Heading size="heading3xl" as="h6" className="text-[16px] font-bold lg:text-[13px]">
                      Brands
                    </Heading>
                    <Button className="mb-1 self-stretch rounded-[18px] !border-2 font-semibold">All Brands</Button>
                  </div>
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-1">
                      <Suspense fallback={<div>Loading feed...</div>}>
                        {data1.map((d, index) => (
                          <CatalogOneFrame22 {...d} key={"group5715" + index} />
                        ))}
                      </Suspense>
                    </div>
                  </div>
                  <div className="mt-1.5 flex flex-col items-center gap-4 bg-color___1 p-3">
                    <Heading size="heading3xl" as="h6" className="text-[16px] font-bold lg:text-[13px]">
                      Compare Products
                    </Heading>
                    <Text size="textlg" as="p" className="mb-3.5 text-[13px] font-normal">
                      You have no items to compare.
                    </Text>
                  </div>
                  <div className="mt-1.5 flex flex-col items-center gap-2 bg-color___1 p-3">
                    <Heading size="heading3xl" as="h6" className="text-[16px] font-bold lg:text-[13px]">
                      My Wish List
                    </Heading>
                    <Text
                      size="textlg"
                      as="p"
                      className="mb-2 self-stretch text-center text-[13px] font-normal leading-[130%]"
                    >
                      You have no items in your wish list.
                    </Text>
                  </div>
                  <Img
                    src="img_image_49_370x232.png"
                    width={232}
                    height={370}
                    alt="Image 49"
                    className="mt-1.5 h-[370px] w-full object-cover lg:h-auto md:h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 self-center md:self-stretch">
              <div className="flex flex-col items-center">
                <div className="flex justify-center self-stretch md:flex-col">
                  <Text
                    size="textlg"
                    as="p"
                    className="bg-white-a700 py-3.5 pl-1 pr-[34px] text-[13px] font-normal !text-color___5-1 sm:pr-4"
                  >
                    Items 1-35 of 61
                  </Text>
                  <SelectBox
                    size="md"
                    shape="round"
                    indicator={
                      <Img src="img_favorite.svg" width={14} height={14} alt="Favorite" className="h-[14px] w-[14px]" />
                    }
                    name="Group 141"
                    placeholder={`Sort By: Position`}
                    options={dropDownOptions}
                    className="ml-2.5 flex-grow gap-2.5 rounded-sm !border-2 font-semibold md:ml-0"
                  />
                  <SelectBox
                    size="md"
                    shape="round"
                    indicator={
                      <Img
                        src="img_frame_97_color_8.svg"
                        width={16}
                        height={14}
                        alt="Frame 97"
                        className="h-[14px] w-[16px]"
                      />
                    }
                    name="Group 128"
                    placeholder={`Show: 35 per page`}
                    options={dropDownOptions}
                    className="ml-2.5 flex-grow gap-2.5 rounded-sm !border-2 font-semibold md:ml-0"
                  />
                  <Img
                    src="img_group_143.svg"
                    width={110}
                    height={50}
                    alt="Group 143"
                    className="h-[50px] w-[10%] object-contain md:w-full"
                  />
                </div>
                <ChipView
                  options={chipOptions}
                  setOptions={setChipOptions}
                  values={selectedChipOptions}
                  setValues={setSelectedChipOptions}
                  className="mt-1 flex flex-wrap gap-x-1.5 gap-y-2 self-stretch"
                >
                  {(option) => (
                    <React.Fragment key={option.index}>
                      {option.isSelected ? (
                        <div
                          onClick={option.toggle}
                          className="flex h-[38px] cursor-pointer flex-row items-center gap-1 whitespace-pre-wrap rounded-sm border border-solid border-white-a700_99 bg-white-a700 px-4 text-[13px] font-semibold text-color___8"
                        >
                          <span>{option.label}</span>
                          <Img
                            src="img_close_red_700.svg"
                            width={20}
                            height={20}
                            alt="Close"
                            onClick={option.delete}
                            tabIndex={0}
                            className="h-[20px] w-[20px] cursor-pointer"
                          />
                        </div>
                      ) : (
                        <div
                          onClick={option.toggle}
                          className="flex h-[38px] cursor-pointer flex-row items-center gap-1 rounded-sm border border-solid border-color___6-1 bg-white-a700 px-4 text-[13px] font-semibold text-color___8"
                        >
                          <span>{option.label}</span>
                          <Img
                            src="img_close_red_700.svg"
                            width={20}
                            height={20}
                            alt="Close"
                            onClick={option.delete}
                            tabIndex={0}
                            className="h-[20px] w-[20px] cursor-pointer"
                          />
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </ChipView>
                <div className="mt-1 grid grid-cols-5 justify-center self-stretch lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
                  <Suspense fallback={<div>Loading feed...</div>}>
                    {data.map((d, index) => (
                      <ProductDetails1 {...d} key={"group5716" + index} />
                    ))}
                  </Suspense>
                </div>
                <div className="mt-6 flex w-[26%] items-center justify-center gap-3 lg:w-full md:w-full">
                  <Heading
                    size="heading4xl"
                    as="h6"
                    className="h-[36px] w-[38px] rotate-[180deg] rounded-[18px] border-2 border-solid border-color___5-1 text-[18px] font-semibold !text-color___5-1 lg:text-[15px]"
                  >
                    ›
                  </Heading>
                  <Button shape="circle" className="min-w-[36px] rounded-[18px] !border-2 font-semibold">
                    1
                  </Button>
                  <Button variant="fill" className="min-w-[38px] rounded-[18px] font-semibold">
                    2
                  </Button>
                  <Button shape="circle" className="min-w-[40px] rounded-[18px] !border-2 font-semibold">
                    3
                  </Button>
                  <Text size="textxl" as="p" className="self-end text-[14px] font-normal !text-color___5-1">
                    ...
                  </Text>
                  <Button shape="circle" className="min-w-[46px] rounded-[18px] !border-2 font-semibold">
                    15
                  </Button>
                  <Heading
                    size="heading4xl"
                    as="h6"
                    className="h-[36px] w-[38px] rounded-[18px] border-2 border-solid border-color___5-1 text-[18px] font-semibold !text-color___5-1 lg:text-[15px]"
                  >
                    ›
                  </Heading>
                </div>
                <Text
                  as="p"
                  className="mt-[66px] w-[98%] bg-gradient bg-clip-text text-[12px] font-normal leading-[18px] !text-transparent lg:w-full md:w-full"
                >
                  <>
                    MSI has unveiled the Prestige Series line of business-class and gaming notebooks. Tuned for color
                    accuracy, the Prestige Series also leverages True Color Technology, which allows users to adjust the
                    display profile to best fit their computing needs.
                    <br />
                    <br />
                    There are six different screen profiles, which are tuned for gaming, reducing eye fatigue, sRGB
                    color accuracy, increasing clarity for words and lines, reducing harmful blue light, and optimizing
                    contrast for watching movies.
                    <br />
                    Given the various display profiles and discrete graphics chip, the Prestige Series notebooks can be
                    used for various design work as well as for office tasks given that the screen can be adjusted for
                    better clarity, color accuracy, or for eye strain reduction. Users working with video or 3D
                    rendering will appreciate the &quot;movie mode&quot; for which contrast is increased.
                    <br />
                    <br />
                    Home users or students can benefit from the &quot;anti-blue&quot; and the &quot;office mode&quot;
                    options, both of which are designed to reduce eye strain. This is helpful when working on the
                    computer for extended periods of time. Additionally, in their down time, students can also use the
                    &quot;gamer mode&quot; to increase the screen brightness.
                  </>
                </Text>
                <Button className="mt-6 min-w-[88px] rounded-[18px] !border-2 font-semibold">More</Button>
              </div>
            </div>
          </div>
        </div>
        <CatalogGroup2709 />
        <Footer className="self-stretch" />
      </div>
    </div>
  );
}
