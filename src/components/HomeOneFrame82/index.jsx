import { Heading, Text, Img } from "./..";
import React from "react";

export default function HomeOneFrame82({
  inStock = "in stock",
  reviews4 = "Reviews (4)",
  eXDISPLAYMSI = "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
  p4990049900,
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col w-[16%] md:w-full bg-white-a700`}>
      <div className="flex flex-col items-center self-stretch">
        <div className="ml-6 flex w-[34%] justify-center self-start bg-white-a700 px-1 py-1.5">
          <div className="flex w-full items-center justify-center">
            <Img src="img_checkmark.svg" width={10} height={10} alt="Checkmark" className="h-[10px]" />
            <Text size="textxs" as="p" className="text-center text-[10px] font-normal leading-[210%] !text-green-400">
              {inStock}
            </Text>
          </div>
        </div>
        <div className="flex items-center self-stretch">
          <Img
            src="img_checkmark_color_11.svg"
            width={46}
            height={78}
            alt="Checkmark"
            className="relative z-[1] mb-14 h-[78px] w-[18%] self-end object-contain"
          />
          <div className="relative ml-[-20px] flex flex-1 flex-col">
            <Img
              src="img_image_29_150x150.png"
              width={150}
              height={150}
              alt="Image 29"
              className="ml-4 h-[150px] w-[78%] object-contain"
            />
            <div className="flex items-center gap-2.5 py-1.5">
              <div className="flex w-[36%] gap-0.5 self-end">
                <Img
                  src="img_star_1_12x12.svg"
                  width={12}
                  height={12}
                  alt="Star 1"
                  className="h-[12px] w-full rounded-[1px]"
                />
                <Img
                  src="img_star_1_59.svg"
                  width={12}
                  height={12}
                  alt="Star 1"
                  className="h-[12px] w-full rounded-[1px]"
                />
                <Img
                  src="img_star_1_60.svg"
                  width={12}
                  height={12}
                  alt="Star 1"
                  className="h-[12px] w-full rounded-[1px]"
                />
                <Img
                  src="img_star_1_61.svg"
                  width={12}
                  height={12}
                  alt="Star 1"
                  className="h-[12px] w-full rounded-[1px]"
                />
                <Img
                  src="img_star_1_62.svg"
                  width={12}
                  height={12}
                  alt="Star 1"
                  className="h-[12px] w-full rounded-[1px]"
                />
              </div>
              <Text
                as="p"
                className="w-[34%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
              >
                {reviews4}
              </Text>
            </div>
            <Text size="textlg" as="p" className="w-[88%] text-[13px] font-normal leading-[19px]">
              {eXDISPLAYMSI}
            </Text>
          </div>
        </div>
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
    </div>
  );
}
