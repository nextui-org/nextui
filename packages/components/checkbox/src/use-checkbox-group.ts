import type {CheckboxGroupSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaCheckboxGroupProps} from "@react-types/checkbox";
import type {Orientation} from "@react-types/shared";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ReactRef} from "@nextui-org/react-utils";

import {useMemo} from "react";
import {mergeProps} from "@react-aria/utils";
import {checkboxGroup} from "@nextui-org/theme";
import {useCheckboxGroup as useReactAriaCheckboxGroup} from "@react-aria/checkbox";
import {CheckboxGroupState, useCheckboxGroupState} from "@react-stately/checkbox";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx} from "@nextui-org/shared-utils";

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
    size = "md",
    color = "primary",
    radius = "md",
    orientation = "vertical",
    lineThrough = false,
    isDisabled = false,
    disableAnimation = false,
    description,
    errorMessage,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const groupState = useCheckboxGroupState(otherProps);

  const {labelProps, groupProps, descriptionProps, errorMessageProps} = useReactAriaCheckboxGroup(
    {
      "aria-label": typeof label === "string" ? label : otherProps["aria-label"],
      ...otherProps,
    },
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
    [size, color, radius, lineThrough, isDisabled, disableAnimation, groupState],
  );

  const slots = useMemo(() => checkboxGroup(), []);

  const baseStyles = clsx(className, classNames?.base);

  const getGroupProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...mergeProps(groupProps, otherProps),
    };
  };

  const getLabelProps: PropGetter = () => {
    return {
      className: slots.label({class: classNames?.label}),
      ...labelProps,
    };
  };

  const getWrapperProps: PropGetter = () => {
    return {
      className: slots.wrapper({class: classNames?.wrapper}),
      role: "presentation",
      "data-orientation": orientation,
    };
  };

  const getDescriptionProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ...descriptionProps,
      className: slots.description({class: clsx(classNames?.description, props?.className)}),
    };
  };

  const getErrorMessageProps: PropGetter = (props = {}) => {
    return {
      ...props,
      ...errorMessageProps,
      className: slots.errorMessage({class: clsx(classNames?.errorMessage, props?.className)}),
    };
  };

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
