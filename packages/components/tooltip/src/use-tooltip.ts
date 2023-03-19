import type {TooltipVariantProps} from "@nextui-org/theme";
import type {AriaTooltipProps} from "@react-types/tooltip";
import type {OverlayTriggerProps} from "@react-types/overlays";
import type {ReactNode, Ref} from "react";
import type {HTMLMotionProps} from "framer-motion";
import type {TooltipPlacement} from "./types";

import {useTooltipTriggerState} from "@react-stately/tooltip";
import {mergeProps} from "@react-aria/utils";
import {useTooltip as useReactAriaTooltip, useTooltipTrigger} from "@react-aria/tooltip";
import {useOverlayPosition, useOverlay, AriaOverlayProps} from "@react-aria/overlays";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {tooltip} from "@nextui-org/theme";
import {ReactRef, mergeRefs} from "@nextui-org/shared-utils";
import {useMemo, useRef, useCallback} from "react";

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
   * @default 7 (px)
   */
  offset?: number;
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
  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
}

export function useTooltip(originalProps: UseTooltipProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, tooltip.variantKeys);

  const {
    ref,
    as,
    isOpen,
    content,
    children,
    defaultOpen,
    onOpenChange,
    isDisabled,
    trigger: triggerAction = "focus",
    shouldFlip = true,
    containerPadding = 12,
    placement: placementProp = "top",
    delay = 0,
    closeDelay = 0,
    offset = 7,
    isDismissable = true,
    shouldCloseOnBlur = false,
    isKeyboardDismissDisabled = false,
    shouldCloseOnInteractOutside,
    className,
    onClose,
    motionProps,
    ...otherProps
  } = props;

  const Component = as || "div";

  const state = useTooltipTriggerState({
    delay,
    isDisabled,
    isOpen,
    defaultOpen,
    onOpenChange,
  });

  const triggerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLElement>(null);
  const domRef = mergeRefs(overlayRef, ref);

  const immediate = closeDelay === 0;

  const handleClose = useCallback(() => {
    onClose?.();
    state.close(immediate);
  }, [state, immediate, onClose]);

  const {triggerProps, tooltipProps: triggerTooltipProps} = useTooltipTrigger(
    {
      delay,
      isDisabled,
      trigger: triggerAction,
    },
    state,
    triggerRef,
  );

  const {tooltipProps} = useReactAriaTooltip(mergeProps(props, triggerTooltipProps), state);

  tooltipProps.onPointerLeave = () => {
    state.close(immediate);
  };

  const {
    overlayProps: positionProps,
    // arrowProps,
    // placement,
  } = useOverlayPosition({
    isOpen: state.isOpen,
    targetRef: triggerRef,
    placement: placementProp,
    overlayRef,
    offset,
    shouldFlip,
    containerPadding,
  });

  const {overlayProps} = useOverlay(
    {
      isOpen: state.isOpen,
      isDismissable: isDismissable && state.isOpen,
      onClose: handleClose,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
    },
    overlayRef,
  );

  const styles = useMemo(
    () =>
      tooltip({
        ...variantProps,
        className,
      }),
    [...Object.values(variantProps), className],
  );

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => ({
      ...mergeProps(triggerProps, props),
      ref: mergeRefs(triggerRef, _ref),
      onPointerEnter: () => state.open(),
      onPointerLeave: () => isDismissable && state.close(),
    }),
    [isDismissable, triggerRef, triggerProps],
  );

  const getTooltipProps = useCallback<PropGetter>(
    () => ({
      ref: domRef,
      className: styles,
      ...mergeProps(tooltipProps, positionProps, overlayProps, otherProps),
    }),
    [domRef, styles, tooltipProps, positionProps, overlayProps, otherProps],
  );

  return {
    Component,
    content,
    children,
    placement: placementProp,
    isOpen: state.isOpen,
    disableAnimation: originalProps?.disableAnimation,
    isDisabled,
    motionProps,
    getTriggerProps,
    getTooltipProps,
  };
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>;
