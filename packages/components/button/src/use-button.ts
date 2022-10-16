import type {AriaButtonProps} from "@react-types/button";
import type {PressEvent} from "@react-types/shared";
import type {ReactRef, NormalColors, NormalSizes, NormalWeights} from "@nextui-org/shared-utils";
import type {HTMLNextUIProps, CSS} from "@nextui-org/system";

import {MouseEventHandler, ReactNode, useCallback, useMemo, Children} from "react";
import {useButton as useAriaButton} from "@react-aria/button";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {useDrip} from "@nextui-org/drip";
import {useHover} from "@react-aria/interactions";
import {useDOMRef} from "@nextui-org/dom-utils";
import {__DEV__, warn} from "@nextui-org/shared-utils";

import {getColors} from "./button-utils";
import {useButtonGroupContext} from "./button-group-context";

export interface UseButtonProps extends HTMLNextUIProps<"button", AriaButtonProps> {
  /**
   * the button ref.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * The button color.
   * @default "default"
   */
  color?: NormalColors;
  /**
   * The button size.
   * @default "md"
   */
  size?: NormalSizes;
  /**
   * The border weight of the border button.
   * @default "normal"
   */
  borderWeight?: NormalWeights;
  /**
   * Whether the button should autoscale its width to fit its content.
   * @default false
   */
  auto?: boolean;
  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the button should be rounded.
   * @default false
   */
  bordered?: boolean;
  /**
   * Whether the button should be light.
   * @default false
   */
  light?: boolean;
  /**
   * Whether the button should be flat.
   * @default false
   */
  flat?: boolean;
  /**
   * Whether the button should display a shadow.
   * @default false
   */
  shadow?: boolean;
  /**
   * Whether the button should be rounded.
   * @default false
   */
  rounded?: boolean;
  /**
   * Whether the button should have a ghost look.
   * @default false
   */
  ghost?: boolean;
  /**
   * Whether the button have animations.
   * @default true
   */
  animated?: boolean;
  /**
   * Whether the button should display a ripple effect on press.
   * @default true
   */
  ripple?: boolean;

  /**
   * The button left content.
   */
  icon?: ReactNode;
  /**
   * The button right content.
   */
  iconRight?: ReactNode;
  /**
   * The button left content css object.
   */
  iconLeftCss?: CSS;
  /**
   * The button right content css object.
   */
  iconRightCss?: CSS;
  /**
   * The native button click event handler.
   * @deprecated - use `onPress` instead.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function useButton(props: UseButtonProps) {
  const groupContext = useButtonGroupContext();

  const {
    ref,
    as,
    css,
    children,
    iconLeftCss,
    iconRightCss,
    autoFocus,
    icon,
    iconRight,
    className,
    auto = groupContext?.auto ?? false,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "default",
    shadow = groupContext?.shadow ?? false,
    flat = groupContext?.flat ?? false,
    ghost = groupContext?.ghost ?? false,
    light = groupContext?.light ?? false,
    bordered = groupContext?.bordered ?? false,
    borderWeight = groupContext?.borderWeight ?? "normal",
    animated = groupContext?.animated ?? true,
    rounded = groupContext?.rounded ?? false,
    ripple = groupContext?.ripple ?? true,
    disabled = groupContext?.disabled ?? false,
    onClick: deprecatedOnClick,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    ...otherProps
  } = props;

  const buttonRef = useDOMRef(ref);

  const hasIcon = icon || iconRight;
  const isChildLess = Children.count(children) === 0;
  const isRightIcon = Boolean(iconRight);
  const isGradientButtonBorder = useMemo(
    () => color === "gradient" && (bordered || ghost),
    [color, bordered, ghost],
  );

  /* eslint-enable @typescript-eslint/no-unused-vars */
  if (__DEV__ && color === "gradient" && (flat || light)) {
    warn("Using the gradient color on flat and light buttons will have no effect.", "Button");
  }

  const buttonProps = {
    auto,
    size,
    color,
    shadow,
    flat,
    ghost,
    light,
    bordered,
    borderWeight,
    animated,
    rounded,
    disabled,
  };

  const cssColors = getColors(buttonProps) as CSS;

  const {onClick: onDripClickHandler, ...dripBindings} = useDrip(false, buttonRef);

  const handleDrip = (e: React.MouseEvent<HTMLButtonElement> | PressEvent | Event) => {
    if (animated && ripple && buttonRef.current) {
      onDripClickHandler(e);
    }
  };

  const handlePress = (e: PressEvent) => {
    if (e.pointerType === "keyboard" || e.pointerType === "virtual") {
      handleDrip(e);
    } else if (typeof window !== "undefined" && window.event) {
      handleDrip(window.event);
    }
    if (deprecatedOnClick) {
      deprecatedOnClick(e as any);
      warn("onClick is deprecated, please use onPress", "Button");
    }
    onPress?.(e);
  };

  const {buttonProps: buttonAriaProps, isPressed} = useAriaButton(
    {
      ...otherProps,
      elementType: as,
      onPress: handlePress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
    } as AriaButtonProps,
    buttonRef,
  );

  const {hoverProps, isHovered} = useHover({isDisabled: disabled});

  const {isFocused, isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  const getButtonProps = useCallback(() => {
    return mergeProps(buttonAriaProps, hoverProps, focusProps, otherProps, {
      ...buttonProps,
      bordered: buttonProps.bordered || buttonProps.ghost,
      isFocusVisible: isFocusVisible && !buttonProps.disabled,
      isHovered: isHovered || (buttonProps.ghost && isFocused),
      isChildLess,
      isPressed,
    });
  }, [
    buttonProps,
    buttonAriaProps,
    hoverProps,
    focusProps,
    isFocusVisible,
    isHovered,
    isFocused,
    isPressed,
    isChildLess,
    otherProps,
  ]);

  const state = useMemo(() => {
    if (isPressed) return "pressed";
    if (isHovered) return "hovered";

    return disabled ? "disabled" : "ready";
  }, [disabled, isHovered, isPressed]);

  const getIconCss = useMemo<any>(() => {
    if (isRightIcon) return iconRightCss;

    return iconLeftCss;
  }, [isRightIcon, iconRightCss, iconLeftCss]);

  return {
    as,
    css,
    state,
    icon,
    children,
    buttonRef,
    className,
    cssColors,
    hasIcon,
    iconRight,
    isFocused,
    isRightIcon,
    isFocusVisible,
    isGradientButtonBorder,
    dripBindings,
    getIconCss,
    getButtonProps,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
