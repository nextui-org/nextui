/**
 * TODO: Remove this package once the react-aria team publishes a new version
 * with the fix https://github.com/adobe/react-spectrum/pull/5291
 */
// Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

import {DOMAttributes, FocusableElement, PointerType} from "@react-types/shared";
import {
  focusWithoutScrolling,
  isMac,
  isVirtualClick,
  isVirtualPointerEvent,
  mergeProps,
  openLink,
  useEffectEvent,
  useGlobalListeners,
  useSyncRef,
} from "@react-aria/utils";
import {RefObject, useContext, useEffect, useMemo, useRef, useState} from "react";

import {getOwnerDocument, getOwnerWindow} from "./dom-helpers";
import {PressHookProps, PressResult, PressState, EventBase} from "./types";
import {disableTextSelection, restoreTextSelection} from "./text-selection";
import {PressEvent} from "./events";
import {PressResponderContext} from "./context";

function usePressResponderContext(props: PressHookProps): PressHookProps {
  // Consume context from <PressResponder> and merge with props.
  let context = useContext(PressResponderContext);

  if (context) {
    let {register, ...contextProps} = context;

    props = mergeProps(contextProps, props) as PressHookProps;
    register();
  }

  useSyncRef(context, props.ref as RefObject<FocusableElement>);

  return props;
}

const LINK_CLICKED = Symbol("linkClicked");

/**
 * Handles press interactions across mouse, touch, keyboard, and screen readers.
 * It normalizes behavior across browsers and platforms, and handles many nuances
 * of dealing with pointer and keyboard events.
 */
