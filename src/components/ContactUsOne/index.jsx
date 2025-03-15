import { Text, Heading, Img } from "./..";
import React from "react";

export default function ContactUsOne({
  bxBxTime = "img_bx_bx_time.svg",
  address = "Address:",
  p1234streetadress = "1234 Street Adress City Address, 1234",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex items-center self-stretch flex-1`}>
      <div className="flex w-full flex-col items-end">
        <div className="flex items-center gap-[11px] self-stretch">
          <Img src={bxBxTime} width={34} height={34} alt="Bx Bx Time" className="h-[34px]" />
          <Heading size="heading4xl" as="h6" className="text-[18px] font-semibold">
            {address}
          </Heading>
        </div>
        <Text size="textlg" as="p" className="relative mt-[-4px] text-[13px] font-normal">
          {p1234streetadress}
        </Text>
      </div>
    </div>
  );
}
