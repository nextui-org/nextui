import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {forwardRef} from "@nextui-org/system";

import {UseDateInputProps, useDateInput} from "./use-date-input";
import {DateInputGroup} from "./date-input-group";
import {DateInputField} from "./date-input-field";

export interface Props<T extends DateValue> extends UseDateInputProps<T> {}

function DateInput<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {state, slots, classNames, getBaseGroupProps, getInputProps, getFieldProps} =
    useDateInput<T>({
      ...props,
      ref,
    });

  return (
    <DateInputGroup {...getBaseGroupProps()}>
      <DateInputField
        classNames={classNames}
        inputProps={getInputProps()}
        slots={slots}
        state={state}
        {...getFieldProps()}
      />
    </DateInputGroup>
  );
}

DateInput.displayName = "NextUI.DateInput";

export type DateInputProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DateInput) as <T extends DateValue>(
  props: DateInputProps<T>,
) => ReactElement;
