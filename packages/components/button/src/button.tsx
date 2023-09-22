import {Spinner} from "@nextui-org/spinner";
import {Ripple} from "@nextui-org/ripple";
import {forwardRef} from "@nextui-org/system";

import {UseButtonProps, useButton} from "./use-button";
import React from "react";

export interface ButtonProps extends UseButtonProps { }

const twoCNChar = /^[\u4e00-\u9fa5]{2}$/;

function isTwoCNChar(child: React.ReactNode) {
  return React.Children.count(child) === 1 && typeof child === "string" && twoCNChar.test(child);
}

const Button = forwardRef<"button", ButtonProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    styles,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
  } = useButton({ ...props, ref });
  
  const mergedClassNames = React.useMemo<string>(
    () => isTwoCNChar(children) ? [styles, 'tracking-[0.5em]'].join(" ") : styles,
    [children, styles],
  );

  return (
    <Component ref={domRef} className={mergedClassNames} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Component>
  );
});

Button.displayName = "NextUI.Button";

export default Button;
