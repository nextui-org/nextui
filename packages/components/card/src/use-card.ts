import type {FocusableProps, PressEvents} from "@react-types/shared";
import type {SlotsToClasses, CardSlots, CardReturnType, CardVariantProps} from "@nextui-org/theme";
import type {AriaButtonProps} from "@nextui-org/use-aria-button";

import {card} from "@nextui-org/theme";
import {MouseEvent, useCallback, useMemo} from "react";
import {chain, mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {useHover} from "@react-aria/interactions";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {ReactRef, filterDOMProps} from "@nextui-org/react-utils";
import {useDOMRef} from "@nextui-org/react-utils";
import {useRipple} from "@nextui-org/ripple";

export interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref: ReactRef<HTMLDivElement | null>;
  /**
   * Whether the card should show a ripple animation on press, this prop is ignored if `disableAnimation` is true or `isPressable` is false.
   * @default false
   */
  disableRipple?: boolean;

  /**
   * Whether the card should allow text selection on press. (only for pressable cards)
   * @default true
   */
  allowTextSelectionOnPress?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Card classNames={{
   *    base:"base-classes",
   *    header: "dot-classes",
   *    body: "content-classes",
   *    footer: "avatar-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CardSlots>;
}

export type UseCardProps = Props & PressEvents & FocusableProps & CardVariantProps;

export type ContextType = {
  slots: CardReturnType;
  classNames?: SlotsToClasses<CardSlots>;
  isDisabled?: CardVariantProps["isDisabled"];
  isFooterBlurred?: CardVariantProps["isFooterBlurred"];
  disableAnimation?: CardVariantProps["disableAnimation"];
  fullWidth?: CardVariantProps["fullWidth"];
};

export function useCard(originalProps: UseCardProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, card.variantKeys);

  const {
    ref,
    as,
    children,
    disableRipple = false,
    onClick,
    onPress,
    autoFocus,
    className,
    classNames,
    allowTextSelectionOnPress = true,
    ...otherProps
  } = props;

  const domRef = useDOMRef<HTMLDivElement>(ref);
  const Component = as || (originalProps.isPressable ? "button" : "div");

  const baseStyles = clsx(classNames?.base, className);

  const {onClick: onRippleClickHandler, ripples} = useRipple();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!originalProps.disableAnimation && !disableRipple && domRef.current) {
      onRippleClickHandler(e);
    }
  };

  const {buttonProps, isPressed} = useAriaButton(
    {
      onPress,
      elementType: as,
      isDisabled: !originalProps.isPressable,
      onClick: chain(onClick, handleClick),
      allowTextSelectionOnPress,
      ...otherProps,
    } as unknown as AriaButtonProps<"button">,
    domRef,
  );

  const {hoverProps, isHovered} = useHover({
    isDisabled: !originalProps.isHoverable,
    ...otherProps,
  });

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const slots = useMemo(
    () =>
      card({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const context = useMemo<ContextType>(
    () => ({
      isDisabled: originalProps.isDisabled,
      isFooterBlurred: originalProps.isFooterBlurred,
      disableAnimation: originalProps.disableAnimation,
      fullWidth: originalProps.fullWidth,
      slots,
      classNames,
    }),
    [
      slots,
      classNames,
      originalProps.isDisabled,
      originalProps.isFooterBlurred,
      originalProps.disableAnimation,
      originalProps.fullWidth,
    ],
  );

  const getCardProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        ref: domRef,
        className: slots.base({class: baseStyles}),
        tabIndex: originalProps.isPressable ? 0 : -1,
        "data-hover": dataAttr(isHovered),
        "data-pressed": dataAttr(isPressed),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-disabled": dataAttr(originalProps.isDisabled),
        ...mergeProps(
          originalProps.isPressable ? {...buttonProps, ...focusProps, role: "button"} : {},
          originalProps.isHoverable ? hoverProps : {},
          filterDOMProps(otherProps),
          filterDOMProps(props),
        ),
      };
    },
    [
      domRef,
      slots,
      baseStyles,
      originalProps.isPressable,
      originalProps.isHoverable,
      originalProps.isDisabled,
      isHovered,
      isPressed,
      isFocusVisible,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps,
    ],
  );

  return {
    context,
    domRef,
    Component,
    classNames,
    children,
    ripples,
    isHovered,
    isPressed,
    isPressable: originalProps.isPressable,
    isHoverable: originalProps.isHoverable,
    disableAnimation: originalProps.disableAnimation,
    disableRipple,
    handleClick,
    isFocusVisible,
    getCardProps,
  };
}

export type UseCardReturn = ReturnType<typeof useCard>;
