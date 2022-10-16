import type {AriaCheckboxProps} from "@react-types/checkbox";
import type {HTMLNextUIProps, CSS} from "@nextui-org/system";

import {useMemo, useRef} from "react";
import {useToggleState} from "@react-stately/toggle";
import {useHover, usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {NormalSizes, NormalColors, SimpleColors, __DEV__, warn} from "@nextui-org/shared-utils";
import {
  useCheckbox as useReactAriaCheckbox,
  useCheckboxGroupItem as useReactAriaCheckboxGroupItem,
} from "@react-aria/checkbox";

import {useCheckboxGroupContext} from "./checkbox-group-context";

export interface UseCheckboxProps extends HTMLNextUIProps<"label", AriaCheckboxProps> {
  /**
   * The content to display as the label.
   */
  label?: string;
  /**
   * The color of the checkbox.
   * @default "default"
   */
  color?: NormalColors;
  /**
   * The color of the label.
   * @default "default"
   */
  labelColor?: SimpleColors;
  /**
   * The size of the checkbox.
   * @default "md"
   */
  size?: NormalSizes;
  /**
   * Whether the checkbox is rounded.
   * @default false
   */
  isRounded?: boolean;
  /**
   * Line in the middle of the label when the `Checkbox` is checked
   * @default false
   */
  lineThrough?: boolean;
  /**
   * Whether the checkbox has animations.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Override checkbox container CSS style
   */
  containerCss?: CSS;
}

export function useCheckbox(props: UseCheckboxProps) {
  const groupContext = useCheckboxGroupContext();

  const {
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "default",
    labelColor = groupContext?.labelColor ?? "default",
    lineThrough,
    isSelected,
    value = "",
    isRounded = false,
    isRequired = false,
    disableAnimation = false,
    isIndeterminate = false,
    defaultSelected,
    onChange,
    containerCss,
    ...otherProps
  } = props;

  if (groupContext && __DEV__) {
    if (isSelected) {
      warn(
        "The Checkbox.Group is being used, `isSelected` will be ignored. Use the `value` of the Checkbox.Group instead.",
        "Checkbox",
      );
    }
    if (defaultSelected) {
      warn(
        "The Checkbox.Group is being used, `defaultSelected` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.",
        "Checkbox",
      );
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const ariaCheckboxProps = useMemo(() => {
    return {
      ...otherProps,
      value,
      defaultSelected,
      isSelected,
      isIndeterminate,
      isRequired,
      onChange,
    };
  }, [isIndeterminate, otherProps]);

  const {inputProps} = groupContext
    ? // eslint-disable-next-line
      useReactAriaCheckboxGroupItem(
        {
          ...ariaCheckboxProps,
          validationState: otherProps.validationState,
        },
        groupContext.groupState,
        inputRef,
      )
    : useReactAriaCheckbox(ariaCheckboxProps, useToggleState(ariaCheckboxProps), inputRef); // eslint-disable-line

  if (isRequired) {
    inputProps.required = true;
  }

  const {hoverProps, isHovered} = useHover({
    isDisabled: inputProps.disabled,
  });

  // TODO: Event's propagation wasn't stopped https://github.com/adobe/react-spectrum/issues/2383
  const {pressProps} = usePress({
    isDisabled: inputProps.disabled,
  });

  const {focusProps, isFocusVisible} = useFocusRing({
    autoFocus: inputProps.autoFocus,
  });

  const state = useMemo(() => {
    if (isHovered) return "hovered";

    return isIndeterminate && inputProps.checked
      ? "mixed"
      : inputProps.checked
      ? "checked"
      : "uncheked";
  }, [isHovered, isIndeterminate, inputProps.checked]);

  return {
    size,
    color,
    state,
    labelColor,
    isRounded,
    lineThrough,
    disableAnimation,
    isIndeterminate,
    isFocusVisible,
    isHovered,
    inputRef,
    inputProps,
    pressProps,
    hoverProps,
    focusProps,
    containerCss,
    ...otherProps,
  };
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>;
