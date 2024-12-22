import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";

import {UseNumberFieldProps, useNumberField} from "./use-number-field";
import NumberFieldVerticalStepper from "./number-field-vertical-stepper";
import NumberFieldHorizontalStepper from "./number-field-horiztonal-stepper";

export interface NumberFieldProps extends UseNumberFieldProps {}

const NumberField = forwardRef<"input", NumberFieldProps>((props, ref) => {
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
    hideStepper,
    steps,
    getBaseProps,
    getLabelProps,
    getNumberFieldProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
    getStepperIncreaseButtonProps,
    getStepperDecreaseButtonProps,
  } = useNumberField({...props, ref});

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  const end = useMemo(() => {
    if (isClearable) {
      return <button {...getClearButtonProps()}>{endContent || <CloseFilledIcon />}</button>;
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

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
    if (hideStepper) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input {...getNumberFieldProps()} />
          {end}
        </div>
      );
    }

    if (steps === "horizontal") {
      return (
        <div {...getInnerWrapperProps()}>
          <NumberFieldHorizontalStepper {...getStepperIncreaseButtonProps()} direction="left" />
          {startContent}
          <input {...getNumberFieldProps()} />
          {end}
          <NumberFieldHorizontalStepper {...getStepperIncreaseButtonProps()} direction="right" />
        </div>
      );
    }

    return (
      <div {...getInnerWrapperProps()}>
        {startContent}
        <input {...getNumberFieldProps()} />
        {end}
        {!hideStepper && (
          <div className="flex flex-col h-full">
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
          {!isOutsideLeft ? labelContent : null}
          {innerWrapper}
        </div>
        {helperWrapper}
      </div>
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

NumberField.displayName = "NextUI.NumberField";

export default NumberField;
