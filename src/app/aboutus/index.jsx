import { Heading, Text, BreadcrumbLink, Breadcrumb, BreadcrumbItem } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import AboutusGroup1234 from "./AboutusGroup1234";
import AboutusGroup4151 from "./AboutusGroup4151";
import AboutusGroup4152 from "./AboutusGroup4152";
import AboutusGroup4159 from "./AboutusGroup4159";
import AboutusGroup4162 from "./AboutusGroup4162";
import AboutusGroup4165 from "./AboutusGroup4165";
import Link from "next/link";
import React from "react";

export default function AboutUsPage() {
  return (
    <div className="flex w-full flex-col items-center bg-white-a700">
      <div className="self-stretch">
        <Header />
      </div>
      <div className="container-xs mt-5 flex flex-col items-start gap-[18px] px-2 lg:px-5 md:px-5">
        <Breadcrumb
          separator={<Text className="h-[18px] w-[3.53px] text-[12px] font-light !text-colors">›</Text>}
          className="flex flex-wrap gap-8 self-stretch"
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
                About Us
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading
          size="heading7xl"
          as="h1"
          className="text-[32px] font-semibold lg:text-[27px] md:text-[26px] sm:text-[24px]"
        >
          About Us
        </Heading>
      </div>
      <AboutusGroup4165 />
      <AboutusGroup4159 />
      <AboutusGroup4162 />
      <AboutusGroup4152 />
      <AboutusGroup4151 />
      <AboutusGroup1234 />
      <Footer className="self-stretch" />
    </div>
  );
}
