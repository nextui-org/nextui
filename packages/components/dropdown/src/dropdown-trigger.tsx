import {PopoverTrigger} from "@nextui-org/popover";

import {useDropdownContext} from "./dropdown-context";

export interface DropdownTriggerProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * DropdownTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
const DropdownTrigger = (props: DropdownTriggerProps) => {
  const {getMenuTriggerProps} = useDropdownContext();

  const {children, ...otherProps} = props;

  return <PopoverTrigger {...getMenuTriggerProps(otherProps)}>{children}</PopoverTrigger>;
};

DropdownTrigger.displayName = "NextUI.DropdownTrigger";

export default DropdownTrigger;
