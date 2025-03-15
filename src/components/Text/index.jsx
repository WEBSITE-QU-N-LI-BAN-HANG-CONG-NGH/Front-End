import React from "react";

const sizes = {
  textxs: "text-[10px] font-normal",
  textmd: "text-[12px] font-normal",
  textlg: "text-[13px] font-normal",
  textxl: "text-[14px] font-light",
  text2xl: "text-[15px] font-normal",
  text3xl: "text-[16px] font-light",
  text9xl: "text-[96px] font-normal lg:text-[96px] md:text-[48px]",
};

const Text = ({ children, className = "", as, size = "textmd", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-color___8 font-poppins ${className} ${sizes[size]} `} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
