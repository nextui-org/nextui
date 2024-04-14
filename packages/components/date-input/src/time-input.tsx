import type {TimeValue} from "@react-types/datepicker";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";

import {UseTimeInputProps, useTimeInput} from "./use-time-input";
import {DateInputSegment} from "./date-input-segment";

export interface Props<T extends TimeValue> extends UseTimeInputProps<T> {}

function TimeInput<T extends TimeValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    Component,
    state,
    label,
    slots,
    hasHelper,
    errorMessage,
    description,
    startContent,
    endContent,
    shouldLabelBeOutside,
    classNames,
    getBaseProps,
    getInputProps,
    getFieldProps,
    getLabelProps,
    getInputWrapperProps,
    getInnerWrapperProps,
    getDescriptionProps,
    getHelperWrapperProps,
    getErrorMessageProps,
  } = useTimeInput<T>({
    ...props,
    ref,
  });

  const labelContent = label ? <span {...getLabelProps()}>{label}</span> : null;

  const helperWrapper = useMemo(() => {
    if (!hasHelper) return null;

    return (
      <div {...getHelperWrapperProps()}>
        {errorMessage ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : description ? (
          <div {...getDescriptionProps()}>{description}</div>
        ) : null}
      </div>
    );
  }, [
    hasHelper,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  const inputContent = useMemo(
    () => (
      <div {...getFieldProps()}>
        {state.segments.map((segment, i) => (
          <DateInputSegment
            key={i}
            classNames={classNames}
            segment={segment}
            slots={slots}
            state={state}
          />
        ))}
        <input {...getInputProps()} />
      </div>
    ),
    [state, slots, classNames?.segment, getFieldProps],
  );

  return (
    <Component {...getBaseProps()}>
      {shouldLabelBeOutside ? labelContent : null}
      <div {...getInputWrapperProps()}>
        {!shouldLabelBeOutside ? labelContent : null}
        <div {...getInnerWrapperProps()}>
          {startContent}
          {inputContent}
          {endContent}
        </div>
        {shouldLabelBeOutside ? helperWrapper : null}
      </div>
      {!shouldLabelBeOutside ? helperWrapper : null}
    </Component>
  );
}

TimeInput.displayName = "NextUI.TimeInput";

export type TimeInputProps<T extends TimeValue = TimeValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(TimeInput) as <T extends TimeValue>(
  props: TimeInputProps<T>,
) => ReactElement;
