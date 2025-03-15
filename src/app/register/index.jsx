"use client";

import { Button, Text, Heading, Input, BreadcrumbLink, Breadcrumb, BreadcrumbItem } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RegisterGroup1123 from "./RegisterGroup1123";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex w-full flex-col items-center bg-white-a700">
      <div className="self-stretch">
        <Header />
      </div>
      <div className="container-xs mt-5 px-2 lg:px-5 md:px-5">
        <div className="flex flex-col items-center gap-5">
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
            className="self-start text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
          >
            Customer Login
          </Heading>
          <div className="ml-[116px] mr-28 flex gap-[34px] self-stretch md:mx-0 md:flex-col">
            <div className="w-full">
              <div className="flex flex-col items-start justify-center bg-color___1 px-14 py-9 md:px-5 sm:p-4">
                <Heading size="heading4xl" as="h2" className="text-[18px] font-semibold lg:text-[15px]">
                  Registered Customers
                </Heading>
                <Text size="textxl" as="p" className="mt-4 text-[14px] font-light">
                  If you have an account, sign in with your email address.
                </Text>
                <div className="mt-1.5 self-stretch">
                  <div className="flex flex-col items-start gap-2">
                    <Heading size="headinglg" as="h3" className="mt-1.5 text-[13px] font-semibold">
                      <span className="text-color___8">Email&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      shape="round"
                      type="text"
                      name="Group 11"
                      placeholder={`Your Name`}
                      className="self-stretch rounded border border-solid border-color___5-1 px-3 font-light"
                    />
                  </div>
                  <div className="mt-1.5 flex flex-col items-start gap-1.5">
                    <Heading size="headinglg" as="h4" className="mt-2 text-[13px] font-semibold">
                      <span className="text-color___8">Password&nbsp;</span>
                      <span className="text-red-700">*</span>
                    </Heading>
                    <Input
                      shape="round"
                      type="password"
                      name="Group 12"
                      placeholder={`Your Name`}
                      className="self-stretch rounded border border-solid border-color___5-1 px-3 font-light"
                    />
                  </div>
                  <div className="mt-[30px] flex items-center gap-6">
                    <Button
                      size="4xl"
                      variant="fill"
                      className="min-w-[150px] rounded-[24px] px-[34px] font-semibold sm:px-4"
                    >
                      Sign In
                    </Button>
                    <Link href="#" className="mb-2.5 self-end">
                      <Text size="textxl" as="p" className="text-[14px] font-normal !text-color___3">
                        Forgot Your Password?
                      </Text>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col items-start gap-[26px] bg-color___1 px-14 py-9 md:px-5 sm:p-4">
                <Heading size="heading4xl" as="h5" className="text-[18px] font-semibold lg:text-[15px]">
                  New Customer?
                </Heading>
                <Text size="textxl" as="p" className="w-full text-[14px] font-light leading-5">
                  <>
                    Creating an account has many benefits: <br />
                    <br />• Check out faster
                    <br />• Keep more than one address
                    <br />• Track orders and more
                  </>
                </Text>
                <Button
                  size="4xl"
                  variant="fill"
                  className="mb-[108px] min-w-[208px] rounded-[24px] px-[34px] font-semibold sm:px-4"
                >
                  Create An Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterGroup1123 />
      <Footer className="self-stretch" />
    </div>
  );
}
