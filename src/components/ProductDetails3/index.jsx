import { Img, Button, Text, Heading, RatingBar } from "./..";
import React from "react";

export default function ProductDetails3({
  stockStatusText = "in stock",
  reviewsText = "Reviews (4)",
  skuText = "SKU D5515AI",
  productDescriptionText = "MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop",
  priceText,
  cpuText = "CPU",
  nA = "N/A",
  featuredText = "Featured",
  na1 = "N/A",
  ioPortsText = "I/O Ports",
  na2 = "N/A",
  frame33 = "Add To Cart",
  productImage = "img_image_29_100x100.png",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} self-stretch h-[330px] mt-3.5 px-6 py-2 sm:px-4 bg-white-a700 relative`}
    >
      <div className="absolute left-0 right-0 top-3.5 mx-auto flex flex-1 flex-col items-end gap-5">
        <div className="flex w-[6%] items-center justify-center bg-white-a700 px-1 py-1.5 md:w-full">
          <Img src="img_checkmark.svg" width={10} height={10} alt="Checkmark" className="h-[10px]" />
          <Text size="textxs" as="p" className="text-center text-[10px] font-normal leading-[210%] !text-green-400">
            {stockStatusText}
          </Text>
        </div>
        <div className="ml-7 mr-1 flex items-center justify-end self-stretch md:mx-0 md:flex-col">
          <div className="flex w-[20%] items-center gap-2.5 self-end md:w-full">
            <RatingBar
              value={1}
              isEditable={true}
              color="#e9a426"
              activeColor="#e9a426"
              size={12}
              className="flex gap-2.5"
            />
            <Text as="p" className="w-[32%] text-center text-[12px] font-normal leading-[210%] !text-color___5-1">
              {reviewsText}
            </Text>
          </div>
          <div className="flex flex-1 justify-end md:self-stretch">
            <div className="flex w-[90%] flex-col items-start md:w-full">
              <Text as="p" className="text-[12px] font-light">
                {skuText}
              </Text>
              <div className="mt-3.5 flex items-start gap-[22px] self-stretch md:flex-col">
                <div className="mt-1.5 flex w-[46%] flex-col items-start gap-4 self-end md:w-full">
                  <Text size="textlg" as="p" className="w-full text-[13px] font-normal leading-[19px]">
                    {productDescriptionText}
                  </Text>
                  <Heading size="heading4xl" as="h6" className="text-[18px] font-semibold">
                    <span className="text-[14px] font-normal text-color___11 line-through">$499.00</span>
                    <span className="text-[14px] font-normal text-color___8">&nbsp;&nbsp;</span>
                    <span className="text-color___8">$499.00</span>
                  </Heading>
                </div>
                <div className="flex flex-1 flex-col items-start px-[22px] md:self-stretch sm:px-5">
                  <div className="flex w-[64%] flex-wrap justify-between gap-5 bg-white-a700 px-3.5 py-1.5 md:w-full">
                    <Text as="p" className="text-[12px] font-normal">
                      {cpuText}
                    </Text>
                    <Text as="p" className="mr-[60px] text-[12px] font-normal !text-color___11 md:mr-0">
                      {nA}
                    </Text>
                  </div>
                  <div className="flex w-[64%] flex-wrap justify-between gap-5 bg-color___1 px-3.5 py-1.5 md:w-full">
                    <Text as="p" className="text-[12px] font-normal">
                      {featuredText}
                    </Text>
                    <Text as="p" className="mr-[60px] text-[12px] font-normal !text-color___11 md:mr-0">
                      {na1}
                    </Text>
                  </div>
                  <div className="flex w-[64%] flex-wrap justify-between gap-5 bg-white-a700 px-3.5 py-1.5 md:w-full">
                    <Text as="p" className="text-[12px] font-normal">
                      {ioPortsText}
                    </Text>
                    <Text as="p" className="mr-[60px] text-[12px] font-normal !text-color___11 md:mr-0">
                      {na2}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="mt-[50px] flex items-center self-stretch">
                <Button
                  leftIcon={
                    <div className="flex h-[16px] w-[18px] items-center justify-center">
                      <Img
                        src="img_cart.svg"
                        width={18}
                        height={16}
                        alt="Cart"
                        className="my-0.5 h-[16px] w-[18px] object-contain"
                      />
                    </div>
                  }
                  className="min-w-[160px] gap-2.5 rounded-[18px] !border-2 font-semibold"
                >
                  {frame33}
                </Button>
                <div className="flex flex-1 justify-end gap-1.5 self-end">
                  <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1">
                    <Img src="img_lock_color_5_1.svg" width={20} height={20} />
                  </Button>
                  <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1.5">
                    <Img src="img_user_color_5_1.svg" width={8} height={12} />
                  </Button>
                  <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1.5">
                    <Img src="img_settings_color_5_1.svg" width={14} height={12} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Img
        src={productImage}
        width={250}
        height={250}
        alt="Image 54"
        className="absolute left-[5%] top-[8.74px] m-auto h-[250px] w-[22%] object-contain"
      />
    </div>
  );
}
