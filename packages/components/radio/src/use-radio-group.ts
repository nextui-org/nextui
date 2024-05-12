import type {AriaRadioGroupProps} from "@react-types/radio";
import type {Orientation} from "@react-types/shared";
import type {ReactRef} from "@nextui-org/react-utils";
import type {RadioGroupSlots, SlotsToClasses} from "@nextui-org/theme";

import {radioGroup} from "@nextui-org/theme";
import {useCallback, useMemo} from "react";
import {RadioGroupState, useRadioGroupState} from "@react-stately/radio";
import {useRadioGroup as useReactAriaRadioGroup} from "@react-aria/radio";
import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {filterDOMProps, useDOMRef} from "@nextui-org/react-utils";
import {clsx, safeAriaLabel} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {RadioProps} from "./index";

interface Props extends Omit<HTMLNextUIProps<"div">, "onChange"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The axis the radio group items should align with.
   * @default "vertical"
   */
  orientation?: Orientation;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <RadioGroup classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    wrapper: "wrapper-classes", // radios wrapper
   * }} >
   *  // radios
   * </RadioGroup>
   * ```
   */
  classNames?: SlotsToClasses<RadioGroupSlots>;
  /**
   * React aria onChange event.
   */
  onValueChange?: AriaRadioGroupProps["onChange"];
}

export type UseRadioGroupProps = Omit<Props, "defaultChecked"> &
  Omit<AriaRadioGroupProps, "onChange"> &
  Partial<Pick<RadioProps, "color" | "size" | "isDisabled" | "disableAnimation" | "onChange">>;

export type ContextType = {
  groupState: RadioGroupState;
  isRequired?: UseRadioGroupProps["isRequired"];
  isInvalid?: UseRadioGroupProps["isInvalid"];
  color?: RadioProps["color"];
  size?: RadioProps["size"];
  isDisabled?: RadioProps["isDisabled"];
  disableAnimation?: RadioProps["disableAnimation"];
  onChange?: RadioProps["onChange"];
};

export function useRadioGroup(props: UseRadioGroupProps) {
  const {
    as,
    ref,
    classNames,
    children,
    label,
    value,
    name,
    isInvalid: isInvalidProp,
    validationState,
    validationBehavior = "native",
    size = "md",
    color = "primary",
    isDisabled = false,
    disableAnimation = false,
    orientation = "vertical",
    isRequired = false,
    isReadOnly,
    errorMessage,
    description,
    className,
    onChange,
    onValueChange,
    ...otherProps
  } = props;

  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const otherPropsWithOrientation = useMemo<AriaRadioGroupProps>(() => {
    return {
      ...otherProps,
      value,
      name,
      "aria-label": safeAriaLabel(otherProps["aria-label"], label),
      isRequired,
      isReadOnly,
      isInvalid: validationState === "invalid" || isInvalidProp,
      orientation,
      validationBehavior,
      onChange: onValueChange,
    };
  }, [
    otherProps,
    value,
    name,
    label,
    isRequired,
    isReadOnly,
    isInvalidProp,
    validationState,
    validationBehavior,
    orientation,
    onValueChange,
  ]);

  const groupState = useRadioGroupState(otherPropsWithOrientation);

  const {
    labelProps,
    radioGroupProps: groupProps,
    errorMessageProps,
    descriptionProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails,
  } = useReactAriaRadioGroup(otherPropsWithOrientation, groupState);

  const isInvalid = otherPropsWithOrientation.isInvalid || isAriaInvalid || groupState.isInvalid;

  const context: ContextType = useMemo(
    () => ({
      size,
      color,
      groupState,
      isRequired,
      isInvalid,
      isDisabled,
      disableAnimation,
      onChange,
    }),
    [
      size,
      color,
      isRequired,
      isDisabled,
      isInvalid,
      onChange,
      disableAnimation,
      groupState.name,
      groupState.isDisabled,
      groupState.isReadOnly,
      groupState.isRequired,
      groupState.selectedValue,
      groupState.lastFocusedValue,
    ],
  );

  const slots = useMemo(
    () => radioGroup({isRequired, isInvalid, disableAnimation}),
    [isInvalid, isRequired, disableAnimation],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getGroupProps: PropGetter = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...mergeProps(
        groupProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps,
        }),
      ),
    };
  }, [domRef, slots, baseStyles, groupProps, otherProps]);

  const getLabelProps: PropGetter = useCallback(() => {
    return {
      className: slots.label({class: classNames?.label}),
      ...labelProps,
    };
  }, [slots, classNames?.label, labelProps, classNames?.label]);

  const getWrapperProps: PropGetter = useCallback(() => {
    return {
      className: slots.wrapper({class: classNames?.wrapper}),
      role: "presentation",
      "data-orientation": orientation,
    };
  }, [slots, classNames?.wrapper, orientation, slots.wrapper]);

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...descriptionProps,
        className: slots.description({class: clsx(classNames?.description, props?.className)}),
      };
    },
    [slots, classNames?.description, descriptionProps, slots.description],
  );

  const getErrorMessageProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...errorMessageProps,
        className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
      };
    },
    [slots, classNames?.errorMessage, errorMessageProps],
  );

  return {
    Component,
    children,
    label,
    context,
    description,
    isInvalid,
    errorMessage:
      typeof errorMessage === "function"
        ? errorMessage({isInvalid, validationErrors, validationDetails})
        : errorMessage || validationErrors?.join(" "),
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  };
}

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
