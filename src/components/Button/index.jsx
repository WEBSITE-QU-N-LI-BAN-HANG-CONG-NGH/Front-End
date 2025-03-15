import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  circle: "rounded-[50%]",
  round: "rounded-[14px]",
};
const variants = {
  fill: {
    white_A700: "bg-white-a700",
    color_1: "bg-color___1 text-color___8",
    color_8: "bg-color___8 text-white-a700",
    amber_600_01: "bg-amber-600_01 text-indigo-900_01",
    color_3: "bg-color___3 text-white-a700",
  },
  outline: {
    color_3: "border-color___3 border-2 border-solid text-color___3",
    color_5_1: "border-color___5-1 border-2 border-solid text-color___5-1",
  },
};
const sizes = {
  "6xl": "h-[78px]",
  "3xl": "h-[50px] px-4",
  "5xl": "h-[64px] px-4",
  xs: "h-[26px] px-2",
  md: "h-[28px] pl-[26px] pr-4 text-[14px]",
  lg: "h-[30px] px-1",
  "4xl": "h-[50px] px-[34px] text-[14px]",
  "2xl": "h-[38px] pl-[34px] pr-[26px] text-[13px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "outline",
  size = "2xl",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "circle", "round"]),
  size: PropTypes.oneOf(["6xl", "3xl", "5xl", "xs", "md", "lg", "4xl", "2xl"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf(["white_A700", "color_1", "color_8", "amber_600_01", "color_3", "color_5_1"]),
};

export { Button };
