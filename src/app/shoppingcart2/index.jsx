"use client";

import {
  Text,
  Img,
  Button,
  Heading,
  Input,
  SelectBox,
  BreadcrumbLink,
  Breadcrumb,
  BreadcrumbItem,
} from "../../components";
import Footer from "../../components/Footer";
import { ReactTable } from "../../components/ReactTable";
import ShoppingCartTwoComponent36 from "../../components/ShoppingCartTwoComponent36";
import Shoppingcart2Group4231 from "./Shoppingcart2Group4231";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const table1Data = [
  {
    item: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty",
    price: "$4,349.00",
    qty: "1",
    subtotal: "$13,047.00",
    image51: "img_image_51.png",
  },
  {
    image51: "img_image_52.png",
    item: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty",
    price: "$4,349.00",
    qty: "1",
    subtotal: "$13,047.00",
  },
];

export default function ShoppingCart2Page() {
  const table1Columns = React.useMemo(() => {
    const table1ColumnHelper = createColumnHelper();
    return [
      table1ColumnHelper.accessor("item", {
        cell: (info) => (
          <div className="flex flex-1 items-start gap-7 sm:flex-col">
            <Img
              src={info.row.original.image51}
              width={120}
              height={120}
              alt="Image 51"
              className="h-[120px] w-[28%] self-center object-contain sm:w-full"
            />
            <Text size="textxl" as="p" className="w-[64%] text-[14px] font-normal leading-[21px] sm:w-full">
              {info.getValue()}
            </Text>
          </div>
        ),
        header: (info) => (
          <Heading as="h2" className="pb-3.5 text-left text-[14px] font-semibold">
            Item
          </Heading>
        ),
        meta: { width: "446px" },
      }),
      table1ColumnHelper.accessor("price", {
        cell: (info) => (
          <Heading size="heading3xl" as="h6" className="pl-1 text-[16px] font-semibold lg:text-[13px]">
            {info.getValue()}
          </Heading>
        ),
        header: (info) => (
          <Heading as="h3" className="pb-3.5 text-left text-[14px] font-semibold">
            Price
          </Heading>
        ),
        meta: { width: "148px" },
      }),
      table1ColumnHelper.accessor("qty", {
        cell: (info) => (
          <div className="flex items-start gap-[17px] px-5">
            <Heading as="p" className="text-[14px] font-semibold">
              {info.getValue()}
            </Heading>
            <div className="mb-14 flex flex-col">
              <Img src="img_frame_98_color_5_1.svg" width={16} height={16} alt="Frame 98" className="h-[16px]" />
              <Img src="img_frame_97_color_5_1.svg" width={16} height={16} alt="Frame 97" className="h-[16px]" />
            </div>
          </div>
        ),
        header: (info) => (
          <Heading as="h4" className="pb-3.5 text-left text-[14px] font-semibold">
            Qty{" "}
          </Heading>
        ),
        meta: { width: "130px" },
      }),
      table1ColumnHelper.accessor("subtotal", {
        cell: (info) => (
          <div className="flex flex-col items-end gap-1.5">
            <div className="mr-1.5 flex justify-between gap-5 self-stretch md:mr-0">
              <Heading size="heading3xl" as="h6" className="text-[16px] font-semibold lg:text-[13px]">
                {info.getValue()}
              </Heading>
              <Button
                size="xs"
                variant="fill"
                shape="round"
                className="w-[26px] rounded-[12px] border-2 border-solid border-color___6-1 px-2"
              >
                <Img src="img_close_color_5_1.svg" width={8} height={8} />
              </Button>
            </div>
            <Button
              size="xs"
              variant="fill"
              shape="round"
              className="mb-[46px] mr-1.5 w-[26px] rounded-[12px] border-2 border-solid border-color___6-1 px-1 md:mr-0"
            >
              <Img src="img_eva_edit_2_outline.svg" width={16} height={16} />
            </Button>
          </div>
        ),
        header: (info) => (
          <Heading as="h5" className="pb-3.5 text-left text-[14px] font-semibold">
            Subtotal
          </Heading>
        ),
        meta: { width: "192px" },
      }),
    ];
  }, []);

  return (
    <div className="w-full bg-white-a700">
      <div className="flex flex-col items-center">
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
                  <Button className="ml-6 min-w-[120px] rounded-[18px] !border-2 font-semibold md:ml-0">
                    Our Deals
                  </Button>
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
                  <Button
                    size="md"
                    shape="round"
                    className="ml-3.5 min-w-[90px] rounded-[14px] !border-2 font-semibold"
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="container-xs mt-5 lg:px-5 md:px-5">
          <div className="flex items-start gap-[34px] md:flex-col">
            <div className="flex-1 md:self-stretch">
              <div className="flex flex-col items-start gap-6">
                <Breadcrumb
                  separator={<Text className="h-[18px] w-[2.8px] text-[12px] font-light !text-colors">›</Text>}
                  className="flex flex-wrap gap-[26px] self-stretch"
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" as={Link}>
                      <Text as="p" className="text-[12px] font-light !text-gray-500">
                        Home
                      </Text>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#" as={Link}>
                      <Text as="p" className="text-[12px] font-light !text-gray-500">
                        Login
                      </Text>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                <Heading
                  size="heading7xl"
                  as="h1"
                  className="text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
                >
                  Shopping Cart
                </Heading>
                <ReactTable
                  size="xs"
                  bodyProps={{ className: "" }}
                  cellProps={{ className: "border-color___6-1 border-b border-solid" }}
                  className="self-stretch sm:block sm:overflow-x-auto sm:whitespace-nowrap"
                  columns={table1Columns}
                  data={table1Data}
                />
                <div className="flex self-stretch md:flex-col">
                  <div className="flex flex-1 gap-[7px] md:self-stretch">
                    <Button className="min-w-[200px] rounded-[18px] !border-2 font-semibold">Continue Shopping</Button>
                    <Button variant="fill" className="min-w-[200px] rounded-[18px] font-semibold">
                      Clear Shopping Cart
                    </Button>
                  </div>
                  <Button variant="fill" className="min-w-[200px] rounded-[18px] font-semibold">
                    Update Shopping Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-[106px] w-[32%] self-end md:w-full">
              <div className="bg-color___1 p-4">
                <div className="mb-1.5 flex flex-col items-start">
                  <Heading size="heading6xl" as="h4" className="text-[24px] font-semibold lg:text-[20px]">
                    Summary
                  </Heading>
                  <div className="mt-[18px] flex flex-col gap-3 self-stretch">
                    <div className="flex items-center justify-between gap-5">
                      <Heading size="text4xl" as="p" className="text-[18px] font-normal lg:text-[15px]">
                        Estimate Shipping and Tax
                      </Heading>
                      <Img src="img_frame_97_color_8.svg" width={16} height={14} alt="Frame 97" className="h-[14px]" />
                    </div>
                    <Text
                      size="textxl"
                      as="p"
                      className="w-[74%] text-[14px] font-normal leading-[21px] !text-color___11 lg:w-full md:w-full"
                    >
                      Enter your destination to get a shipping estimate.
                    </Text>
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1 self-stretch">
                    <Heading size="headinglg" as="p" className="mt-2.5 text-[13px] font-semibold">
                      Country
                    </Heading>
                    <SelectBox
                      size="md"
                      variant="fill"
                      indicator={
                        <Img
                          src="img_frame_97_color_8.svg"
                          width={12}
                          height={14}
                          alt="Frame 97"
                          className="h-[14px] w-[12px]"
                        />
                      }
                      name="Group 81"
                      placeholder={`Australia`}
                      options={dropDownOptions}
                      className="gap-2.5 self-stretch rounded border border-solid border-color___5-1"
                    />
                  </div>
                  <div className="mt-1 flex flex-col items-start gap-1.5 self-stretch">
                    <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                      State/Province
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="self-stretch rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-1 flex flex-col items-start gap-1.5 self-stretch">
                    <Heading size="headinglg" as="p" className="mt-2 text-[13px] font-semibold">
                      Zip/Postal Code
                    </Heading>
                    <Input
                      size="lg"
                      shape="round"
                      name="Rectangle 3"
                      className="self-stretch rounded border border-solid border-color___5-1 px-3"
                    />
                  </div>
                  <div className="mt-6 self-stretch">
                    <div className="flex flex-col items-start gap-1.5">
                      <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                        Standard Rate
                      </Heading>
                      <div className="flex items-start gap-2 self-stretch sm:flex-col">
                        <Img
                          src="img_contrast_white_a700.svg"
                          width={20}
                          height={20}
                          alt="Contrast"
                          className="h-[20px] sm:w-full"
                        />
                        <Text
                          size="textxl"
                          as="p"
                          className="w-[94%] self-center text-[14px] font-normal leading-5 sm:w-full"
                        >
                          Price may vary depending on the item/destination. Shop Staff will contact you. $21.00
                        </Text>
                      </div>
                    </div>
                    <ShoppingCartTwoComponent36
                      standardRate="Pickup from store"
                      priceMayVaryDepending="1234 Street Adress City Address, 1234 $0.00"
                      className="relative mt-[-6px]"
                    />
                  </div>
                  <div className="self-stretch">
                    <div className="flex items-center justify-between gap-5">
                      <Heading size="text4xl" as="p" className="text-[18px] font-normal lg:text-[15px]">
                        Apply Discount Code
                      </Heading>
                      <Img src="img_frame_97_color_8.svg" width={16} height={14} alt="Frame 98" className="h-[14px]" />
                    </div>
                    <div className="mt-1 flex flex-col items-start gap-2">
                      <Heading size="headinglg" as="p" className="mt-1.5 text-[13px] font-semibold">
                        Enter discount code
                      </Heading>
                      <Input
                        shape="round"
                        name="Group 82"
                        placeholder={`Enter Discount code`}
                        className="self-stretch rounded border border-solid border-color___5-1 px-3"
                      />
                    </div>
                    <Button
                      size="4xl"
                      className="mt-[18px] self-stretch rounded-[24px] !border-2 px-8 font-semibold sm:px-4"
                    >
                      Apply Discount
                    </Button>
                  </div>
                  <div className="mt-7 self-stretch">
                    <div>
                      <div className="h-px bg-color___6-1" />
                      <div className="mt-4 flex flex-wrap justify-between gap-5">
                        <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                          Subtotal
                        </Heading>
                        <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                          $13,047.00
                        </Heading>
                      </div>
                      <div className="mt-3.5">
                        <div className="flex flex-col">
                          <div className="flex flex-wrap justify-between gap-5">
                            <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                              Shipping{" "}
                            </Heading>
                            <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                              $21.00
                            </Heading>
                          </div>
                          <Text
                            size="textxs"
                            as="p"
                            className="w-[78%] text-[10px] font-normal leading-[180%] !text-color___5-1 lg:w-full md:w-full"
                          >
                            (Standard Rate - Price may vary depending on the item/destination. Shop Staff will contact
                            you.)
                          </Text>
                          <div className="mt-2 flex flex-wrap justify-between gap-5">
                            <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                              Tax
                            </Heading>
                            <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                              $1.91
                            </Heading>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap justify-between gap-5">
                        <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                          GST (10%)
                        </Heading>
                        <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                          $1.91
                        </Heading>
                      </div>
                      <div className="relative mt-1.5 h-[38px] content-center lg:h-auto md:h-auto">
                        <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
                          Order Total
                        </Heading>
                        <Heading
                          size="heading4xl"
                          as="h6"
                          className="absolute bottom-0 left-0 right-0 top-0 m-auto h-max text-right text-[18px] font-semibold leading-[210%] lg:text-[15px]"
                        >
                          $13,068.00
                        </Heading>
                      </div>
                      <Button
                        size="4xl"
                        variant="fill"
                        className="mt-2.5 self-stretch rounded-[24px] px-[34px] font-semibold sm:px-4"
                      >
                        Proceed to Checkout
                      </Button>
                      <Button
                        size="4xl"
                        variant="fill"
                        rightIcon={
                          <Img
                            src="img_frame_159.svg"
                            width={72}
                            height={18}
                            alt="Group 114"
                            className="my-0.5 h-[18px] w-[72px] object-contain"
                          />
                        }
                        className="mt-3.5 gap-3.5 self-stretch rounded-[24px] px-[34px] font-semibold sm:px-4"
                      >
                        Check out with
                      </Button>
                      <Button
                        size="4xl"
                        className="mt-3.5 self-stretch rounded-[24px] !border-2 px-8 font-semibold !text-color___11 sm:px-4"
                      >
                        Check Out with Multiple Addresses
                      </Button>
                      <div className="mx-1.5 mt-6 flex justify-between gap-5 md:mx-0">
                        <div className="flex items-center gap-1.5">
                          <Img
                            src="img_primary_1_red_400.svg"
                            width={58}
                            height={20}
                            alt="Primary 1"
                            className="h-[20px] w-full lg:h-auto md:h-auto"
                          />
                          <div className="h-[18px] w-[2px] bg-cyan-600_01" />
                        </div>
                        <Text as="p" className="flex text-[12px] font-normal !text-indigo-900">
                          <span className="font-semibold">own</span>
                          <span>&nbsp;it now, up to 6 months interest free&nbsp;</span>
                          <a href="#" className="inline text-[10px] underline">
                            learn more
                          </a>
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Shoppingcart2Group4231 />
        <Footer className="self-stretch" />
      </div>
    </div>
  );
}
