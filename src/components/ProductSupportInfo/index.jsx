import { Text, Heading, Img } from "./..";
import React from "react";

export default function ProductSupportInfo({
  floatingIconImage = "img_floating_icon.svg",
  supportTitle = "Product Support",
  warrantyDescription = "Up to 3 years on-site warranty available for your peace of mind.",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-center w-[32%] md:w-full gap-[22px]`}>
      <Img
        src={floatingIconImage}
        width={64}
        height={66}
        alt="Floating Icon"
        className="h-[66px] w-[24%] object-contain"
      />
      <div className="flex flex-col items-center gap-2 self-stretch">
        <Heading size="heading4xl" as="h6" className="text-[18px] font-bold">
          {supportTitle}
        </Heading>
        <Text
          size="textxl"
          as="p"
          className="self-stretch text-center text-[14px] font-normal leading-[140%] !text-black-900_b2"
        >
          {warrantyDescription}
        </Text>
      </div>
    </div>
  );
}
