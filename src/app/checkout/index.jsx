"use client";

import {
  Img,
  Text,
  Heading,
  Button,
  Input,
  SelectBox,
  BreadcrumbLink,
  Breadcrumb,
  BreadcrumbItem,
} from "../../components";
import CheckoutOne from "../../components/CheckoutOne";
import Footer from "../../components/Footer";
import ShoppingCartTwoComponent36 from "../../components/ShoppingCartTwoComponent36";
import CheckoutGroup2002 from "./CheckoutGroup2002";
import Link from "next/link";
import React from "react";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function CheckoutPage() {
  return (
    <div className="flex w-full flex-col items-center bg-white-a700">
      <div className="self-stretch">
        <header>
          <div className="flex justify-center bg-black-900_04 py-2">
            <div className="container-xs flex items-center justify-between gap-5 self-end lg:px-5 md:flex-col md:px-5">
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
              <div className="flex w-[30%] flex-col items-end md:w-full">
                <Heading size="headingmd" as="p" className="text-[12px] font-semibold !text-white-a700">
                  Visit our showroom in 1234 Street Adress City Address, 1234 Contact Us
                </Heading>
                <div className="h-[2px] w-[16%] bg-white-a700" />
              </div>
              <div className="flex flex-wrap items-center">
                <Heading size="headingmd" as="p" className="self-end text-[12px] font-semibold !text-white-a700">
                  Call Us: (00) 1234 5678
                </Heading>
                <Link href="#">
                  <Img
                    src="img_ant_design_facebook_filled_white_a700_20x20.svg"
                    width={20}
                    height={20}
                    alt="Ant Design Facebook Filled"
                    className="ml-3.5 h-[20px]"
                  />
                </Link>
                <Link href="#">
                  <Img
                    src="img_ant_design_instagram_filled_white_a700_20x20.svg"
                    width={20}
                    height={20}
                    alt="Ant Design Instagram Filled"
                    className="ml-2 h-[20px]"
                  />
                </Link>
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
      </div>
      <div className="container-xs mt-5 lg:px-5 md:px-5">
        <div className="flex flex-col gap-2.5">
          <div>
            <div className="flex flex-col gap-[18px]">
              <Breadcrumb
                separator={<Text className="h-[18px] w-[8.77px] text-[12px] font-light !text-colors">›</Text>}
                className="flex flex-wrap gap-[46px]"
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
                      Shopping Cart
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#" as={Link}>
                    <Text as="p" className="text-[12px] font-light !text-gray-500">
                      Checkout Process
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <div className="mr-[46px] flex items-start md:mr-0 md:flex-col">
                <div className="flex flex-1 items-center gap-[29px] md:self-stretch">
                  <Heading
                    size="heading7xl"
                    as="h1"
                    className="text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
                  >
                    Checkout
                  </Heading>
                  <Button size="4xl" className="min-w-[208px] rounded-[24px] !border-2 px-8 font-semibold sm:px-4">
                    Sign In
                  </Button>
                </div>
                <div className="flex w-[46%] flex-col gap-3 self-center md:w-full">
                  <div className="mx-14 flex justify-between gap-[154px] md:mx-0">
                    <Img
                      src="img_checkmark_white_a700.svg"
                      width={40}
                      height={40}
                      alt="Checkmark"
                      className="h-[40px]"
                    />
                    <div className="flex h-[40px] w-[40px] flex-col items-center justify-center rounded-[20px] border-[2.5px] border-solid border-color___6-1 bg-white-a700 lg:h-auto md:h-auto">
                      <Heading size="heading2xl" as="h2" className="text-center text-[15px] font-semibold leading-6">
                        2
                      </Heading>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-20 lg:gap-5 md:gap-5">
                    <Text size="text3xl" as="p" className="text-[16px] font-normal lg:text-[13px]">
                      Shipping
                    </Text>
                    <Text size="text3xl" as="p" className="text-[16px] font-normal !text-color___5-1 lg:text-[13px]">
                      Review & Payments
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-[30px] md:flex-col">
            <div className="flex-1 self-center md:self-stretch">
              <div className="flex flex-col items-start gap-2.5">
                <Heading size="heading4xl" as="h3" className="text-[18px] font-semibold lg:text-[15px]">
                  Shipping Address
                </Heading>
                <div className="self-stretch">
                  <div className="h-px bg-color___6-1" />
                  <div className="mt-6 flex flex-col items-start gap-2">
                    <Heading size="headinglg" as="h4" className="mt-1.5 text-[13px] font-semibold">
                      <span className="text-color___8">Email Address&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="w-[60%] rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-[22px]">
                    <Text size="textlg" as="p" className="text-[13px] font-normal !text-color___11">
                      You can create an account after checkout.
                    </Text>
                    <div className="h-px w-[60%] bg-color___6-1" />
                  </div>
                  <div className="mt-5 flex flex-col items-start gap-2">
                    <Heading size="headinglg" as="h5" className="mt-1.5 text-[13px] font-semibold">
                      <span className="text-color___8">First Name&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="w-[60%] rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1.5">
                    <Heading size="headinglg" as="h6" className="mt-2 text-[13px] font-semibold">
                      <span className="text-color___8">Last Name&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="w-[60%] rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1.5">
                    <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                      <span className="text-color___8">Company&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="w-[60%] rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-2.5">
                    <div className="flex flex-col items-start gap-1.5 self-stretch">
                      <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                        <span className="text-color___8">Street Address&nbsp;</span>
                        <span className="text-red-700">*</span>
                      </Heading>
                      <Input
                        size="lg"
                        shape="round"
                        name="Rectangle 3"
                        className="w-[60%] rounded border border-solid border-color___5-1 px-3"
                      />
                    </div>
                    <div className="h-[50px] w-[60%] rounded border border-solid border-color___5-1 bg-white-a700" />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1.5">
                    <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                      <span className="text-color___8">City&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="w-[60%] rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1.5">
                    <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                      <span className="text-color___8">State/Province&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <SelectBox
                      size="md"
                      variant="fill"
                      indicator={
                        <Img
                          src="img_frame_97_color_8.svg"
                          width={20}
                          height={14}
                          alt="Frame 97"
                          className="h-[14px] w-[20px]"
                        />
                      }
                      name="Group 30"
                      placeholder={`Please, select a region, state or province`}
                      options={dropDownOptions}
                      className="w-[60%] gap-2.5 rounded border border-solid border-color___5-1"
                    />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1.5">
                    <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                      <span className="text-color___8">Zip/Postal Code&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="w-[60%] rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1.5">
                    <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                      <span className="text-color___8">Country&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <SelectBox
                      size="md"
                      variant="fill"
                      indicator={
                        <Img
                          src="img_frame_97_color_8.svg"
                          width={20}
                          height={14}
                          alt="Frame 97"
                          className="h-[14px] w-[20px]"
                        />
                      }
                      name="Group 32"
                      placeholder={`United States`}
                      options={dropDownOptions}
                      className="w-[60%] gap-2.5 rounded border border-solid border-color___5-1"
                    />
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1.5">
                    <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                      <span className="text-color___8">Phone Number&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="w-[60%] rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-8 h-px bg-color___6-1" />
                </div>
                <div className="flex items-start self-stretch md:flex-col">
                  <div className="flex flex-1 flex-col items-start gap-3 self-center md:self-stretch">
                    <div className="self-stretch">
                      <ShoppingCartTwoComponent36 className="mr-1 md:mr-0" />
                      <ShoppingCartTwoComponent36
                        standardRate="Pickup from store"
                        priceMayVaryDepending="1234 Street Adress City Address, 1234"
                        className="relative mt-[-16px]"
                      />
                    </div>
                    <Button
                      size="4xl"
                      variant="fill"
                      className="min-w-[210px] rounded-[24px] px-[34px] font-semibold sm:px-4"
                    >
                      Next
                    </Button>
                  </div>
                  <div className="mt-9 flex flex-col items-start gap-12">
                    <Heading as="p" className="text-[14px] font-semibold">
                      $21.00
                    </Heading>
                    <Heading as="p" className="text-[14px] font-semibold">
                      $0.00
                    </Heading>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex w-[32%] flex-col items-start gap-[22px] bg-color___1 px-[30px] py-[18px] md:w-full sm:px-4">
              <Heading size="heading6xl" as="h4" className="text-[24px] font-semibold lg:text-[20px]">
                Order Summary
              </Heading>
              <div className="mb-1.5 self-stretch">
                <div className="flex flex-col gap-[22px]">
                  <div className="flex flex-col gap-3.5">
                    <div className="h-px bg-color___6-1" />
                    <div className="flex items-center justify-between gap-5">
                      <Text size="textxl" as="p" className="text-[14px] font-normal">
                        2 Items in Cart
                      </Text>
                      <Img
                        src="img_frame_97_color_8_14x16.svg"
                        width={16}
                        height={14}
                        alt="Frame 97"
                        className="h-[14px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <CheckoutOne />
                    <CheckoutOne
                      image51="img_image_52.png"
                      p379900="$3,799.00"
                      mSIMEGTrident="MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CheckoutGroup2002 />
      <Footer className="self-stretch" />
    </div>
  );
}
