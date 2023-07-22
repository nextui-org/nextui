import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {useMemo, forwardRef} from "react";

import {UseInputProps, useInput} from "./use-input";

export interface InputProps
  extends Omit<UseInputProps, "ref" | "isLabelPlaceholder" | "isMultiline"> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    Component,
    label,
    description,
    isClearable,
    startContent,
    endContent,
    labelPlacement,
    hasPlaceholder,
    hasHelper,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    errorMessage,
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
  } = useInput({ref, ...props});

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  const end = useMemo(() => {
    if (isClearable) {
      return <span {...getClearButtonProps()}>{endContent || <CloseFilledIcon />}</span>;
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

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

  const innerWrapper = useMemo(() => {
    if (startContent || end) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input {...getInputProps()} />
          {end}
        </div>
      );
    }

    return <input {...getInputProps()} />;
  }, [startContent, end, getInputProps, getInnerWrapperProps]);

  const mainWrapper = useMemo(() => {
    if (shouldLabelBeOutside) {
      return (
        <div {...getMainWrapperProps()}>
          <div {...getInputWrapperProps()}>
            {labelPlacement === "outside" && !hasPlaceholder ? labelContent : null}
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
    shouldLabelBeInside,
    hasPlaceholder,
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
      {shouldLabelBeOutside && (labelPlacement === "outside-left" || hasPlaceholder)
        ? labelContent
        : null}
      {mainWrapper}
    </Component>
  );
});

Input.displayName = "NextUI.Input";

export default Input;
