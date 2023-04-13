import type {PopoverVariantProps, SlotsToClasses, PopoverSlots} from "@nextui-org/theme";
import type {HTMLMotionProps} from "framer-motion";
import type {OverlayPlacement} from "@nextui-org/aria-utils";
import type {RefObject, Ref} from "react";

import {OverlayTriggerState, useOverlayTriggerState} from "@react-stately/overlays";
import {useFocusRing} from "@react-aria/focus";
import {
  AriaPopoverProps,
  useOverlayTrigger,
  usePopover as useReactAriaPopover,
} from "@react-aria/overlays";
import {OverlayTriggerProps} from "@react-types/overlays";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {toReactAriaPlacement, getArrowPlacement} from "@nextui-org/aria-utils";
import {popover} from "@nextui-org/theme";
import {mergeProps, mergeRefs} from "@react-aria/utils";
import {createDOMRef} from "@nextui-org/dom-utils";
import {ReactRef, clsx} from "@nextui-org/shared-utils";
import {useId, useMemo, useCallback, useImperativeHandle, useRef} from "react";

export interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The controlled state of the popover.
   */
  state?: OverlayTriggerState;
  /**
   * A ref for the scrollable region within the overlay.
   * @default popoverRef
   */
  scrollRef?: RefObject<HTMLElement>;
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
   * Whether the element should render an arrow.
   * @default false
   */
  showArrow?: boolean;
  /**
   * Type of overlay that is opened by the trigger.
   */
  triggerType?: "dialog" | "menu" | "listbox" | "tree" | "grid";
  /**
   * The properties passed to the underlying `Collapse` component.
   */
  motionProps?: HTMLMotionProps<"div">;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Popover classNames={{
   *    base:"base-classes",
   *    trigger: "trigger-classes",
   *    arrow: "arrow-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<PopoverSlots>;
}

export type UsePopoverProps = Props &
  Omit<AriaPopoverProps, "placement" | "triggerRef" | "popoverRef"> &
  OverlayTriggerProps &
  PopoverVariantProps;

export function usePopover(originalProps: UsePopoverProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, popover.variantKeys);

  const {
    ref,
    as,
    children,
    state: stateProp,
    triggerRef: triggerRefProp,
    scrollRef,
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
    isKeyboardDismissDisabled,
    motionProps,
    className,
    classNames,
    ...otherProps
  } = props;

  const Component = as || "div";
  const popoverId = useId();

  const popoverRef = useRef<HTMLDivElement>(null);
  const domTriggerRef = useRef<HTMLElement>(null);

  const triggerRef = triggerRefProp || domTriggerRef;

  const disableAnimation = originalProps.disableAnimation ?? false;

  // Sync ref with popoverRef from passed ref.
  useImperativeHandle(ref, () =>
    // @ts-ignore
    createDOMRef(popoverRef),
  );

  const innerState = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange,
  });

  const state = stateProp || innerState;

  const {popoverProps, underlayProps, arrowProps, placement} = useReactAriaPopover(
    {
      triggerRef,
      popoverRef,
      placement: toReactAriaPlacement(placementProp),
      offset: showArrow ? offset + 3 : offset,
      scrollRef,
      crossOffset,
      shouldFlip,
      containerPadding,
      isKeyboardDismissDisabled,
    },
    state,
  );

  const {triggerProps} = useOverlayTrigger({type: triggerType}, state, triggerRef);

  const {isFocusVisible, focusProps} = useFocusRing();

  const slots = useMemo(
    () =>
      popover({
        ...variantProps,
        isFocusVisible,
      }),
    [...Object.values(variantProps), isFocusVisible],
  );

  const baseStyles = clsx(classNames?.base, className);

  const getPopoverProps: PropGetter = (props = {}) => ({
    ref: popoverRef,
    ...mergeProps(popoverProps, otherProps, props),
    id: popoverId,
  });

  const getDialogProps: PropGetter = (props = {}) => ({
    className: slots.base({class: clsx(baseStyles, props.className)}),
    ...mergeProps(focusProps, props),
    style: {
      // this prevent the dialog to have a default outline
      outline: "none",
    },
  });

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => {
      return {
        ...mergeProps(triggerProps, props),
        className: slots.trigger({class: clsx(classNames?.trigger, props.className)}),
        ref: mergeRefs(_ref, triggerRef),
        "aria-controls": popoverId,
        "aria-haspopup": "dialog",
      };
    },
    [isOpen, popoverId, state, triggerProps, triggerRef],
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

  const getArrowProps = useCallback<PropGetter>(
    () => ({
      className: slots.arrow({class: classNames?.arrow}),
      "data-placement": getArrowPlacement(placement, placementProp),
      ...arrowProps,
    }),
    [arrowProps, placement, placementProp, slots, classNames],
  );

  return {
    Component,
    children,
    classNames,
    showArrow,
    triggerRef,
    placement: placementProp,
    isOpen: state.isOpen,
    onClose: state.close,
    disableAnimation,
    backdropVariant: originalProps.backdropVariant ?? "transparent",
    motionProps,
    focusProps,
    getBackdropProps,
    getPopoverProps,
    getTriggerProps,
    getArrowProps,
    getDialogProps,
  };
}

export type UsePopoverReturn = ReturnType<typeof usePopover>;
