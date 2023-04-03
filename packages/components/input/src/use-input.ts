import type {InputVariantProps, SlotsToClasses, InputSlots} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {AriaTextFieldProps} from "@react-types/textfield";
import {useFocusRing} from "@react-aria/focus";
import {input} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {usePress} from "@react-aria/interactions";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useControlledState} from "@react-stately/utils";
import {useMemo, Ref} from "react";
import {chain, mergeProps} from "@react-aria/utils";

import {useAriaTextField} from "./use-aria-text-field";

export interface Props extends Omit<HTMLNextUIProps<"input">, "onChange"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLInputElement>;
  /**
   * Element to be rendered in the left side of the input.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the input.
   * if you pass this prop and the `onClear` prop, the passed element
   * will have the clear button props and it will be rendered instead of the
   * default clear button.
   */
  endContent?: React.ReactNode;
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Input styles={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    inputWrapper: "input-wrapper-classes",
   *    input: "input-classes",
   *    clearButton: "clear-button-classes",
   *    description: "description-classes",
   *    helperText: "helper-text-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<InputSlots>;
}

export type UseInputProps = Props & AriaTextFieldProps & InputVariantProps;

export function useInput(originalProps: UseInputProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, input.variantKeys);

  const {
    ref,
    as,
    label,
    description,
    errorMessage,
    className,
    styles,
    autoFocus,
    startContent,
    endContent,
    onClear,
    onChange,
    ...otherProps
  } = props;

  const [inputValue, setInputValue] = useControlledState(props.value, props.defaultValue, () => {});

  const Component = as || "div";
  const baseStyles = clsx(styles?.base, className, !!inputValue ? "is-filled" : "");

  const domRef = useDOMRef<HTMLInputElement>(ref);

  const handleClear = () => {
    setInputValue(undefined);

    if (domRef.current) {
      domRef.current.value = "";
      domRef.current.focus();
    }
    onClear?.();
  };

  const {labelProps, inputProps, descriptionProps, errorMessageProps} = useAriaTextField(
    {
      ...originalProps,
      value: inputValue,
      onChange: chain(onChange, setInputValue),
    },
    domRef,
  );

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
    isTextInput: true,
  });

  const {focusProps: clearFocusProps, isFocusVisible: isClearButtonFocusVisible} = useFocusRing();

  const {pressProps: clearPressProps} = usePress({
    isDisabled: !!originalProps?.isDisabled,
    onPress: handleClear,
  });

  const isInvalid = props.validationState === "invalid";
  const labelPosition = originalProps.labelPosition || "outside";
  const isLabelPlaceholder = !props.placeholder && labelPosition !== "outside-left";
  const isClearable = !!onClear || originalProps.isClearable;

  const shouldLabelBeOutside = labelPosition === "outside" || labelPosition === "outside-left";
  const shouldLabelBeInside = labelPosition === "inside";

  const hasStartContent = !!startContent;

  const slots = useMemo(
    () =>
      input({
        ...variantProps,
        isInvalid,
        isClearable,
        isFocusVisible,
        isLabelPlaceholder: isLabelPlaceholder && !hasStartContent,
        isClearButtonFocusVisible,
      }),
    [
      ...Object.values(variantProps),
      isInvalid,
      isClearable,
      isClearButtonFocusVisible,
      isLabelPlaceholder,
      hasStartContent,
      isFocusVisible,
    ],
  );

  const getBaseProps: PropGetter = (props = {}) => {
    return {
      className: slots.base({class: baseStyles}),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-focused": dataAttr(isFocused),
      "data-invalid": dataAttr(isInvalid),
      ...props,
    };
  };

  const getLabelProps: PropGetter = (props = {}) => {
    return {
      className: slots.label({class: styles?.label}),
      ...labelProps,
      ...props,
    };
  };

  const getInputProps: PropGetter = (props = {}) => {
    return {
      ref: domRef,
      className: slots.input({class: clsx(styles?.input, !!inputValue ? "is-filled" : "")}),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-focused": dataAttr(isFocused),
      "data-invalid": dataAttr(isInvalid),
      ...mergeProps(focusProps, inputProps, otherProps, props),
    };
  };

  const getInputWrapperProps: PropGetter = (props = {}) => {
    const canFocusInput = domRef.current && !startContent && !endContent;

    return {
      className: slots.inputWrapper({
        class: clsx(styles?.inputWrapper, !!inputValue ? "is-filled" : ""),
      }),
      onClick: () => {
        if (canFocusInput) {
          domRef.current.focus();
        }
      },
      ...props,
      style: {
        cursor: canFocusInput ? "text" : "default",
        ...props.style,
      },
    };
  };

  const getInnerWrapperProps: PropGetter = (props = {}) => {
    return {
      className: slots.innerWrapper({
        class: styles?.innerWrapper,
      }),
      ...props,
    };
  };

  const getDescriptionProps: PropGetter = (props = {}) => {
    return {
      className: slots.description({class: styles?.description}),
      ...descriptionProps,
      ...props,
    };
  };

  const getErrorMessageProps: PropGetter = (props = {}) => {
    return {
      className: slots.errorMessage({class: styles?.errorMessage}),
      ...errorMessageProps,
      ...props,
    };
  };

  const getClearButtonProps: PropGetter = () => {
    return {
      role: "button",
      tabIndex: 0,
      className: slots.clearButton({class: styles?.clearButton}),
      ...mergeProps(clearPressProps, clearFocusProps),
    };
  };

  return {
    Component,
    styles,
    domRef,
    label,
    description,
    startContent,
    endContent,
    labelPosition,
    isClearable,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInputWrapperProps,
    getInnerWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  };
}

export type UseInputReturn = ReturnType<typeof useInput>;
