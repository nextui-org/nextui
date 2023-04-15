import type {ButtonVariantProps} from "@nextui-org/theme";
import type {AriaButtonProps} from "@react-types/button";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ReactNode} from "react";

import {dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {MouseEventHandler, useCallback} from "react";
import {useFocusRing} from "@react-aria/focus";
import {chain, mergeProps} from "@react-aria/utils";
import {useDrip} from "@nextui-org/drip";
import {useDOMRef} from "@nextui-org/dom-utils";
import {button} from "@nextui-org/theme";
import {isValidElement, cloneElement, useMemo} from "react";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {useHover} from "@react-aria/interactions";

import {useButtonGroupContext} from "./button-group-context";

export interface UseButtonProps
  extends HTMLNextUIProps<"button", Omit<AriaButtonProps, keyof ButtonVariantProps>>,
    Omit<ButtonVariantProps, "isFocusVisible" | "isInGroup" | "isInVerticalGroup"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;

  /**
   * The button start content.
   */
  startIcon?: ReactNode;
  /**
   * The button end content.
   */
  endIcon?: ReactNode;
  /**
   * The native button click event handler.
   * @deprecated - use `onPress` instead.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function useButton(props: UseButtonProps) {
  const groupContext = useButtonGroupContext();
  const isInGroup = !!groupContext;

  const {
    ref,
    as,
    children,
    startIcon: startIconProp,
    endIcon: endIconProp,
    autoFocus,
    className,
    fullWidth = groupContext?.fullWidth ?? false,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "neutral",
    variant = groupContext?.variant ?? "solid",
    disableAnimation = groupContext?.disableAnimation ?? false,
    radius = groupContext?.radius ?? "lg",
    disableRipple = groupContext?.disableRipple ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    isIconOnly = groupContext?.isIconOnly ?? false,
    onPress,
    onClick,
    ...otherProps
  } = props;

  const Component = as || "button";

  const domRef = useDOMRef(ref);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const classNames = useMemo(
    () =>
      button({
        size,
        color,
        variant,
        radius,
        fullWidth,
        isDisabled,
        isInGroup,
        disableAnimation,
        isIconOnly,
        className,
      }),
    [
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isInGroup,
      isIconOnly,
      disableAnimation,
      className,
    ],
  );

  const {onClick: onDripClickHandler, drips} = useDrip();

  const handleDrip = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disableRipple || isDisabled || disableAnimation) return;
    domRef.current && onDripClickHandler(e);
  };

  const {buttonProps: ariaButtonProps, isPressed} = useAriaButton(
    {
      elementType: as,
      isDisabled,
      onPress,
      onClick: chain(onClick, handleDrip),
      ...otherProps,
    } as AriaButtonProps,
    domRef,
  );
  const {isHovered, hoverProps} = useHover({isDisabled});

  const getButtonProps: PropGetter = useCallback(
    () => ({
      "data-disabled": dataAttr(isDisabled),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      ...mergeProps(ariaButtonProps, focusProps, hoverProps, otherProps),
    }),
    [ariaButtonProps, focusProps, otherProps],
  );

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          // @ts-ignore
          "aria-hidden": true,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const startIcon = getIconClone(startIconProp);
  const endIcon = getIconClone(endIconProp);

  return {
    Component,
    children,
    domRef,
    drips,
    classNames,
    startIcon,
    endIcon,
    disableRipple,
    getButtonProps,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
