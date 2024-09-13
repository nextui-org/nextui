import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {useMemo, useEffect, useState, useRef} from "react";
import {forwardRef} from "@nextui-org/system";

import {UseInputProps, useInput} from "./use-input";

export interface InputProps extends Omit<UseInputProps, "isMultiline"> {}

const Input = forwardRef<"input", InputProps>((props, ref) => {
  const {
    Component,
    label,
    description,
    isClearable,
    startContent,
    endContent,
    labelPlacement,
    hasHelper,
    isOutsideLeft,
    shouldLabelBeOutside,
    errorMessage,
    isInvalid,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  } = useInput({...props, ref});

  const [endContentWidth, setEndContentWidth] = useState<number>(0);
  const endContentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endContentWrapperRef.current) {
      setEndContentWidth(endContentWrapperRef.current.getBoundingClientRect().width);
    }
  }, [endContent]);

  const end = useMemo(() => {
    return (
      <>
        {isClearable && (
          <span
            {...getClearButtonProps(
              endContent
                ? {
                    style: {
                      right: `calc(${endContentWidth}px + var(--clearable-right-has-end-content))`,
                    },
                  }
                : undefined,
            )}
          >
            {<CloseFilledIcon />}
          </span>
        )}
        {endContent && <div ref={endContentWrapperRef}>{endContent}</div>}
      </>
    );
  }, [isClearable, endContent, getClearButtonProps]);

  const helperWrapper = useMemo(() => {
    if (!hasHelper) return null;

    return (
      <div {...getHelperWrapperProps()}>
        {isInvalid && errorMessage ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : description ? (
          <div {...getDescriptionProps()}>{description}</div>
        ) : null}
      </div>
    );
  }, [
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  const innerWrapper = useMemo(() => {
    if (startContent || end) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input
            {...getInputProps(
              endContent && isClearable
                ? {
                    style: {
                      paddingRight: `calc(${endContentWidth}px + var(--clearable-padding-right-has-end-content))`,
                    },
                  }
                : undefined,
            )}
          />
          {end}
        </div>
      );
    }

    return (
      <div {...getInnerWrapperProps()}>
        {startContent}
        <input {...getInputProps()} />
        {end}
      </div>
    );
  }, [startContent, end, getInputProps, getInnerWrapperProps]);

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  const mainWrapper = useMemo(() => {
    if (shouldLabelBeOutside) {
      return (
        <div {...getMainWrapperProps()}>
          <div {...getInputWrapperProps()}>
            {!isOutsideLeft ? labelContent : null}
            {innerWrapper}
          </div>
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
});

Input.displayName = "NextUI.Input";

export default Input;
