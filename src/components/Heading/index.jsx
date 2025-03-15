import React from "react";

const sizes = {
  text4xl: "text-[18px] font-medium",
  text6xl: "text-[32px] font-medium lg:text-[32px] md:text-[30px] sm:text-[28px]",
  text7xl: "text-[38px] font-medium lg:text-[38px] md:text-[36px] sm:text-[34px]",
  text8xl: "text-[44px] font-medium lg:text-[44px] md:text-[40px] sm:text-[34px]",
  headingxs: "text-[10px] font-bold",
  headingmd: "text-[12px] font-semibold",
  headinglg: "text-[13px] font-semibold",
  headingxl: "text-[14px] font-semibold",
  heading2xl: "text-[15px] font-semibold",
  heading3xl: "text-[16px] font-semibold",
  heading4xl: "text-[18px] font-semibold",
  heading5xl: "text-[22px] font-bold lg:text-[22px]",
  heading6xl: "text-[24px] font-semibold lg:text-[24px] md:text-[22px]",
  heading7xl: "text-[32px] font-semibold lg:text-[32px] md:text-[30px] sm:text-[28px]",
};

const Heading = ({ children, className = "", size = "headingxl", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-color___8 font-poppins ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
