import type {InputHTMLAttributes} from "react";
import type {GroupDOMAttributes} from "@react-types/shared";
import type {DateInputReturnType, DateInputSlots, SlotsToClasses} from "@nextui-org/theme";
import type {DateFieldState} from "@react-stately/datepicker";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {forwardRef} from "react";

import {DateInputSegment} from "./date-input-segment";

type NextUIBaseProps = Omit<HTMLNextUIProps<"div">, keyof GroupDOMAttributes | "onChange">;

export interface DateInputFieldProps extends NextUIBaseProps, GroupDOMAttributes {
  /** State for the date field. */
  state: DateFieldState;
  /** Props for the hidden input element for HTML form submission. */
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  /** DateInput classes slots. */
  slots: DateInputReturnType;
  /** DateInput classes. */
  classNames?: SlotsToClasses<DateInputSlots>;
}

export const DateInputField = forwardRef<"div", DateInputFieldProps>((props, ref) => {
  const {as, state, slots, inputProps, classNames, ...otherProps} = props;

  const Component = as || "div";

  return (
    <Component {...otherProps} ref={ref}>
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
});

DateInputField.displayName = "NextUI.DateInputField";
