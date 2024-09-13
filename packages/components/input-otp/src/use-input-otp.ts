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
import {clsx, dataAttr, isEmpty, objectToDeps} from "@nextui-org/shared-utils";
import {useCallback, useMemo, useState} from "react";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {useHover} from "@react-aria/interactions";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Length required for the otp.
   */
  otpLength: number;
  /**
   * Regex string for the allowed keys.
   */
  allowedKeys?: string;
  /**
   * Callback that will be fired when the value has length equal to otpLength
   */
  onFill?: () => void;
  /**
   * Boolean to disable the input-otp component.
   */
  isDisabled?: boolean;
  /**
   * Boolean to disable the animation in input-otp component.
   */
  disableAnimation?: boolean;
  /**
   * Description message for the input-otp component.
   */
  description?: string;
  /**
   * Error message when input-otp component has invalid value.
   */
  errorMessage?: string;
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
}

export type ValueTypes = {
  slots: InputOtpReturnType;
  classNames: SlotsToClasses<InputOtpSlots>;
};

export type UseInputOtpProps = Props & InputOtpVariantProps;

export function useInputOtp(originalProps: UseInputOtpProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, inputOtp.variantKeys);

  const {
    ref,
    as,
    className,
    classNames,
    otpLength,
    onFill = () => {},
    allowedKeys = "^[0-9]*$",
    isDisabled,
    description,
    errorMessage,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const styles = useMemo(
    () =>
      inputOtp({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const [value, setValue] = useState("");

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const hasHelper = !!description || !!errorMessage;
  const isInvalid = value.length != otpLength;

  const baseStyles = clsx(classNames?.base, className);

  const {focusProps, isFocused: isInputFocused} = useFocusRing({isTextInput: true});
  const allowedKeysRegex = new RegExp(allowedKeys);
  const isFilled = !isEmpty(value);
  const {isHovered, hoverProps} = useHover({isDisabled: !!originalProps?.isDisabled});

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;

    if (!allowedKeysRegex.test(updatedValue)) {
      return;
    }
    setValue(updatedValue);
    if (updatedValue.length == otpLength) {
      onFill();
    }
  };

  const slots = useMemo(
    () =>
      inputOtp({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps), disableAnimation],
  );

  const getBaseProps: PropGetter = useCallback(() => {
    return {
      className: slots.base({
        class: baseStyles,
      }),
      "data-slot": "base",
      "data-filled": dataAttr(isFilled),
      "data-focus": dataAttr(isInputFocused),
      "data-hover": dataAttr(isHovered),
      "data-disabled": dataAttr(isDisabled),
    };
  }, [slots, baseStyles, isFilled, isInputFocused, isDisabled]);

  const getInputWrapperProps: PropGetter = useCallback(() => {
    return {
      className: slots.inputWrapper({
        class: clsx(classNames?.inputWrapper, props?.className),
      }),
      "data-slot": "input-wrapper",
    };
  }, [slots, classNames?.inputWrapper]);

  const getInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.input({
          class: clsx(classNames?.input, props?.classsName),
        }),
        maxLength: otpLength,
        minLength: otpLength,
        value,
        disabled: isDisabled,
        ...mergeProps(focusProps, originalProps, hoverProps),
        onChange: onInputChange,
        "data-slot": "input",
        "data-focus": isInputFocused,
        "data-filled": dataAttr(isFilled),
        "data-disabled": dataAttr(isDisabled),
      };
    },
    [slots, classNames?.input, otpLength, value, isDisabled, setValue, isInputFocused, isFilled],
  );

  const getSegmentWrapperProps: PropGetter = useCallback(() => {
    return {
      className: slots.segmentWrapper({
        class: clsx(classNames?.segmentWrapper, props?.className),
      }),
      "data-slot": "segment-wrapper",
      "data-disabled": dataAttr(isDisabled),
    };
  }, [slots, classNames?.segmentWrapper, isDisabled]);

  const getHelperWrapperProps: PropGetter = useCallback(() => {
    return {
      className: slots.helperWrapper({
        class: clsx(classNames?.helperWrapper, props?.className),
      }),
      "data-slot": "helper-wrapper",
    };
  }, [slots, classNames?.helperWrapper]);

  const getErrorMessageProps: PropGetter = useCallback(() => {
    return {
      className: slots.errorMessage({
        class: clsx(classNames?.errorMessage, props?.className),
      }),
      "data-slot": "error-message",
    };
  }, [slots, classNames?.errorMessage]);

  const getDescriptionProps: PropGetter = useCallback(() => {
    return {
      className: slots.description({
        class: clsx(classNames?.description, props?.className),
      }),
      "data-slot": "description",
    };
  }, [slots, classNames?.description]);

  const values = useMemo(
    () => ({
      classNames,
      slots,
    }),
    [classNames, slots],
  );

  return {
    Component,
    styles,
    domRef,
    otpLength,
    value,
    isInputFocused,
    values,
    hasHelper,
    isInvalid,
    description,
    errorMessage,
    getBaseProps,
    getInputWrapperProps,
    getInputProps,
    getSegmentWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
    ...otherProps,
  };
}

export type UseInputOtpReturn = ReturnType<typeof useInputOtp>;
