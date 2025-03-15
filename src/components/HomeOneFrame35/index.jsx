import { Text, Img } from "./..";
import React from "react";

export default function HomeOneFrame35({
  image29 = "img_image_29_150x224.png",
  ifYouVeRecently = "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
  p01092020 = "01.09.2020",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex flex-col w-full`}>
      <Img src={image29} width={224} height={150} alt="Image 29" className="h-[150px] w-full object-cover" />
      <div className="flex flex-col items-center gap-2.5 self-stretch bg-white-a700 p-2.5">
        <Text as="p" className="self-stretch text-center text-[12px] font-normal leading-[18px]">
          {ifYouVeRecently}
        </Text>
        <Text size="textxs" as="p" className="text-[10px] font-normal !text-color___5-1">
          {p01092020}
        </Text>
      </div>
    </div>
  );
}
