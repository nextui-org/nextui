import type {ChipVariantProps, ChipSlots, SlotsToClasses} from "@nextui-org/theme";
import type {ReactNode} from "react";

import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {chip} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useMemo, isValidElement, cloneElement} from "react";
import {PressEvent} from "@react-types/shared";

export interface UseChipProps extends HTMLNextUIProps<"div">, ChipVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Avatar to be rendered in the left side of the chip.
   */
  avatar?: React.ReactNode;
  /**
   * Element to be rendered in the left side of the chip.
   * this props overrides the `avatar` prop.
   */
  startContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the chip.
   * if you pass this prop and the `onClose` prop, the passed element
   * will have the close button props and it will be rendered instead of the
   * default close button.
   */
  endContent?: React.ReactNode;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Chip classNames={{
   *    base:"base-classes",
   *    dot: "dot-classes",
   *    content: "content-classes",
   *    avatar: "avatar-classes",
   *    closeButton: "close-button-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ChipSlots>;
  /**
   * Callback fired when the chip is closed. if you pass this prop,
   * the chip will display a close button (endContent).
   * @param e PressEvent
   */
  onClose?: (e: PressEvent) => void;
}

export function useChip(originalProps: UseChipProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, chip.variantKeys);

  const {
    ref,
    as,
    children,
    avatar,
    startContent,
    endContent,
    onClose,
    classNames,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const baseStyles = clsx(className, classNames?.base);

  const isCloseable = !!onClose;
  const isDotVariant = originalProps.variant === "dot";

  const {focusProps: closeFocusProps, isFocusVisible: isCloseButtonFocusVisible} = useFocusRing();

  const isOneChar = useMemo(() => typeof children === "string" && children?.length === 1, [
    children,
  ]);

  const hasStartContent = useMemo(() => !!avatar || !!startContent, [avatar, startContent]);
  const hasEndContent = useMemo(() => !!endContent || isCloseable, [endContent, isCloseable]);

  const slots = useMemo(
    () =>
      chip({
        ...variantProps,
        hasStartContent,
        hasEndContent,
        isOneChar,
        isCloseButtonFocusVisible,
      }),
    [
      ...Object.values(variantProps),
      isCloseButtonFocusVisible,
      hasStartContent,
      hasEndContent,
      isOneChar,
    ],
  );

  const {pressProps: closePressProps} = usePress({
    isDisabled: !!originalProps?.isDisabled,
    onPress: onClose,
  });

  const getChipProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...otherProps,
    };
  };

  const getCloseButtonProps: PropGetter = () => {
    return {
      role: "button",
      tabIndex: 0,
      className: slots.closeButton({class: classNames?.closeButton}),
      ...mergeProps(closePressProps, closeFocusProps),
    };
  };

  const getAvatarClone = (avatar: ReactNode) => {
    if (!isValidElement(avatar)) return null;

    return cloneElement(avatar, {
      // @ts-ignore
      className: slots.avatar({class: classNames?.avatar}),
    });
  };

  const getContentClone = (content: ReactNode) =>
    isValidElement(content)
      ? cloneElement(content, {
          // @ts-ignore
          className: clsx("max-h-[80%]", content.props.className),
        })
      : null;

  return {
    Component,
    children,
    slots,
    classNames,
    isDot: isDotVariant,
    isCloseable,
    startContent: getAvatarClone(avatar) || getContentClone(startContent),
    endContent: getContentClone(endContent),
    getCloseButtonProps,
    getChipProps,
  };
}

export type UseChipReturn = ReturnType<typeof useChip>;
