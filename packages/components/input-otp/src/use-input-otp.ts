import type {
  InputOtpReturnType,
  InputOtpSlots,
  InputOtpVariantProps,
  SlotsToClasses,
} from "@nextui-org/theme";

import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@nextui-org/system";
import {inputOtp} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {useCallback, useMemo} from "react";
import {chain, mergeProps} from "@react-aria/utils";
import {AriaTextFieldProps} from "@react-types/textfield";
import {useControlledState} from "@react-stately/utils";
import {useFormValidationState} from "@react-stately/form";
import {useFormValidation} from "@react-aria/form";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLInputElement | null>;
  /**
   * Ref to the container DOM node.
   */
  baseRef?: ReactRef<HTMLDivElement | null>;
  /**
   * Length required for the otp.
   */
  length: number;
  /**
   * Regex string for the allowed keys.
   */
  allowedKeys?: string;
  /**
   * Callback that will be fired when the value has length equal to otp length
   */
  onComplete?: (v?: string) => void;
  /**
   * Boolean to disable the input-otp component.
   */
  isDisabled?: boolean;
  /**
   * Boolean to disable the animation in input-otp component.
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <InputOtp classNames={{
   *    base:"base-classes",
   *    inputWrapper:"input-wrapper-classes",
   *    input: "input-classes",
   *    segmentWrapper: "segment-wrapper-classes",
   *    segment: "segment-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<InputOtpSlots>;
  /**
   * React aria onChange event.
   */
  onValueChange?: (value: string) => void;
}

export type ValueTypes = {
  slots: InputOtpReturnType;
  classNames: SlotsToClasses<InputOtpSlots>;
};

export type UseInputOtpProps = Props & InputOtpVariantProps & Omit<AriaTextFieldProps, "onChange">;

export function useInputOtp(originalProps: UseInputOtpProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, inputOtp.variantKeys);

  const {
    ref,
    baseRef,
    as,
    className,
    classNames,
    length = 4,
    onComplete = () => {},
    onValueChange = () => {},
    allowedKeys = "^[0-9]*$",
    validationBehavior = globalContext?.validationBehavior ?? "aria",
    type,
    name,
  } = props;

  const Component = as || "div";

  const inputRef = useDOMRef<HTMLInputElement>(ref);
  const baseDomRef = useDOMRef<HTMLDivElement>(baseRef);

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      onValueChange(value ?? "");
    },
    [onValueChange],
  );

  const [value, setValue] = useControlledState(
    props.value,
    props.defaultValue ?? "",
    handleValueChange,
  );

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;
  const isDisabled = originalProps.isDisabled;
  const baseStyles = clsx(classNames?.base, className);

  const validationState = useFormValidationState({
    ...props,
    validationBehavior,
    value,
  });

  useFormValidation(props, validationState, inputRef);

  const {
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails,
  } = validationState.displayValidation;
  const isReadOnly = originalProps.isReadOnly;
  const isRequired = originalProps.isRequired;
  const isInvalid = originalProps.isInvalid || isAriaInvalid;
  const errorMessage =
    typeof props.errorMessage === "function"
      ? props.errorMessage({isInvalid, validationErrors, validationDetails})
      : props.errorMessage || validationErrors?.join(" ");

  const description = props.description;
  const hasHelper = !!description || !!errorMessage;

  const slots = useMemo(
    () =>
      inputOtp({
        ...variantProps,
        disableAnimation,
        isInvalid,
        isReadOnly,
      }),
    [objectToDeps(variantProps), disableAnimation, isInvalid],
  );

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: baseDomRef,
        className: slots.base({
          class: baseStyles,
        }),
        "data-slot": "base",
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(isInvalid),
        "data-required": dataAttr(originalProps?.isRequired),
        "data-readonly": dataAttr(originalProps?.isReadOnly),
        "data-filled": dataAttr(value.length === length),
        role: "base",
        ...props,
      };
    },
    [baseDomRef, slots, baseStyles, isDisabled],
  );

  const getInputOtpProps = useCallback(
    () => ({
      required: isRequired,
      disabled: isDisabled,
      readOnly: isReadOnly,
      pattern: allowedKeys,
      ref: inputRef,
      name: name,
      value: value,
      onChange: chain(setValue),
      onBlur: props.onBlur,
      onComplete: onComplete,
    }),
    [
      isRequired,
      isDisabled,
      isReadOnly,
      allowedKeys,
      inputRef,
      name,
      length,
      props.onChange,
      setValue,
      props.onBlur,
      onComplete,
    ],
  );

  const getSegmentWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.segmentWrapper({
          class: clsx(classNames?.segmentWrapper, props?.className),
        }),
        "data-slot": "segment-wrapper",
        "data-disabled": dataAttr(isDisabled),
        ...props,
      };
    },
    [slots, classNames?.segmentWrapper, isDisabled],
  );

  const getHelperWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.helperWrapper({
          class: clsx(classNames?.helperWrapper, props?.className),
        }),
        "data-slot": "helper-wrapper",
        ...props,
      };
    },
    [slots, classNames?.helperWrapper],
  );

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.errorMessage({
          class: clsx(classNames?.errorMessage, props?.className),
        }),
        "data-slot": "error-message",
        ...mergeProps(props),
      };
    },
    [slots, classNames?.errorMessage],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.description({
          class: clsx(classNames?.description, props?.className),
        }),
        "data-slot": "description",
        ...mergeProps(props),
      };
    },
    [slots, classNames?.description],
  );

  return {
    Component,
    inputRef,
    length,
    value,
    classNames,
    slots,
    hasHelper,
    isInvalid,
    description,
    errorMessage,
    type,
    getBaseProps,
    getInputOtpProps,
    getSegmentWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  };
}

export type UseInputOtpReturn = ReturnType<typeof useInputOtp>;
