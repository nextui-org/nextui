import type {PropGetter} from "@nextui-org/system";
import type {DateInputVariantProps, DateInputSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaDatePickerProps} from "@react-types/datepicker";
import type {DateValue} from "@internationalized/date";
import type {ReactRef} from "@nextui-org/react-utils";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {useLocale} from "@react-aria/i18n";
import {useDateField as useAriaDateField} from "@react-aria/datepicker";
import {useDateFieldState} from "@react-stately/datepicker";
import {createCalendar} from "@internationalized/date";
import {objectToDeps, clsx, dataAttr} from "@nextui-org/shared-utils";
import {dateInput} from "@nextui-org/theme";
import {useMemo} from "react";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * Element to be rendered in the left side of the input.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the input.
   */
  endContent?: React.ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * // TODO:
   * ```
   */
  classNames?: SlotsToClasses<DateInputSlots>;
}

export type UseDateInputProps<T extends DateValue> = Props &
  DateInputVariantProps &
  AriaDatePickerProps<T>;

export function useDateInput<T extends DateValue>(originalProps: UseDateInputProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);

  const {
    ref,
    as,
    description,
    startContent,
    endContent,
    className,
    classNames,
    validationState,
    validationBehavior = "native",
    isInvalid = validationState ? validationState === "invalid" : false,
    errorMessage: errorMessageProp,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const {locale} = useLocale();
  const state = useDateFieldState({
    ...otherProps,
    locale,
    createCalendar,
  });

  const {
    labelProps,
    fieldProps,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps,
    isInvalid: ariaIsInvalid,
  } = useAriaDateField({...otherProps, validationBehavior}, state, domRef);

  const baseStyles = clsx(classNames?.base, className);
  const errorMessage =
    typeof errorMessageProp === "function"
      ? errorMessageProp({
          isInvalid: isInvalid || ariaIsInvalid,
          validationErrors,
          validationDetails,
        })
      : errorMessageProp || validationErrors.join(" ");

  const hasHelper = !!description || !!errorMessage;

  const labelPlacement = useMemo<DateInputVariantProps["labelPlacement"]>(() => {
    if (
      (!originalProps.labelPlacement || originalProps.labelPlacement === "inside") &&
      !props.label
    ) {
      return "outside";
    }

    return originalProps.labelPlacement ?? "inside";
  }, [originalProps.labelPlacement, props.label]);

  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";

  const slots = useMemo(
    () =>
      dateInput({
        ...variantProps,
        labelPlacement,
        className,
      }),
    [objectToDeps(variantProps), labelPlacement, className],
  );

  const getBaseProps: PropGetter = () => {
    return {
      "data-slot": "base",
      "data-has-helper": dataAttr(hasHelper),
      className: slots.base({class: baseStyles}),
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps,
      }),
    };
  };

  const getLabelProps: PropGetter = (props) => {
    return {
      ...props,
      ...labelProps,
      "data-slot": "label",
      className: slots.label({
        class: clsx(classNames?.label, props?.className),
      }),
    };
  };

  const getInputProps: PropGetter = (props) => {
    return {
      ...props,
      ...fieldProps,
      ref: domRef,
      "data-slot": "input",
      className: slots.input({
        class: clsx(classNames?.input, props?.className),
      }),
    };
  };

  const getInputWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      "data-slot": "input-wrapper",
      className: slots.inputWrapper({
        class: classNames?.inputWrapper,
      }),
      onClick: labelProps?.onClick,
    };
  };

  const getMainWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      "data-slot": "main-wrapper",
      className: slots.mainWrapper({
        class: clsx(classNames?.mainWrapper, props?.className),
      }),
    };
  };

  const getInnerWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      "data-slot": "inner-wrapper",
      className: slots.innerWrapper({
        class: clsx(classNames?.innerWrapper, props?.className),
      }),
    };
  };

  const getHelperWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      "data-slot": "helper-wrapper",
      className: slots.helperWrapper({
        class: clsx(classNames?.helperWrapper, props?.className),
      }),
    };
  };

  const getErrorMessageProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ...errorMessageProps,
      "data-slot": "error-message",
      className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
    };
  };

  const getDescriptionProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ...descriptionProps,
      "data-slot": "description",
      className: slots.description({class: clsx(classNames?.description, props?.className)}),
    };
  };

  return {
    Component,
    state,
    domRef,
    hasHelper,
    shouldLabelBeOutside,
    label: originalProps?.label,
    description,
    errorMessage,
    labelPlacement,
    startContent,
    endContent,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  };
}

export type UseDateInputReturn = ReturnType<typeof useDateInput>;
