/* eslint-disable jsx-a11y/no-static-element-interactions */
import type {DateValue} from "@internationalized/date";
import type {ForwardedRef, ReactElement, Ref} from "react";

import {useRef, useMemo} from "react";
import {useDateSegment} from "@react-aria/datepicker";
import {forwardRef} from "@nextui-org/system";

import {UseDateFieldProps, useDateField} from "./use-date-field";

export interface Props<T extends DateValue> extends UseDateFieldProps<T> {}

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

function DateField<T extends DateValue>(props: Props<T>, ref: ForwardedRef<HTMLDivElement>) {
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
    getFieldProps,
    getLabelProps,
    getFieldWrapperProps,
    getDescriptionProps,
    getMainWrapperProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
  } = useDateField({
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
      <div {...getFieldProps()}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.isInvalid && <span aria-hidden="true">🚫</span>}
      </div>
    ),
    [state.isInvalid, getFieldProps],
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
          <div {...getFieldWrapperProps()}>{innerWrapper}</div>
          {helperWrapper}
        </div>
      );
    }

    return (
      <>
        <div {...getFieldWrapperProps()}>
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
    getFieldWrapperProps,
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

DateField.displayName = "NextUI.DateField";

export type DateFieldProps<T extends DateValue = DateValue> = Props<T> & {ref?: Ref<HTMLElement>};

// forwardRef doesn't support generic parameters, so cast the result to the correct type
export default forwardRef(DateField) as <T extends DateValue>(
  props: DateFieldProps<T>,
) => ReactElement;
