import React, {useRef} from "react";
import {useListBox} from "react-aria";

import {usePopoverContext} from "../popover/popover-context";

import {StyledSelectMenu, StyledSelectOption} from "./select.styles";

const SelectMenu = (props: any) => {
  let ref = useRef();
  const {listBoxRef = ref, state} = props;
  let {listBoxProps} = useListBox(props, state, listBoxRef);
  const popoverContext = usePopoverContext();

  debugger;

  return (
    <StyledSelectMenu {...listBoxProps} ref={listBoxRef}>
      {[...state.collection].map((item) => {
        return (
          <StyledSelectOption
            key={item.key}
            isSelected={state.selectionManager.isSelected(item.key)}
            onClick={() => {
              state.selectionManager.select(item.key);
              popoverContext.onClose();
            }}
          >
            {item.rendered}
          </StyledSelectOption>
        );
      })}
    </StyledSelectMenu>
  );
};

export default SelectMenu;
