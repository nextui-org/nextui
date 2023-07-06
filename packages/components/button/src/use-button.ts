import type {ButtonVariantProps} from "@nextui-org/theme";
import type {AriaButtonProps} from "@react-types/button";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ReactNode} from "react";

import {dataAttr} from "@nextui-org/shared-utils";
import {ReactRef} from "@nextui-org/react-utils";
import {MouseEventHandler, useCallback} from "react";
import {useFocusRing} from "@react-aria/focus";
import {chain, mergeProps} from "@react-aria/utils";
import {useDOMRef} from "@nextui-org/react-utils";
import {button} from "@nextui-org/theme";
import {isValidElement, cloneElement, useMemo} from "react";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {useHover} from "@react-aria/interactions";
import {SpinnerProps} from "@nextui-org/spinner";
import {useRipple} from "@nextui-org/ripple";

import {useButtonGroupContext} from "./button-group-context";

export interface UseButtonProps
  extends HTMLNextUIProps<"button", Omit<AriaButtonProps, keyof ButtonVariantProps>>,
    Omit<ButtonVariantProps, "isInGroup"> {
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
  startContent?: ReactNode;
  /**
   * The button end content.
   */
  endContent?: ReactNode;
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
    startContent: startContentProp,
    endContent: endContentProp,
    autoFocus,
    className,
    spinner,
    fullWidth = groupContext?.fullWidth ?? false,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "default",
    variant = groupContext?.variant ?? "solid",
    disableAnimation = groupContext?.disableAnimation ?? false,
    radius = groupContext?.radius,
    disableRipple = groupContext?.disableRipple ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    isIconOnly = groupContext?.isIconOnly ?? false,
    isLoading = false,
    spinnerPlacement = "start",
    onPress,
    onClick,
    ...otherProps
  } = props;

  const Component = as || "button";

  const domRef = useDOMRef(ref);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const styles = useMemo(
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

  const {onClick: onRippleClickHandler, ripples} = useRipple();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disableRipple || isDisabled || disableAnimation) return;
    domRef.current && onRippleClickHandler(e);
  };

  const {buttonProps: ariaButtonProps, isPressed} = useAriaButton(
    {
      elementType: as,
      isDisabled,
      onPress,
      onClick: chain(onClick, handleClick),
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
    }),
    [
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

  const startContent = getIconClone(startContentProp);
  const endContent = getIconClone(endContentProp);

  const spinnerSize = useMemo(() => {
    const buttonSpinnerSizeMap: Record<string, SpinnerProps["size"]> = {
      md: "sm",
      lg: "sm",
      xl: "sm",
    };

    return buttonSpinnerSizeMap[size];
  }, [size]);

  return {
    Component,
    children,
    domRef,
    ripples,
    spinner,
    styles,
    startContent,
    endContent,
    isLoading,
    spinnerPlacement,
    spinnerSize,
    disableRipple,
    getButtonProps,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
