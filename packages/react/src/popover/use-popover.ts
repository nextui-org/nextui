import type {RefObject} from "react";

import {useRef, useMemo, useState, useCallback} from "react";
import {OverlayTriggerProps} from "@react-types/overlays";
import {mergeProps} from "@react-aria/utils";
import {useOverlayPosition, useOverlayTrigger} from "@react-aria/overlays";
import {useOverlayTriggerState} from "@react-stately/overlays";

import {mergeRefs} from "../utils/refs";
import {isObject} from "../utils/object";

import {PopoverPlacement, getAriaPlacement} from "./utils";
import {PopoverContentVariantsProps} from "./popover.styles";

export interface UsePopoverProps extends OverlayTriggerProps, PopoverContentVariantsProps {
  ref?: RefObject<HTMLElement>;
  /**
   * The ref for the element which the overlay positions itself with respect to.
   */
  triggerRef?: RefObject<HTMLElement>;
  /**
   * A ref for the scrollable region within the overlay.
   * @default overlayRef
   */
  scrollRef?: RefObject<HTMLElement>;
  /**
   * The placement of the element with respect to its anchor element.
   * @default 'bottom'
   */
  placement?: PopoverPlacement;
  /**
   * Whether the element should flip its orientation (e.g. top to bottom or left to right) when there is insufficient room for it to render completely.
   * @default true
   */
  shouldFlip?: boolean;
  offset?: number;
  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
  /**
   * Whether to close the overlay when the user interacts outside it.
   * @default false
   */
  isDismissable?: boolean;
  /**
   * Type of overlay that is opened by the trigger.
   */
  triggerType?: "dialog" | "menu" | "listbox" | "tree" | "grid";
  /**
   * Whether the popover is animated.
   */
  disableAnimation?: boolean;
  /** Whether the overlay should close when focus is lost or moves outside it. */
  shouldCloseOnBlur?: boolean;
  /**
   * Whether pressing the escape key to close the overlay should be disabled.
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;
  /**
   * When user interacts with the argument element outside of the overlay ref,
   * return true if onClose should be called.  This gives you a chance to filter
   * out interaction with elements that should not dismiss the overlay.
   * By default, onClose will always be called on interaction outside the overlay ref.
   */
  shouldCloseOnInteractOutside?: (element: HTMLElement) => boolean;
}

/**
 * @internal
 */
export function usePopover(props: UsePopoverProps = {}) {
  const {
    ref,
    triggerRef: triggerRefProp,
    scrollRef,
    isOpen,
    defaultOpen,
    onOpenChange,
    isBordered,
    borderWeight,
    disableShadow,
    shouldFlip = true,
    offset = 12,
    placement = "bottom",
    onClose,
    triggerType = "dialog",
    isDismissable = true,
    shouldCloseOnBlur = false,
    isKeyboardDismissDisabled = false,
    disableAnimation = false,
    shouldCloseOnInteractOutside,
  } = props;

  const domRef = useRef<HTMLElement>(null);
  const domTriggerRef = useRef<HTMLElement>(null);

  const overlayRef = ref || domRef;
  const triggerRef = triggerRefProp || domTriggerRef;

  const state = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange,
  });

  const [exited, setExited] = useState(!state.isOpen);

  const getState = useMemo(() => {
    if (state.isOpen) return "open";

    return "closed";
  }, [state.isOpen]);

  const handleClose = useCallback(() => {
    onClose?.();
    state.close();
  }, [state, onClose]);

  const onEntered = useCallback(() => {
    setExited(false);
  }, []);

  const onExited = useCallback(() => {
    setExited(true);
  }, []);

  const {triggerProps, overlayProps} = useOverlayTrigger({type: triggerType}, state, triggerRef);

  const overlayPlacement = useMemo(() => getAriaPlacement(placement), [placement]);

  const {overlayProps: positionProps} = useOverlayPosition({
    isOpen: state.isOpen,
    targetRef: triggerRef,
    scrollRef,
    placement: overlayPlacement,
    overlayRef,
    shouldFlip,
    offset,
  });

  const isPositioned = useMemo(() => {
    return !!positionProps.style?.maxHeight;
  }, [positionProps.style]);

  const getTriggerProps = useCallback(
    (props = {}, _ref = null) => {
      const realTriggerProps = triggerRefProp?.current
        ? mergeProps(triggerProps, props)
        : mergeProps(props, triggerProps);

      return {
        ...realTriggerProps,
        ref: mergeRefs(triggerRef, _ref),
      };
    },
    [triggerRef, triggerRefProp, triggerProps],
  );

  const getPopoverProps = useCallback(
    (props = {}, css = {}) => {
      const positionKeys = positionProps.style ? Object.keys(positionProps.style) : [];
      let positionCss = {};

      positionKeys.forEach((key) => {
        const value = isObject(css) && css[key];

        if (value) {
          positionCss = {
            ...positionCss,
            [key]: value,
          };
        }
      });

      const realPositionProps =
        Object.keys(positionCss).length > 0
          ? {
              ...positionProps,
              style: {
                ...positionProps.style,
                ...positionCss,
              },
            }
          : positionProps;

      return {
        css,
        ...props,
        ...overlayProps,
        ...realPositionProps,
        "data-state": getState,
        "data-placement": placement,
      };
    },
    [getState, positionProps, overlayProps, placement],
  );

  return {
    state,
    exited,
    overlayRef,
    triggerRef,
    placement,
    disableShadow,
    disableAnimation,
    shouldCloseOnBlur,
    isDismissable,
    isBordered,
    borderWeight,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    isOpen: state.isOpen,
    onClose: handleClose,
    onExited,
    onEntered,
    triggerProps,
    overlayProps,
    positionProps,
    getTriggerProps,
    getPopoverProps,
    isPositioned,
  };
}

export type UsePopoverReturn = ReturnType<typeof usePopover>;
