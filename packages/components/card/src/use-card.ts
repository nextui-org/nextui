import type {PressEvents, PressEvent, FocusableProps} from "@react-types/shared";

import {MouseEvent, useCallback} from "react";
import {mergeProps} from "@react-aria/utils";
import {useFocusRing} from "@react-aria/focus";
import {usePress, useHover} from "@react-aria/interactions";
import {HTMLNextUIProps} from "@nextui-org/system";
import {NormalWeights, ReactRef} from "@nextui-org/shared-utils";
import {useDOMRef, IFocusRingAria} from "@nextui-org/dom-utils";
import {useDrip} from "@nextui-org/drip";

export interface UseCardProps extends HTMLNextUIProps<"div", PressEvents & FocusableProps> {
  /**
   * The card ref.
   */
  ref: ReactRef<HTMLDivElement | null>;
  /**
   * The card variant style.
   * @default "shadow"
   */
  variant?: "shadow" | "flat" | "bordered";
  /**
   * The border weight of the `bordered` variant card.
   * @default "normal"
   */
  borderWeight?: NormalWeights;
  /**
   * Whether the card should allow users to interact with the card.
   * @default false
   */
  isPressable?: boolean;
  /**
   * Whether the card can be hovered by the user.
   * @default false
   */
  isHoverable?: boolean;
  /**
   * Whether the card should show a ripple animation on press
   * @default false
   */
  disableRipple?: boolean;
  // @deprecated - use `onPress` instead
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Whether the card is animated.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Whether the card should allow text selection on press. (only for pressable cards)
   * @default true
   */
  allowTextSelectionOnPress?: boolean;
}

export function useCard(props: UseCardProps) {
  const {
    ref,
    children,
    disableAnimation = false,
    disableRipple = false,
    variant = "shadow",
    isHoverable = false,
    borderWeight = "light",
    isPressable = false,
    onClick: deprecatedOnClick,
    onPress,
    autoFocus,
    className,
    allowTextSelectionOnPress = true,
    ...otherProps
  } = props;

  const cardRef = useDOMRef<HTMLDivElement>(ref);

  const {onClick: onDripClickHandler, ...dripBindings} = useDrip(false, cardRef);

  const handleDrip = (e: MouseEvent<HTMLDivElement> | PressEvent | Event) => {
    if (!disableAnimation && !disableRipple && cardRef.current) {
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
      console.warn("onClick is deprecated, please use onPress");
    }
    onPress?.(e);
  };

  const {isPressed, pressProps} = usePress({
    isDisabled: !isPressable,
    onPress: handlePress,
    allowTextSelectionOnPress,
    ...otherProps,
  });

  const {hoverProps, isHovered} = useHover({
    isDisabled: !isHoverable,
    ...otherProps,
  });

  const {isFocusVisible, focusProps}: IFocusRingAria<Pick<UseCardProps, "css">> = useFocusRing({
    autoFocus,
  });

  const getCardProps = useCallback(
    (props = {}) => {
      return {
        ...mergeProps(
          isPressable ? {...pressProps, ...focusProps} : {},
          isHoverable ? hoverProps : {},
          otherProps,
          props,
        ),
      };
    },
    [isPressable, isHoverable, pressProps, focusProps, hoverProps, otherProps],
  );

  return {
    cardRef,
    variant,
    children,
    borderWeight,
    isPressable,
    isHovered,
    isPressed,
    disableAnimation,
    disableRipple,
    dripBindings,
    onDripClickHandler,
    isFocusVisible,
    className,
    getCardProps,
  };
}

export type UseCardReturn = ReturnType<typeof useCard>;
