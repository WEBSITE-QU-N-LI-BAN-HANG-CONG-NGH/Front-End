import { Text, Img } from "./..";
import React from "react";

export default function ProductDescription({ productImage = "img_image_16.png", productDescription, ...props }) {
  return (
    <div {...props} className={`${props.className} flex flex-col w-[24%] md:w-full gap-7`}>
      <div className="mx-[58px] self-stretch rounded-[68px] bg-color___8 p-[26px] sm:p-5">
        <Img src={productImage} width={80} height={80} alt="Image 16" className="h-[80px] w-full object-cover" />
      </div>
      <Text
        size="textxl"
        as="p"
        className="self-stretch text-center text-[14px] font-light leading-[22px] !text-white-a700"
      >
        <span className="font-bold">Intel® Core™ i7</span>
        <span>&nbsp;processor with the upmost computing power to bring you an unparalleled gaming experience.</span>
      </Text>
    </div>
  );
}
