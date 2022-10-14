import type {AriaRadioGroupProps} from "@react-types/radio";
import type {Orientation} from "@react-types/shared";
import type {NormalSizes, SimpleColors} from "@nextui-org/shared-utils";

import {useMemo, HTMLAttributes} from "react";
import {RadioGroupState, useRadioGroupState} from "@react-stately/radio";
import {useRadioGroup as useReactAriaRadioGroup} from "@react-aria/radio";
import {HTMLNextUIProps} from "@nextui-org/system";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * The color of the radios.
   * @default "default"
   */
  color?: SimpleColors;
  /**
   * The color of the radios's label.
   * @default "default"
   */
  labelColor?: SimpleColors;
  /**
   * The size of the radios.
   * @default "md"
   */
  size?: NormalSizes;
  /**
   * The axis the radio group items should align with.
   * @default "vertical"
   */
  orientation?: Orientation;
}

export type UseRadioGroupProps = AriaRadioGroupProps & Props;

interface IRadioGroupAria {
  /** Props for the radio group wrapper element. */
  radioGroupProps: Omit<HTMLAttributes<HTMLElement>, "css">;
  /** Props for the radio group's visible label (if any). */
  labelProps: Omit<HTMLAttributes<HTMLElement>, "css">;
}

export type ContextType = {
  groupState: RadioGroupState;
  isRequired?: UseRadioGroupProps["isRequired"];
  color?: UseRadioGroupProps["color"];
  labelColor?: UseRadioGroupProps["labelColor"];
  size?: UseRadioGroupProps["size"];
  validationState?: UseRadioGroupProps["validationState"];
};

export function useRadioGroup(props: UseRadioGroupProps) {
  const {
    size = "md",
    color = "default",
    labelColor = "default",
    orientation = "vertical",
    isRequired,
    validationState,
    ...otherProps
  } = props;

  const otherPropsWithOrientation = useMemo<AriaRadioGroupProps>(() => {
    return {
      ...otherProps,
      isRequired,
      orientation,
    };
  }, [otherProps]);

  const groupState = useRadioGroupState(otherPropsWithOrientation);

  const {labelProps, radioGroupProps: groupProps}: IRadioGroupAria = useReactAriaRadioGroup(
    otherPropsWithOrientation,
    groupState,
  );

  const context: ContextType = {
    size,
    color,
    labelColor,
    groupState,
    isRequired,
    validationState,
  };

  return {size, orientation, labelProps, groupProps, context, ...otherProps};
}

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>;
