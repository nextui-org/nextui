import type {DateInputVariantProps, DateInputSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaTimeFieldProps, TimeValue} from "@react-types/datepicker";
import type {ReactRef} from "@nextui-org/react-utils";
import type {DOMAttributes, GroupDOMAttributes} from "@react-types/shared";
import type {DateInputGroupProps} from "./date-input-group";

import {useLocale} from "@react-aria/i18n";
import {mergeProps} from "@react-aria/utils";
import {PropGetter, useProviderContext} from "@nextui-org/system";
import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {useTimeField as useAriaTimeField} from "@react-aria/datepicker";
import {useTimeFieldState} from "@react-stately/datepicker";
import {objectToDeps, clsx, dataAttr} from "@nextui-org/shared-utils";
import {dateInput} from "@nextui-org/theme";
import {useMemo} from "react";

type NextUIBaseProps<T extends TimeValue> = Omit<
  HTMLNextUIProps<"div">,
  keyof AriaTimeFieldProps<T> | "onChange"
>;

interface Props<T extends TimeValue> extends NextUIBaseProps<T> {
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

export type UseTimeInputProps<T extends TimeValue> = Props<T> &
  DateInputVariantProps &
  AriaTimeFieldProps<T>;

export function useTimeInput<T extends TimeValue>(originalProps: UseTimeInputProps<T>) {
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
    minValue,
    maxValue,
    isInvalid: isInvalidProp = validationState ? validationState === "invalid" : false,
    errorMessage,
  } = props;

  const domRef = useDOMRef(ref);
  const inputRef = useDOMRef(inputRefProp);

  const {locale} = useLocale();

  const disableAnimation = originalProps.disableAnimation ?? globalContext?.disableAnimation;

  const state = useTimeFieldState({
    ...originalProps,
    label,
    locale,
    minValue,
    maxValue,
    validationBehavior,
    isInvalid: isInvalidProp,
    shouldForceLeadingZeros,
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
  } = useAriaTimeField({...originalProps, label, validationBehavior, inputRef}, state, domRef);

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
    [objectToDeps(variantProps), labelPlacement, disableAnimation, className],
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
      "data-slot": "input",
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
    state,
    domRef,
    slots,
    classNames,
    labelPlacement,
    getBaseGroupProps,
    getFieldProps,
    getInputProps,
  };
}

export type UseTimeInputReturn = ReturnType<typeof useTimeInput>;
