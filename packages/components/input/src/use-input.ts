import type {InputVariantProps, SlotsToClasses, InputSlots} from "@nextui-org/theme";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {AriaTextFieldProps} from "@react-types/textfield";
import {useFocusRing} from "@react-aria/focus";
import {input} from "@nextui-org/theme";
import {useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {useFocusWithin, useHover, usePress} from "@react-aria/interactions";
import {clsx, dataAttr, safeAriaLabel} from "@nextui-org/shared-utils";
import {useControlledState} from "@react-stately/utils";
import {useMemo, Ref, useCallback, useState} from "react";
import {chain, mergeProps} from "@react-aria/utils";
import {useTextField} from "@react-aria/textfield";

export interface Props<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>
  extends Omit<HTMLNextUIProps<"input">, keyof InputVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<T>;
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
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Input classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    mainWrapper: "main-wrapper-classes",
   *    inputWrapper: "input-wrapper-classes",
   *    innerWrapper: "inner-wrapper-classes",
   *    input: "input-classes",
   *    clearButton: "clear-button-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<InputSlots>;
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void;
  /**
   * React aria onChange event.
   */
  onValueChange?: (value: string) => void;
}

export type UseInputProps<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> =
  Props<T> & Omit<AriaTextFieldProps, "onChange"> & InputVariantProps;

