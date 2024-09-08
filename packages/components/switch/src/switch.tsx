import {VisuallyHidden} from "@react-aria/visually-hidden";
import {cloneElement, ReactElement} from "react";
import {forwardRef} from "@nextui-org/system";

import {UseSwitchProps, useSwitch} from "./use-switch";

export interface SwitchProps extends UseSwitchProps {}

const Switch = forwardRef<"input", SwitchProps>((props, ref) => {
  const {
    Component,
    children,
    startContent,
    endContent,
    thumbIcon,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    getThumbProps,
    getThumbIconProps,
    getLabelProps,
    getStartContentProps,
    getEndContentProps,
  } = useSwitch({...props, ref});

  const clonedThumbIcon =
    typeof thumbIcon === "function"
      ? thumbIcon(getThumbIconProps({includeStateProps: true}))
      : thumbIcon && cloneElement(thumbIcon as ReactElement, getThumbIconProps());

  const clonedStartContent =
    startContent && cloneElement(startContent as ReactElement, getStartContentProps());
  const clonedEndContent =
    endContent && cloneElement(endContent as ReactElement, getEndContentProps());

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden elementType="span">
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        {startContent && clonedStartContent}
        <span {...getThumbProps()}>{thumbIcon && clonedThumbIcon}</span>
        {endContent && clonedEndContent}
      </span>
      {children && <span {...getLabelProps()}>{children}</span>}
    </Component>
  );
});

Switch.displayName = "NextUI.Switch";

export default Switch;
