import {forwardRef} from "@nextui-org/system";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {cloneElement, ReactElement} from "react";

import {UseSwitchProps, useSwitch} from "./use-switch";

export interface SwitchProps extends Omit<UseSwitchProps, "ref"> {}

const Switch = forwardRef<SwitchProps, "div">((props, ref) => {
  const {
    Component,
    children,
    startIcon,
    endIcon,
    thumbIcon,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    getThumbProps,
    getThumbIconProps,
    getLabelProps,
    getStartIconProps,
    getEndIconProps,
  } = useSwitch({ref, ...props});

  const clonedThumbIcon =
    typeof thumbIcon === "function"
      ? thumbIcon(getThumbIconProps({includeStateProps: true}))
      : thumbIcon && cloneElement(thumbIcon as ReactElement, getThumbIconProps());

  const clonedStartIcon = startIcon && cloneElement(startIcon as ReactElement, getStartIconProps());
  const clonedEndIcon = endIcon && cloneElement(endIcon as ReactElement, getEndIconProps());

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        {startIcon && clonedStartIcon}
        <span {...getThumbProps()}>{thumbIcon && clonedThumbIcon}</span>
        {endIcon && clonedEndIcon}
      </span>
      {children && <span {...getLabelProps()}>{children}</span>}
    </Component>
  );
});

Switch.displayName = "NextUI.Switch";

export default Switch;
