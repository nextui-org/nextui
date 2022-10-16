import type {AriaRadioProps} from "@react-types/radio";

import {useMemo, useRef} from "react";
import {useFocusRing} from "@react-aria/focus";
import {useHover} from "@react-aria/interactions";
import {useRadio as useReactAriaRadio} from "@react-aria/radio";
import {HTMLNextUIProps} from "@nextui-org/system";
import {NormalSizes, SimpleColors, __DEV__, warn} from "@nextui-org/shared-utils";

import {useRadioGroupContext} from "./radio-group-context";

interface Props extends HTMLNextUIProps<"label"> {
  /**
   * The content to display as the label.
   */
  label?: string;
  /**
   * The color of the radio.
   * @default "default"
   */
  color?: SimpleColors;
  /**
   * The color of the label.
   * @default "default"
   */
  labelColor?: SimpleColors;
  /**
   * The size of the radio.
   * @default "md"
   */
  size?: NormalSizes;
  /**
   * The radio description text.
   */
  description?: string;
  /**
   * Whether the radio is squared.
   * @default false
   */
  isSquared?: boolean;
  /**
   * Whether the radio has animations.
   * @default false
   */
  disableAnimation?: boolean;
}

export type UseRadioProps = Props & AriaRadioProps;

export function useRadio(props: UseRadioProps) {
  const groupContext = useRadioGroupContext();

  const {
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "default",
    labelColor = groupContext?.labelColor ?? "default",
    autoFocus = false,
    isSquared = false,
    isDisabled: isDisabledProp = false,
    disableAnimation = false,
    ...otherProps
  } = props;

  if (groupContext && __DEV__) {
    if ("checked" in otherProps) {
      warn('Remove props "checked" if in the Radio.Group.', "Radio");
    }
    if (otherProps.value === undefined) {
      warn('Props "value" must be defined if in the Radio.Group.', "Radio");
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const {inputProps} = useReactAriaRadio(
    {
      ...otherProps,
      ...groupContext,
      isDisabled: isDisabledProp,
    },
    groupContext.groupState,
    inputRef,
  );

  const isDisabled = useMemo(() => inputProps.disabled ?? false, [inputProps.disabled]);
  const isRequired = useMemo(() => groupContext.isRequired ?? false, [groupContext.isRequired]);
  const isInvalid = useMemo(
    () => groupContext.validationState === "invalid",
    [groupContext.validationState],
  );

  const {hoverProps, isHovered} = useHover({isDisabled});

  const {focusProps, isFocusVisible} = useFocusRing({
    autoFocus,
  });

  const state = useMemo(() => {
    if (isHovered) return "hovered";
    if (isDisabled) return "disabled";

    return inputProps.checked ? "checked" : "uncheked";
  }, [isDisabled, inputProps.checked, isHovered]);

  return {
    state,
    size,
    color,
    labelColor,
    inputRef,
    isDisabled,
    isRequired,
    isInvalid,
    isHovered,
    isSquared,
    isFocusVisible,
    disableAnimation,
    hoverProps,
    focusProps,
    inputProps,
    ...otherProps,
  };
}

export type UseRadioReturn = ReturnType<typeof useRadio>;
