import type {DateInputReturnType, DateInputSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaDatePickerProps} from "@react-types/datepicker";
import type {HTMLNextUIProps} from "@nextui-org/system";
import type {DateInputProps} from "@nextui-org/date-input";

import {createCalendar} from "@internationalized/date";
import {forwardRef, useRef} from "react";
import {DateValue} from "@react-types/datepicker";
import {useDateField as useAriaDateField} from "@react-aria/datepicker";
import {ForwardedRef, ReactElement, Ref} from "react";
import {useDateFieldState} from "@react-stately/datepicker";
import {DateInputSegment} from "@nextui-org/date-input";
import {filterDOMProps, useDOMRef} from "@nextui-org/react-utils";
import {useLocale} from "@react-aria/i18n";
import {mergeProps} from "@react-aria/utils";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaDatePickerProps<T> | "onChange"
>;

export interface Props<T extends DateValue>
  extends NextUIBaseProps<T>,
    AriaDatePickerProps<T>,
    Pick<DateInputProps, "createCalendar"> {
  /** DateInput classes slots. */
  slots: DateInputReturnType;
  /** DateInput classes. */
  classNames?: SlotsToClasses<DateInputSlots>;
}

function DateRangePickerField<T extends DateValue>(
  props: Props<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {as, slots, createCalendar: createCalendarProp, classNames, ...otherProps} = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const {locale} = useLocale();

  let state = useDateFieldState({
    ...otherProps,
    locale,
    isInvalid: true,
    isDisabled: true,
    validationBehavior: "native",
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const inputRef = useRef(null);

  const {
    fieldProps,
    inputProps,
    isInvalid: ariaIsInvalid,
  } = useAriaDateField({...otherProps, inputRef}, state, domRef);

  const isInvalid = props.isInvalid || ariaIsInvalid;

  state.isInvalid = isInvalid;

  return (
    <Component {...mergeProps(fieldProps, filterDOMProps(otherProps))} ref={domRef}>
      {state.segments.map((segment, i) => (
        <DateInputSegment
          key={i}
          classNames={classNames}
          segment={segment}
          slots={slots}
          state={state}
        />
      ))}
      <input {...inputProps} />
    </Component>
  );
}

DateRangePickerField.displayName = "NextUI.DateRangePickerField";

export type DateRangePickerFieldProps<T extends DateValue = DateValue> = Props<T> & {
  ref?: Ref<HTMLElement>;
};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DateRangePickerField) as <T extends DateValue>(
  props: DateRangePickerFieldProps<T>,
) => ReactElement;
