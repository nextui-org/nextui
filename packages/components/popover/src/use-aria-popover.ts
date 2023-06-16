import {RefObject, useLayoutEffect} from "react";
import {AriaPopoverProps, useOverlay, PopoverAria, useOverlayPosition} from "@react-aria/overlays";
import {OverlayPlacement, toReactAriaPlacement, ariaHideOutside} from "@nextui-org/aria-utils";
import {OverlayTriggerState} from "@react-stately/overlays";
import {mergeProps} from "@react-aria/utils";

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
}

export type ReactAriaPopoverProps = Props & Omit<AriaPopoverProps, "placement">;

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
    placement: placementProp = "top",
    containerPadding,
    isNonModal: isNonModalProp,
    isKeyboardDismissDisabled,
    ...otherProps
  } = props;

  const isNonModal = isNonModalProp || true;

  const {overlayProps, underlayProps} = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur: true,
      isDismissable: !isNonModal,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside(element) {
        // Don't close if the click is within the trigger or the popover itself
        let trigger = triggerRef?.current;

        return !trigger || !trigger.contains(element);
      },
    },
    popoverRef,
  );

  const {overlayProps: positionProps, arrowProps, placement} = useOverlayPosition({
    ...otherProps,
    scrollRef,
    crossOffset,
    shouldFlip,
    containerPadding,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    placement: toReactAriaPlacement(placementProp),
    offset: showArrow ? offset + 3 : offset,
    onClose: () => {},
  });

  useLayoutEffect(() => {
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
