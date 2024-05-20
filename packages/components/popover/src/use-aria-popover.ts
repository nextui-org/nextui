import {RefObject, useEffect} from "react";
import {
  AriaPopoverProps,
  useOverlay,
  PopoverAria,
  useOverlayPosition,
  AriaOverlayProps,
} from "@react-aria/overlays";
import {OverlayPlacement, ariaHideOutside, toReactAriaPlacement} from "@nextui-org/aria-utils";
import {OverlayTriggerState} from "@react-stately/overlays";
import {mergeProps} from "@react-aria/utils";
import {useSafeLayoutEffect} from "@nextui-org/use-safe-layout-effect";

export interface Props {
  /**
   * Whether the element should render an arrow.
   * @default false
   */
  showArrow?: boolean;
  /**
   * The placement of the element with respect to its anchor element.
   * @default 'top'
   */
  placement?: OverlayPlacement;
  /**
   * A ref for the scrollable region within the overlay.
   * @default popoverRef
   */
  scrollRef?: RefObject<HTMLElement>;
  /**
   * List of dependencies to update the position of the popover.
   * @default []
   */
  updatePositionDeps?: any[];
}

export type ReactAriaPopoverProps = Props & Omit<AriaPopoverProps, "placement"> & AriaOverlayProps;

/**
 * Provides the behavior and accessibility implementation for a popover component.
 * A popover is an overlay element positioned relative to a trigger.
 */
export function useReactAriaPopover(
  props: ReactAriaPopoverProps,
  state: OverlayTriggerState,
): PopoverAria {
  const {
    triggerRef,
    popoverRef,
    showArrow,
    offset = 7,
    crossOffset = 0,
    scrollRef,
    shouldFlip,
    boundaryElement,
    isDismissable = true,
    shouldCloseOnBlur = true,
    placement: placementProp = "top",
    containerPadding,
    shouldCloseOnInteractOutside,
    isNonModal: isNonModalProp,
    isKeyboardDismissDisabled,
    updatePositionDeps = [],
    ...otherProps
  } = props;

  const isNonModal = isNonModalProp || true;

  const {overlayProps, underlayProps} = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside: shouldCloseOnInteractOutside
        ? shouldCloseOnInteractOutside
        : (element) => {
            // Don't close if the click is within the trigger or the popover itself
            let trigger = triggerRef?.current;

            return !trigger || !trigger.contains(element);
          },
    },
    popoverRef,
  );

  const {
    overlayProps: positionProps,
    arrowProps,
    placement,
    updatePosition,
  } = useOverlayPosition({
    ...otherProps,
    shouldFlip,
    crossOffset,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    scrollRef,
    boundaryElement,
    containerPadding,
    placement: toReactAriaPlacement(placementProp),
    offset: showArrow ? offset + 3 : offset,
    onClose: () => {},
  });

  useSafeLayoutEffect(() => {
    if (!updatePositionDeps.length) return;
    // force update position when deps change
    updatePosition();
  }, updatePositionDeps);

  useEffect(() => {
    if (state.isOpen && !isNonModal && popoverRef.current) {
      return ariaHideOutside([popoverRef.current]);
    }
  }, [isNonModal, state.isOpen, popoverRef]);

  return {
    popoverProps: mergeProps(overlayProps, positionProps),
    arrowProps,
    underlayProps,
    placement,
  };
}
