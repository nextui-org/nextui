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

interface Props extends HTMLNextUIProps<"div", AriaRadioGroupProps> {
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
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <RadioGroup styles={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    wrapper: "wrapper-classes", // radios wrapper
   * }} >
   *  // radios
   * </RadioGroup>
   * ```
   */
  styles?: SlotsToClasses<RadioGroupSlots>;
}

export type UseRadioGroupProps = Props &
  Pick<RadioProps, "color" | "size" | "radius" | "isDisabled" | "disableAnimation">;

export type ContextType = {
  groupState: RadioGroupState;
  isRequired?: UseRadioGroupProps["isRequired"];
  validationState?: UseRadioGroupProps["validationState"];
  color?: RadioProps["color"];
  size?: RadioProps["size"];
  radius?: RadioProps["radius"];
  isDisabled?: RadioProps["isDisabled"];
  disableAnimation?: RadioProps["disableAnimation"];
};

export function useRadioGroup(props: UseRadioGroupProps) {
  const {
    as,
    ref,
    styles,
    children,
    label,
    size = "md",
    color = "primary",
    radius = "full",
    isDisabled = false,
    disableAnimation = false,
    orientation = "vertical",
    isRequired,
    validationState,
    className,
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
    };
  }, [otherProps]);

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
    }),
    [size, color, radius, groupState, isRequired, validationState, isDisabled, disableAnimation],
  );

  const slots = useMemo(() => radioGroup(), []);

  const baseStyles = clsx(styles?.base, className);

  const getGroupProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...mergeProps(groupProps, otherProps),
    };
  };

  const getLabelProps: PropGetter = () => {
    return {
      className: slots.label({class: styles?.label}),
      ...labelProps,
    };
  };

  const getWrapperProps: PropGetter = () => {
    return {
      className: slots.wrapper({class: styles?.wrapper}),
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