export function usePress(props: PressHookProps): PressResult {
  let {
    onPress,
    onPressChange,
    onPressStart,
    onPressEnd,
    onPressUp,
    isDisabled,
    isPressed: isPressedProp,
    preventFocusOnPress,
    shouldCancelOnPointerExit,
    allowTextSelectionOnPress,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: _, // Removing `ref` from `domProps` because TypeScript is dumb
    ...domProps
  } = usePressResponderContext(props);

  let [isPressed, setPressed] = useState(false);
  let ref = useRef<PressState>({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    ignoreClickAfterPress: false,
    didFirePressStart: false,
    isTriggeringEvent: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null,
  });

  let {addGlobalListener, removeAllGlobalListeners} = useGlobalListeners();

  let triggerPressStart = useEffectEvent((originalEvent: EventBase, pointerType: PointerType) => {
    let state = ref.current;

    if (isDisabled || state.didFirePressStart) {
      return;
    }

    let shouldStopPropagation = true;

    state.isTriggeringEvent = true;
    if (onPressStart) {
      let event = new PressEvent("pressstart", pointerType, originalEvent);

      onPressStart(event);
      shouldStopPropagation = event.shouldStopPropagation;
    }

    if (onPressChange) {
      onPressChange(true);
    }

    state.isTriggeringEvent = false;
    state.didFirePressStart = true;
    setPressed(true);

    return shouldStopPropagation;
  });

  let triggerPressEnd = useEffectEvent(
    (originalEvent: EventBase, pointerType: PointerType, wasPressed = true) => {
      let state = ref.current;

      if (!state.didFirePressStart) {
        return;
      }

      state.ignoreClickAfterPress = true;
      state.didFirePressStart = false;
      state.isTriggeringEvent = true;

      let shouldStopPropagation = true;

      if (onPressEnd) {
        let event = new PressEvent("pressend", pointerType, originalEvent);

        onPressEnd(event);
        shouldStopPropagation = event.shouldStopPropagation;
      }

      if (onPressChange) {
        onPressChange(false);
      }

      setPressed(false);

      if (onPress && wasPressed && !isDisabled) {
        let event = new PressEvent("press", pointerType, originalEvent);

        onPress(event);
        shouldStopPropagation &&= event.shouldStopPropagation;
      }

      state.isTriggeringEvent = false;

      return shouldStopPropagation;
    },
  );

  let triggerPressUp = useEffectEvent((originalEvent: EventBase, pointerType: PointerType) => {
    let state = ref.current;

    if (isDisabled) {
      return;
    }

    if (onPressUp) {
      state.isTriggeringEvent = true;
      let event = new PressEvent("pressup", pointerType, originalEvent);

      onPressUp(event);
      state.isTriggeringEvent = false;

      return event.shouldStopPropagation;
    }

    return true;
  });

  let cancel = useEffectEvent((e: EventBase) => {
    let state = ref.current;

    if (state.isPressed) {
      if (state.isOverTarget && state.target) {
        triggerPressEnd(createEvent(state.target, e), state.pointerType, false);
      }
      state.isPressed = false;
      state.isOverTarget = false;
      state.activePointerId = null;
      state.pointerType = null;
      removeAllGlobalListeners();
      if (!allowTextSelectionOnPress && state.target) {
        restoreTextSelection(state.target);
      }
    }
  });

  let cancelOnPointerExit = useEffectEvent((e: EventBase) => {
    if (shouldCancelOnPointerExit) {
      cancel(e);
    }
  });

  let pressProps = useMemo(() => {
    let state = ref.current;
    let pressProps: DOMAttributes = {
      onKeyDown(e) {
        if (
          isValidKeyboardEvent(e.nativeEvent, e.currentTarget) &&
          e.currentTarget.contains(e.target as Element)
        ) {
          if (shouldPreventDefaultKeyboard(e.target as Element, e.key)) {
            e.preventDefault();
          }

          // If the event is repeating, it may have started on a different element
          // after which focus moved to the current element. Ignore these events and
          // only handle the first key down event.
          let shouldStopPropagation = true;

          if (!state.isPressed && !e.repeat) {
            state.target = e.currentTarget;
            state.isPressed = true;
            shouldStopPropagation = triggerPressStart(e, "keyboard");

            // Focus may move before the key up event, so register the event on the document
            // instead of the same element where the key down event occurred.
            addGlobalListener(getOwnerDocument(e.currentTarget), "keyup", onKeyUp, false);
          }

          if (shouldStopPropagation) {
            e.stopPropagation();
          }

          // Keep track of the keydown events that occur while the Meta (e.g. Command) key is held.
          // macOS has a bug where keyup events are not fired while the Meta key is down.
          // When the Meta key itself is released we will get an event for that, and we'll act as if
          // all of these other keys were released as well.
          // https://bugs.chromium.org/p/chromium/issues/detail?id=1393524
          // https://bugs.webkit.org/show_bug.cgi?id=55291
          // https://bugzilla.mozilla.org/show_bug.cgi?id=1299553
          if (e.metaKey && isMac()) {
            state.metaKeyEvents?.set(e.key, e.nativeEvent);
          }
        } else if (e.key === "Meta") {
          state.metaKeyEvents = new Map();
        }
      },
      onKeyUp(e) {
        if (
          state.target &&
          isValidKeyboardEvent(e.nativeEvent, e.currentTarget) &&
          !e.repeat &&
          e.currentTarget.contains(e.target as Element)
        ) {
          triggerPressUp(createEvent(state.target, e), "keyboard");
        }
      },
      onClick(e) {
        if (e && !e.currentTarget.contains(e.target as Element)) {
          return;
        }
        // @ts-ignore
        if (e && e.button === 0 && !state.isTriggeringEvent && !openLink.isOpening) {
          let shouldStopPropagation = true;

          if (isDisabled) {
            e.preventDefault();
          }

          // If triggered from a screen reader or by using element.click(),
          // trigger as if it were a keyboard click.
          if (
            !state.ignoreClickAfterPress &&
            !state.ignoreEmulatedMouseEvents &&
            !state.isPressed &&
            (state.pointerType === "virtual" || isVirtualClick(e.nativeEvent))
          ) {
            // Ensure the element receives focus (VoiceOver on iOS does not do this)
            if (!isDisabled && !preventFocusOnPress) {
              focusWithoutScrolling(e.currentTarget);
            }

            let stopPressStart = triggerPressStart(e, "virtual");
            let stopPressUp = triggerPressUp(e, "virtual");
            let stopPressEnd = triggerPressEnd(e, "virtual");

            shouldStopPropagation = stopPressStart && stopPressUp && stopPressEnd;
          }

          state.ignoreEmulatedMouseEvents = false;
          state.ignoreClickAfterPress = false;
          if (shouldStopPropagation) {
            e.stopPropagation();
          }
        }
      },
    };

    let onKeyUp = (e: KeyboardEvent) => {
      if (state.isPressed && state.target && isValidKeyboardEvent(e, state.target)) {
        if (shouldPreventDefaultKeyboard(e.target as Element, e.key)) {
          e.preventDefault();
        }

        let target = e.target as Element;
        let shouldStopPropagation = triggerPressEnd(
          createEvent(state.target, e as EventBase),
          "keyboard",
          state.target.contains(target),
        );

        removeAllGlobalListeners();

        if (shouldStopPropagation) {
          e.stopPropagation();
        }

        // If a link was triggered with a key other than Enter, open the URL ourselves.
        // This means the link has a role override, and the default browser behavior
        // only applies when using the Enter key.
        if (
          e.key !== "Enter" &&
          isHTMLAnchorLink(state.target) &&
          state.target.contains(target) &&
          // @ts-ignore
          !e[LINK_CLICKED]
        ) {
          // Store a hidden property on the event so we only trigger link click once,
          // even if there are multiple usePress instances attached to the element.
          // @ts-ignore
          e[LINK_CLICKED] = true;
          openLink(state.target, e, false);
        }

        state.isPressed = false;
        state.metaKeyEvents?.delete(e.key);
      } else if (e.key === "Meta" && state.metaKeyEvents?.size) {
        // If we recorded keydown events that occurred while the Meta key was pressed,
        // and those haven't received keyup events already, fire keyup events ourselves.
        // See comment above for more info about the macOS bug causing this.
        let events = state.metaKeyEvents;

        state.metaKeyEvents = null;
        for (let event of events.values()) {
          state.target && state.target.dispatchEvent(new KeyboardEvent("keyup", event));
        }
      }
    };

    if (typeof PointerEvent !== "undefined") {
      pressProps.onPointerDown = (e) => {
        // Only handle left clicks, and ignore events that bubbled through portals.
        if (e.button !== 0 || !e.currentTarget.contains(e.target as Element)) {
          return;
        }

        // iOS safari fires pointer events from VoiceOver with incorrect coordinates/target.
        // Ignore and let the onClick handler take care of it instead.
        // https://bugs.webkit.org/show_bug.cgi?id=222627
        // https://bugs.webkit.org/show_bug.cgi?id=223202
        if (isVirtualPointerEvent(e.nativeEvent)) {
          state.pointerType = "virtual";

          return;
        }

        // Due to browser inconsistencies, especially on mobile browsers, we prevent
        // default on pointer down and handle focusing the pressable element ourselves.
        if (shouldPreventDefault(e.currentTarget as Element)) {
          e.preventDefault();
        }

        state.pointerType = e.pointerType;

        let shouldStopPropagation = true;

        if (!state.isPressed) {
          state.isPressed = true;
          state.isOverTarget = true;
          state.activePointerId = e.pointerId;
          state.target = e.currentTarget;

          if (!isDisabled && !preventFocusOnPress) {
            focusWithoutScrolling(e.currentTarget);
          }

          if (!allowTextSelectionOnPress) {
            disableTextSelection(state.target);
          }

          shouldStopPropagation = triggerPressStart(e, state.pointerType);

          addGlobalListener(getOwnerDocument(e.currentTarget), "pointermove", onPointerMove, false);
          addGlobalListener(getOwnerDocument(e.currentTarget), "pointerup", onPointerUp, false);
          addGlobalListener(
            getOwnerDocument(e.currentTarget),
            "pointercancel",
            onPointerCancel,
            false,
          );
        }

        if (shouldStopPropagation) {
          e.stopPropagation();
        }
      };

      pressProps.onMouseDown = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        if (e.button === 0) {
          // Chrome and Firefox on touch Windows devices require mouse down events
          // to be canceled in addition to pointer events, or an extra asynchronous
          // focus event will be fired.
          if (shouldPreventDefault(e.currentTarget as Element)) {
            e.preventDefault();
          }

          e.stopPropagation();
        }
      };

      pressProps.onPointerUp = (e) => {
        // iOS fires pointerup with zero width and height, so check the pointerType recorded during pointerdown.
        if (!e.currentTarget.contains(e.target as Element) || state.pointerType === "virtual") {
          return;
        }

        // Only handle left clicks
        // Safari on iOS sometimes fires pointerup events, even
        // when the touch isn't over the target, so double check.
        if (e.button === 0 && isOverTarget(e, e.currentTarget)) {
          triggerPressUp(e, state.pointerType || e.pointerType);
        }
      };

      // Safari on iOS < 13.2 does not implement pointerenter/pointerleave events correctly.
      // Use pointer move events instead to implement our own hit testing.
      // See https://bugs.webkit.org/show_bug.cgi?id=199803
      let onPointerMove = (e: PointerEvent) => {
        if (e.pointerId !== state.activePointerId || !state.target) {
          return;
        }

        if (isOverTarget(e, state.target)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            triggerPressStart(createEvent(state.target, e as EventBase), state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType, false);
          cancelOnPointerExit(e);
        }
      };

      let onPointerUp = (e: PointerEvent) => {
        if (
          e.pointerId === state.activePointerId &&
          state.isPressed &&
          e.button === 0 &&
          state.target
        ) {
          if (isOverTarget(e, state.target)) {
            triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType);
          } else if (state.isOverTarget) {
            triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType);
          }

          state.isPressed = false;
          state.isOverTarget = false;
          state.activePointerId = null;
          state.pointerType = null;
          removeAllGlobalListeners();
          if (!allowTextSelectionOnPress) {
            restoreTextSelection(state.target);
          }
        }
      };

      let onPointerCancel = (e: PointerEvent) => {
        cancel(e);
      };

      pressProps.onDragStart = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        // Safari does not call onPointerCancel when a drag starts, whereas Chrome and Firefox do.
        cancel(e);
      };
    } else {
      pressProps.onMouseDown = (e) => {
        // Only handle left clicks
        if (e.button !== 0 || !e.currentTarget.contains(e.target as Element)) {
          return;
        }

        // Due to browser inconsistencies, especially on mobile browsers, we prevent
        // default on mouse down and handle focusing the pressable element ourselves.
        if (shouldPreventDefault(e.currentTarget)) {
          e.preventDefault();
        }

        if (state.ignoreEmulatedMouseEvents) {
          e.stopPropagation();

          return;
        }

        state.isPressed = true;
        state.isOverTarget = true;
        state.target = e.currentTarget;
        state.pointerType = isVirtualClick(e.nativeEvent) ? "virtual" : "mouse";

        if (!isDisabled && !preventFocusOnPress) {
          focusWithoutScrolling(e.currentTarget);
        }

        let shouldStopPropagation = triggerPressStart(e, state.pointerType);

        if (shouldStopPropagation) {
          e.stopPropagation();
        }

        addGlobalListener(getOwnerDocument(e.currentTarget), "mouseup", onMouseUp, false);
      };

      pressProps.onMouseEnter = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        let shouldStopPropagation = true;

        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = true;
          shouldStopPropagation = triggerPressStart(e, state.pointerType);
        }

        if (shouldStopPropagation) {
          e.stopPropagation();
        }
      };

      pressProps.onMouseLeave = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        let shouldStopPropagation = true;

        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(e, state.pointerType, false);
          cancelOnPointerExit(e);
        }

        if (shouldStopPropagation) {
          e.stopPropagation();
        }
      };

      pressProps.onMouseUp = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        if (!state.ignoreEmulatedMouseEvents && e.button === 0) {
          triggerPressUp(e, state.pointerType || "mouse");
        }
      };

      let onMouseUp = (e: MouseEvent) => {
        // Only handle left clicks
        if (e.button !== 0) {
          return;
        }

        state.isPressed = false;
        removeAllGlobalListeners();

        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;

          return;
        }

        if (!state.target) {
          return;
        }

        if (isOverTarget(e, state.target)) {
          triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType);
        } else if (state.isOverTarget) {
          triggerPressEnd(createEvent(state.target, e as EventBase), state.pointerType, false);
        }

        state.isOverTarget = false;
      };

      pressProps.onTouchStart = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        let touch = getTouchFromEvent(e.nativeEvent);

        if (!touch) {
          return;
        }
        state.activePointerId = touch.identifier;
        state.ignoreEmulatedMouseEvents = true;
        state.isOverTarget = true;
        state.isPressed = true;
        state.target = e.currentTarget;
        state.pointerType = "touch";

        // Due to browser inconsistencies, especially on mobile browsers, we prevent default
        // on the emulated mouse event and handle focusing the pressable element ourselves.
        if (!isDisabled && !preventFocusOnPress) {
          focusWithoutScrolling(e.currentTarget);
        }

        if (!allowTextSelectionOnPress) {
          disableTextSelection(state.target);
        }

        let shouldStopPropagation = triggerPressStart(e, state.pointerType);

        if (shouldStopPropagation) {
          e.stopPropagation();
        }

        addGlobalListener(getOwnerWindow(e.currentTarget), "scroll", onScroll, true);
      };

      pressProps.onTouchMove = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        if (!state.isPressed) {
          e.stopPropagation();

          return;
        }

        let touch = getTouchById(e.nativeEvent, state.activePointerId);
        let shouldStopPropagation = true;

        if (touch && isOverTarget(touch, e.currentTarget)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            shouldStopPropagation = triggerPressStart(e, state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(e, state.pointerType, false);
          cancelOnPointerExit(e);
        }

        if (shouldStopPropagation) {
          e.stopPropagation();
        }
      };

      pressProps.onTouchEnd = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        if (!state.isPressed) {
          e.stopPropagation();

          return;
        }

        let touch = getTouchById(e.nativeEvent, state.activePointerId);
        let shouldStopPropagation = true;

        if (touch && isOverTarget(touch, e.currentTarget)) {
          triggerPressUp(e, state.pointerType);
          shouldStopPropagation = triggerPressEnd(e, state.pointerType);
        } else if (state.isOverTarget) {
          shouldStopPropagation = triggerPressEnd(e, state.pointerType, false);
        }

        if (shouldStopPropagation) {
          e.stopPropagation();
        }

        state.isPressed = false;
        state.activePointerId = null;
        state.isOverTarget = false;
        state.ignoreEmulatedMouseEvents = true;
        if (!allowTextSelectionOnPress && state.target) {
          restoreTextSelection(state.target);
        }
        removeAllGlobalListeners();
      };

      pressProps.onTouchCancel = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        e.stopPropagation();
        if (state.isPressed) {
          cancel(e);
        }
      };

      let onScroll = (e: Event) => {
        if (state.isPressed && (e.target as Element).contains(state.target)) {
          cancel({
            currentTarget: state.target,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: false,
          });
        }
      };

      pressProps.onDragStart = (e) => {
        if (!e.currentTarget.contains(e.target as Element)) {
          return;
        }

        cancel(e);
      };
    }

    return pressProps;
  }, [
    addGlobalListener,
    isDisabled,
    preventFocusOnPress,
    removeAllGlobalListeners,
    allowTextSelectionOnPress,
    cancel,
    cancelOnPointerExit,
    triggerPressEnd,
    triggerPressStart,
    triggerPressUp,
  ]);

  // Remove user-select: none in case component unmounts immediately after pressStart
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (!allowTextSelectionOnPress && ref.current.target) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        restoreTextSelection(ref.current.target);
      }
    };
  }, [allowTextSelectionOnPress]);

  return {
    isPressed: isPressedProp || isPressed,
    pressProps: mergeProps(domProps, pressProps),
  };
}

