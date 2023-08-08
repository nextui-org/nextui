import {Listbox} from "@nextui-org/listbox";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {ChevronDownIcon} from "@nextui-org/shared-icons";
import {forwardRef} from "@nextui-org/system";
import {FocusScope} from "@react-aria/focus";
import {HiddenSelect} from "@react-aria/select";
import {cloneElement, ReactElement} from "react";

import {UseSelectProps, useSelect} from "./use-select";

export interface SelectProps extends UseSelectProps {}

const Select = forwardRef<"button", SelectProps>((props, ref) => {
  const {
    Component,
    state,
    label,
    icon = <ChevronDownIcon />,
    placeholder,
    getBaseProps,
    getLabelProps,
    getTriggerProps,
    getInputProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    getIconProps,
  } = useSelect({...props, ref});

  const clonedIcon = cloneElement(icon as ReactElement, getIconProps());

  return (
    <div {...getBaseProps()}>
      <div {...getLabelProps()}>{label}</div>
      <HiddenSelect {...getInputProps()} />
      <Popover {...getPopoverProps()}>
        <PopoverTrigger>
          <Component {...getTriggerProps()}>
            <span {...getValueProps()}>
              {state.selectedItem ? state.selectedItem.rendered : placeholder}
            </span>
            <span aria-hidden="true">{clonedIcon}</span>
          </Component>
        </PopoverTrigger>
        <PopoverContent>
          <FocusScope contain restoreFocus>
            <Listbox {...getListboxProps()} />
          </FocusScope>
        </PopoverContent>
      </Popover>
    </div>
  );
});

Select.displayName = "NextUI.Select";

export default Select;
