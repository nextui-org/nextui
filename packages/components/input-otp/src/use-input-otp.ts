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
import {filterDOMProps, ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr, isEmpty, objectToDeps, safeAriaLabel} from "@nextui-org/shared-utils";
import {useCallback, useMemo} from "react";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {useHover} from "@react-aria/interactions";
import {AriaTextFieldProps} from "@react-types/textfield";
import {AriaTextFieldOptions, useTextField} from "@react-aria/textfield";
import {useControlledState} from "@react-stately/utils";
import {useSafeLayoutEffect} from "@nextui-org/use-safe-layout-effect";

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
  onFill?: (v?: string) => void;
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
    onFill = () => {},
    onValueChange = () => {},
    allowedKeys = "^[0-9]*$",
    validationBehavior = globalContext?.validationBehavior ?? "aria",
    type,
    ...otherProps
  } = props;

  const Component = as || "div";

  const inputRef = useDOMRef<HTMLInputElement>(ref);
  const baseDomRef = useDOMRef<HTMLDivElement>(baseRef);

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      onValueChange(value ?? "");
      if (value && value?.length === length) {
        onFill(value);
      }
    },
    [onValueChange, onFill, length],
  );

  const [value, setValue] = useControlledState(
    props.value,
    props.defaultValue ?? "",
    handleValueChange,
  );

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;
  const isDisabled = originalProps.isDisabled ?? false;
  const baseStyles = clsx(classNames?.base, className);

  const {focusProps, isFocused: isInputFocused} = useFocusRing({isTextInput: true});
  const allowedKeysRegex = new RegExp(allowedKeys);
  const isFilled = !isEmpty(value);
  const {isHovered, hoverProps} = useHover({isDisabled: !!originalProps?.isDisabled});

  const onKeyDownCapture = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key === "Backspace") {
      return;
    }
    if (key === "ArrowLeft" || key === "ArrowRight") {
      e.stopPropagation();
      e.preventDefault();

      return;
    }
    if (!allowedKeysRegex.test(key)) {
      e.stopPropagation();
      e.preventDefault();

      return;
    }

    return;
  };

  type AutoCapitalize = AriaTextFieldOptions<"input">["autoCapitalize"];

  const {
    inputProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps,
  } = useTextField(
    {
      ...originalProps,
      validationBehavior,
      autoCapitalize: originalProps.autoCapitalize as AutoCapitalize,
      value: value,
      "aria-label": safeAriaLabel(
        originalProps["aria-label"],
        originalProps.label,
        originalProps.placeholder,
      ),
      inputElementType: "input",
      onChange: setValue,
      minLength: length,
      maxLength: length,
    },
    inputRef,
  );

  const isReadOnly = originalProps.isReadOnly ?? false;
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

  useSafeLayoutEffect(() => {
    if (!inputRef.current) return;

    setValue(inputRef.current.value);
  }, [inputRef.current]);

  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: baseDomRef,
        className: slots.base({
          class: baseStyles,
        }),
        onKeyDownCapture: onKeyDownCapture,
        "data-slot": "base",
        "data-filled": dataAttr(isFilled),
        "data-focus": dataAttr(isInputFocused),
        "data-hover": dataAttr(isHovered),
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(isInvalid),
        "data-required": dataAttr(originalProps?.isRequired),
        "data-readonly": dataAttr(originalProps?.isReadOnly),
        ...props,
      };
    },
    [baseDomRef, slots, baseStyles, isFilled, isInputFocused, isDisabled],
  );

  const getInputWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.inputWrapper({
          class: clsx(classNames?.inputWrapper, props?.className),
        }),
        "data-slot": "input-wrapper",
        ...mergeProps(otherProps, props),
      };
    },
    [slots, classNames?.inputWrapper],
  );

  const getInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: inputRef,
        className: slots.input({
          class: clsx(classNames?.input, props?.className),
        }),
        maxLength: length,
        minLength: length,
        value,
        disabled: isDisabled,
        ...mergeProps(
          focusProps,
          hoverProps,
          inputProps,
          filterDOMProps(otherProps, {
            enabled: true,
            omitEventNames: new Set(Object.keys(inputProps)),
          }),
          props,
        ),
        placeholder: "",
        "data-slot": "input",
        "data-focus": dataAttr(isInputFocused),
        "data-filled": dataAttr(isFilled),
        "data-disabled": dataAttr(isDisabled),
      };
    },
    [
      inputRef,
      slots,
      classNames?.input,
      length,
      value,
      isDisabled,
      setValue,
      isInputFocused,
      isFilled,
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
        ...mergeProps(errorMessageProps, props),
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
        ...mergeProps(descriptionProps, props),
      };
    },
    [slots, classNames?.description],
  );

  return {
    Component,
    inputRef,
    length,
    value,
    isInputFocused,
    classNames,
    slots,
    hasHelper,
    isInvalid,
    description,
    errorMessage,
    type,
    getBaseProps,
    getInputWrapperProps,
    getInputProps,
    getSegmentWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  };
}

export type UseInputOtpReturn = ReturnType<typeof useInputOtp>;
