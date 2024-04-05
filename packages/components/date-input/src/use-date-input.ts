import type {DateInputVariantProps, DateInputSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaDatePickerProps} from "@react-types/datepicker";
import type {SupportedCalendars} from "@nextui-org/system";
import type {DateValue, Calendar} from "@internationalized/date";
import type {ReactRef} from "@nextui-org/react-utils";

import {PropGetter, useProviderContext} from "@nextui-org/system";
import {CalendarDate} from "@internationalized/date";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {useDOMRef, filterDOMProps} from "@nextui-org/react-utils";
import {useLocale} from "@react-aria/i18n";
import {useDateField as useAriaDateField} from "@react-aria/datepicker";
import {useDateFieldState} from "@react-stately/datepicker";
import {createCalendar} from "@internationalized/date";
import {objectToDeps, clsx, dataAttr} from "@nextui-org/shared-utils";
import {dateInput} from "@nextui-org/theme";
import {useMemo} from "react";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaDatePickerProps<T> | "onChange"
>;

interface Props<T extends DateValue> extends NextUIBaseProps<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The value of the hidden input.
   */
  inputRef?: ReactRef<HTMLInputElement | null>;
  /**
   * Element to be rendered in the left side of the input.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the input.
   */
  endContent?: React.ReactNode;
  /**
   * This function helps to reduce the bundle size by providing a custom calendar system.
   *
   * In the example above, the createCalendar function from the `@internationalized/date` package
   * is passed to the useCalendarState hook. This function receives a calendar identifier string,
   * and provides Calendar instances to React Stately, which are used to implement date manipulation.
   *
   * By default, this includes all calendar systems supported by @internationalized/date. However,
   * if your application supports a more limited set of regions, or you know you will only be picking dates
   * in a certain calendar system, you can reduce your bundle size by providing your own implementation
   * of `createCalendar` that includes a subset of these Calendar implementations.
   *
   * For example, if your application only supports Gregorian dates, you could implement a `createCalendar`
   * function like this:
   *
   * @example
   *
   * import {GregorianCalendar} from '@internationalized/date';
   *
   * function createCalendar(identifier) {
   *  switch (identifier) {
   *    case 'gregory':
   *      return new GregorianCalendar();
   *    default:
   *      throw new Error(`Unsupported calendar ${identifier}`);
   *  }
   * }
   *
   * This way, only GregorianCalendar is imported, and the other calendar implementations can be tree-shaken.
   *
   * You can also use the NextUIProvider to provide the createCalendar function to all nested components.
   *
   * @default all calendars
   */
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <DateInput classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    inputWrapper: "input-wrapper-classes",
   *    input: "input-classes",
   *    segment: "segment-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes",
   *    errorMessage: "error-message-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<DateInputSlots>;
}

export type UseDateInputProps<T extends DateValue> = Props<T> &
  DateInputVariantProps &
  AriaDatePickerProps<T>;

export function useDateInput<T extends DateValue>(originalProps: UseDateInputProps<T>) {
  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);

  const providerContext = useProviderContext();

  const {
    ref,
    as,
    inputRef: inputRefProp,
    description,
    startContent,
    endContent,
    className,
    classNames,
    validationState,
    validationBehavior = "native",
    shouldForceLeadingZeros = true,
    minValue = providerContext?.defaultDates?.minDate ?? new CalendarDate(1900, 1, 1),
    maxValue = providerContext?.defaultDates?.maxDate ?? new CalendarDate(2099, 12, 31),
    createCalendar: createCalendarProp = providerContext?.createCalendar ?? null,
    isInvalid: isInvalidProp = validationState ? validationState === "invalid" : false,
    errorMessage: errorMessageProp,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);
  const inputRef = useDOMRef(inputRefProp);

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const {locale} = useLocale();
  const state = useDateFieldState({
    ...originalProps,
    locale,
    minValue,
    maxValue,
    isInvalid: isInvalidProp,
    shouldForceLeadingZeros,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const {
    labelProps,
    fieldProps,
    inputProps,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps,
    isInvalid: ariaIsInvalid,
  } = useAriaDateField({...originalProps, validationBehavior, inputRef}, state, domRef);

  const baseStyles = clsx(classNames?.base, className);

  const isInvalid = isInvalidProp || ariaIsInvalid;

  const errorMessage =
    typeof errorMessageProp === "function"
      ? errorMessageProp({
          isInvalid,
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
    // filter other props that are included in fieldProps to avoid duplication
    const filteredUserProps = Object.keys(otherProps).reduce((acc, key) => {
      if (!fieldProps[key as keyof typeof fieldProps]) {
        acc[key] = otherProps[key as keyof typeof otherProps];
      }

      return acc;
    }, {} as Record<string, any>);

    return {
      "data-slot": "base",
      "data-has-helper": dataAttr(hasHelper),
      "data-required": dataAttr(originalProps.isRequired),
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-readonly": dataAttr(originalProps.isReadOnly),
      "data-invalid": dataAttr(isInvalid),
      "data-has-start-content": dataAttr(!!startContent),
      "data-has-end-content": dataAttr(!!endContent),
      className: slots.base({class: baseStyles}),
      ...filterDOMProps(filteredUserProps, {
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
      ...inputProps,
      ref: inputRef,
    };
  };

  const getFieldProps: PropGetter = (props) => {
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
      onClick: fieldProps.onClick,
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
    slots,
    hasHelper,
    shouldLabelBeOutside,
    label: originalProps?.label,
    classNames,
    description,
    errorMessage,
    labelPlacement,
    startContent,
    endContent,
    getBaseProps,
    getLabelProps,
    getFieldProps,
    getInputProps,
    getInputWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  };
}

export type UseDateInputReturn = ReturnType<typeof useDateInput>;
