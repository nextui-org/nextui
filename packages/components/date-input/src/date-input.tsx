/* eslint-disable jsx-a11y/no-static-element-interactions */
import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {useRef, useMemo} from "react";
import {useDateSegment} from "@react-aria/datepicker";
import {forwardRef} from "@nextui-org/system";

import {UseDateInputProps, useDateInput} from "./use-date-input";

export interface Props<T extends DateValue> extends UseDateInputProps<T> {}

function DateSegment({segment, state}: any) {
  let ref = useRef(null);
  let {segmentProps} = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`segment ${segment.isPlaceholder ? "placeholder" : ""}`}
    >
      {segment.text}
    </div>
  );
}

function DateInput<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    Component,
    state,
    label,
    hasHelper,
    errorMessage,
    description,
    startContent,
    endContent,
    labelPlacement,
    shouldLabelBeOutside,
    getBaseProps,
    getInputProps,
    getLabelProps,
    getInputWrapperProps,
    getDescriptionProps,
    getMainWrapperProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
  } = useDateInput({
    ...props,
    ref,
  });

  const isOutsideLeft = labelPlacement === "outside-left";
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

  const fieldContent = useMemo(
    () => (
      <div {...getInputProps()}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.isInvalid && <span aria-hidden="true">🚫</span>}
      </div>
    ),
    [state.isInvalid, getInputProps],
  );

  const innerWrapper = useMemo(() => {
    if (startContent || endContent) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          {fieldContent}
          {endContent}
        </div>
      );
    }

    return <div {...getInnerWrapperProps()}>{fieldContent}</div>;
  }, [startContent, endContent, fieldContent, getInnerWrapperProps]);

  const mainWrapper = useMemo(() => {
    if (shouldLabelBeOutside) {
      return (
        <div {...getMainWrapperProps()}>
          {!isOutsideLeft ? labelContent : null}
          <div {...getInputWrapperProps()}>{innerWrapper}</div>
          {helperWrapper}
        </div>
      );
    }

    return (
      <>
        <div {...getInputWrapperProps()}>
          {labelContent}
          {innerWrapper}
        </div>
        {helperWrapper}
      </>
    );
  }, [
    labelPlacement,
    helperWrapper,
    shouldLabelBeOutside,
    labelContent,
    innerWrapper,
    errorMessage,
    description,
    getMainWrapperProps,
    getInputWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  return (
    <Component {...getBaseProps()}>
      {isOutsideLeft ? labelContent : null}
      {mainWrapper}
    </Component>
  );
}

DateInput.displayName = "NextUI.DateInput";

export type DateInputProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DateInput) as <T extends DateValue>(
  props: DateInputProps<T>,
) => ReactElement;
