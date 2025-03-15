"use client";

import { Button, TextArea, Heading, Input, Text, BreadcrumbLink, Breadcrumb, BreadcrumbItem } from "../../components";
import ContactUsOne from "../../components/ContactUsOne";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ContactusGroup1119 from "./ContactusGroup1119";
import Link from "next/link";
import React, { Suspense } from "react";

const data = [
  { bxBxTime: "img_bx_bx_time.svg", address: "Address:", p1234StreetAdress: "1234 Street Adress City Address, 1234" },
  {
    bxBxTime: "img_bx_bx_time_color_8.svg",
    address: "Phone:",
    p1234StreetAdress: "1234 Street Adress City Address, 1234",
    p1234streetadress: "(00)1234 5678",
  },
  {
    bxBxTime: "img_bx_bx_time_color_8_34x34.svg",
    address: "We are open:",
    p1234StreetAdress: "1234 Street Adress City Address, 1234",
    p1234streetadress: (
      <>
        Monday - Thursday: 9:00 AM - 5:30 PM
        <br />
        Friday 9:00 AM - 6:00 PM
        <br />
        Saturday: 11:00 AM - 5:00 PM
      </>
    ),
  },
  {
    bxBxTime: "img_bx_bx_time_34x34.svg",
    address: "E-mail:",
    p1234StreetAdress: "1234 Street Adress City Address, 1234",
    p1234streetadress: "shop@email.com",
  },
];

export default function ContactUsPage() {
  return (
    <div className="w-full bg-white-a700">
      <Header />
      <div className="mt-5 flex flex-col items-center gap-[122px] lg:gap-[91px] md:gap-[91px] sm:gap-[61px]">
        <div className="container-xs lg:px-5 md:px-5">
          <div className="flex flex-col items-start gap-3.5">
            <Breadcrumb
              separator={<Text className="h-[18px] w-[3.97px] text-[12px] font-light !text-colors">›</Text>}
              className="flex flex-wrap gap-9 self-stretch"
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
                    Contact Us
                  </Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Link href="#" className="lg:text-[27px] md:text-[26px] sm:text-[24px]">
              <Heading size="heading7xl" as="h1" className="text-[32px] font-semibold">
                Contact Us
              </Heading>
            </Link>
            <div className="flex items-start self-stretch md:flex-col">
              <div className="flex flex-1 flex-col gap-5 self-center md:self-stretch">
                <Text size="text3xl" as="p" className="text-[16px] font-light leading-[30px] lg:text-[13px]">
                  <>
                    We love hearing from you, our Shop customers.
                    <br />
                    Please contact us and we will make sure to get back to you as soon as we possibly can.
                  </>
                </Text>
                <div>
                  <div className="flex flex-col items-start">
                    <div className="flex gap-[30px] self-stretch md:flex-col">
                      <div className="flex w-[46%] flex-col items-start gap-1.5 md:w-full">
                        <Heading size="headinglg" as="h2" className="mt-2 text-[13px] font-semibold">
                          <span className="text-color___8">Your Name&nbsp;</span>
                          <span className="text-red-700">*</span>
                        </Heading>
                        <Input
                          shape="round"
                          type="text"
                          name="Group 38"
                          placeholder={`Your Name`}
                          className="self-stretch rounded border border-solid border-color___5-1 px-3 font-light"
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-start gap-2 md:self-stretch">
                        <Heading size="headinglg" as="h3" className="mt-1.5 text-[13px] font-semibold">
                          <span className="text-color___8">Your Email&nbsp;</span>
                          <span className="text-red-700">*</span>
                        </Heading>
                        <Input
                          shape="round"
                          type="text"
                          name="Group 39"
                          placeholder={`Your Name`}
                          className="w-[88%] rounded border border-solid border-color___5-1 px-3 font-light"
                        />
                      </div>
                    </div>
                    <div className="mt-2.5 flex flex-col items-start gap-1.5 self-stretch">
                      <Heading size="headinglg" as="h4" className="mt-2 text-[13px] font-semibold">
                        Your Phone Number
                      </Heading>
                      <Input
                        shape="round"
                        type="number"
                        name="Group 40"
                        placeholder={`Your Phone`}
                        className="w-[44%] rounded border border-solid border-color___5-1 px-3 font-light"
                      />
                    </div>
                    <div className="mt-5 flex flex-col items-start gap-1.5 self-stretch">
                      <Heading size="headinglg" as="h5" className="text-[13px] font-semibold">
                        <span className="text-color___8">What’s on your mind?&nbsp;</span>
                        <span className="text-red-700">*</span>
                      </Heading>
                      <TextArea
                        shape="round"
                        name="Group 41"
                        placeholder={`Jot us a note and we’ll get back to you as quickly as possible`}
                        className="w-[94%] rounded !border !border-color___5-1 px-4 font-light text-color___5-1"
                      />
                    </div>
                    <Button
                      size="4xl"
                      variant="fill"
                      className="mt-4 min-w-[150px] rounded-[24px] px-[34px] font-semibold sm:px-4"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex w-[28%] bg-color___1 px-[30px] py-[26px] md:w-full sm:p-4">
                <div className="mb-12 mr-14 flex w-full flex-col gap-3.5 lg:mr-0 md:mr-0">
                  <Suspense fallback={<div>Loading feed...</div>}>
                    {data.map((d, index) => (
                      <ContactUsOne {...d} key={"group4558" + index} className="mr-2.5 md:mr-0" />
                    ))}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ContactusGroup1119 />
      </div>
      <Footer />
    </div>
  );
}
