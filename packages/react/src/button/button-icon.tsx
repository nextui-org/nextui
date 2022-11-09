import type {VariantProps, CSS} from "../theme/stitches.config";

import React from "react";

import {styled} from "../theme/stitches.config";
import withDefaults from "../utils/with-defaults";
import clsx from "../utils/clsx";

interface Props {
  isRight?: boolean;
  isSingle?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const defaultProps = {
  className: "",
};

export const StyledButtonIcon = styled("span", {
  dflex: "center",
  position: "absolute",
  left: "$$buttonPadding",
  right: "auto",
  top: "50%",
  transform: "translateY(-50%)",
  color: "inherit",
  zIndex: "$1",
  "& svg": {
    background: "transparent",
  },
  variants: {
    isAuto: {
      true: {
        position: "relative",
        transform: "none",
        top: "0%",
      },
    },
    isRight: {
      true: {
        right: "$$buttonPadding",
        left: "auto",
      },
    },
    isSingle: {
      true: {
        position: "static",
        transform: "none",
      },
    },
    isGradientButtonBorder: {
      true: {},
    },
  },
  compoundVariants: [
    // isAuto && isRight
    {
      isAuto: true,
      isRight: true,
      isSingle: false,
      css: {
        order: 2,
        ml: "calc($$buttonPadding / 2)",
        right: "0%",
        left: "0%",
      },
    },
    // isAuto && !isRight
    {
      isAuto: true,
      isRight: false,
      isSingle: false,
      css: {
        order: 0,
        mr: "calc($$buttonPadding / 2)",
        right: "0%",
        left: "0%",
      },
    },
    // isSingle && isRight
    {
      isSingle: true,
      isRight: false,
      css: {
        ml: 0,
      },
    },
    // isSingle && !isRight
    {
      isSingle: true,
      isRight: true,
      css: {
        mr: 0,
      },
    },
    // isSingle && !isRight && hasButttonBorder
    {
      isSingle: true,
      isRight: false,
      isGradientButtonBorder: true,
      css: {
        mr: "calc($$buttonPadding / 2)",
      },
    },
  ],
});

type ButtonIconVariants = VariantProps<typeof StyledButtonIcon>;

export type ButtonIconProps = Props &
  typeof defaultProps &
  ButtonIconVariants & {
    css?: CSS;
  };

const ButtonIcon: React.FC<ButtonIconProps> = ({children, className, css, ...props}) => {
  return (
    <StyledButtonIcon
      className={clsx(
        "nextui-button-icon",
        {
          "nextui-button-icon-right": props.isRight,
          "nextui-button-icon-single": props.isSingle,
        },
        className,
      )}
      css={css}
      {...props}
    >
      {children}
    </StyledButtonIcon>
  );
};

ButtonIcon.toString = () => ".nextui-button-icon";

const MemoButtonIcon = React.memo(ButtonIcon);

export default withDefaults(MemoButtonIcon, defaultProps);