function isHTMLAnchorLink(target: Element): target is HTMLAnchorElement {
  return target.tagName === "A" && target.hasAttribute("href");
}

function isValidKeyboardEvent(event: KeyboardEvent, currentTarget: Element): boolean {
  const {key, code} = event;
  const element = currentTarget as HTMLElement;
  const role = element.getAttribute("role");

  // Accessibility for keyboards. Space and Enter only.
  // "Spacebar" is for IE 11
  return (
    (key === "Enter" || key === " " || key === "Spacebar" || code === "Space") &&
    !(
      (element instanceof getOwnerWindow(element).HTMLInputElement &&
        !isValidInputKey(element as HTMLInputElement, key)) ||
      element instanceof getOwnerWindow(element).HTMLTextAreaElement ||
      element.isContentEditable
    ) &&
    // Links should only trigger with Enter key
    !((role === "link" || (!role && isHTMLAnchorLink(element))) && key !== "Enter")
  );
}

function getTouchFromEvent(event: TouchEvent): Touch | null {
  const {targetTouches} = event;

  if (targetTouches.length > 0) {
    return targetTouches[0];
  }

  return null;
}

function getTouchById(event: TouchEvent, pointerId: null | number): null | Touch {
  const changedTouches = event.changedTouches;

  for (let i = 0; i < changedTouches.length; i++) {
    const touch = changedTouches[i];

    if (touch.identifier === pointerId) {
      return touch;
    }
  }

  return null;
}

