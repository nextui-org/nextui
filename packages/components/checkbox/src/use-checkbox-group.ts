import type {AriaCheckboxGroupProps} from "@react-types/checkbox";
import type {Orientation} from "@react-types/shared";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {useCheckboxGroup as useReactAriaCheckboxGroup} from "@react-aria/checkbox";
import {CheckboxGroupState, useCheckboxGroupState} from "@react-stately/checkbox";

import {CheckboxProps} from "./index";

export interface UseCheckboxGroupProps extends HTMLNextUIProps<"div", AriaCheckboxGroupProps> {
  /**
   * The color of the checkboxes.
   * @default "default"
   */
  color?: CheckboxProps["color"];
  /**
   * The size of the checkboxes.
   * @default "md"
   */
  size?: CheckboxProps["size"];
  /**
   * The radius of the checkboxes.
   * @default "lg"
   */
  radius?: CheckboxProps["radius"];
  /**
   * Whether the checkboxes should have a line through.
   * @default false
   */
  lineThrough?: CheckboxProps["lineThrough"];
  /**
   * Whether the checkboxes are disabled.
   * @default false
   */
  isDisabled?: CheckboxProps["isDisabled"];
  /**
   * Whether the animation should be disabled.
   * @default false
   */
  disableAnimation?: CheckboxProps["disableAnimation"];
  /**
   * The axis the checkbox group items should align with.
   * @default "vertical"
   */
  orientation?: Orientation;
}

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
    size = "md",
    color = "neutral",
    radius = "lg",
    orientation = "vertical",
    lineThrough = false,
    isDisabled = false,
    disableAnimation = false,
    ...otherProps
  } = props;

  const groupState = useCheckboxGroupState(otherProps);

  const {labelProps, groupProps} = useReactAriaCheckboxGroup(otherProps, groupState);

  const context: ContextType = {
    size,
    color,
    radius,
    lineThrough,
    isDisabled,
    disableAnimation,
    groupState,
  };

  return {
    size,
    orientation,
    labelProps,
    groupProps,
    context,
    ...otherProps,
  };
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>;
