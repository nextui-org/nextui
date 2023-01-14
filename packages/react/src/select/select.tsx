import React, {Children} from "react";
import {HiddenSelect, useListBox, useOption, Overlay, usePopover, useSelect} from "react-aria";
import {DismissButton} from "@react-aria/overlays";
import {useListState, useSelectState} from "react-stately";

import Button from "../button";
import Popover from "../popover";
import Input from "../input";
import Dropdown from "../dropdown";
import DropdownIcon from "../dropdown/dropdown-icon";

import SelectOption from "./select-option";
import {SelectProvider} from "./select-context";
import SelectMenu from "./select-menu";

// Select
function Select(props: any) {
  const {children, ...otherProps} = props;
  let state = useSelectState(props);
  let ref = React.useRef<any>();
  let {labelProps, triggerProps, valueProps, menuProps} = useSelect(props, state, ref);

  return (
    <SelectProvider value={state}>
      <Popover>
        <Popover.Trigger>
          <Input
            {...triggerProps}
            {...valueProps}
            contentRight={<DropdownIcon fill="currentColor" size={14} />}
            initialValue="Select a value"
            label="salut"
            placeholder="select"
          />
        </Popover.Trigger>
        <Popover.Content>
          <SelectMenu state={state} />
        </Popover.Content>
      </Popover>
    </SelectProvider>
  );
}

type SelectComponent = typeof Select & {
  Option: typeof SelectOption;
};
export default Select as SelectComponent;
