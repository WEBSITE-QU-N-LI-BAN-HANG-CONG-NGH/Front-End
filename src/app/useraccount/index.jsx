import { Text, Heading, BreadcrumbLink, Breadcrumb, BreadcrumbItem } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import UseraccountGroup1742 from "./UseraccountGroup1742";
import Link from "next/link";
import React from "react";

export default function UserAccountPage() {
  return (
    <div className="w-full bg-white-a700">
      <Header />
      <div className="mt-5 flex flex-col items-center gap-[46px]">
        <div className="container-xs lg:px-5 md:px-5">
          <div className="flex items-start md:flex-col">
            <div className="flex w-[28%] flex-col items-start gap-6 self-center md:w-full">
              <Breadcrumb
                separator={<Text className="h-[18px] w-[4.67px] text-[12px] font-light !text-colors">›</Text>}
                className="flex flex-wrap gap-10 self-stretch"
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
                      My Dashboard
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Heading
                size="heading7xl"
                as="h1"
                className="text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
              >
                My Dashboard
              </Heading>
              <div className="flex flex-col items-start gap-1.5 self-stretch">
                <div className="w-[80%] bg-color___1 py-[18px] lg:w-full md:w-full">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-[17px]">
                      <div className="h-[30px] w-[3px] self-center bg-color___3" />
                      <Heading size="heading2xl" as="h2" className="text-[15px] font-semibold !text-3">
                        Account Dashboard
                      </Heading>
                    </div>
                    <div className="mx-4 flex flex-col gap-3.5 md:mx-0">
                      <div className="flex">
                        <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                          Account Information
                        </Text>
                      </div>
                      <div className="flex">
                        <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                          Address Book
                        </Text>
                      </div>
                      <div className="flex">
                        <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                          My Orders
                        </Text>
                      </div>
                      <div className="h-px bg-color___6-1" />
                    </div>
                    <div className="ml-5 mr-[34px] flex md:mx-0">
                      <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                        My Downloadable Products
                      </Text>
                    </div>
                    <div className="ml-5 mr-[34px] flex md:mx-0">
                      <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                        Stored Payment Methods
                      </Text>
                    </div>
                    <div className="ml-5 mr-[34px] flex md:mx-0">
                      <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                        Billing Agrements
                      </Text>
                    </div>
                    <div className="ml-5 mr-[34px] flex md:mx-0">
                      <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                        My Wish List
                      </Text>
                    </div>
                    <div className="mx-4 h-px bg-color___6-1 md:mx-0" />
                    <div className="ml-5 mr-[34px] flex md:mx-0">
                      <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                        My Product Reviews
                      </Text>
                    </div>
                    <div className="ml-5 mr-[34px] flex md:mx-0">
                      <Text size="text2xl" as="p" className="text-[15px] font-normal !text-color___11">
                        Newsletter Subscriptions
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex w-[80%] flex-col items-center gap-4 bg-color___1 p-3 lg:w-full md:w-full">
                  <Heading size="heading3xl" as="h3" className="text-[16px] font-bold lg:text-[13px]">
                    Compare Products
                  </Heading>
                  <Text size="textlg" as="p" className="mb-3.5 text-[13px] font-normal">
                    You have no items to compare.
                  </Text>
                </div>
                <div className="flex w-[80%] flex-col items-center gap-[22px] bg-color___1 p-3 lg:w-full md:w-full">
                  <Heading size="heading3xl" as="h4" className="text-[16px] font-bold lg:text-[13px]">
                    My Wish List
                  </Heading>
                  <Text size="textlg" as="p" className="mb-[18px] text-[13px] font-normal">
                    You have no items in your wish list.
                  </Text>
                </div>
              </div>
            </div>
            <div className="mt-28 flex flex-1 flex-col items-start gap-3 md:self-stretch">
              <Heading size="heading4xl" as="h5" className="text-[18px] font-bold !text-3 lg:text-[15px]">
                Account Information
              </Heading>
              <div className="self-stretch">
                <div>
                  <div className="h-px bg-color___6-1" />
                  <div className="mt-4 flex md:flex-col">
                    <div className="flex w-[34%] flex-col md:w-full">
                      <Text size="text3xl" as="p" className="text-[16px] font-medium leading-5 lg:text-[13px]">
                        Contact Information
                      </Text>
                      <Text
                        size="text3xl"
                        as="p"
                        className="mt-1.5 text-[16px] font-light leading-5 !text-color___11 lg:text-[13px]"
                      >
                        <>
                          Alex Driver
                          <br />
                          ExampeAdress@gmail.com
                        </>
                      </Text>
                      <div className="mt-8 flex flex-wrap gap-[25px]">
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-color___3 underline">
                          Edit
                        </Text>
                        <Text size="textxl" as="p" className="text-[14px] font-light !text-color___3 underline">
                          Change Password
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col items-start md:self-stretch">
                      <Text size="text3xl" as="p" className="text-[16px] font-medium leading-5 lg:text-[13px]">
                        Newsletters
                      </Text>
                      <Text
                        size="text3xl"
                        as="p"
                        className="mt-5 w-[44%] text-[16px] font-light leading-5 !text-color___11 lg:w-full lg:text-[13px] md:w-full"
                      >
                        You don&#39;t subscribe to our newsletter.
                      </Text>
                      <Text size="textxl" as="p" className="mt-12 text-[14px] font-light !text-color___3 underline">
                        Edit
                      </Text>
                    </div>
                  </div>
                  <div className="mt-12 flex flex-wrap items-center gap-[19px]">
                    <Heading size="heading4xl" as="h6" className="text-[18px] font-bold !text-3 lg:text-[15px]">
                      Address Book
                    </Heading>
                    <Text size="textxl" as="p" className="self-end text-[14px] font-light !text-color___3 underline">
                      Menage Addresses
                    </Text>
                  </div>
                  <div className="mt-2.5 h-px bg-color___6-1" />
                  <div className="mt-6 flex gap-[30px] md:flex-col">
                    <div className="flex w-[32%] flex-col items-start md:w-full">
                      <Text size="text3xl" as="p" className="text-[16px] font-medium leading-5 lg:text-[13px]">
                        Default Billing Address
                      </Text>
                      <Text
                        size="text3xl"
                        as="p"
                        className="mt-[26px] w-full text-[16px] font-light leading-5 !text-color___11 lg:text-[13px]"
                      >
                        You have not set a default billing address.
                      </Text>
                      <Text size="textxl" as="p" className="mt-[52px] text-[14px] font-light !text-color___3 underline">
                        Edit Address
                      </Text>
                    </div>
                    <div className="flex flex-1 flex-col items-start md:self-stretch">
                      <Text size="text3xl" as="p" className="text-[16px] font-medium leading-5 lg:text-[13px]">
                        Default Shipping Address
                      </Text>
                      <Text
                        size="text3xl"
                        as="p"
                        className="mt-[26px] w-[48%] text-[16px] font-light leading-5 !text-color___11 lg:w-full lg:text-[13px] md:w-full"
                      >
                        You have not set a default shipping address.
                      </Text>
                      <Text size="textxl" as="p" className="mt-[52px] text-[14px] font-light !text-color___3 underline">
                        Edit Address
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UseraccountGroup1742 />
      </div>
      <Footer />
    </div>
  );
}
