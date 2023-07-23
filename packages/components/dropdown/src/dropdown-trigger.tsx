import {forwardRef} from "react";
import {PopoverTrigger} from "@nextui-org/popover";

import {useDropdownContext} from "./dropdown-context";

export interface DropdownTriggerProps {
  children?: React.ReactNode;
}

/**
 * DropdownTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>((props, _) => {
  const {getMenuTriggerProps} = useDropdownContext();

  const {children, ...otherProps} = props;

  return <PopoverTrigger {...getMenuTriggerProps(otherProps)}>{children}</PopoverTrigger>;
});

DropdownTrigger.displayName = "NextUI.DropdownTrigger";

export default DropdownTrigger;
