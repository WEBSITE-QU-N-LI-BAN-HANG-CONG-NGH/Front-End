import { Heading, Text, RatingBar, Img } from "./..";
import React from "react";

export default function ProductDetails1({
  stockStatusText = "in stock",
  productImage = "img_image_29.png",
  reviewsText = "Reviews (4)",
  productDescription = "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
  priceText,
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col items-center w-full px-6 sm:px-4 bg-white-a700`}>
      <div className="flex w-[38%] justify-center self-start bg-white-a700 px-1 py-1.5">
        <div className="flex w-full items-center justify-center">
          <Img src="img_checkmark.svg" width={10} height={10} alt="Checkmark" className="h-[10px]" />
          <Text size="textxs" as="p" className="text-center text-[10px] font-normal leading-[210%] !text-green-400">
            {stockStatusText}
          </Text>
        </div>
      </div>
      <Img src={productImage} width={150} height={150} alt="Image 29" className="mx-4 h-[150px] w-full object-cover" />
      <div className="flex items-center gap-2.5 self-stretch py-1.5">
        <RatingBar
          value={1}
          isEditable={true}
          color="#c9ccd7"
          activeColor="#e9a426"
          size={12}
          className="flex gap-2.5 self-end"
        />
        <Text as="p" className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1">
          {reviewsText}
        </Text>
      </div>
      <Text size="textlg" as="p" className="w-full text-[13px] font-normal leading-[19px]">
        {productDescription}
      </Text>
      <Heading size="heading4xl" as="h6" className="text-[18px] font-semibold leading-[140%]">
        <span className="text-[14px] font-normal text-color___11 line-through">
          <>
            $499.00
            <br />
          </>
        </span>
        <span className="text-color___8">$499.00</span>
      </Heading>
    </div>
  );
}
