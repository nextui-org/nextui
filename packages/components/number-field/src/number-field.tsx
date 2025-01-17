import {CloseFilledIcon} from "@heroui/shared-icons";
import {useMemo} from "react";
import {forwardRef} from "@heroui/system";

import {UseNumberFieldProps, useNumberField} from "./use-number-field";
import NumberFieldVerticalStepper from "./number-field-vertical-stepper";
import NumberFieldHorizontalStepper from "./number-field-horiztonal-stepper";

export interface NumberFieldProps extends UseNumberFieldProps {}

const NumberField = forwardRef<"input", NumberFieldProps>((props, ref) => {
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
    steps,
    getBaseProps,
    getLabelProps,
    getNumberFieldProps,
    getHiddenNumberFieldProps,
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
  } = useNumberField({...props, ref});

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
    if (hideStepper) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input {...getNumberFieldProps()} />
          <input {...getHiddenNumberFieldProps()} />
          {end}
        </div>
      );
    }

    if (steps === "horizontal") {
      return (
        <div {...getInnerWrapperProps()}>
          <NumberFieldHorizontalStepper {...getStepperDecreaseButtonProps()} direction="left" />
          {startContent}
          <input {...getNumberFieldProps()} />
          <input {...getHiddenNumberFieldProps()} />
          {end}
          <NumberFieldHorizontalStepper {...getStepperIncreaseButtonProps()} direction="right" />
        </div>
      );
    }

    return (
      <div {...getInnerWrapperProps()}>
        {startContent}
        <input {...getNumberFieldProps()} />
        <input {...getHiddenNumberFieldProps()} />
        {end}
        {!hideStepper && (
          <div {...getVerticalStepperWrapperProps()}>
            <NumberFieldVerticalStepper {...getStepperIncreaseButtonProps()} direction="up" />
            <NumberFieldVerticalStepper {...getStepperDecreaseButtonProps()} direction="down" />
          </div>
        )}
      </div>
    );
  }, [startContent, end, getNumberFieldProps, getInnerWrapperProps]);

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

NumberField.displayName = "NextUI.NumberField";

export default NumberField;
