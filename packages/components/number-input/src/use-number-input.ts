import type {NumberInputVariantProps, SlotsToClasses, NumberInputSlots} from "@heroui/theme";
import type {AriaNumberFieldProps} from "@react-types/numberfield";
import type {NumberFieldStateOptions} from "@react-stately/numberfield";

import {HTMLHeroUIProps, mapPropsVariants, PropGetter, useProviderContext} from "@heroui/system";
import {useSafeLayoutEffect} from "@heroui/use-safe-layout-effect";
import {useFocusRing} from "@react-aria/focus";
import {numberInput} from "@heroui/theme";
import {useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {useFocusWithin, useHover, usePress} from "@react-aria/interactions";
import {useLocale} from "@react-aria/i18n";
import {clsx, dataAttr, isEmpty, objectToDeps} from "@heroui/shared-utils";
import {useNumberFieldState} from "@react-stately/numberfield";
import {useNumberField as useAriaNumberInput} from "@react-aria/numberfield";
import {useMemo, Ref, useCallback, useState} from "react";
import {chain, mergeProps} from "@react-aria/utils";
import {FormContext, useSlottedContext} from "@heroui/form";

export interface Props extends Omit<HTMLHeroUIProps<"input">, keyof NumberInputVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLInputElement>;
  /**
   * Ref to the container DOM node.
   */
  baseRef?: Ref<HTMLDivElement>;
  /**
   * Ref to the input wrapper DOM node.
   * This is the element that wraps the input label and the innerWrapper when the labelPlacement="inside"
   * and the input has start/end content.
   */
  wrapperRef?: Ref<HTMLDivElement>;
  /**
   * Ref to the input inner wrapper DOM node.
   * This is the element that wraps the input and the start/end content when passed.
   */
  innerWrapperRef?: Ref<HTMLDivElement>;
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
   * 	A helper text for the field. Provides a hint such as specific requirements for what to choose.
   */
  helperText?: React.ReactNode;
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
   *    verticalStepperWrapper: "vertical-stepper-wrapper-classes",
   *    description: "description-classes",
   *    helperText: "helper-text-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<NumberInputSlots>;
  /**
   * Whether to hide the increment and decrement buttons.
   */
  hideStepper?: boolean;
  /**
   * Callback fired when the value is cleared.
   * if you pass this prop, the clear button will be shown.
   */
  onClear?: () => void;
  /**
   * React aria onChange event.
   */
  onValueChange?: AriaNumberFieldProps["onChange"];
}

export type UseNumberInputProps = Props &
  Omit<NumberFieldStateOptions, "locale"> &
  Omit<AriaNumberFieldProps, "onChange"> &
  NumberInputVariantProps;

