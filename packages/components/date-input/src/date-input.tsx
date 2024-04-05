/* eslint-disable jsx-a11y/no-static-element-interactions */
import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";

import {UseDateInputProps, useDateInput} from "./use-date-input";
import {DateInputSegment} from "./date-input-segment";

export interface Props<T extends DateValue> extends UseDateInputProps<T> {}

function DateInput<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
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
    getDescriptionProps,
    getHelperWrapperProps,
    getErrorMessageProps,
  } = useDateInput({
    ...props,
    ref,
  });

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

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
        {startContent}
        {!shouldLabelBeOutside ? labelContent : null}
        {inputContent}
        {endContent}
        {shouldLabelBeOutside ? helperWrapper : null}
      </div>
      {!shouldLabelBeOutside ? helperWrapper : null}
    </Component>
  );
}

DateInput.displayName = "NextUI.DateInput";

export type DateInputProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DateInput) as <T extends DateValue>(
  props: DateInputProps<T>,
) => ReactElement;
