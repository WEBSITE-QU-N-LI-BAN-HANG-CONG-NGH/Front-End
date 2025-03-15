import { Text, Heading, Img } from "./..";
import React from "react";

export default function CheckoutOne({
  image51 = "img_image_51.png",
  qty1,
  p379900 = "$3,799.00",
  mSIMEGTrident = "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER...",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex items-center self-stretch flex-1`}>
      <div className="flex w-full items-start justify-center">
        <div className="flex items-end gap-3.5 self-center">
          <Img
            src={image51}
            width={62}
            height={62}
            alt="Image 51"
            className="h-[62px] w-[38%] self-center object-contain"
          />
          <Heading as="p" className="text-[14px] font-semibold !text-color___5-1">
            <span className="font-normal">Qty&nbsp;</span>
            <span>1</span>
          </Heading>
          <Heading as="p" className="text-[14px] font-semibold">
            {p379900}
          </Heading>
        </div>
        <Text size="textxl" as="p" className="relative ml-[-112px] w-[62%] text-[14px] font-normal leading-[21px]">
          {mSIMEGTrident}
        </Text>
      </div>
    </div>
  );
}
