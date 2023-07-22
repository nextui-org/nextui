import {Spinner} from "@nextui-org/spinner";
import {Ripple} from "@nextui-org/ripple";
import {forwardRef} from "react";

import {UseButtonProps, useButton} from "./use-button";

export interface ButtonProps extends Omit<UseButtonProps, "ref"> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    styles,
    ripples,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
  } = useButton({
    ref,
    ...props,
  });

  return (
    <Component ref={domRef} className={styles} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple ripples={ripples} />}
    </Component>
  );
});

Button.displayName = "NextUI.Button";

export default Button;
