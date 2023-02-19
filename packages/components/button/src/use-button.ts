import type {ButtonVariantProps, ButtonSlots, SlotsToClasses} from "@nextui-org/theme";
import type {AriaButtonProps} from "@react-types/button";
import type {PressEvent} from "@react-types/shared";
import type {ReactRef} from "@nextui-org/shared-utils";
import type {HTMLNextUIProps} from "@nextui-org/system";

import {MouseEventHandler, ReactNode, useCallback} from "react";
import {useButton as useAriaButton} from "@react-aria/button";
import {useFocusRing} from "@react-aria/focus";
import {mergeProps} from "@react-aria/utils";
import {useDrip} from "@nextui-org/drip";
import {useDOMRef} from "@nextui-org/dom-utils";
import {warn, clsx} from "@nextui-org/shared-utils";
import {button} from "@nextui-org/theme";

import {useButtonGroupContext} from "./button-group-context";

export interface UseButtonProps
  extends HTMLNextUIProps<"button", Omit<AriaButtonProps, keyof ButtonVariantProps>>,
    Omit<ButtonVariantProps, "isFocusVisible"> {
  /**
   * the button ref.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;

  /**
   * The button left content.
   */
  iconLeft?: ReactNode;
  /**
   * The button right content.
   */
  iconRight?: ReactNode;
  /**
   * Classname or List of classes to change the styles of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Avatar styles={{
   *    base:"base-classes",
   *    icon: "image-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<ButtonSlots>;
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
    children,
    iconLeft,
    iconRight,
    autoFocus,
    className,
    styles,
    fullWidth = groupContext?.fullWidth ?? false,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "neutral",
    variant = groupContext?.variant ?? "solid",
    disableAnimation = groupContext?.disableAnimation ?? false,
    radius = groupContext?.radius ?? "lg",
    disableRipple = groupContext?.disableRipple ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    onClick: deprecatedOnClick,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    ...otherProps
  } = props;

  const Component = as || "button";

  const domRef = useDOMRef(ref);

  const hasIcon = iconLeft || iconRight;
  const isRightIcon = Boolean(iconRight);

  const {isFocusVisible, focusProps} = useFocusRing({
    autoFocus,
  });

  const baseStyles = clsx(styles?.base, className);

  const slots = button({
    size,
    color,
    variant,
    radius,
    fullWidth,
    isDisabled,
    isFocusVisible,
    disableAnimation,
  });

  const {onClick: onDripClickHandler, ...dripBindings} = useDrip(false, domRef);

  const handleDrip = (e: React.MouseEvent<HTMLButtonElement> | PressEvent | Event) => {
    if (disableRipple || isDisabled || disableAnimation) return;
    domRef.current && onDripClickHandler(e);
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

  const {buttonProps: buttonAriaProps} = useAriaButton(
    {
      ...otherProps,
      elementType: as,
      onPress: handlePress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
    } as AriaButtonProps,
    domRef,
  );

  const getButtonProps = useCallback(
    () => mergeProps(buttonAriaProps, focusProps, otherProps),
    [buttonAriaProps, focusProps, otherProps],
  );

  return {
    Component,
    children,
    domRef,
    slots,
    styles,
    baseStyles,
    hasIcon,
    iconLeft,
    iconRight,
    isRightIcon,
    dripBindings,
    getButtonProps,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
