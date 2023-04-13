import type {AriaRadioGroupProps} from "@react-types/radio";
import type {Orientation} from "@react-types/shared";
import type {ReactRef} from "@nextui-org/shared-utils";
import type {RadioGroupSlots, SlotsToClasses} from "@nextui-org/theme";

import {radioGroup} from "@nextui-org/theme";
import {useMemo} from "react";
import {RadioGroupState, useRadioGroupState} from "@react-stately/radio";
import {useRadioGroup as useReactAriaRadioGroup} from "@react-aria/radio";
import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";
import {mergeProps} from "@react-aria/utils";

import {RadioProps} from "./index";

interface Props extends HTMLNextUIProps<"div"> {
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
  Pick<RadioProps, "color" | "size" | "radius" | "isDisabled" | "disableAnimation" | "onChange">;

export type ContextType = {
  groupState: RadioGroupState;
  isRequired?: UseRadioGroupProps["isRequired"];
  validationState?: UseRadioGroupProps["validationState"];
  color?: RadioProps["color"];
  size?: RadioProps["size"];
  radius?: RadioProps["radius"];
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
    size = "md",
    color = "primary",
    radius = "full",
    isDisabled = false,
    disableAnimation = false,
    orientation = "vertical",
    isRequired = false,
    validationState,
    className,
    onChange,
    onValueChange,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const otherPropsWithOrientation = useMemo<AriaRadioGroupProps>(() => {
    return {
      ...otherProps,
      "aria-label": typeof label === "string" ? label : otherProps["aria-label"],
      isRequired,
      orientation,
      onChange: onValueChange,
    };
  }, [otherProps, onValueChange]);

  const groupState = useRadioGroupState(otherPropsWithOrientation);

  const {labelProps, radioGroupProps: groupProps} = useReactAriaRadioGroup(
    otherPropsWithOrientation,
    groupState,
  );

  const context: ContextType = useMemo(
    () => ({
      size,
      color,
      radius,
      groupState,
      isRequired,
      validationState,
      isDisabled,
      disableAnimation,
      onChange,
    }),
    [
      size,
      color,
      radius,
      groupState,
      isRequired,
      validationState,
      isDisabled,
      disableAnimation,
      onChange,
    ],
  );

  const slots = useMemo(() => radioGroup(), []);

  const baseStyles = clsx(classNames?.base, className);

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

  return {
    Component,
    children,
    label,
    context,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
  };
}

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
