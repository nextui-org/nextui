import {styled, keyframes, forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {UseLoadingProps} from "../use-loading";

export interface SpinnerProps
  extends Omit<UseLoadingProps, "type" | "gradientBackground" | "containerCss"> {}

export const spinnerAnimation = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0.15,
  },
});

export const StyledSpinner = styled("div", {
  d: "flex",
  fd: "column",
  jc: "center",
  ai: "center",
  position: "relative",
  variants: {
    size: {
      xs: {
        size: "$6",
      },
      sm: {
        size: "$8",
      },
      md: {
        size: "$9",
      },
      lg: {
        size: "$11",
      },
      xl: {
        size: "$12",
      },
    },
  },
});

export const StyledSpinnerSpan = styled("span", {
  bg: "$$loadingColor",
  position: "absolute",
  width: "34%",
  height: "8%",
  br: "$lg",
  animation: `${spinnerAnimation} 1.2s linear 0s infinite normal none running`,
  "&:nth-child(1)": {
    animationDelay: "-1.2s",
    transform: "rotate(0deg) translate(146%)",
  },
  "&:nth-child(2)": {
    animationDelay: "-1.1s",
    transform: "rotate(30deg) translate(146%)",
  },
  "&:nth-child(3)": {
    animationDelay: "-1s",
    transform: "rotate(60deg) translate(146%)",
  },
  "&:nth-child(4)": {
    animationDelay: "-0.9s",
    transform: "rotate(90deg) translate(146%)",
  },
  "&:nth-child(5)": {
    animationDelay: "-0.8s",
    transform: "rotate(120deg) translate(146%)",
  },
  "&:nth-child(6)": {
    animationDelay: "-0.7s",
    transform: "rotate(150deg) translate(146%)",
  },
  "&:nth-child(7)": {
    animationDelay: "-0.6s",
    transform: "rotate(180deg) translate(146%)",
  },
  "&:nth-child(8)": {
    animationDelay: "-0.5s",
    transform: "rotate(210deg) translate(146%)",
  },
  "&:nth-child(9)": {
    animationDelay: "-0.4s",
    transform: "rotate(240deg) translate(146%)",
  },
  "&:nth-child(10)": {
    animationDelay: "-0.3s",
    transform: "rotate(270deg) translate(146%)",
  },
  "&:nth-child(11)": {
    animationDelay: "-0.2s",
    transform: "rotate(300deg) translate(146%)",
  },
  "&:nth-child(12)": {
    animationDelay: "-0.1s",
    transform: "rotate(330deg) translate(146%)",
  },
});

const Spinner = forwardRef<SpinnerProps, "div">((props, ref) => {
  const {children, size, className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  return (
    <StyledSpinner
      ref={domRef}
      className={clsx("nextui-spinner", className)}
      size={size}
      {...otherProps}
    >
      {[...new Array(12)].map((_, index) => (
        <StyledSpinnerSpan key={`nextui-spinner-${index}`} />
      ))}
      {children}
    </StyledSpinner>
  );
});

if (__DEV__) {
  Spinner.displayName = "NextUI.Spinner";
}

Spinner.toString = () => ".nextui-spinner";

export default Spinner;