function createEvent(target: FocusableElement, e: EventBase): EventBase {
  return {
    currentTarget: target,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey,
  };
}

interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface EventPoint {
  clientX: number;
  clientY: number;
  width?: number;
  height?: number;
  radiusX?: number;
  radiusY?: number;
}

function getPointClientRect(point: EventPoint): Rect {
  let offsetX = !!point.width ? point.width / 2 : point.radiusX || 0;
  let offsetY = !!point.height ? point.height / 2 : point.radiusY || 0;

  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX,
  };
}

function areRectanglesOverlapping(a: Rect, b: Rect) {
  // check if they cannot overlap on x axis
  if (a.left > b.right || b.left > a.right) {
    return false;
  }
  // check if they cannot overlap on y axis
  if (a.top > b.bottom || b.top > a.bottom) {
    return false;
  }

  return true;
}

function isOverTarget(point: EventPoint, target: Element) {
  let rect = target.getBoundingClientRect();
  let pointRect = getPointClientRect(point);

  return areRectanglesOverlapping(rect, pointRect);
}

function shouldPreventDefault(target: Element) {
  // We cannot prevent default if the target is a draggable element.
  return !(target instanceof HTMLElement) || !target.hasAttribute("draggable");
}

function shouldPreventDefaultKeyboard(target: Element, key: string) {
  if (target instanceof HTMLInputElement) {
    return !isValidInputKey(target, key);
  }

  if (target instanceof HTMLButtonElement) {
    return target.type !== "submit" && target.type !== "reset";
  }

  if (isHTMLAnchorLink(target)) {
    return false;
  }

  return true;
}

const nonTextInputTypes = new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset",
]);

function isValidInputKey(target: HTMLInputElement, key: string) {
  // Only space should toggle checkboxes and radios, not enter.
  return target.type === "checkbox" || target.type === "radio"
    ? key === " "
    : nonTextInputTypes.has(target.type);
}
