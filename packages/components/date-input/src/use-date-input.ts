import type {DateInputVariantProps, DateInputSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaDateFieldProps} from "@react-types/datepicker";
import type {SupportedCalendars} from "@nextui-org/system";
import type {DateValue, Calendar} from "@internationalized/date";
import type {ReactRef} from "@nextui-org/react-utils";
import type {DOMAttributes, GroupDOMAttributes} from "@react-types/shared";
import type {DateInputGroupProps} from "./date-input-group";

import {useLocale} from "@react-aria/i18n";
import {CalendarDate} from "@internationalized/date";
import {mergeProps} from "@react-aria/utils";
import {PropGetter, useProviderContext} from "@nextui-org/system";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {useDateField as useAriaDateField} from "@react-aria/datepicker";
import {
  DateFieldState,
  DateSegment,
  SegmentType,
  useDateFieldState,
} from "@react-stately/datepicker";
import {createCalendar} from "@internationalized/date";
import {objectToDeps, clsx, dataAttr} from "@nextui-org/shared-utils";
import {dateInput} from "@nextui-org/theme";
import {useMemo} from "react";

type NextUIBaseProps<T extends DateValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaDateFieldProps<T> | "onChange"
>;

type formatDate = "mm-dd-yyyy" | "dd-mm-yyyy" | "yyyy-mm-dd" | "yyyy-dd-mm";

const formatOrderMap: Record<formatDate, SegmentType[]> = {
  "mm-dd-yyyy": ["month", "literal", "day", "literal", "year"],
  "dd-mm-yyyy": ["day", "literal", "month", "literal", "year"],
  "yyyy-dd-mm": ["year", "literal", "day", "literal", "month"],
  "yyyy-mm-dd": ["year", "literal", "month", "literal", "day"],
};

const getSegmentByType = (segments: DateSegment[], type: SegmentType): DateSegment | undefined =>
  segments.find((segment) => segment.type === type);

const validateSegments = (segments: DateSegment[]): boolean => {
  const requiredTypes = ["day", "month", "year", "literal"] as SegmentType[];

  return requiredTypes.every((type) => segments.some((segment) => segment.type === type));
};

const rearrangeSegments = (segments: DateSegment[], format: formatDate): DateSegment[] => {
  const order = formatOrderMap[format];

  return order.reduce((arr: DateSegment[], type) => {
    const segment = getSegmentByType(segments, type);

    if (segment) {
      arr.push(segment);
    }

    return arr;
  }, []);
};

const orderSegmentsByFormat = (state: DateFieldState, format?: formatDate): DateFieldState => {
  let {segments} = state;

  if (!Array.isArray(segments) || !validateSegments(segments)) {
    // Handle invalid segments or format
    return state; // Or throw an error, log, etc.
  }

  if (!(format in formatOrderMap)) {
    return state;
  }

  state.segments = rearrangeSegments(segments, format);

  return state;
};

interface Props<T extends DateValue> extends NextUIBaseProps<T> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /** Props for the grouping element containing the date field and button. */
  groupProps?: GroupDOMAttributes;
  /** Props for the date picker's visible label element, if any. */
  labelProps?: DOMAttributes;
  /** Props for the date field. */
  fieldProps?: DOMAttributes;
  /** Props for the description element, if any. */
  descriptionProps?: DOMAttributes;
  /** Props for the error message element, if any. */
  errorMessageProps?: DOMAttributes;
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
  /** The format of date. For example : mm-dd-yyyy */
  format?: formatDate;
}

export type UseDateInputProps<T extends DateValue> = Props<T> &
  DateInputVariantProps &
  AriaDateFieldProps<T>;

