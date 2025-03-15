import { Heading, Text, RatingBar, Img } from "./..";
import React from "react";

export default function HoveredMenuOneFrame44({
  inStock = "in stock",
  reviews4 = "Reviews (4)",
  eXDISPLAYMSI = "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
  p4990049900,
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col w-[50%] sm:w-full`}>
      <div className="flex flex-col items-center self-stretch bg-white-a700 px-6 sm:px-5">
        <div className="self-stretch">
          <div className="flex flex-col items-start">
            <div className="flex w-[38%] justify-center bg-white-a700 px-1 py-1.5">
              <div className="flex w-full items-center justify-center">
                <Img src="img_checkmark.svg" width={10} height={10} alt="Checkmark" className="h-[10px]" />
                <Text
                  size="textxs"
                  as="p"
                  className="text-center text-[10px] font-normal leading-[210%] !text-green-400"
                >
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
          </div>
          <div className="flex items-center gap-2.5 py-1.5">
            <RatingBar
              value={1}
              isEditable={true}
              color="#c9ccd7"
              activeColor="#e9a426"
              size={12}
              className="flex gap-2.5 self-end"
            />
            <Text
              as="p"
              className="w-[40%] self-end text-center text-[12px] font-normal leading-[210%] !text-color___5-1"
            >
              {reviews4}
            </Text>
          </div>
          <Text size="textlg" as="p" className="text-[13px] font-normal leading-[19px]">
            {eXDISPLAYMSI}
          </Text>
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
