import type {
  InputOtpReturnType,
  InputOtpSlots,
  InputOtpVariantProps,
  SlotsToClasses,
} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {inputOtp} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, objectToDeps} from "@nextui-org/shared-utils";
import {useCallback, useMemo, useState} from "react";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Total number of characters in the OTP
   */
  total: number;
  classNames?: SlotsToClasses<InputOtpSlots>;
  allowedKeys?: string;
  onFill: () => void;
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
    total,
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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;

    if (!allowedKeysRegex.test(updatedValue)) {
      return;
    }
    setValue(updatedValue);
    if (updatedValue.length == total) {
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
      className: slots.base({class: baseStyles}),
    };
  }, [slots, baseStyles]);

  const getInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.input({
          class: clsx(classNames?.input, props?.classsName),
        }),
        maxLength: total,
        value,
        ...mergeProps(focusProps),
        onChange: onInputChange,
      };
    },
    [slots, classNames?.input, value, setValue],
  );

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
    total,
    value,
    isInputFocused,
    values,
    setValue,
    getBaseProps,
    getInputProps,
    ...otherProps,
  };
}

export type UseInputOtpReturn = ReturnType<typeof useInputOtp>;
