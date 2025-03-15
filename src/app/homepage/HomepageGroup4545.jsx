"use client";

import { Button, Text, Heading, Slider } from "../../components";
import React from "react";

export default function HomepageGroup4545() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <div className="relative mt-10 h-[326px] content-center self-stretch lg:h-auto md:h-auto">
      <div className="container-xs flex flex-col items-start pl-[120px] pr-14 lg:px-5 md:px-5">
        <Text
          size="text9xl"
          as="p"
          className="relative z-[7] ml-[124px] text-[96px] font-normal lg:text-[48px] md:ml-0 md:text-[48px]"
        >
          ‘’
        </Text>
        <div className="Group4788 relative mx-auto mt-[-136px] flex w-[94%] lg:w-full md:ml-0 md:w-full">
          <Slider
            autoPlay
            autoPlayInterval={2000}
            responsive={{ 0: { items: 1 }, 551: { items: 1 }, 1051: { items: 1 }, 1441: { items: 1 } }}
            renderDotsItem={(props) => {
              return props?.isActive ? (
                <div className="mr-2.5 inline-block h-[12px] w-[12px] cursor-pointer rounded-[50%] bg-color___3" />
              ) : (
                <div className="mr-2.5 inline-block h-[12px] w-[12px] cursor-pointer rounded-[50%] bg-color___6-1" />
              );
            }}
            activeIndex={sliderState}
            onSlideChanged={(e) => {
              setSliderState(e?.item);
            }}
            ref={sliderRef}
            items={[...Array(3)].map(() => (
              <React.Fragment key={Math.random()}>
                <div className="flex flex-col items-center gap-[26px] bg-color___1 p-12 md:p-5 sm:p-4">
                  <div className="flex w-[86%] flex-col items-end gap-2 lg:w-full md:w-full">
                    <Heading
                      size="text4xl"
                      as="p"
                      className="w-[92%] text-[18px] font-normal leading-[27px] lg:w-full lg:text-[15px] md:w-full"
                    >
                      My first order arrived today in perfect condition. From the time I sent a question about the item
                      to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in
                      touch. Such great service. I look forward to shopping on your site in the future and would highly
                      recommend it.
                    </Heading>
                    <Text size="textxl" as="p" className="text-[14px] font-normal">
                      - Tama Brown
                    </Text>
                  </div>
                  <div className="mb-1.5 flex">
                    <Button className="min-w-[182px] rounded-[18px] !border-2 font-semibold">Leave Us A Review</Button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          />
        </div>
      </div>
    </div>
  );
}
