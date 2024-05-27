import {forwardRef} from "@nextui-org/system";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {cloneElement, ReactElement} from "react";

import {UseCheckboxProps, useCheckbox} from "./use-checkbox";
import {CheckboxIcon} from "./checkbox-icon";

export interface CheckboxProps extends UseCheckboxProps {}

const Checkbox = forwardRef<"input", CheckboxProps>((props, ref) => {
  const {
    Component,
    children,
    icon = <CheckboxIcon />,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getIconProps,
    getLabelProps,
  } = useCheckbox({...props, ref});

  const clonedIcon =
    typeof icon === "function"
      ? icon(getIconProps())
      : cloneElement(icon as ReactElement, getIconProps());

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden elementType="span">
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>{clonedIcon}</span>
      {children && <span {...getLabelProps()}>{children}</span>}
    </Component>
  );
});

Checkbox.displayName = "NextUI.Checkbox";

export default Checkbox;
