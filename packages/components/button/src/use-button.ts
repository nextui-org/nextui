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
import {SpinnerProps} from "@nextui-org/spinner";

import {useButtonGroupContext} from "./button-group-context";

export interface UseButtonProps
  extends HTMLNextUIProps<"button", Omit<AriaButtonProps, keyof ButtonVariantProps>>,
    Omit<ButtonVariantProps, "isInGroup" | "isInVerticalGroup"> {
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
   * Spinner to display when loading.
   * @see https://nextui.org/components/spinner
   */
  spinner?: ReactNode;
  /**
   * The spinner placement.
   * @default "start"
   */
  spinnerPlacement?: "start" | "end";
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
    spinner,
    fullWidth = groupContext?.fullWidth ?? false,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "neutral",
    variant = groupContext?.variant ?? "solid",
    disableAnimation = groupContext?.disableAnimation ?? false,
    radius = groupContext?.radius ?? "xl",
    disableRipple = groupContext?.disableRipple ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    isIconOnly = groupContext?.isIconOnly ?? false,
    isLoading = false,
    spinnerPlacement = "start",
    onPress,
    onClick,
    style,
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
        isLoading,
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
      isLoading,
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
    (props = {}) => ({
      "data-disabled": dataAttr(isDisabled),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(isPressed),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-loading": dataAttr(isLoading),
      ...mergeProps(ariaButtonProps, focusProps, hoverProps, otherProps, props),
      style: {
        ...style,
        ...props?.style,
        WebkitTapHighlightColor: "transparent",
      },
    }),
    [
      style,
      isLoading,
      isDisabled,
      isFocused,
      isPressed,
      isFocusVisible,
      isHovered,
      ariaButtonProps,
      focusProps,
      hoverProps,
      otherProps,
    ],
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

  const spinnerSize = useMemo(() => {
    return (size === "xs" || size === "sm" ? "xs" : "sm") as SpinnerProps["size"];
  }, [size]);

  return {
    Component,
    children,
    domRef,
    drips,
    spinner,
    classNames,
    startIcon,
    endIcon,
    isLoading,
    spinnerPlacement,
    spinnerSize,
    disableRipple,
    getButtonProps,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
