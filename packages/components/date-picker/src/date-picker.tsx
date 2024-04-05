import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {forwardRef} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {DateInput} from "@nextui-org/date-input";
import {FreeSoloPopover} from "@nextui-org/popover";
import {Calendar} from "@nextui-org/calendar";
import {AnimatePresence} from "framer-motion";
import {CalendarBoldIcon} from "@nextui-org/shared-icons";

import {UseDatePickerProps, useDatePicker} from "./use-date-picker";

export interface Props<T extends DateValue> extends UseDatePickerProps<T> {}

function DatePicker<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    Component,
    domRef,
    state,
    slots,
    targetRef,
    labelProps,
    groupProps,
    dialogProps,
    fieldProps,
    calendarProps,
    buttonProps,
    disableAnimation,
  } = useDatePicker<T>({...props, ref});

  const popoverContent = state.isOpen ? (
    <FreeSoloPopover
      classNames={{content: slots.popoverContent()}}
      dialogProps={dialogProps}
      placement="bottom"
      state={state}
      triggerRef={targetRef}
    >
      <Calendar {...calendarProps} className={slots.calendar()} />
    </FreeSoloPopover>
  ) : null;

  return (
    <Component ref={domRef} className="w-full">
      <div style={{width: "100%", display: "inline-flex", flexDirection: "column"}}>
        <div {...labelProps}>{props.label}</div>
        <div {...groupProps} ref={ref} style={{display: "flex"}}>
          <DateInput
            {...fieldProps}
            ref={targetRef}
            fullWidth
            endContent={
              <Button
                isIconOnly
                radius="full"
                size="sm"
                variant="light"
                {...buttonProps}
                className={slots.button()}
              >
                <CalendarBoldIcon className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
              </Button>
            }
          />
        </div>
        {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
      </div>
    </Component>
  );
}

DatePicker.displayName = "NextUI.DatePicker";

export type DatePickerProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DatePicker) as <T extends DateValue>(
  props: DatePickerProps<T>,
) => ReactElement;
