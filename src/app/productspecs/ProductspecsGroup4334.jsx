import { Text, Heading, BreadcrumbLink, Breadcrumb, BreadcrumbItem } from "../../components";
import Link from "next/link";
import React from "react";

export default function ProductspecsGroup4334() {
  return (
    <div className="mb-[102px] flex flex-col items-end gap-[50px] pl-14 pr-[118px] lg:pr-8 md:px-5 sm:px-4">
      <div className="mr-[166px] flex w-[54%] flex-col items-start lg:w-full md:mr-0 md:w-full">
        <Breadcrumb
          separator={<Text className="h-[18px] w-[6px] text-[12px] font-light !text-colors">›</Text>}
          className="flex flex-wrap justify-between gap-9 self-stretch"
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
            <BreadcrumbLink href="#" as={Link} className="mr-[66px]">
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
        <Text as="p" className="mt-3 text-[12px] font-normal !text-color___3">
          Be the first to review this product
        </Text>
        <div className="mt-[22px] self-stretch border border-solid border-color___6-1">
          <div className="flex flex-wrap gap-[103px] bg-white-a700 px-3.5 py-2.5 lg:gap-5 md:gap-5">
            <Text size="textxl" as="p" className="text-[14px] font-normal">
              CPU
            </Text>
            <Text size="textxl" as="p" className="text-[14px] font-normal !text-color___11">
              N/A
            </Text>
          </div>
          <div className="flex flex-wrap gap-[69px] bg-gray-50 px-3.5 py-2.5 lg:gap-5 md:gap-5">
            <Text size="textxl" as="p" className="text-[14px] font-normal">
              Featured
            </Text>
            <Text size="textxl" as="p" className="text-[14px] font-normal !text-color___11">
              N/A
            </Text>
          </div>
          <div className="flex flex-wrap gap-[73px] bg-white-a700 px-3.5 py-2.5 lg:gap-5 md:gap-5">
            <Text size="textxl" as="p" className="text-[14px] font-normal">
              I/O Ports
            </Text>
            <Text size="textxl" as="p" className="text-[14px] font-normal !text-color___11">
              N/A
            </Text>
          </div>
        </div>
      </div>
      <div className="flex w-[92%] flex-col items-start gap-[82px] lg:w-full lg:gap-[82px] md:w-full md:gap-[61px] sm:gap-[41px]">
        <div className="flex flex-wrap justify-between gap-5 self-stretch">
          <Text as="p" className="ml-[260px] flex text-[12px] font-light !text-color___3">
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
        <Text size="textxl" as="p" className="ml-36 text-[14px] font-normal md:ml-0">
          <span>+&nbsp;</span>
          <span className="font-bold uppercase">More information</span>
        </Text>
      </div>
    </div>
  );
}
