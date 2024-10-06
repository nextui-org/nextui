import type {TimeValue} from "@react-types/datepicker";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {forwardRef} from "@nextui-org/system";

import {UseTimeInputProps, useTimeInput} from "./use-time-input";
import {DateInputField} from "./date-input-field";
import {DateInputGroup} from "./date-input-group";

export interface Props<T extends TimeValue> extends UseTimeInputProps<T> {}

function TimeInput<T extends TimeValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {state, slots, classNames, getBaseGroupProps, getInputProps, getFieldProps} =
    useTimeInput<T>({
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

TimeInput.displayName = "NextUI.TimeInput";

export type TimeInputProps<T extends TimeValue = TimeValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(TimeInput) as <T extends TimeValue>(
  props: TimeInputProps<T>,
) => ReactElement;
