import type {TooltipVariantProps, SlotsToClasses, TooltipSlots} from "@nextui-org/theme";
import type {AriaTooltipProps} from "@react-types/tooltip";
import type {OverlayTriggerProps} from "@react-types/overlays";
import type {HTMLMotionProps} from "framer-motion";
import type {TooltipPlacement} from "./types";

import {ReactNode, Ref, useEffect, useId, useImperativeHandle} from "react";
import {useTooltipTriggerState} from "@react-stately/tooltip";
import {mergeProps} from "@react-aria/utils";
import {useTooltip as useReactAriaTooltip, useTooltipTrigger} from "@react-aria/tooltip";
import {useOverlayPosition, useOverlay, AriaOverlayProps} from "@react-aria/overlays";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {tooltip} from "@nextui-org/theme";
import {ReactRef, mergeRefs, clsx} from "@nextui-org/shared-utils";
import {createDOMRef} from "@nextui-org/dom-utils";
import {useMemo, useRef, useCallback} from "react";

import {toReactAriaPlacement, getArrowPlacement} from "./utils";

export interface UseTooltipProps
  extends HTMLNextUIProps<"div", TooltipVariantProps>,
    AriaTooltipProps,
    AriaOverlayProps,
    OverlayTriggerProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The children to render. Usually a trigger element.
   */
  children?: ReactNode;
  /**
   * The content of the tooltip.
   */
  content?: string | React.ReactNode;
  /**
   * Whether the tooltip should be disabled, independent from the trigger.
   */
  isDisabled?: boolean;
  /**
   * Whether the tooltip should have an arrow.
   * @default false
   */
  showArrow?: boolean;
  /**
   * The delay time for the tooltip to show up.
   * @default 0
   */
  delay?: number;
  /**
   * The delay time for the tooltip to hide.
   * @default 0
   */
  closeDelay?: number;
  /**
   * The additional offset applied along the main axis between the element and its
   * anchor element.
   * @default 7 (px) - if `showArrow` is true the default value is 10 (px)
   */
  offset?: number;
  /**
   * The additional offset applied along the cross axis between the element and its
   * anchor element.
   * @default 0
   */
  crossOffset?: number;
  /**
   * Whether the element should flip its orientation (e.g. top to bottom or left to right) when
   * there is insufficient room for it to render completely.
   * @default true
   */
  shouldFlip?: boolean;
  /**
   * By default, opens for both focus and hover. Can be made to open only for focus.
   */
  trigger?: "focus";
  /**
   * The placement of the element with respect to its anchor element.
   * @default 'top'
   */
  placement?: TooltipPlacement;
  /**
   * The placement padding that should be applied between the element and its
   * surrounding container.
   * @default 12
   */
  containerPadding?: number;
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
   * <Tooltip styles={{
   *    base:"base-classes",
   *    arrow: "arrow-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<TooltipSlots>;
  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
}

export function useTooltip(originalProps: UseTooltipProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, tooltip.variantKeys);

  const {
    ref,
    as,
    isOpen: isOpenProp,
    content,
    children,
    defaultOpen,
    onOpenChange,
    isDisabled,
    trigger: triggerAction,
    shouldFlip = true,
    containerPadding = 12,
    placement: placementProp = "top",
    delay = 0,
    closeDelay = 0,
    showArrow = false,
    offset = 7,
    crossOffset = 0,
    isDismissable = true,
    shouldCloseOnBlur = false,
    isKeyboardDismissDisabled = false,
    shouldCloseOnInteractOutside,
    className,
    onClose,
    motionProps,
    styles,
    ...otherProps
  } = props;

  const Component = as || "div";

  const state = useTooltipTriggerState({
    delay,
    isDisabled,
    defaultOpen,
    onOpenChange,
  });

  const triggerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const tooltipId = useId();

  const immediate = closeDelay === 0;
  const isOpen = state.isOpen && !isDisabled;

  // Sync ref with overlayRef from passed ref.
  useImperativeHandle(ref, () =>
    // @ts-ignore
    createDOMRef(overlayRef),
  );

  const handleClose = useCallback(() => {
    onClose?.();
    state.close(immediate);
  }, [state, immediate, onClose]);

  // control open state from outside
  useEffect(() => {
    if (isOpenProp === undefined) return;

    if (isOpenProp !== state.isOpen) {
      isOpenProp ? state.open() : handleClose();
    }
  }, [isOpenProp, handleClose]);

  const {triggerProps, tooltipProps: triggerTooltipProps} = useTooltipTrigger(
    {
      isDisabled,
      trigger: triggerAction,
    },
    state,
    triggerRef,
  );

  const {tooltipProps} = useReactAriaTooltip(
    {
      isOpen,
      ...mergeProps(props, triggerTooltipProps),
    },
    state,
  );

  const {
    overlayProps: positionProps,
    arrowProps,
    placement,
  } = useOverlayPosition({
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
      isOpen: isOpen,
      isDismissable: isDismissable && isOpen,
      onClose: handleClose,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
    },
    overlayRef,
  );

  const slots = useMemo(
    () =>
      tooltip({
        ...variantProps,
      }),
    [...Object.values(variantProps)],
  );

  const baseStyles = clsx(styles?.base, className);

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => ({
      ...mergeProps(triggerProps, props),
      ref: mergeRefs(_ref, triggerRef),
      "aria-describedby": isOpen ? tooltipId : undefined,
      onPointerEnter: () => state.open(),
      onPointerLeave: () => isDismissable && state.close(),
    }),
    [triggerProps, isOpen, tooltipId, isDismissable, state],
  );

  const getTooltipProps = useCallback<PropGetter>(
    () => ({
      ref: overlayRef,
      className: slots.base({class: baseStyles}),
      ...mergeProps(tooltipProps, positionProps, overlayProps, otherProps),
      id: tooltipId,
    }),
    [
      baseStyles,
      overlayProps,
      otherProps,
      overlayRef,
      positionProps,
      slots,
      tooltipId,
      tooltipProps,
    ],
  );

  const getArrowProps = useCallback<PropGetter>(
    () => ({
      className: slots.arrow({class: styles?.arrow}),
      "data-placement": getArrowPlacement(placement, placementProp),
      ...arrowProps,
    }),
    [arrowProps, placement, slots, styles],
  );

  return {
    Component,
    content,
    children,
    isOpen,
    triggerRef,
    triggerProps,
    showArrow,
    placement: placementProp,
    disableAnimation: originalProps?.disableAnimation,
    isDisabled,
    motionProps,
    getTriggerProps,
    getTooltipProps,
    getArrowProps,
  };
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>;
