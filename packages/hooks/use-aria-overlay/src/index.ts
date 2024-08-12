import type {AriaOverlayProps, OverlayAria} from "@react-aria/overlays";
import type {RefObject} from "react";
import type React from "react";

import {isElementInChildOfActiveScope} from "@react-aria/focus";
import {useFocusWithin, useInteractOutside} from "@react-aria/interactions";
import {useEffect} from "react";

export interface UseAriaOverlayProps extends AriaOverlayProps {
  /**
   * When `true`, `click/focus` interactions will be disabled on elements outside
   * the `Overlay`. Users need to click twice on outside elements to interact with them:
   * once to close the overlay, and again to trigger the element.
   *
   * @default true
   */
  disableOutsideEvents?: boolean;
}

const visibleOverlays: RefObject<Element | null>[] = [];

/**
 * Provides the behavior for overlays such as dialogs, popovers, and menus.
 * Hides the overlay when the user interacts outside it, when the Escape key is pressed,
 * or optionally, on blur. Only the top-most overlay will close at once.
 */
export function useAriaOverlay(props: UseAriaOverlayProps, ref: RefObject<Element>): OverlayAria {
  const {
    disableOutsideEvents = true,
    isDismissable = false,
    isKeyboardDismissDisabled = false,
    isOpen,
    onClose,
    shouldCloseOnBlur,
    shouldCloseOnInteractOutside,
  } = props;

  // Add the overlay ref to the stack of visible overlays on mount, and remove on unmount.
  useEffect(() => {
    if (isOpen) {
      visibleOverlays.push(ref);
    }

    return () => {
      const index = visibleOverlays.indexOf(ref);

      if (index >= 0) {
        visibleOverlays.splice(index, 1);
      }
    };
  }, [isOpen, ref]);

  // Only hide the overlay when it is the topmost visible overlay in the stack
  const onHide = () => {
    if (visibleOverlays[visibleOverlays.length - 1] === ref && onClose) {
      onClose();
    }
  };

  const onInteractOutsideStart = (e: PointerEvent) => {
    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target as Element)) {
      if (visibleOverlays[visibleOverlays.length - 1] === ref) {
        if (disableOutsideEvents) {
          e.stopPropagation();
          e.preventDefault();
        }
      }

      // For consistency with React Aria, toggle the combobox/menu on mouse down, but touch up.
      if (e.pointerType !== "touch") {
        onHide();
      }
    }
  };

  const onInteractOutside = (e: PointerEvent) => {
    if (e.pointerType !== "touch") {
      return;
    }

    if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.target as Element)) {
      if (visibleOverlays[visibleOverlays.length - 1] === ref) {
        if (disableOutsideEvents) {
          e.stopPropagation();
          e.preventDefault();
        }
      }

      onHide();
    }
  };

  // Handle the escape key
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !isKeyboardDismissDisabled && !e.nativeEvent.isComposing) {
      e.stopPropagation();
      e.preventDefault();
      onHide();
    }
  };

  // Handle clicking outside the overlay to close it
  useInteractOutside({
    isDisabled: !(isDismissable && isOpen),
    onInteractOutside,
    onInteractOutsideStart,
    ref,
  });

  const {focusWithinProps} = useFocusWithin({
    isDisabled: !shouldCloseOnBlur,
    onBlurWithin: (e) => {
      // Do not close if relatedTarget is null, which means focus is lost to the body.
      // That can happen when switching tabs, or due to a VoiceOver/Chrome bug with Control+Option+Arrow navigation.
      // Clicking on the body to close the overlay should already be handled by useInteractOutside.
      // https://github.com/adobe/react-spectrum/issues/4130
      // https://github.com/adobe/react-spectrum/issues/4922
      //
      // If focus is moving into a child focus scope (e.g. menu inside a dialog),
      // do not close the outer overlay. At this point, the active scope should
      // still be the outer overlay, since blur events run before focus.
      if (!e.relatedTarget || isElementInChildOfActiveScope(e.relatedTarget)) {
        return;
      }

      if (
        !shouldCloseOnInteractOutside ||
        shouldCloseOnInteractOutside(e.relatedTarget as Element)
      ) {
        onHide();
      }
    },
  });

  const onPointerDownUnderlay = (e: React.PointerEvent) => {
    // fixes a firefox issue that starts text selection https://bugzilla.mozilla.org/show_bug.cgi?id=1675846
    if (e.target === e.currentTarget) {
      e.preventDefault();
    }
  };

  return {
    overlayProps: {
      onKeyDown,
      ...focusWithinProps,
    },
    underlayProps: {
      onPointerDown: onPointerDownUnderlay,
    },
  };
}
