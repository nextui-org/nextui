import {forwardRef} from "@nextui-org/system";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {cloneElement, ReactElement} from "react";

import {UseSwitchProps, useSwitch} from "./use-switch";

export interface SwitchProps extends Omit<UseSwitchProps, "ref"> {}

const Switch = forwardRef<SwitchProps, "div">((props, ref) => {
  const {
    Component,
    children,
    leftIcon,
    rightIcon,
    thumbIcon,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    getThumbProps,
    getThumbIconProps,
    getLabelProps,
    getLeftIconProps,
    getRightIconProps,
  } = useSwitch({ref, ...props});

  const clonedThumbIcon =
    typeof thumbIcon === "function"
      ? thumbIcon(getThumbIconProps({includeStateProps: true}))
      : thumbIcon && cloneElement(thumbIcon as ReactElement, getThumbIconProps());

  const clonedLeftIcon = leftIcon && cloneElement(leftIcon as ReactElement, getLeftIconProps());
  const clonedRightIcon = rightIcon && cloneElement(rightIcon as ReactElement, getRightIconProps());

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        {leftIcon && clonedLeftIcon}
        <span {...getThumbProps()}>{thumbIcon && clonedThumbIcon}</span>
        {rightIcon && clonedRightIcon}
      </span>
      {children && <span {...getLabelProps()}>{children}</span>}
    </Component>
  );
});

Switch.displayName = "NextUI.Switch";

export default Switch;
