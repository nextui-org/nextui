import type {DrawerVariantProps, SlotsToClasses, DrawerSlots} from "@nextui-org/theme";
import type {HTMLMotionProps} from "framer-motion";

import {AriaModalOverlayProps} from "@react-aria/overlays";
import {useAriaModalOverlay} from "@nextui-org/use-aria-modal-overlay";
import {useCallback, useId, useRef, useState, useMemo, ReactNode} from "react";
import {drawer} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {useFocusRing} from "@react-aria/focus";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {useOverlayTriggerState} from "@react-stately/overlays";
import {OverlayTriggerProps} from "@react-stately/overlays";
import {mergeRefs, mergeProps} from "@react-aria/utils";

interface Props extends HTMLNextUIProps<"section"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"section">;
  /**
   * Determines whether to hide the drawer close button.
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * Custom drawer close button element.
   */
  closeButton?: ReactNode;
  /**
   * Whether the animation should be disabled.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * The container element in which the overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * Whether the scroll should be blocked when the drawer is open.
   * @default true
   */
  shouldBlockScroll?: boolean;
  /**
   *  Callback fired when the drawer is closed.
   */
  onClose?: () => void;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Drawer classNames={{
   *    wrapper: "wrapper-classes", // main drawer wrapper
   *    backdrop: "backdrop-classes",
   *    base:"base-classes", // drawer content wrapper
   *    base:"content-classes", // drawer content
   *    header: "header-classes", // drawer header
   *    body: "body-classes", // drawer body
   *    footer: "footer-classes", // drawer footer
   *    closeButton: "close-button-classes", // drawer close button
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<DrawerSlots>;
}

export type UseDrawerProps = Props &
  OverlayTriggerProps &
  AriaModalOverlayProps &
  DrawerVariantProps;

export function useDrawer(originalProps: UseDrawerProps) {
  const {placement = "right"} = originalProps;
  const [props, variantProps] = mapPropsVariants(originalProps, drawer.variantKeys);
  const {
    ref,
    as,
    className,
    classNames,
    disableAnimation = false,
    isOpen,
    defaultOpen,
    onOpenChange,
    motionProps,
    closeButton,
    isDismissable = true,
    hideCloseButton = false,
    shouldBlockScroll = true,
    portalContainer,
    isKeyboardDismissDisabled = false,
    onClose,
    ...otherProps
  } = props;

  const Component = as || "section";

  const domRef = useDOMRef(ref);
  const closeButtonRef = useRef<HTMLElement>(null);

  const [headerMounted, setHeaderMounted] = useState(false);
  const [bodyMounted, setBodyMounted] = useState(false);

  const dialogId = useId();
  const headerId = useId();
  const bodyId = useId();

  const state = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
  });

  const {modalProps: drawerProps, underlayProps} = useAriaModalOverlay(
    {
      isDismissable,
      isKeyboardDismissDisabled,
    },
    state,
    domRef,
  );

  const {buttonProps: closeButtonProps} = useAriaButton({onPress: state.close}, closeButtonRef);
  const {isFocusVisible: isCloseButtonFocusVisible, focusProps: closeButtonFocusProps} =
    useFocusRing();

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      drawer({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  slots.base();

  const baseClassNames = slots.base({class: clsx(baseStyles, props.className)});

  const getDialogProps: PropGetter = (props = {}, ref = null) => ({
    ref: mergeRefs(ref, domRef),
    ...mergeProps(drawerProps, otherProps, props),
    className: slots.content({class: clsx(classNames?.content, props.className)}),
    id: dialogId,
    "data-open": dataAttr(state.isOpen),
    "data-dismissable": dataAttr(isDismissable),
    "aria-modal": dataAttr(true),
    "aria-labelledby": headerMounted ? headerId : undefined,
    "aria-describedby": bodyMounted ? bodyId : undefined,
  });

  const getBackdropProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.backdrop({class: classNames?.backdrop}),
      onClick: () => state.close(),
      ...underlayProps,
      ...props,
    }),
    [slots, classNames, underlayProps],
  );

  const getCloseButtonProps: PropGetter = () => {
    return {
      role: "button",
      tabIndex: 0,
      "aria-label": "Close",
      "data-focus-visible": dataAttr(isCloseButtonFocusVisible),
      className: slots.closeButton({class: classNames?.closeButton}),
      ...mergeProps(closeButtonProps, closeButtonFocusProps),
    };
  };

  return {
    Component,
    slots,
    domRef,
    headerId,
    bodyId,
    placement,
    motionProps,
    classNames,
    baseClassNames,
    isDismissable,
    closeButton,
    hideCloseButton,
    portalContainer,
    shouldBlockScroll,
    backdrop: originalProps.backdrop ?? "opaque",
    isOpen: state.isOpen,
    onClose: state.close,
    disableAnimation,
    setBodyMounted,
    setHeaderMounted,
    getDialogProps,
    getBackdropProps,
    getCloseButtonProps,
  };
}

export type UseDrawerReturn = ReturnType<typeof useDrawer>;
