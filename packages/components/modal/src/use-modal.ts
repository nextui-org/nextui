import type {ModalVariantProps, SlotsToClasses, ModalSlots} from "@nextui-org/theme";
import type {HTMLMotionProps} from "framer-motion";

import {AriaModalOverlayProps, useModalOverlay} from "@react-aria/overlays";
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
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {modal} from "@nextui-org/theme";
import {clsx, ReactRef} from "@nextui-org/shared-utils";
import {useOverlayTrigger} from "@react-aria/overlays";
import {createDOMRef} from "@nextui-org/dom-utils";
import {useOverlayTriggerState} from "@react-stately/overlays";
import {OverlayTriggerProps} from "@react-stately/overlays";
import {mergeRefs, mergeProps} from "@react-aria/utils";

interface Props extends HTMLNextUIProps<"div"> {
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
  motionProps?: HTMLMotionProps<"div">;

  /**
   * Whether the animation should be disabled.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Modal classNames={{
   *    base:"base-classes",
   *    header: "header-classes",
   *    body: "body-classes",
   *    footer: "footer-classes",
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
    ...otherProps
  } = props;

  const Component = as || "section";

  const dialogRef = useRef<HTMLElement>(null);
  const domTriggerRef = useRef<HTMLElement>(null);

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
    onOpenChange,
  });

  const {triggerProps} = useOverlayTrigger({type: "dialog"}, state, triggerRef);

  const {modalProps, underlayProps} = useModalOverlay(originalProps, state, dialogRef);

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      modal({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const getDialogProps: PropGetter = useCallback(
    (props = {}, ref = null) => ({
      ref: mergeRefs(ref, dialogRef),
      ...mergeProps(modalProps, otherProps, props),
      className: slots.base({class: clsx(baseStyles, props.className)}),
      id: dialogId,
      "aria-modal": true,
      "aria-labelledby": headerMounted ? headerId : undefined,
      "aria-describedby": bodyMounted ? bodyId : undefined,
    }),
    [],
  );

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => {
      return {
        ...mergeProps(triggerProps, props),
        className: slots.trigger({class: clsx(classNames?.trigger, props.className)}),
        ref: mergeRefs(_ref, triggerRef),
        "aria-controls": dialogId,
        "aria-haspopup": "dialog",
      };
    },
    [isOpen, dialogId, state, triggerProps, triggerRef],
  );

  const getBackdropProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.backdrop({class: classNames?.backdrop}),
      onClick: () => state.close(),
      ...underlayProps,
      ...props,
    }),
    [slots, classNames, underlayProps],
  );

  return {
    Component,
    slots,
    dialogRef,
    headerId,
    bodyId,
    triggerRef,
    motionProps,
    classNames,
    backdropVariant: originalProps.backdropVariant ?? "opaque",
    isOpen: state.isOpen,
    onClose: state.close,
    disableAnimation,
    setBodyMounted,
    setHeaderMounted,
    getDialogProps,
    getTriggerProps,
    getBackdropProps,
  };
}

export type UseModalReturn = ReturnType<typeof useModal>;
