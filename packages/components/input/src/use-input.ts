import type {InputVariantProps, SlotsToClasses, InputSlots} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {AriaTextFieldProps} from "@react-types/textfield";
import {useFocusRing} from "@react-aria/focus";
import {input} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useControlledState} from "@react-stately/utils";
import {useMemo, Ref} from "react";
import {chain, mergeProps} from "@react-aria/utils";

import {useAriaTextField} from "./use-aria-text-field";

export interface Props extends HTMLNextUIProps<"input"> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLInputElement>;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Chip styles={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    inputWrapper: "input-wrapper-classes",
   *    input: "input-classes",
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
    ...otherProps
  } = props;

  const Component = as || "div";
  const baseStyles = clsx(styles?.base, className);

  const domRef = useDOMRef<HTMLInputElement>(ref);

  const [inputValue, setInputValue] = useControlledState(props.value, props.defaultValue, () => {});

  const {labelProps, inputProps, descriptionProps, errorMessageProps} = useAriaTextField(
    {
      ...originalProps,
      onChange: chain(props.onChange, setInputValue),
    },
    domRef,
  );

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
    isTextInput: true,
  });

  const isInvalid = props.validationState === "invalid";
  const labelPosition = originalProps.labelPosition || "outside";
  const isLabelPlaceholder = !props.placeholder;

  const shouldLabelBeOutside = labelPosition === "outside" || labelPosition === "outside-left";
  const shouldLabelBeInside = labelPosition === "inside";

  const slots = useMemo(
    () =>
      input({
        ...variantProps,
        isInvalid,
        isLabelPlaceholder,
        isFocusVisible,
      }),
    [...Object.values(variantProps), isInvalid, isLabelPlaceholder, isFocusVisible],
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
      className: slots.input({class: styles?.input}),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-focused": dataAttr(isFocused),
      "data-invalid": dataAttr(isInvalid),
      ...mergeProps(focusProps, inputProps, otherProps, props),
    };
  };

  const getInputWrapperProps: PropGetter = (props = {}) => {
    return {
      className: slots.inputWrapper({
        class: clsx(styles?.inputWrapper, !!inputValue ? "is-filled" : ""),
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

  return {
    Component,
    styles,
    domRef,
    label,
    description,
    labelPosition,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInputWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  };
}

export type UseInputReturn = ReturnType<typeof useInput>;
