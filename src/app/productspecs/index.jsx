"use client";

import { Text, Img, Button, Slider, Heading } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductspecsComponent20 from "./ProductspecsComponent20";
import ProductspecsGroup29 from "./ProductspecsGroup29";
import ProductspecsGroup4333 from "./ProductspecsGroup4333";
import ProductspecsGroup4334 from "./ProductspecsGroup4334";
import ProductspecsGroup47 from "./ProductspecsGroup47";
import React from "react";

export default function ProductSpecsPage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="w-full bg-white-a700">
      <div>
        <Header className="relative z-[2]" />
        <div className="relative z-[3] bg-white-a700">
          <div className="mt-[26px] flex flex-col items-center gap-6">
            <div className="container-xs lg:px-5 md:px-5">
              <div className="flex items-center md:flex-col">
                <div className="mb-2.5 flex w-[38%] justify-center self-end px-2 md:w-full">
                  <div className="flex w-full flex-col items-start">
                    <Heading as="h1" className="ml-[132px] text-[14px] font-semibold !text-color___11 md:ml-0">
                      Details
                    </Heading>
                    <div className="relative mt-[-20px] flex w-[48%] flex-col items-end lg:w-full md:w-full">
                      <div className="flex flex-wrap justify-between gap-5 self-stretch">
                        <Heading as="h2" className="text-[14px] font-semibold !text-color___11">
                          About Product
                        </Heading>
                        <Heading as="h3" className="text-[14px] font-semibold">
                          Specs
                        </Heading>
                      </div>
                      <Img src="img_vector_7.svg" width={42} height={2} alt="Vector 7" className="h-[2px]" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-end md:self-stretch sm:flex-col">
                  <Text size="textxl" as="p" className="text-[14px] font-normal">
                    <span>On Sale from&nbsp;</span>
                    <span className="font-semibold">$3,299.00</span>
                  </Text>
                  <div className="flex w-[48%] justify-center sm:w-full sm:flex-col">
                    <div className="flex w-[18%] items-center justify-center gap-4 rounded-md bg-color___1 p-2 sm:w-full">
                      <Heading size="headinglg" as="h4" className="text-[13px] font-semibold">
                        1
                      </Heading>
                      <div className="flex-1">
                        <Img
                          src="img_frame_98_color_5_1.svg"
                          width={16}
                          height={16}
                          alt="Frame 98"
                          className="h-[16px] w-full"
                        />
                        <Img
                          src="img_frame_97_color_5_1.svg"
                          width={16}
                          height={16}
                          alt="Frame 97"
                          className="h-[16px] w-full"
                        />
                      </div>
                    </div>
                    <Button
                      size="4xl"
                      variant="fill"
                      className="ml-5 min-w-[150px] rounded-[24px] px-[34px] font-semibold sm:ml-0 sm:px-4"
                    >
                      Add to Cart
                    </Button>
                    <Button size="3xl" variant="fill" className="ml-3 w-[140px] rounded-[24px] px-4 sm:ml-0">
                      <Img src="img_frame_159.svg" width={72} height={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px w-full self-stretch bg-black-900_33" />
          </div>
        </div>
        <div className="flex md:flex-col">
          <div className="flex-1 bg-color___1 py-[66px] lg:py-8 md:self-stretch md:p-5 sm:px-5 sm:py-4">
            <ProductspecsGroup4334 />
          </div>
          <div className="relative h-[674px] w-[44%] content-center lg:h-auto md:h-auto md:w-full md:px-5">
            <div className="Group4775 mx-auto flex w-full">
              <Slider
                autoPlay
                autoPlayInterval={2000}
                responsive={{ 0: { items: 1 }, 551: { items: 1 }, 1051: { items: 1 }, 1441: { items: 1 } }}
                renderDotsItem={(props) => {
                  return props?.isActive ? (
                    <div className="mr-[11px] inline-block h-[10px] w-[10px] cursor-pointer rounded-[50%] bg-color___3" />
                  ) : (
                    <div className="mr-[11px] inline-block h-[10px] w-[10px] cursor-pointer rounded-[50%] bg-color___6-1" />
                  );
                }}
                activeIndex={sliderState}
                onSlideChanged={(e) => {
                  setSliderState(e?.item);
                }}
                ref={sliderRef}
                items={[...Array(3)].map(() => (
                  <React.Fragment key={Math.random()}>
                    <div className="flex flex-col items-start gap-5 bg-white-a700 py-[60px] md:py-5 sm:py-4">
                      <div className="flex w-[54%] items-start bg-white-a700 px-[22px] py-2.5 lg:w-full md:w-full sm:px-4">
                        <div className="mt-6 flex flex-col items-start gap-1.5">
                          <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1.5">
                            <Img src="img_settings_color_5_1.svg" width={14} height={12} />
                          </Button>
                          <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1.5">
                            <Img src="img_user_color_5_1.svg" width={8} height={12} />
                          </Button>
                          <Button size="lg" shape="round" className="w-[30px] rounded-[14px] !border-2 px-1">
                            <Img src="img_lock_color_5_1.svg" width={20} height={20} />
                          </Button>
                        </div>
                        <Img
                          src="img_image_9.png"
                          width={254}
                          height={444}
                          alt="Image 9"
                          className="h-[444px] w-[60%] self-center object-contain"
                        />
                      </div>
                      <div className="mx-[124px] mb-9 flex items-center gap-3 self-stretch md:mx-0 sm:flex-col">
                        <Img
                          src="img_primary_1.svg"
                          width={76}
                          height={26}
                          alt="Primary 1"
                          className="h-[26px] w-[12%] object-contain sm:w-full"
                        />
                        <div className="h-[22px] w-[2px] bg-cyan-600_01 sm:h-[2px] sm:w-[22px]" />
                        <Text as="p" className="w-[28%] text-[12px] font-light leading-[120.5%] sm:w-full">
                          <span>own it now, up to 6 months interest free&nbsp;</span>
                          <a href="#" className="inline underline">
                            learn more
                          </a>
                        </Text>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              />
            </div>
          </div>
        </div>
        <ProductspecsGroup29 />
        <ProductspecsComponent20 />
        <ProductspecsGroup47 />
        <ProductspecsGroup4333 />
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