export function useInput<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(
  originalProps: UseInputProps<T>,
) {
  const [props, variantProps] = mapPropsVariants(originalProps, input.variantKeys);

  const {
    ref,
    as,
    label,
    description,
    errorMessage,
    className,
    classNames,
    autoFocus,
    startContent,
    endContent,
    onClear,
    onChange,
    validationState,
    onValueChange = () => {},
    ...otherProps
  } = props;

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      onValueChange(value ?? "");
    },
    [onValueChange],
  );

  const [inputValue, setInputValue] = useControlledState<string | undefined>(
    props.value,
    props.defaultValue,
    handleValueChange,
  );
  const [isFocusWithin, setFocusWithin] = useState(false);

  const Component = as || "div";

  const isFilled = !!inputValue;
  const isFilledWithin = isFilled || isFocusWithin;
  const baseStyles = clsx(classNames?.base, className, isFilled ? "is-filled" : "");
  const isMultiline = originalProps.isMultiline;

  const domRef = useDOMRef<T>(ref);

  const handleClear = useCallback(() => {
    setInputValue("");

    if (domRef.current) {
      domRef.current.value = "";
      domRef.current.focus();
    }
    onClear?.();
  }, [domRef, setInputValue, onClear]);

  const {labelProps, inputProps, descriptionProps, errorMessageProps} = useTextField(
    {
      ...originalProps,
      "aria-label": safeAriaLabel(
        originalProps?.["aria-label"],
        originalProps?.label,
        originalProps?.placeholder,
      ),
      inputElementType: isMultiline ? "textarea" : "input",
      onChange: setInputValue,
    },
    domRef,
  );

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
    isTextInput: true,
  });

  const {isHovered, hoverProps} = useHover({isDisabled: !!originalProps?.isDisabled});

  const {focusProps: clearFocusProps, isFocusVisible: isClearButtonFocusVisible} = useFocusRing();

  const {focusWithinProps} = useFocusWithin({
    onFocusWithinChange: setFocusWithin,
  });

  const {pressProps: clearPressProps} = usePress({
    isDisabled: !!originalProps?.isDisabled,
    onPress: handleClear,
  });

  const isInvalid = validationState === "invalid" || originalProps.isInvalid;

  const labelPlacement = useMemo<InputVariantProps["labelPlacement"]>(() => {
    if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !label) {
      return "outside";
    }

    return originalProps.labelPlacement ?? "inside";
  }, [originalProps.labelPlacement, label]);

  const isLabelPlaceholder =
    !props.placeholder && labelPlacement !== "outside-left" && !isMultiline;

  const isClearable = !!onClear || originalProps.isClearable;
  const hasElements = !!label || !!description || !!errorMessage;
  const hasPlaceholder = !!props.placeholder;
  const hasHelper = !!description || !!errorMessage;

  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";
  const shouldLabelBeInside = labelPlacement === "inside";

  const hasStartContent = !!startContent;
  const isLabelOutside = shouldLabelBeOutside
    ? labelPlacement === "outside-left" ||
      hasPlaceholder ||
      (labelPlacement === "outside" && hasStartContent)
    : false;
  const isLabelOutsideAsPlaceholder =
    labelPlacement === "outside" && !hasPlaceholder && !hasStartContent;

  const slots = useMemo(
    () =>
      input({
        ...variantProps,
        isInvalid,
        isClearable,
        labelPlacement,
        isLabelPlaceholder: isLabelPlaceholder && !hasStartContent,
      }),
    [
      ...Object.values(variantProps),
      isInvalid,
      labelPlacement,
      isClearable,
      isLabelPlaceholder,
      hasStartContent,
    ],
  );

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.base({class: baseStyles}),
        "data-filled": dataAttr(isFilled),
        "data-filled-within": dataAttr(isFilledWithin),
        "data-focus-within": dataAttr(isFocusWithin),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-readonly": dataAttr(originalProps.isReadOnly),
        "data-focus": dataAttr(isFocused),
        "data-hover": dataAttr(isHovered),
        "data-required": dataAttr(originalProps.isRequired),
        "data-invalid": dataAttr(isInvalid),
        "data-disabled": dataAttr(originalProps.isDisabled),
        "data-has-elements": dataAttr(hasElements),
        "data-has-helper": dataAttr(hasHelper),
        ...focusWithinProps,
        ...props,
      };
    },
    [
      slots,
      baseStyles,
      isFilled,
      isFocused,
      isHovered,
      isInvalid,
      hasHelper,
      hasElements,
      isFocusWithin,
      isFocusVisible,
      isFilledWithin,
      focusWithinProps,
      originalProps.isReadOnly,
      originalProps.isRequired,
      originalProps.isDisabled,
    ],
  );

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.label({class: classNames?.label}),
        ...labelProps,
        ...props,
      };
    },
    [slots, labelProps, classNames?.label],
  );

  const getInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: domRef,
        "data-filled": dataAttr(isFilled),
        "data-filled-within": dataAttr(isFilledWithin),
        className: slots.input({class: clsx(classNames?.input, !!inputValue ? "is-filled" : "")}),
        ...mergeProps(
          focusProps,
          inputProps,
          filterDOMProps(otherProps, {
            enabled: true,
            labelable: true,
            omitEventNames: new Set(Object.keys(inputProps)),
          }),
          props,
        ),
        required: originalProps.isRequired,
        "aria-readonly": dataAttr(originalProps.isReadOnly),
        "aria-required": dataAttr(originalProps.isRequired),
        onChange: chain(inputProps.onChange, onChange),
      };
    },
    [
      slots,
      inputValue,
      focusProps,
      inputProps,
      otherProps,
      isFilled,
      isFilledWithin,
      classNames?.input,
      originalProps.isReadOnly,
      originalProps.isRequired,
      onChange,
    ],
  );

  const getInputWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        "data-hover": dataAttr(isHovered),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-focus": dataAttr(isFocused),
        className: slots.inputWrapper({
          class: clsx(classNames?.inputWrapper, !!inputValue ? "is-filled" : ""),
        }),
        onClick: (e: React.MouseEvent) => {
          if (e.target === e.currentTarget) {
            domRef.current?.focus();
          }
        },
        ...mergeProps(props, hoverProps),
        style: {
          cursor: "text",
          ...props.style,
        },
      };
    },
    [slots, isHovered, isFocusVisible, isFocused, inputValue, classNames?.inputWrapper],
  );

  const getInnerWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        className: slots.innerWrapper({
          class: clsx(classNames?.innerWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.innerWrapper],
  );

  const getMainWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        className: slots.mainWrapper({
          class: clsx(classNames?.mainWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.mainWrapper],
  );

  const getHelperWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        className: slots.helperWrapper({
          class: clsx(classNames?.helperWrapper, props?.className),
        }),
      };
    },
    [slots, classNames?.helperWrapper],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...descriptionProps,
        className: slots.description({class: clsx(classNames?.description, props?.className)}),
      };
    },
    [slots, classNames?.description],
  );

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...errorMessageProps,
        className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
      };
    },
    [slots, errorMessageProps, classNames?.errorMessage],
  );

  const getClearButtonProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        role: "button",
        tabIndex: 0,
        "data-focus-visible": dataAttr(isClearButtonFocusVisible),
        className: slots.clearButton({class: clsx(classNames?.clearButton, props?.className)}),
        ...mergeProps(clearPressProps, clearFocusProps),
      };
    },
    [slots, isClearButtonFocusVisible, clearPressProps, clearFocusProps, classNames?.clearButton],
  );

  return {
    Component,
    classNames,
    domRef,
    label,
    description,
    startContent,
    endContent,
    labelPlacement,
    isClearable,
    isInvalid,
    hasHelper,
    hasStartContent,
    isLabelOutside,
    isLabelOutsideAsPlaceholder,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    hasPlaceholder,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getMainWrapperProps,
    getInputWrapperProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  };
}

export type UseInputReturn = ReturnType<typeof useInput>;
