import type {ModalVariantProps, SlotsToClasses, ModalSlots} from "@nextui-org/theme";
import type {HTMLMotionProps} from "framer-motion";

import {AriaModalOverlayProps} from "@react-aria/overlays";
import {useAriaModalOverlay} from "@nextui-org/use-aria-modal-overlay";
import {
  RefObject,
  Ref,
  useCallback,
  useId,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
} from "react";
import {modal} from "@nextui-org/theme";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {useAriaButton} from "@nextui-org/use-aria-button";
import {useFocusRing} from "@react-aria/focus";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {ReactRef} from "@nextui-org/react-utils";
import {useOverlayTrigger} from "@react-aria/overlays";
import {createDOMRef} from "@nextui-org/react-utils";
import {useOverlayTriggerState} from "@react-stately/overlays";
import {OverlayTriggerProps} from "@react-stately/overlays";
import {mergeRefs, mergeProps} from "@react-aria/utils";

interface Props extends HTMLNextUIProps<"section"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The ref for the element which the overlay positions itself with respect to.
   */
  triggerRef?: RefObject<HTMLElement>;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"section">;
  /**
   * Determines if the modal should have a close button in the top right corner.
   * @default true
   */
  showCloseButton?: boolean;
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
   *  Callback fired when the modal is closed.
   */
  onClose?: () => void;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Modal classNames={{
   *    wrapper: "wrapper-classes", // main modal wrapper
   *    backdrop: "backdrop-classes",
   *    base:"base-classes", // modal content wrapper
   *    header: "header-classes", // modal header
   *    body: "body-classes", // modal body
   *    footer: "footer-classes", // modal footer
   *    closeButton: "close-button-classes", // modal close button
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ModalSlots>;
}

export type UseModalProps = Props & OverlayTriggerProps & AriaModalOverlayProps & ModalVariantProps;

export function useModal(originalProps: UseModalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, modal.variantKeys);

  const {
    ref,
    as,
    className,
    classNames,
    triggerRef: triggerRefProp,
    disableAnimation = false,
    isOpen,
    defaultOpen,
    onOpenChange,
    motionProps,
    isDismissable = true,
    showCloseButton = true,
    portalContainer,
    isKeyboardDismissDisabled = false,
    onClose,
    ...otherProps
  } = props;

  const Component = as || "section";

  const dialogRef = useRef<HTMLElement>(null);
  const domTriggerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLElement>(null);

  const [headerMounted, setHeaderMounted] = useState(false);
  const [bodyMounted, setBodyMounted] = useState(false);

  const triggerRef = triggerRefProp || domTriggerRef;

  const dialogId = useId();
  const headerId = useId();
  const bodyId = useId();

  // Sync ref with popoverRef from passed ref.
  useImperativeHandle(ref, () =>
    // @ts-ignore
    createDOMRef(dialogRef),
  );

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

  const {triggerProps} = useOverlayTrigger({type: "dialog"}, state, triggerRef);

  const {modalProps, underlayProps} = useAriaModalOverlay(
    {
      isDismissable,
      isKeyboardDismissDisabled,
    },
    state,
    dialogRef,
  );

  const {buttonProps: closeButtonProps} = useAriaButton({onPress: state.close}, closeButtonRef);
  const {
    isFocusVisible: isCloseButtonFocusVisible,
    focusProps: closeButtonFocusProps,
  } = useFocusRing();

  const baseStyles = clsx(className, classNames?.base);

  const slots = useMemo(
    () =>
      modal({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const getDialogProps: PropGetter = (props = {}, ref = null) => ({
    ref: mergeRefs(ref, dialogRef),
    ...mergeProps(modalProps, otherProps, props),
    className: slots.base({class: clsx(baseStyles, props.className)}),
    id: dialogId,
    "data-open": dataAttr(state.isOpen),
    "aria-modal": true,
    "aria-labelledby": headerMounted ? headerId : undefined,
    "aria-describedby": bodyMounted ? bodyId : undefined,
  });

  const getTriggerProps: PropGetter = (props = {}, _ref: Ref<any> | null | undefined = null) => ({
    ...mergeProps(triggerProps, props),
    className: slots.trigger({class: clsx(classNames?.trigger, props.className)}),
    ref: mergeRefs(_ref, triggerRef),
    "aria-controls": dialogId,
    "aria-haspopup": "dialog",
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
    dialogRef,
    headerId,
    bodyId,
    triggerRef,
    motionProps,
    classNames,
    isDismissable,
    showCloseButton,
    portalContainer,
    backdrop: originalProps.backdrop ?? "opaque",
    isOpen: state.isOpen,
    onClose: state.close,
    disableAnimation,
    setBodyMounted,
    setHeaderMounted,
    getDialogProps,
    getTriggerProps,
    getBackdropProps,
    getCloseButtonProps,
  };
}

export type UseModalReturn = ReturnType<typeof useModal>;
