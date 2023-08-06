import {Menu} from "@nextui-org/menu";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import {forwardRef} from "@nextui-org/system";
import {HiddenSelect} from "@react-aria/select";

import {UseSelectProps, useSelect} from "./use-select";

export interface SelectProps extends UseSelectProps {}

const Select = forwardRef<"button", SelectProps>((props, ref) => {
  const {
    Component,
    state,
    label,
    getBaseProps,
    getLabelProps,
    getTriggerProps,
    getInputProps,
    getValueProps,
    getMenuProps,
    getPopoverProps,
  } = useSelect({...props, ref});

  return (
    <div {...getBaseProps()}>
      <div {...getLabelProps()}>{label}</div>
      <HiddenSelect {...getInputProps()} />
      <Popover {...getPopoverProps()}>
        <PopoverTrigger>
          <Component {...getTriggerProps()}>
            <span {...getValueProps()}>
              {state.selectedItem ? state.selectedItem.rendered : "Select an option"}
            </span>
            <span aria-hidden="true" style={{paddingLeft: 5, paddingRight: 5}}>
              ▼
            </span>
          </Component>
        </PopoverTrigger>
        <PopoverContent>
          <Menu {...getMenuProps()} />
        </PopoverContent>
      </Popover>
    </div>
  );
});

Select.displayName = "NextUI.Select";

export default Select;
