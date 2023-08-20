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
    shouldCloseOnBlur = true,
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
      shouldCloseOnBlur,
      isDismissable: !isNonModal,
      isKeyboardDismissDisabled,
    },
    popoverRef,
  );

  const {
    overlayProps: positionProps,
    arrowProps,
    placement,
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
