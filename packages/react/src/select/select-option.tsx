import React, {ReactNode} from "react";
import {FocusableProps, Node} from "@react-types/shared";
import {TreeState} from "@react-stately/tree";
import {NormalWeights, SimpleColors} from "types";
import {useSelectState} from "react-stately";
import {useOption} from "react-aria";

import {SelectProvider, useSelectContext} from "./select-context";
import {StyledSelectOption} from "./select.styles";

interface Props<T> extends FocusableProps {
  value: string;
  children?: ReactNode;
}

export type SelectOptionProps<T = object> = Props<T>;

const SelectOption = <T extends object>({value, children}: SelectOptionProps<T>) => {
  const state = useSelectContext();
  const ref = React.useRef<any>();
  let {optionProps, isSelected, isFocused, isDisabled} = useOption({key: value}, state, ref);

  return (
    <StyledSelectOption
      key={value}
      aria-selected={false}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      role="option"
      {...optionProps}
    >
      {children}
    </StyledSelectOption>
  );
};

export default SelectOption;
