import type {
  InputOtpReturnType,
  InputOtpSlots,
  InputOtpVariantProps,
  SlotsToClasses,
} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
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
   * Total number of characters in the OTP
   */
  otpLength: number;
  classNames?: SlotsToClasses<InputOtpSlots>;
  allowedKeys?: string;
  onFill?: () => void;
  isDisabled?: boolean;
}

export type ValueTypes = {
  slots: InputOtpReturnType;
  classNames: SlotsToClasses<InputOtpSlots>;
};

export type UseInputOtpProps = Props & InputOtpVariantProps;

export function useInputOtp(originalProps: UseInputOtpProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, inputOtp.variantKeys);

  const {
    ref,
    as,
    className,
    classNames,
    otpLength,
    onFill = () => {},
    allowedKeys = "^[0-9]*$",
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
      }),
    [objectToDeps(variantProps)],
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
      "data-disabled": dataAttr(originalProps.isDisabled),
    };
  }, [slots, baseStyles, isInputFocused, isFilled, value, originalProps]);

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
        ...mergeProps(focusProps, originalProps, hoverProps),
        onChange: onInputChange,
        "data-slot": "input",
        "data-focus": isInputFocused,
        "data-filled": dataAttr(isFilled),
      };
    },
    [slots, classNames?.input, value, setValue, isInputFocused, isFilled],
  );

  const getSegmentWrapperProps: PropGetter = useCallback(() => {
    return {
      className: slots.segmentWrapper({
        class: clsx(classNames?.segmentWrapper, props?.className),
      }),
      "data-slot": "segment-wrapper",
    };
  }, [slots, classNames?.segmentWrapper]);

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
    getBaseProps,
    getInputWrapperProps,
    getInputProps,
    getSegmentWrapperProps,
    ...otherProps,
  };
}

export type UseInputOtpReturn = ReturnType<typeof useInputOtp>;
