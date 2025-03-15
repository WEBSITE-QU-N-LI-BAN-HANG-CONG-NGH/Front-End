import { Text, Img, Heading } from "./..";
import React from "react";

export default function ShoppingCartTwoComponent36({
  standardRate = "Standard Rate",
  priceMayVaryDepending = "Price may vary depending on the item/destination. Shop Staff will contact you. $21.00",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col gap-1.5 py-2`}>
      <div className="flex flex-col items-start self-stretch">
        <Heading size="headinglg" as="p" className="text-[13px] font-semibold">
          {standardRate}
        </Heading>
        <Heading size="headinglg" as="p" className="relative mt-[-22px] text-[13px] font-semibold">
          Standard Rate
        </Heading>
      </div>
      <div className="mb-[18px] flex items-center justify-center gap-[9px] self-stretch">
        <Img src="img_contrast_white_a700.svg" width={20} height={20} alt="Contrast" className="h-[20px]" />
        <Text size="textxl" as="p" className="text-[14px] font-normal">
          {priceMayVaryDepending}
        </Text>
      </div>
    </div>
  );
}
