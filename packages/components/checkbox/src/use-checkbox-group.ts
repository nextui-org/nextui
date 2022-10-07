import type {AriaCheckboxGroupProps} from "@react-types/checkbox";
import type {NormalSizes, NormalColors, SimpleColors} from "@nextui-org/shared-utils";
import type {Orientation} from "@react-types/shared";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {useCheckboxGroup as useReactAriaCheckboxGroup} from "@react-aria/checkbox";
import {CheckboxGroupState, useCheckboxGroupState} from "@react-stately/checkbox";

export interface UseCheckboxGroupProps extends HTMLNextUIProps<"div", AriaCheckboxGroupProps> {
  /**
   * The color of the checkboxes.
   * @default "default"
   */
  color?: NormalColors;
  /**
   * The color of the label.
   * @default "default"
   */
  labelColor?: SimpleColors;
  /**
   * The size of the checkboxes.
   * @default "md"
   */
  size?: NormalSizes;
  /**
   * The axis the checkbox group items should align with.
   * @default "vertical"
   */
  orientation?: Orientation;
}

export type ContextType = {
  groupState: CheckboxGroupState;
  color?: UseCheckboxGroupProps["color"];
  labelColor?: UseCheckboxGroupProps["labelColor"];
  size?: UseCheckboxGroupProps["size"];
};

export function useCheckboxGroup(props: UseCheckboxGroupProps) {
  const {
    size = "md",
    color = "default",
    labelColor = "default",
    orientation = "vertical",
    ...otherProps
  } = props;

  const groupState = useCheckboxGroupState(otherProps);

  const {labelProps, groupProps} = useReactAriaCheckboxGroup(otherProps, groupState);

  const context = {
    size,
    color,
    labelColor,
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
