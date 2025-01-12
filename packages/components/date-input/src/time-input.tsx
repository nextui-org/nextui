import type {TimeValue} from "@react-types/datepicker";
import type {ForwardedRef, ReactElement} from "react";

import {forwardRef} from "@heroui/system";

import {UseTimeInputProps, useTimeInput} from "./use-time-input";
import {DateInputField} from "./date-input-field";
import {DateInputGroup} from "./date-input-group";

export interface Props<T extends TimeValue> extends UseTimeInputProps<T> {}

export type TimeInputProps<T extends TimeValue = TimeValue> = Props<T>;

const TimeInput = forwardRef(function TimeInput<T extends TimeValue>(
  props: TimeInputProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
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
}) as <T extends TimeValue>(props: TimeInputProps<T>) => ReactElement;

export default TimeInput;