export function useDateInput<T extends DateValue>(originalProps: UseDateInputProps<T>) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);

  const {
    ref,
    as,
    label,
    inputRef: inputRefProp,
    description,
    startContent,
    endContent,
    className,
    classNames,
    validationState,
    groupProps = {},
    labelProps: labelPropsProp,
    fieldProps: fieldPropsProp,
    errorMessageProps: errorMessagePropsProp,
    descriptionProps: descriptionPropsProp,
    validationBehavior = globalContext?.validationBehavior ?? "aria",
    shouldForceLeadingZeros = true,
    minValue = globalContext?.defaultDates?.minDate ?? new CalendarDate(1900, 1, 1),
    maxValue = globalContext?.defaultDates?.maxDate ?? new CalendarDate(2099, 12, 31),
    createCalendar: createCalendarProp = globalContext?.createCalendar ?? null,
    isInvalid: isInvalidProp = validationState ? validationState === "invalid" : false,
    errorMessage,
    format,
  } = props;

  const domRef = useDOMRef(ref);
  const inputRef = useDOMRef(inputRefProp);

  const disableAnimation = originalProps.disableAnimation ?? globalContext?.disableAnimation;

  const {locale} = useLocale();

  const state = useDateFieldState({
    ...originalProps,
    label,
    locale,
    minValue,
    maxValue,
    validationBehavior,
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
  } = useAriaDateField({...originalProps, label, validationBehavior, inputRef}, state, domRef);

  const baseStyles = clsx(classNames?.base, className);

  const isInvalid = isInvalidProp || ariaIsInvalid;

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
        disableAnimation,
        labelPlacement,
        className,
      }),
    [objectToDeps(variantProps), disableAnimation, labelPlacement, className],
  );

  const getLabelProps: PropGetter = (props) => {
    return {
      ...mergeProps(labelProps, labelPropsProp, props),
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

  const getFieldProps = (props: DOMAttributes = {}) => {
    return {
      ref: domRef,
      "data-slot": "input-field",
      ...mergeProps(fieldProps, fieldPropsProp, props),
      className: slots.input({
        class: clsx(classNames?.input, props?.className),
      }),
    } as GroupDOMAttributes;
  };

  const getInputWrapperProps = (props = {}) => {
    return {
      ...props,
      ...groupProps,
      "data-slot": "input-wrapper",
      className: slots.inputWrapper({
        class: classNames?.inputWrapper,
      }),
      onClick: fieldProps.onClick,
    } as GroupDOMAttributes;
  };

  const getInnerWrapperProps: PropGetter = (props) => {
    return {
      ...props,
      "data-slot": "inner-wrapper",
      className: slots.innerWrapper({
        class: classNames?.innerWrapper,
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
      ...mergeProps(errorMessageProps, errorMessagePropsProp, props),
      "data-slot": "error-message",
      className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
    };
  };

  const getDescriptionProps: PropGetter = (props = {}) => {
    return {
      ...mergeProps(descriptionProps, descriptionPropsProp, props),
      "data-slot": "description",
      className: slots.description({class: clsx(classNames?.description, props?.className)}),
    };
  };

  const getBaseGroupProps = () => {
    return {
      as,
      label,
      description,
      endContent,
      errorMessage,
      isInvalid,
      startContent,
      validationDetails,
      validationErrors,
      shouldLabelBeOutside,
      "data-slot": "base",
      "data-required": dataAttr(originalProps.isRequired),
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-readonly": dataAttr(originalProps.isReadOnly),
      "data-invalid": dataAttr(isInvalid),
      "data-has-start-content": dataAttr(!!startContent),
      "data-has-end-content": dataAttr(!!endContent),
      descriptionProps: getDescriptionProps(),
      errorMessageProps: getErrorMessageProps(),
      groupProps: getInputWrapperProps(),
      helperWrapperProps: getHelperWrapperProps(),
      labelProps: getLabelProps(),
      wrapperProps: getInnerWrapperProps(),
      className: slots.base({class: baseStyles}),
    } as DateInputGroupProps;
  };

  return {
    state: orderSegmentsByFormat(state, format),
    domRef,
    slots,
    classNames,
    labelPlacement,
    getBaseGroupProps,
    getFieldProps,
    getInputProps,
  };
}

export type UseDateInputReturn = ReturnType<typeof useDateInput>;
