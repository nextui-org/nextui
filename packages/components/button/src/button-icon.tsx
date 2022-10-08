import {styled, forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

export interface ButtonIconProps extends HTMLNextUIProps<"span"> {
  isAuto?: boolean;
  isRight?: boolean;
  isSingle?: boolean;
  isGradientButtonBorder?: boolean;
}

const StyledButtonIcon = styled("span", {
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

const ButtonIcon = forwardRef<ButtonIconProps, "span">((props, ref) => {
  const {children, className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  return (
    <StyledButtonIcon
      ref={domRef}
      className={clsx(
        "nextui-button-icon",
        {
          "nextui-button-icon-right": props.isRight,
          "nextui-button-icon-single": props.isSingle,
        },
        className,
      )}
      {...otherProps}
    >
      {children}
    </StyledButtonIcon>
  );
});

if (__DEV__) {
  ButtonIcon.displayName = "NextUI.ButtonIcon";
}

ButtonIcon.toString = () => ".nextui-button-icon";

export default ButtonIcon;
