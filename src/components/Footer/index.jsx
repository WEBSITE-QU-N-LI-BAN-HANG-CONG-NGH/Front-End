"use client";

import { Text, Img, Button, Input, Heading } from "./..";
import Link from "next/link";
import React from "react";

export default function Footer({ ...props }) {
  return (
    <footer {...props} className={`${props.className} flex justify-center items-end py-4 bg-color___8`}>
      <div className="container-xs mt-[30px] flex justify-center lg:px-5 md:px-5">
        <div className="flex w-full flex-col gap-5">
          <div className="flex items-start justify-center md:flex-col">
            <div className="mb-[22px] flex w-[18%] flex-col items-center gap-1 md:w-full">
              <Heading
                size="text7xl"
                as="p"
                className="text-[38px] font-medium leading-[132.5%] !text-white-a700 lg:text-[32px] md:text-[32px] sm:text-[30px]"
              >
                Sign Up To Our Newsletter.
              </Heading>
              <ul className="flex flex-col items-start">
                <li>
                  <Link href="#" className="lg:text-[13px]">
                    <Text size="text3xl" as="p" className="text-[16px] font-light !text-white-a700">
                      Be the first to hear about the latest offers.
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="Information" target="_blank" rel="noreferrer" className="mt-[42px]">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      Information
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      About Us
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      About Zip
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      Privacy Policy
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="Search" target="_blank" rel="noreferrer">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      Search
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="Terms" target="_blank" rel="noreferrer">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      Terms
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      Orders and Returns
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      Contact Us
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      Advanced Search
                    </Text>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                      Newsletter Subscription
                    </Text>
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="flex flex-col items-start self-end">
              <li>
                <Link href="#">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    PC Parts
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="CPUS" target="_blank" rel="noreferrer">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    CPUS
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    Add On Cards
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    Hard Drives (Internal)
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    Graphic Cards
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    Keyboards / Mice
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    Cases / Power Supplies / Cooling
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    RAM (Memory)
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="Software" target="_blank" rel="noreferrer">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    Software
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    Speakers / Headsets
                  </Text>
                </Link>
              </li>
              <li>
                <Link href="Motherboards" target="_blank" rel="noreferrer">
                  <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                    Motherboards
                  </Text>
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex flex-1 flex-col items-start gap-[46px] md:self-stretch">
              <div className="flex w-[66%] justify-end gap-[22px] self-end lg:w-full md:w-full sm:flex-col">
                <Input
                  shape="round"
                  name="Group 97"
                  placeholder={`Your Email`}
                  className="flex-grow rounded border-2 border-solid border-white-a700 px-3 font-light"
                />
                <Button
                  size="4xl"
                  variant="fill"
                  className="min-w-[150px] rounded-[24px] px-[34px] font-semibold sm:px-4"
                >
                  Subscribe
                </Button>
              </div>
              <div className="flex w-[92%] items-start justify-between gap-5 lg:w-full md:w-full md:flex-col">
                <div className="flex w-[50%] justify-between gap-5 md:w-full sm:flex-col">
                  <ul className="flex w-[52%] flex-col items-start sm:w-full">
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Desktop PCs
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Custom PCs
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="Servers" target="_blank" rel="noreferrer">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Servers
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          MSI All-In-One PCs
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="HP/Compaq PCs" target="_blank" rel="noreferrer">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          HP/Compaq PCs
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          ASUS PCs
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Tecs PCs
                        </Text>
                      </Link>
                    </li>
                  </ul>
                  <ul className="flex flex-col items-start">
                    <li>
                      <Link href="Laptops" target="_blank" rel="noreferrer">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Laptops
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Evryday Use Notebooks
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          MSI Workstation Series
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          MSI Prestige Series
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Tablets and Pads
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="Netbooks" target="_blank" rel="noreferrer">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Netbooks
                        </Text>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-white-a700">
                          Infinity Gaming Notebooks
                        </Text>
                      </Link>
                    </li>
                  </ul>
                </div>
                <Text
                  size="textxl"
                  as="p"
                  className="w-[38%] self-center text-[14px] font-light leading-[132.5%] !text-white-a700 lg:w-[38%] md:w-full"
                >
                  <span className="font-bold text-white-a700_7f">
                    <>
                      Address
                      <br />
                    </>
                  </span>
                  <span className="font-bold text-white-a700">
                    <>
                      <br />
                    </>
                  </span>
                  <span className="text-[13px] font-normal text-white-a700">
                    <>
                      Address: 1234 Street Adress City Address, 1234
                      <br />
                      Phones:&nbsp;
                    </>
                  </span>
                  <span className="text-[13px] font-normal text-light_blue-500">
                    <>
                      (00) 1234 5678
                      <br />
                    </>
                  </span>
                  <span className="text-[13px] font-normal text-white-a700">
                    <>
                      We are open: Monday-Thursday: 9:00 AM - 5:30 PM
                      <br />
                      Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 11:00 AM - 5:00 PM
                      <br />
                      E-mail:&nbsp;
                    </>
                  </span>
                  <span className="text-[13px] font-normal text-light_blue-500">shop@email.com</span>
                </Text>
              </div>
            </div>
          </div>
          <div className="h-px bg-white-a700_33" />
          <div className="flex items-center justify-between gap-5 sm:flex-col">
            <div className="flex gap-2.5">
              <Img
                src="img_ant_design_facebook_filled_white_a700_20x20.svg"
                width={22}
                height={22}
                alt="Ant Design Facebook Filled"
                className="h-[22px]"
              />
              <Img
                src="img_ant_design_instagram_filled_white_a700_20x20.svg"
                width={22}
                height={22}
                alt="Ant Design Instagram Filled"
                className="h-[22px]"
              />
            </div>
            <div className="flex gap-2.5">
              <Img src="img_television.svg" width={34} height={20} alt="Television" className="h-[20px]" />
              <Img src="img_television_teal_50.svg" width={32} height={20} alt="Television" className="h-[20px]" />
              <Img
                src="img_payment_methods_light_maestro.svg"
                width={32}
                height={20}
                alt="Payment Methods Light Maestro"
                className="h-[20px]"
              />
              <Img src="img_television_red_100.svg" width={34} height={20} alt="Television" className="h-[20px]" />
              <Img src="img_television_blue_100_02.svg" width={32} height={20} alt="Television" className="h-[20px]" />
            </div>
            <Text as="p" className="text-[12px] font-medium !text-white-a700_99">
              Copyright © 2020 Shop Pty. Ltd.
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
}
