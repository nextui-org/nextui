import type {
  InputOtpReturnType,
  InputOtpSlots,
  InputOtpVariantProps,
  SlotsToClasses,
} from "@heroui/theme";

import {HTMLHeroUIProps, mapPropsVariants, PropGetter, useProviderContext} from "@heroui/system";
import {inputOtp} from "@heroui/theme";
import {filterDOMProps, ReactRef, useDOMRef} from "@heroui/react-utils";
import {clsx, dataAttr, objectToDeps, isPatternNumeric} from "@heroui/shared-utils";
import {useCallback, useMemo} from "react";
import {chain, mergeProps, useFormReset} from "@react-aria/utils";
import {AriaTextFieldProps} from "@react-types/textfield";
import {useControlledState} from "@react-stately/utils";
import {useFormValidationState} from "@react-stately/form";
import {useFormValidation} from "@react-aria/form";
import {useFocusRing} from "@react-aria/focus";
import {OTPInputProps} from "input-otp";
import {FormContext, useSlottedContext} from "@heroui/form";

interface Props extends HTMLHeroUIProps<"div"> {
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

export type UseInputOtpProps = Props &
  InputOtpVariantProps &
  Omit<AriaTextFieldProps, "onChange"> &
  Omit<
    Partial<OTPInputProps>,
    "render" | "children" | "value" | "onChange" | keyof InputOtpVariantProps
  >;

export function useInputOtp(originalProps: UseInputOtpProps) {
  const globalContext = useProviderContext();
  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};

  const [props, variantProps] = mapPropsVariants(originalProps, inputOtp.variantKeys);

  const {
    ref,
    baseRef,
    as,
    className,
    classNames,
    length = 4,
    autoFocus,
    "aria-label": ariaLabel = "One-time password input",
    onValueChange = () => {},
    allowedKeys = "^[0-9]*$",
    validationBehavior = formValidationBehavior ?? globalContext?.validationBehavior ?? "native",
    type,
    name,
    maxLength,
    minLength,
    textAlign = "center",
    onComplete = () => {},
    pushPasswordManagerStrategy,
    pasteTransformer,
    containerClassName,
    noScriptCSSFallback,
    onChange,
    inputMode,
    ...otherProps
  } = props;

  const Component = as || "div";

  const inputRef = useDOMRef<HTMLInputElement>(ref);
  const baseDomRef = useDOMRef<HTMLDivElement>(baseRef);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
    isTextInput: true,
  });

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

  const validationState = useFormValidationState<string>({
    ...props,
    validationBehavior,
    value,
  });

  useFormReset(inputRef, value, setValue);
  useFormValidation({...props, validationBehavior}, validationState, inputRef);

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
    [objectToDeps(variantProps), disableAnimation, isInvalid, isReadOnly],
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
        "aria-label": ariaLabel,
        "aria-required": dataAttr(originalProps.isRequired),
        "aria-readonly": dataAttr(originalProps?.isReadOnly),
        role: "base",
        ...mergeProps(
          filterDOMProps(otherProps, {
            enabled: true,
          }),
          filterDOMProps(props),
        ),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target?.value;
          const regex = new RegExp(allowedKeys);

          if (regex.test(val)) {
            onChange?.(e);
          }
        },
      };
    },
    [baseDomRef, slots, baseStyles, isDisabled, isInvalid, isRequired, isReadOnly, value, length],
  );

  const getInputOtpProps = useCallback(
    (props: Partial<OTPInputProps> = {}) => {
      const otpProps: Omit<OTPInputProps, "render" | "children"> & {
        ref?: ReactRef<HTMLInputElement>;
      } = {
        ...focusProps,
        required: isRequired,
        disabled: isDisabled,
        readOnly: isReadOnly,
        pattern: allowedKeys,
        maxLength: maxLength ?? length,
        minLength: minLength ?? length,
        textAlign,
        ref: inputRef,
        name,
        value,
        autoFocus,
        onChange: setValue,
        onBlur: chain(focusProps.onBlur, props?.onBlur),
        onComplete,
        pushPasswordManagerStrategy,
        pasteTransformer,
        noScriptCSSFallback,
        inputMode: inputMode ?? (isPatternNumeric(allowedKeys) ? "numeric" : "text"),
        containerClassName: slots.wrapper?.({class: clsx(classNames?.wrapper, containerClassName)}),
        ...props,
      };

      return otpProps;
    },
    [
      inputMode,
      isRequired,
      isDisabled,
      isReadOnly,
      allowedKeys,
      inputRef,
      name,
      value,
      length,
      setValue,
      props.onBlur,
      onComplete,
      autoFocus,
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
        "aria-label": ariaLabel,
        ...props,
      };
    },
    [classNames?.segmentWrapper, isDisabled],
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
    [classNames?.helperWrapper],
  );

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.errorMessage({
          class: clsx(classNames?.errorMessage, props?.className),
        }),
        "data-slot": "error-message",
        ...props,
      };
    },
    [classNames?.errorMessage],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.description({
          class: clsx(classNames?.description, props?.className),
        }),
        "data-slot": "description",
        ...props,
      };
    },
    [classNames?.description],
  );

  return {
    Component,
    inputRef,
    length,
    value,
    type,
    slots,
    hasHelper,
    classNames,
    isInvalid,
    description,
    errorMessage,
    isFocusVisible,
    isFocused,
    getBaseProps,
    getInputOtpProps,
    getSegmentWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  };
}

export type UseInputOtpReturn = ReturnType<typeof useInputOtp>;
