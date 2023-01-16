import React from "react";
import {useSelectState, SelectProps as StatelySelectProps} from "@react-stately/select";

import DropdownIcon from "../dropdown/dropdown-icon";
import Input from "../input";
import {InputProps} from "../input/input";
import Popover from "../popover";

import {SelectProvider} from "./select-context";
import SelectMenu from "./select-menu";
import SelectOption from "./select-option";
interface SelectProps {
  inputProps?: Partial<InputProps>;
}

// Select
function Select(props: StatelySelectProps<object> & SelectProps) {
  const {inputProps} = props;
  let state = useSelectState(props);
  let ref = React.useRef<any>();

  return (
    <SelectProvider value={state}>
      <Popover>
        <Popover.Trigger>
          <Input
            {...inputProps}
            contentRight={<DropdownIcon fill="currentColor" size={14} />}
            initialValue="Select a value"
            label="salut"
            placeholder="select"
            value={state.selectedItem?.textValue || "Séléctionner"}
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
