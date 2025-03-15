import { Img, Heading, Text } from "./..";
import React from "react";

export default function HoveredMenuOne({
  inStock = "in stock",
  reviews4 = "Reviews (4)",
  eXDISPLAYMSI = "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
  p4990049900,
  mSIWorkstation = "&lt;&gt;MSI Workstation Series&lt;br /&gt;MSI Prestige Series&lt;/&gt;",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} h-[394px] w-[50%] md:h-auto sm:w-full relative`}>
      <div className="ml-5 mr-1.5 flex flex-1 flex-col items-center bg-white-a700 px-6 sm:px-5">
        <div className="flex w-[38%] justify-center self-start bg-white-a700 px-1 py-1.5">
          <div className="flex w-full items-center justify-center">
            <Img src="img_checkmark.svg" width={10} height={10} alt="Checkmark" className="h-[10px]" />
            <Text size="textxs" as="p" className="text-center text-[10px] font-normal leading-[210%] !text-green-400">
              {inStock}
            </Text>
          </div>
        </div>
        <Img
          src="img_image_29_150x150.png"
          width={150}
          height={150}
          alt="Image 29"
          className="mx-4 h-[150px] w-full object-cover"
        />
        <div className="flex items-center gap-2.5 self-stretch py-1.5">
          <div className="flex w-[42%] gap-0.5 self-end">
            <Img
              src="img_star_1_88.svg"
              width={12}
              height={12}
              alt="Star 1"
              className="h-[12px] w-full rounded-[1px]"
            />
            <Img
              src="img_star_1_89.svg"
              width={12}
              height={12}
              alt="Star 1"
              className="h-[12px] w-full rounded-[1px]"
            />
            <Img
              src="img_star_1_90.svg"
              width={12}
              height={12}
              alt="Star 1"
              className="h-[12px] w-full rounded-[1px]"
            />
            <Img
              src="img_star_1_91.svg"
              width={12}
              height={12}
              alt="Star 1"
              className="h-[12px] w-full rounded-[1px]"
            />
            <Img
              src="img_star_1_92.svg"
              width={12}
              height={12}
              alt="Star 1"
              className="h-[12px] w-full rounded-[1px]"
            />
          </div>
          <Text
            as="p"
            className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
          >
            {reviews4}
          </Text>
        </div>
        <Text size="textlg" as="p" className="w-full text-[13px] font-normal leading-[19px]">
          {eXDISPLAYMSI}
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
      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-max flex-1 border border-solid border-color___6-1 bg-white-a700">
        <div className="mb-[308px]">
          <div className="h-[44px] bg-color___1" />
          <div className="relative ml-5 mr-6 mt-[-44px] flex items-start justify-center">
            <Heading as="p" className="w-full self-center text-[14px] font-semibold leading-[307%]">
              {mSIWorkstation}
            </Heading>
            <Img
              src="img_vector_12.svg"
              width={2}
              height={4}
              alt="Vector 14"
              className="relative ml-[-2px] mt-5 h-[4px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
