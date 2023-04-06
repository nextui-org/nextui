import type {PopoverVariantProps, SlotsToClasses, PopoverSlots} from "@nextui-org/theme";
import type {HTMLMotionProps} from "framer-motion";
import type {OverlayPlacement, OverlayOptions} from "@nextui-org/aria-utils";
import type {RefObject, Ref} from "react";

import {useOverlayTriggerState} from "@react-stately/overlays";
import {
  AriaOverlayProps,
  useOverlayTrigger,
  useOverlayPosition,
  useOverlay,
  useModal,
} from "@react-aria/overlays";
import {useDialog} from "@react-aria/dialog";
import {OverlayTriggerProps} from "@react-types/overlays";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {toReactAriaPlacement, getArrowPlacement} from "@nextui-org/aria-utils";
import {useFocusRing} from "@react-aria/focus";
import {popover} from "@nextui-org/theme";
import {chain, mergeProps, mergeRefs} from "@react-aria/utils";
import {createDOMRef} from "@nextui-org/dom-utils";
import {ReactRef, clsx} from "@nextui-org/shared-utils";
import {useId, useMemo, useCallback, useImperativeHandle, useRef, useEffect} from "react";

export interface Props extends HTMLNextUIProps<"div", PopoverVariantProps> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The ref for the element which the overlay positions itself with respect to.
   */
  triggerRef?: RefObject<HTMLElement>;
  /**
   * The placement of the element with respect to its anchor element.
   * @default 'top'
   */
  placement?: OverlayPlacement;
  /**
   * Type of overlay that is opened by the trigger.
   */
  triggerType?: "dialog" | "menu" | "listbox" | "tree" | "grid";
  /** Whether the element will be auto focused. */
  autoFocus?: boolean;
  /**
   * The properties passed to the underlying `Collapse` component.
   */
  motionProps?: HTMLMotionProps<"div">;
  /**
   * Classname or List of classes to change the styles of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Popover styles={{
   *    base:"base-classes",
   *    arrow: "arrow-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<PopoverSlots>;
  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
}

export type UsePopoverProps = Props & AriaOverlayProps & OverlayTriggerProps & OverlayOptions;

export function usePopover(originalProps: UsePopoverProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, popover.variantKeys);

  const {
    ref,
    as,
    children,
    triggerRef: triggerRefProp,
    isOpen,
    defaultOpen,
    onOpenChange,
    shouldFlip = true,
    containerPadding = 12,
    placement: placementProp = "top",
    triggerType = "dialog",
    showArrow = false,
    offset = 7,
    crossOffset = 0,
    isDismissable = true,
    shouldCloseOnBlur = true,
    isKeyboardDismissDisabled = false,
    shouldCloseOnInteractOutside,
    autoFocus = false,
    motionProps,
    className,
    styles,
    onClose,
    ...otherProps
  } = props;

  const Component = as || "div";
  const popoverId = useId();

  const overlayRef = useRef<HTMLDivElement>(null);
  const domTriggerRef = useRef<HTMLElement>(null);

  const triggerRef = triggerRefProp || domTriggerRef;

  // Sync ref with overlayRef from passed ref.
  useImperativeHandle(ref, () =>
    // @ts-ignore
    createDOMRef(overlayRef),
  );

  const {isFocusVisible, focusProps} = useFocusRing({autoFocus});

  const state = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange,
  });

  const {triggerProps, overlayProps: overlayTriggerProps} = useOverlayTrigger(
    {type: triggerType},
    state,
    triggerRef,
  );

  const {overlayProps: positionProps, arrowProps, placement} = useOverlayPosition({
    isOpen: isOpen,
    targetRef: triggerRef,
    placement: toReactAriaPlacement(placementProp),
    overlayRef,
    offset: showArrow ? offset + 3 : offset,
    crossOffset,
    shouldFlip,
    containerPadding,
  });

  const {overlayProps} = useOverlay(
    {
      onClose,
      isOpen: state.isOpen,
      isDismissable: isDismissable && state.isOpen,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
    },
    overlayRef,
  );

  const {modalProps} = useModal({isDisabled: true});

  const {dialogProps} = useDialog(
    {
      role: "dialog",
    },
    overlayRef,
  );

  const handleClose = useCallback(() => {
    onClose?.();
    state.close();
  }, [state, onClose]);

  // control open state from outside
  useEffect(() => {
    if (isOpen === undefined) return;

    if (isOpen !== state.isOpen) {
      isOpen ? state.open() : handleClose();
    }
  }, [isOpen, handleClose]);

  const slots = useMemo(
    () =>
      popover({
        ...variantProps,
        isFocusVisible,
      }),
    [...Object.values(variantProps), isFocusVisible],
  );

  const baseStyles = clsx(styles?.base, className);

  const getPopoverProps: PropGetter = (props = {}, _ref: Ref<any> | null | undefined = null) => ({
    ref: mergeRefs(_ref, overlayRef),
    className: slots.base({class: baseStyles}),
    ...mergeProps(
      overlayTriggerProps,
      overlayProps,
      modalProps,
      dialogProps,
      positionProps,
      focusProps,
      otherProps,
      props,
    ),
    id: popoverId,
  });

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => ({
      ...mergeProps(triggerProps, props),
      ref: mergeRefs(_ref, triggerRef),
      "aria-describedby": isOpen ? popoverId : undefined,
      onClick: chain(props.onClick, triggerProps.onPress),
    }),
    [isOpen, popoverId, triggerProps, triggerRef],
  );

  const getArrowProps = useCallback<PropGetter>(
    () => ({
      className: slots.arrow({class: styles?.arrow}),
      "data-placement": getArrowPlacement(placement, placementProp),
      ...arrowProps,
    }),
    [arrowProps, placement, placementProp, slots, styles],
  );

  return {
    Component,
    children,
    styles,
    showArrow,
    placement: placementProp,
    isOpen: state.isOpen,
    onClose: handleClose,
    disableAnimation: originalProps.disableAnimation,
    motionProps,
    getPopoverProps,
    getTriggerProps,
    getArrowProps,
  };
}

export type UsePopoverReturn = ReturnType<typeof usePopover>;
