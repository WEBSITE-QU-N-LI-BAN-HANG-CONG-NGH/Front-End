import { Img } from "./..";
import React from "react";

export default function CatalogOneFrame22({ image33 = "img_image_33.png", ...props }) {
  return (
    <div
      {...props}
      className={`${props.className} flex items-center w-full p-3.5 border-color___1 border border-solid bg-white-a700`}
    >
      <Img src={image33} width={88} height={44} alt="Image 33" className="h-[44px] w-full object-cover" />
    </div>
  );
}
