import { Button, Heading, Img, SelectBox } from "./..";
import Link from "next/link";
import React from "react";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function Header({ ...props }) {
  return (
    <header {...props}>
      <div className="w-full">
        <div className="flex justify-center bg-black-900_04 py-2">
          <div className="container-xs flex items-center justify-between gap-5 self-end lg:px-5 md:flex-col md:px-5">
            <div className="flex w-[14%] items-center justify-center gap-1 md:w-full">
              <Heading size="headingmd" as="p" className="text-[12px] font-semibold !text-white-a700">
                Mon-Thu: 9:00 AM - 5:30 PM
              </Heading>
              <SelectBox
                shape="square"
                name="Frame 97"
                options={dropDownOptions}
                className="w-[8%] rotate-[-180deg] self-end px-3"
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
          <div className="container-xs flex justify-center lg:px-5 md:px-5">
            <div className="flex w-full items-center justify-between gap-5 md:flex-col">
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
        </div>
      </div>
    </header>
  );
}
