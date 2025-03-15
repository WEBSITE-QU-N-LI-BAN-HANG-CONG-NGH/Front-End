import { Text, Heading, Img } from "./..";
import React from "react";

export default function CatalogOne({
  productSupport = "Product Support",
  upto3yearsonsite = "Up to 3 years on-site warranty available for your peace of mind.",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col w-[32%] md:w-full gap-2`}>
      <div className="mx-14 flex flex-col items-center gap-[22px] self-stretch">
        <Img
          src="img_floating_icon.svg"
          width={64}
          height={66}
          alt="Floating Icon"
          className="h-[66px] w-[42%] object-contain"
        />
        <Heading size="heading4xl" as="h6" className="text-[18px] font-bold">
          {productSupport}
        </Heading>
      </div>
      <Text
        size="textxl"
        as="p"
        className="self-stretch text-center text-[14px] font-normal leading-[140%] !text-black-900_b2"
      >
        {upto3yearsonsite}
      </Text>
    </div>
  );
}
