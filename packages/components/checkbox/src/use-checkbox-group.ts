import type {CheckboxGroupSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaCheckboxGroupProps} from "@react-types/checkbox";
import type {Orientation} from "@react-types/shared";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ReactRef} from "@nextui-org/react-utils";

import {useCallback, useMemo} from "react";
import {mergeProps} from "@react-aria/utils";
import {checkboxGroup} from "@nextui-org/theme";
import {useCheckboxGroup as useReactAriaCheckboxGroup} from "@react-aria/checkbox";
import {CheckboxGroupState, useCheckboxGroupState} from "@react-stately/checkbox";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, safeAriaLabel} from "@nextui-org/shared-utils";

import {CheckboxProps} from "./index";

interface Props extends HTMLNextUIProps<"div", AriaCheckboxGroupProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * The axis the checkbox group items should align with.
   * @default "vertical"
   */
  orientation?: Orientation;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <CheckboxGroup classNames={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    wrapper: "wrapper-classes", // checkboxes wrapper
   * }} >
   *  // checkboxes
   * </CheckboxGroup>
   * ```
   */
  classNames?: SlotsToClasses<CheckboxGroupSlots>;
  /**
   * React aria onChange event.
   */
  onValueChange?: AriaCheckboxGroupProps["onChange"];
}

export type UseCheckboxGroupProps = Props &
  Pick<
    CheckboxProps,
    "color" | "size" | "radius" | "lineThrough" | "isDisabled" | "disableAnimation"
  >;

export type ContextType = {
  groupState: CheckboxGroupState;
  color?: CheckboxProps["color"];
  size?: CheckboxProps["size"];
  radius?: CheckboxProps["radius"];
  lineThrough?: CheckboxProps["lineThrough"];
  isDisabled?: CheckboxProps["isDisabled"];
  disableAnimation?: CheckboxProps["disableAnimation"];
};

export function useCheckboxGroup(props: UseCheckboxGroupProps) {
  const {
    as,
    ref,
    classNames,
    children,
    label,
    radius,
    value,
    name,
    defaultValue,
    size = "md",
    color = "primary",
    orientation = "vertical",
    lineThrough = false,
    isDisabled = false,
    disableAnimation = false,
    validationState,
    isReadOnly,
    isRequired,
    onValueChange,
    description,
    errorMessage,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const checkboxGroupProps = useMemo(
    () => ({
      value,
      name,
      "aria-label": safeAriaLabel(otherProps["aria-label"], label),
      defaultValue,
      isRequired,
      isReadOnly,
      orientation,
      onChange: onValueChange,
      validationState,
      ...otherProps,
    }),
    [
      value,
      name,
      label,
      defaultValue,
      isRequired,
      isReadOnly,
      orientation,
      onValueChange,
      validationState,
      otherProps["aria-label"],
      otherProps,
    ],
  );

  const groupState = useCheckboxGroupState(checkboxGroupProps);

  const {labelProps, groupProps, descriptionProps, errorMessageProps} = useReactAriaCheckboxGroup(
    checkboxGroupProps,
    groupState,
  );

  const context = useMemo<ContextType>(
    () => ({
      size,
      color,
      radius,
      lineThrough,
      isDisabled,
      disableAnimation,
      groupState,
    }),
    [
      size,
      color,
      radius,
      lineThrough,
      isDisabled,
      disableAnimation,
      groupState?.value,
      groupState?.isDisabled,
      groupState?.isReadOnly,
      groupState?.validationState,
      groupState?.isSelected,
    ],
  );

  const slots = useMemo(() => checkboxGroup(), []);

  const baseStyles = clsx(classNames?.base, className);

  const getGroupProps: PropGetter = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...mergeProps(groupProps, otherProps),
    };
  }, [slots, domRef, baseStyles, groupProps, otherProps]);

  const getLabelProps: PropGetter = useCallback(() => {
    return {
      className: slots.label({class: classNames?.label}),
      ...labelProps,
    };
  }, [slots, labelProps, classNames?.label]);

  const getWrapperProps: PropGetter = useCallback(() => {
    return {
      className: slots.wrapper({class: classNames?.wrapper}),
      role: "presentation",
      "data-orientation": orientation,
    };
  }, [slots, orientation, classNames?.wrapper]);

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ...props,
        ...descriptionProps,
        className: slots.description({class: clsx(classNames?.description, props?.className)}),
      };
    },
    [slots, descriptionProps, classNames?.description],
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

  return {
    Component,
    children,
    label,
    context,
    description,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  };
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;
