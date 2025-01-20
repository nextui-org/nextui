import {CloseFilledIcon} from "@heroui/shared-icons";
import {useMemo} from "react";
import {forwardRef} from "@heroui/system";

import {UseNumberInputProps, useNumberInput} from "./use-number-input";
import NumberInputVerticalStepper from "./number-input-vertical-stepper";

export interface NumberInputProps extends UseNumberInputProps {}

const NumberInput = forwardRef<"input", NumberInputProps>((props, ref) => {
  const {
    Component,
    label,
    description,
    helperText,
    isClearable,
    startContent,
    endContent,
    hasHelper,
    errorMessage,
    isInvalid,
    hideStepper,
    getBaseProps,
    getLabelProps,
    getNumberInputProps,
    getHiddenNumberInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getHelperTextProps,
    getErrorMessageProps,
    getClearButtonProps,
    getStepperIncreaseButtonProps,
    getStepperDecreaseButtonProps,
    getVerticalStepperWrapperProps,
  } = useNumberInput({...props, ref});

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  const descriptionContent = description ? (
    <div {...getDescriptionProps()}>{description}</div>
  ) : null;

  const end = useMemo(() => {
    if (isClearable) {
      return (
        <>
          <button {...getClearButtonProps()}>
            <CloseFilledIcon />
          </button>
          {endContent}
        </>
      );
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

  const helperWrapper = useMemo(() => {
    const shouldShowError = isInvalid && errorMessage;
    const hasContent = shouldShowError || description || helperText;

    if (!hasHelper || !hasContent) return null;

    return (
      <div {...getHelperWrapperProps()}>
        {shouldShowError && <div {...getErrorMessageProps()}>{errorMessage}</div>}
        {helperText && <div {...getHelperTextProps()}>{helperText}</div>}
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
    return (
      <div {...getInnerWrapperProps()}>
        {startContent}
        <input {...getNumberInputProps()} />
        <input {...getHiddenNumberInputProps()} />
        {end}
        {!hideStepper && (
          <div {...getVerticalStepperWrapperProps()}>
            <NumberInputVerticalStepper {...getStepperIncreaseButtonProps()} direction="up" />
            <NumberInputVerticalStepper {...getStepperDecreaseButtonProps()} direction="down" />
          </div>
        )}
      </div>
    );
  }, [startContent, end, getNumberInputProps, getInnerWrapperProps]);

  const mainWrapper = useMemo(() => {
    return (
      <div {...getMainWrapperProps()}>
        <div {...getInputWrapperProps()}>
          {labelContent}
          {descriptionContent}
          {innerWrapper}
        </div>
        {helperWrapper}
      </div>
    );
  }, [
    helperWrapper,
    labelContent,
    innerWrapper,
    errorMessage,
    description,
    getMainWrapperProps,
    getInputWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  return <Component {...getBaseProps()}>{mainWrapper}</Component>;
});

NumberInput.displayName = "HeroUI.NumberInput";

export default NumberInput;