export function useNumberInput(originalProps: UseNumberInputProps) {
  const globalContext = useProviderContext();
  const {validationBehavior: formValidationBehavior} = useSlottedContext(FormContext) || {};

  const [props, variantProps] = mapPropsVariants(originalProps, numberInput.variantKeys);

  const {
    ref,
    as,
    label,
    baseRef,
    wrapperRef,
    description,
    helperText,
    className,
    classNames,
    autoFocus,
    startContent,
    endContent,
    onClear,
    onChange,
    validationState,
    validationBehavior = formValidationBehavior ?? globalContext?.validationBehavior ?? "aria",
    innerWrapperRef: innerWrapperRefProp,
    onValueChange,
    hideStepper,
    ...otherProps
  } = props;

  const [isFocusWithin, setFocusWithin] = useState(false);

  const Component = as || "div";

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const domRef = useDOMRef<HTMLInputElement>(ref);

  const baseDomRef = useDOMRef<HTMLDivElement>(baseRef);
  const inputWrapperRef = useDOMRef<HTMLDivElement>(wrapperRef);
  const innerWrapperRef = useDOMRef<HTMLDivElement>(innerWrapperRefProp);

  const {locale} = useLocale();

  const state = useNumberFieldState({
    ...originalProps,
    validationBehavior,
    locale,
    onChange: onValueChange,
  });

  const {
    groupProps,
    labelProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
    descriptionProps,
    errorMessageProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails,
  } = useAriaNumberInput(originalProps, state, domRef);

  const inputValue = isNaN(state.numberValue) ? "" : state.numberValue;
  const isFilled = !isEmpty(inputValue);

  const baseStyles = clsx(classNames?.base, className, isFilled ? "is-filled" : "");

  const handleClear = useCallback(() => {
    state.setInputValue("");

    onClear?.();
    domRef.current?.focus();
  }, [state.setInputValue, onClear]);

  // if we use `react-hook-form`, it will set the input value using the ref in register
  // i.e. setting ref.current.value to something which is uncontrolled
  // hence, sync the state with `ref.current.value`
  useSafeLayoutEffect(() => {
    if (!domRef.current) return;

    state.setInputValue(domRef.current.value);
  }, [domRef.current]);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
    isTextInput: true,
  });

  const {isHovered, hoverProps} = useHover({isDisabled: !!originalProps?.isDisabled});

  const {isHovered: isLabelHovered, hoverProps: labelHoverProps} = useHover({
    isDisabled: !!originalProps?.isDisabled,
  });

  const {focusProps: clearFocusProps, isFocusVisible: isClearButtonFocusVisible} = useFocusRing();

  const {focusWithinProps} = useFocusWithin({
    onFocusWithinChange: setFocusWithin,
  });

  const {pressProps: clearPressProps} = usePress({
    isDisabled: !!originalProps?.isDisabled || !!originalProps?.isReadOnly,
    onPress: handleClear,
  });

  const isInvalid = validationState === "invalid" || isAriaInvalid;

  const errorMessage =
    typeof props.errorMessage === "function"
      ? props.errorMessage({isInvalid, validationErrors, validationDetails})
      : props.errorMessage || validationErrors?.join(" ");
  const isClearable = !!onClear || originalProps.isClearable;
  const hasElements = !!label || !!description || !!errorMessage || !!helperText;
  const hasPlaceholder = !!props.placeholder;
  const hasLabel = !!label;
  const hasHelper = !!helperText || !!errorMessage;
  const hasDescription = !!description;
  const isPlaceholderShown = domRef.current
    ? (!domRef.current.value || domRef.current.value === "" || !inputValue) && hasPlaceholder
    : false;

  const hasStartContent = !!startContent;

  const slots = useMemo(
    () =>
      numberInput({
        ...variantProps,
        isInvalid,
        isClearable,
        disableAnimation,
      }),
    [objectToDeps(variantProps), isInvalid, isClearable, hasStartContent, disableAnimation],
  );

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: baseDomRef,
        className: slots.base({class: baseStyles}),
        "data-slot": "base",
        "data-filled": dataAttr(
          isFilled || hasPlaceholder || hasStartContent || isPlaceholderShown,
        ),
        "data-focus-within": dataAttr(isFocusWithin),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-readonly": dataAttr(originalProps.isReadOnly),
        "data-focus": dataAttr(isFocused),
        "data-hover": dataAttr(isHovered || isLabelHovered),
        "data-required": dataAttr(originalProps.isRequired),
        "data-invalid": dataAttr(isInvalid),
        "data-disabled": dataAttr(originalProps.isDisabled),
        "data-has-elements": dataAttr(hasElements),
        "data-has-helper": dataAttr(hasHelper),
        "data-has-description": dataAttr(hasDescription),
        "data-has-label": dataAttr(hasLabel),
        "data-has-value": dataAttr(!isPlaceholderShown),
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
      isLabelHovered,
      isInvalid,
      hasHelper,
      hasLabel,
      hasElements,
      hasDescription,
      isPlaceholderShown,
      hasStartContent,
      isFocusWithin,
      isFocusVisible,
      hasPlaceholder,
      focusWithinProps,
      originalProps.isReadOnly,
      originalProps.isRequired,
      originalProps.isDisabled,
    ],
  );

  const getLabelProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        "data-slot": "label",
        className: slots.label({class: classNames?.label}),
        ...mergeProps(labelProps, labelHoverProps, props),
      };
    },
    [slots, isLabelHovered, labelProps, classNames?.label],
  );

  const getNumberInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        "data-slot": "input",
        "data-filled": dataAttr(isFilled),
        "data-has-start-content": dataAttr(hasStartContent),
        "data-has-end-content": dataAttr(!!endContent),
        className: slots.input({
          class: clsx(classNames?.input, isFilled ? "is-filled" : ""),
        }),
        ...mergeProps(
          focusProps,
          inputProps,
          filterDOMProps(otherProps, {
            enabled: true,
            labelable: true,
            omitEventNames: new Set(Object.keys(inputProps)),
            omitPropNames: new Set(["value"]),
          }),
          props,
        ),
        "aria-readonly": dataAttr(originalProps.isReadOnly),
        onChange: chain(inputProps.onChange, onChange),
        ref: domRef,
      };
    },
    [
      slots,
      focusProps,
      inputProps,
      otherProps,
      isFilled,
      hasStartContent,
      endContent,
      classNames?.input,
      originalProps.isReadOnly,
      originalProps.isRequired,
      onChange,
    ],
  );

  const getHiddenNumberInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        name: originalProps.name,
        value: inputValue,
        "data-slot": "hidden-input",
        type: "hidden",
        ...props,
      };
    },
    [inputValue, originalProps.name],
  );

  const getInputWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: inputWrapperRef,
        "data-slot": "input-wrapper",
        "data-hover": dataAttr(isHovered || isLabelHovered),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-focus": dataAttr(isFocused),
        className: slots.inputWrapper({
          class: clsx(classNames?.inputWrapper, isFilled ? "is-filled" : ""),
        }),
        ...mergeProps(props, hoverProps),
        onClick: (e) => {
          if (domRef.current && e.currentTarget === e.target) {
            domRef.current.focus();
          }
        },
        style: {
          cursor: "text",
          ...props.style,
        },
      };
    },
    [
      slots,
      isHovered,
      isLabelHovered,
      isFocusVisible,
      isFocused,
      inputValue,
      classNames?.inputWrapper,
    ],
  );

  const getInnerWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: innerWrapperRef,
        "data-slot": "inner-wrapper",
        onClick: (e) => {
          if (domRef.current && e.currentTarget === e.target) {
            domRef.current.focus();
          }
        },
        className: slots.innerWrapper({
          class: clsx(classNames?.innerWrapper, props?.className),
        }),
        ...mergeProps(groupProps, props),
      };
    },
    [slots, classNames?.innerWrapper],
  );

  const getMainWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        "data-slot": "main-wrapper",
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
        "data-slot": "helper-wrapper",
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
        "data-slot": "description",
        className: slots.description({class: clsx(classNames?.label, props?.className)}),
      };
    },
    [slots, classNames?.description],
  );

  const getHelperTextProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...descriptionProps, // apply description props
        "data-slot": "helper-text",
        className: slots.helperText({class: clsx(classNames?.helperText, props?.className)}),
      };
    },
    [slots, classNames?.helperText],
  );

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...errorMessageProps,
        "data-slot": "error-message",
        className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
      };
    },
    [slots, errorMessageProps, classNames?.errorMessage],
  );

  const getClearButtonProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        type: "button",
        tabIndex: -1,
        disabled: originalProps.isDisabled,
        "aria-label": "clear input",
        "data-slot": "clear-button",
        "data-focus-visible": dataAttr(isClearButtonFocusVisible),
        className: slots.clearButton({class: clsx(classNames?.clearButton, props?.className)}),
        ...mergeProps(clearPressProps, clearFocusProps),
      };
    },
    [slots, isClearButtonFocusVisible, clearPressProps, clearFocusProps, classNames?.clearButton],
  );

  const getVerticalStepperWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        className: slots.verticalStepperWrapper({
          class: clsx(classNames?.verticalStepperWrapper, props?.className),
        }),
      };
    },
    [slots],
  );

  const getStepperIncreaseButtonProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        type: "button",
        disabled: originalProps.isDisabled,
        "data-slot": "increase-button",
        className: slots.stepperButton({
          class: clsx(classNames?.stepperButton, props?.className),
        }),
        // TODO: check press props & focus props
        ...mergeProps(incrementButtonProps, props),
      };
    },
    [slots],
  );

  const getStepperDecreaseButtonProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        type: "button",
        disabled: originalProps.isDisabled,
        "data-slot": "decrease-button",
        className: slots.stepperButton({
          class: clsx(classNames?.stepperButton, props?.className),
        }),
        // TODO: check press props & focus props
        ...mergeProps(decrementButtonProps, props),
      };
    },
    [slots],
  );

  return {
    Component,
    classNames,
    domRef,
    label,
    description,
    helperText,
    startContent,
    endContent,
    isClearable,
    hasHelper,
    hasStartContent,
    hasPlaceholder,
    isInvalid,
    errorMessage,
    hideStepper,
    incrementButtonProps,
    decrementButtonProps,
    getBaseProps,
    getLabelProps,
    getNumberInputProps,
    getHiddenNumberInputProps,
    getMainWrapperProps,
    getInputWrapperProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getHelperTextProps,
    getErrorMessageProps,
    getClearButtonProps,
    getStepperIncreaseButtonProps,
    getStepperDecreaseButtonProps,
    getVerticalStepperWrapperProps,
  };
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>;
