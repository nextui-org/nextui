import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {useMemo, useEffect, useState, useRef, CSSProperties} from "react";
import {forwardRef} from "@nextui-org/system";

import {UseInputProps, useInput} from "./use-input";

export interface InputProps extends Omit<UseInputProps, "isMultiline"> {}

export interface ClearButtonCSSProperties {
  "--end-content-width": string;
}

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
          <button
            {...getClearButtonProps(
              endContent
                ? {
                    style: {
                      "--end-content-width": `${endContentWidth}px`,
                    } as CSSProperties & ClearButtonCSSProperties,
                    "data-is-end-content": true,
                  }
                : {
                    "data-is-end-content": false,
                  },
            )}
          >
            {<CloseFilledIcon />}
          </button>
        )}
        {endContent && <div ref={endContentWrapperRef}>{endContent}</div>}
      </>
    );
  }, [isClearable, endContent, getClearButtonProps]);

  const helperWrapper = useMemo(() => {
    const shouldShowError = isInvalid && errorMessage;
    const hasContent = shouldShowError || description;

    if (!hasHelper || !hasContent) return null;

    return (
      <div {...getHelperWrapperProps()}>
        {shouldShowError ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : (
          <div {...getDescriptionProps()}>{description}</div>
        )}
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
                      "--end-content-width": `${endContentWidth}px`,
                    } as CSSProperties & ClearButtonCSSProperties,
                    "data-is-end-content": true,
                  }
                : {
                    "data-is-end-content": false,
                  },
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
