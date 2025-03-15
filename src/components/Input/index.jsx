"use client";
import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded",
};

const variants = {
  fill: {
    color_1: "bg-color___1 text-color___8",
    color_8: "bg-color___8 text-white-a700",
    white_A700: "bg-white-a700 text-color___5-1",
  },
};

const sizes = {
  sm: "h-[44px] px-[26px] text-[14px]",
  lg: "h-[50px] px-3",
  md: "h-[50px] px-3 text-[14px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "md",
      color = "",
      ...restProps
    },
    ref,
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center cursor-text  ${shape && shapes[shape]} ${variant && (variants[variant]?.[color] || variants[variant])} ${size && sizes[size]}`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange} {...restProps} />
        {!!suffix && suffix}
      </label>
    );
  },
);
Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["sm", "lg", "md"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["color_1", "color_8", "white_A700"]),
};

export { Input };
