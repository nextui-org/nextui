import type {ChipVariantProps, ChipSlots, SlotsToClasses} from "@nextui-org/theme";
import type {ReactNode} from "react";

import {HTMLNextUIProps, mapPropsVariants} from "@nextui-org/system";
import {mergeProps} from "@react-aria/utils";
import {usePress} from "@react-aria/interactions";
import {useFocusRing} from "@react-aria/focus";
import {chip} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useMemo, isValidElement, cloneElement} from "react";

export interface UseChipProps extends HTMLNextUIProps<"div">, ChipVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Element to be rendered in the left side of the chip.
   */
  leftContent?: React.ReactNode;
  /**
   * Element to be rendered in the right side of the chip.
   */
  rightContent?: React.ReactNode;
  /**
   * Classname or List of classes to change the styles of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Chip styles={{
   *    base:"base-classes",
   *    label: "label-classes",
   *    closeButton: "close-button-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<ChipSlots>;
  /**
   * Callback fired when the chip is closed. if you pass this prop,
   * the chip will display a close button (rightContent).
   */
  onClose?: () => void;
}

export function useChip(originalProps: UseChipProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, chip.variantKeys);

  const {ref, as, children, leftContent, rightContent, onClose, styles, className, ...otherProps} =
    props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const baseStyles = clsx(styles?.base, className);

  const isCloseable = !!onClose;

  const {focusProps: closeFocusProps, isFocusVisible: isCloseButtonFocusVisible} = useFocusRing();

  const slots = useMemo(
    () =>
      chip({
        ...variantProps,
        isCloseButtonFocusVisible,
      }),
    [...Object.values(variantProps), isCloseButtonFocusVisible, className],
  );

  const {pressProps: closePressProps} = usePress({
    isDisabled: !!originalProps?.isDisabled,
    onPress: onClose,
  });

  const getChipProps = () => {
    return {
      ref: domRef,
      className: slots.base({class: baseStyles}),
      ...otherProps,
    };
  };

  const getCloseButtonProps = () => {
    return {
      role: "button",
      tabIndex: 0,
      className: slots.closeButton({class: styles?.closeButton}),
      ...mergeProps(closePressProps, closeFocusProps),
    };
  };

  const getContentClone = (content: ReactNode) =>
    isValidElement(content)
      ? cloneElement(content, {
          className: clsx("w-full h-4/5", content.props.className),
        })
      : null;

  return {
    Component,
    children,
    slots,
    styles,
    leftContent: getContentClone(leftContent),
    rightContent: getContentClone(rightContent),
    isCloseable,
    getCloseButtonProps,
    getChipProps,
  };
}

export type UseChipReturn = ReturnType<typeof useChip>;
