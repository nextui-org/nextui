"use client";

import type {StatelyToastQueue, ToastContentValue} from "./toast-queue";
import type {DOMRenderProps} from "../../utils/dom";
import type {ToastVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef, ReactNode, Ref} from "react";
import type {QueuedToast, ToastProps as ToastPrimitiveProps} from "react-aria-components/Toast";

import {toastVariants} from "@heroui/styles";
import {mergeRefs} from "@react-aria/utils";
import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {useFocusVisible} from "react-aria/useFocusVisible";
import {composeRenderProps} from "react-aria-components/composeRenderProps";
import {Text as TextPrimitive} from "react-aria-components/Text";
import {
  UNSTABLE_ToastContent as ToastContentPrimitive,
  UNSTABLE_Toast as ToastPrimitive,
  UNSTABLE_ToastRegion as ToastRegionPrimitive,
  UNSTABLE_ToastStateContext as ToastStateContext,
} from "react-aria-components/Toast";

import {useMeasuredHeight} from "../../hooks/use-measured-height";
import {useSafeLayoutEffect} from "../../hooks/use-safe-layout-effect";
import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, useResolvedClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {Button} from "../button";
import {CloseButton} from "../close-button";
import {DangerIcon, InfoIcon, SuccessIcon, WarningIcon} from "../icons";
import {Spinner} from "../spinner";

import {
  DEFAULT_GAP,
  DEFAULT_HOTKEY,
  DEFAULT_MAX_VISIBLE_TOAST,
  DEFAULT_SCALE_FACTOR,
  DEFAULT_TOAST_WIDTH,
} from "./constants";
import {ToastQueue, toast as defaultToastQueue, isExitAwareToastQueue} from "./toast-queue";

/* ------------------------------------------------------------------------------------------------
 * Toast Context
 * --------------------------------------------------------------------------------------------- */
type ToastContext = {
  slots?: ReturnType<typeof toastVariants>;
  placement?: ToastVariants["placement"];
  scaleFactor?: number;
  gap?: number;
  maxVisibleToasts?: number;
  heightsByKey?: Record<string, number>;
  // Keys of toasts currently playing their exit animation.
  exitingKeys?: ReadonlySet<string>;
  isExpanded?: boolean;
  onToastHeightChange?: (key: string, height: number) => void;
  onToastHeightRemove?: (key: string) => void;
};

const ToastContext = createContext<ToastContext>({});

// The KeyboardEvent boolean props a hotkey entry can name; anything else is an event.code.
const MODIFIER_PROPS = ["altKey", "ctrlKey", "metaKey", "shiftKey"] as const;

const EMPTY_EXITING_KEYS: ReadonlySet<string> = new Set();
const getEmptyExitingKeys = (): ReadonlySet<string> => EMPTY_EXITING_KEYS;
const subscribeToNothing = (): (() => void) => () => {};

// Mirrors React Aria's focus handling when a focused toast is removed:
// pointer focus leaves the region (so hover collapse and timers stay live), keyboard focus moves to the nearest remaining toast, newer first.
const moveFocusFromToast = (toastEl: HTMLElement, isKeyboardFocus: boolean) => {
  if (!isKeyboardFocus) {
    (document.activeElement as HTMLElement | null)?.blur();

    return;
  }

  const isViable = (el: Element | null): el is HTMLElement =>
    el instanceof HTMLElement &&
    el.matches('[data-slot="toast"]:not([data-exiting="true"]):not([data-hidden="true"])');

  // Prefer nearest newer toast (previous siblings, DOM order is newest-first).
  let target: HTMLElement | null = null;
  let sibling = toastEl.previousElementSibling;

  while (sibling) {
    if (isViable(sibling)) {
      target = sibling;
      break;
    }
    sibling = sibling.previousElementSibling;
  }

  // Fallback to nearest older toast.
  if (!target) {
    sibling = toastEl.nextElementSibling;
    while (sibling) {
      if (isViable(sibling)) {
        target = sibling;
        break;
      }
      sibling = sibling.nextElementSibling;
    }
  }

  // Rare fallback: non-sibling structure or portal-like rendering.
  if (!target) {
    const region = toastEl.closest<HTMLElement>('[data-slot="toast-region"]');

    if (region) {
      for (const candidate of region.querySelectorAll<HTMLElement>(
        '[data-slot="toast"]:not([data-exiting="true"]):not([data-hidden="true"])',
      )) {
        if (candidate !== toastEl) {
          target = candidate;
          break;
        }
      }
    }
  }

  if (target) {
    target.focus();
  } else {
    (document.activeElement as HTMLElement | null)?.blur();
  }
};

/* ------------------------------------------------------------------------------------------------
 * Toast
 * --------------------------------------------------------------------------------------------- */
interface ToastProps<T extends object = ToastContentValue>
  extends ToastPrimitiveProps<T>, ToastVariants {
  /**
   * How much each toast behind the front one scales down.
   * Inherited from the provider when omitted.
   * @default 0.05
   */
  scaleFactor?: number;
  ref?: Ref<HTMLDivElement | null>;
}

const Toast = <T extends object = ToastContentValue>({
  children,
  className,
  placement,
  ref,
  scaleFactor,
  style,
  toast,
  variant,
  ...rest
}: ToastProps<T>) => {
  const {
    exitingKeys,
    gap = DEFAULT_GAP,
    heightsByKey,
    isExpanded = false,
    maxVisibleToasts = DEFAULT_MAX_VISIBLE_TOAST,
    onToastHeightChange,
    onToastHeightRemove,
    placement: contextPlacement,
    scaleFactor: contextScaleFactor,
    slots,
  } = use(ToastContext);

  const finalPlacement = placement ?? contextPlacement;
  const finalScaleFactor = scaleFactor ?? contextScaleFactor ?? DEFAULT_SCALE_FACTOR;

  const state = use(ToastStateContext)!;
  const visibleToasts = state.visibleToasts;
  const toastKey = toast?.key;
  const isExiting = toastKey != null && (exitingKeys?.has(toastKey) ?? false);

  // Exiting toasts are excluded from layout (siblings reposition during the exit animation) but keep their own slot while fading out.
  const layoutToasts = useMemo(() => {
    if (!exitingKeys || exitingKeys.size === 0) {
      return visibleToasts;
    }

    return visibleToasts.filter((t) => !exitingKeys.has(t.key) || t.key === toastKey);
  }, [exitingKeys, toastKey, visibleToasts]);

  const fullIndex = visibleToasts.indexOf(toast);
  const index = layoutToasts.indexOf(toast);
  const isFrontmost = index <= 0;
  const isHidden = !isExiting && index >= maxVisibleToasts;
  const toastRef = useRef<HTMLDivElement | null>(null);
  const mergedRef = useMemo(() => mergeRefs(toastRef, ref), [ref]);
  const {height: toastHeight} = useMeasuredHeight(toastRef);
  const {isFocusVisible} = useFocusVisible();
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    let innerFrame = 0;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        setIsEntering(false);
      });
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, []);

  // Layout effect so siblings have this height before the first paint;
  // a passive effect would shift the stack one frame later.
  useLayoutEffect(() => {
    if (toastKey && typeof toastHeight === "number") {
      onToastHeightChange?.(toastKey, toastHeight);
    }
  }, [toastKey, toastHeight, onToastHeightChange]);

  useEffect(() => {
    if (!toastKey) return;

    return () => {
      onToastHeightRemove?.(toastKey);
    };
  }, [toastKey, onToastHeightRemove]);

  // react-aria-components filters tabIndex and aria-hidden out of Toast props, so set both imperatively.
  useLayoutEffect(() => {
    const el = toastRef.current;

    if (!el) {
      return;
    }

    el.tabIndex = isFrontmost || (isExpanded && !isHidden && !isExiting) ? 0 : -1;

    if (isHidden || isExiting) {
      // Browsers block aria-hidden around a focused element, so focus must move out first.
      if (el.contains(document.activeElement)) {
        moveFocusFromToast(el, isFocusVisible);
      }

      el.setAttribute("aria-hidden", "true");

      if (isExiting) {
        // Exiting is one-way: drop the dying controls from the tab order.
        // inert would also stop pointer events, which must keep hitting the ghost so the stack stays expanded under a resting cursor.
        for (const control of el.querySelectorAll<HTMLElement>("button, a")) {
          control.tabIndex = -1;
        }
      } else {
        // Hidden toasts can become visible again; inert is reversible and they are pointer-events: none already.
        el.setAttribute("inert", "");
      }
    } else {
      el.removeAttribute("aria-hidden");
      el.removeAttribute("inert");
    }
  }, [isFrontmost, isExpanded, isHidden, isExiting, isFocusVisible]);

  const stackingStyle = useMemo<CSSProperties>(() => {
    const frontToastKey = layoutToasts[0]?.key;

    const frontHeight =
      (frontToastKey ? heightsByKey?.[frontToastKey] : undefined) ?? toastHeight ?? 0;

    let heightsBefore = 0;

    for (let i = 0; i < index; i++) {
      const key = layoutToasts[i]?.key;

      heightsBefore += (key ? heightsByKey?.[key] : undefined) ?? frontHeight;
    }

    // Deliberately unnamed for view transitions: stacking is animated with CSS
    // transitions, so a name would only opt toasts into unrelated document-level
    // transitions with no animation of their own. Consumers who set `wrapUpdate`
    // can supply a `viewTransitionName` through the `style` prop, which merges.
    return {
      "--offset-collapsed": `${index * gap}px`,
      "--offset-expanded": `${heightsBefore + index * gap}px`,
      "--scale-collapsed": `${1 - index * finalScaleFactor}`,
      zIndex: isExiting ? 0 : visibleToasts.length - fullIndex,

      // frontHeight always resolves to a number, so this is unconditional.
      "--front-height": `${frontHeight}px`,

      ...(typeof toastHeight === "number"
        ? ({
            "--toast-height": `${toastHeight}px`,
          } as CSSProperties)
        : null),
    } as const;
  }, [
    finalScaleFactor,
    fullIndex,
    gap,
    heightsByKey,
    index,
    isExiting,
    layoutToasts,
    toastHeight,
    visibleToasts.length,
  ]);

  const toastStyle = composeRenderProps(
    style,
    (userStyle) =>
      ({
        ...stackingStyle,
        ...userStyle,
      }) as CSSProperties,
  );

  return (
    <ToastPrimitive
      {...rest}
      ref={mergedRef}
      className={useResolvedClassName(className, slots?.toast({variant}))}
      data-entering={dataAttr(isEntering)}
      data-exiting={dataAttr(isExiting)}
      data-expanded={dataAttr(isExpanded)}
      data-frontmost={dataAttr(isFrontmost)}
      data-hidden={dataAttr(isHidden)}
      data-index={index}
      data-placement={finalPlacement}
      data-slot="toast"
      style={toastStyle}
      toast={toast}
    >
      {children}
    </ToastPrimitive>
  );
};

Toast.displayName = "HeroUI.Toast";

/* ------------------------------------------------------------------------------------------------
 * Toast Content
 * --------------------------------------------------------------------------------------------- */
interface ToastContentProps extends ComponentPropsWithRef<typeof ToastContentPrimitive> {}

const ToastContent = ({children, className, ...rest}: ToastContentProps) => {
  const {slots} = use(ToastContext);

  return (
    <ToastContentPrimitive
      {...rest}
      className={composeSlotClassName(slots?.content, className)}
      data-slot="toast-content"
    >
      {children}
    </ToastContentPrimitive>
  );
};

ToastContent.displayName = "HeroUI.Toast.Content";

/* ------------------------------------------------------------------------------------------------
 * Toast Indicator
 * --------------------------------------------------------------------------------------------- */
interface ToastIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  variant?: ToastVariants["variant"];
}

const ToastIndicator = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant,
  ...rest
}: ToastIndicatorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ToastIndicatorProps<E>>) => {
  const {slots} = use(ToastContext);

  // The swap marker lets CSS animate content that replaces earlier content (a promise toast settling) without animating the first paint.
  const childrenKind = React.isValidElement(children) ? children.type : (children ?? "default");
  const previousKindRef = useRef(childrenKind);
  const [hasSwapped, setHasSwapped] = useState(false);

  useSafeLayoutEffect(() => {
    if (previousKindRef.current !== childrenKind) {
      previousKindRef.current = childrenKind;
      setHasSwapped(true);
    }
  }, [childrenKind]);

  const getDefaultIcon = useCallback(() => {
    switch (variant) {
      case "accent":
        return <InfoIcon data-slot="toast-default-icon" />;
      case "success":
        return <SuccessIcon data-slot="toast-default-icon" />;
      case "warning":
        return <WarningIcon data-slot="toast-default-icon" />;
      case "danger":
        return <DangerIcon data-slot="toast-default-icon" />;
      default:
        return <InfoIcon data-slot="toast-default-icon" />;
    }
  }, [variant]);

  return (
    <dom.div
      {...(rest as any)}
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="toast-indicator"
      data-swapped={dataAttr(hasSwapped)}
    >
      {children ?? getDefaultIcon()}
    </dom.div>
  );
};

ToastIndicator.displayName = "HeroUI.Toast.Indicator";

/* ------------------------------------------------------------------------------------------------
 * Toast Title
 * --------------------------------------------------------------------------------------------- */
interface ToastTitleProps extends ComponentPropsWithRef<typeof TextPrimitive> {}

const ToastTitle = ({children, className, ...rest}: ToastTitleProps) => {
  const {slots} = use(ToastContext);

  return (
    <TextPrimitive
      {...rest}
      className={composeSlotClassName(slots?.title, className)}
      data-slot="toast-title"
      slot="title"
    >
      {children}
    </TextPrimitive>
  );
};

ToastTitle.displayName = "HeroUI.Toast.Title";

/* ------------------------------------------------------------------------------------------------
 * Toast Description
 * --------------------------------------------------------------------------------------------- */
interface ToastDescriptionProps extends ComponentPropsWithRef<typeof TextPrimitive> {}

const ToastDescription = ({children, className, ...rest}: ToastDescriptionProps) => {
  const {slots} = use(ToastContext);

  return (
    <TextPrimitive
      {...rest}
      className={composeSlotClassName(slots?.description, className)}
      data-slot="toast-description"
      slot="description"
    >
      {children}
    </TextPrimitive>
  );
};

ToastDescription.displayName = "HeroUI.Toast.Description";

/* ------------------------------------------------------------------------------------------------
 * Toast Close Button
 * --------------------------------------------------------------------------------------------- */
interface ToastCloseButtonProps extends ComponentPropsWithRef<typeof CloseButton> {}

const ToastCloseButton = ({className, ...rest}: ToastCloseButtonProps) => {
  const {slots} = use(ToastContext);

  return (
    <CloseButton
      {...rest}
      className={useResolvedClassName(className, slots?.close())}
      data-slot="toast-close"
      slot="close"
    />
  );
};

ToastCloseButton.displayName = "HeroUI.Toast.CloseButton";

/* ------------------------------------------------------------------------------------------------
 * Toast Action Button
 * --------------------------------------------------------------------------------------------- */
interface ToastActionButtonProps extends ComponentPropsWithRef<typeof Button> {}

const ToastActionButton = ({children, className, ...rest}: ToastActionButtonProps) => {
  const {slots} = use(ToastContext);

  return (
    <Button
      {...rest}
      className={useResolvedClassName(className, slots?.action?.())}
      data-slot="toast-action-button"
    >
      {children}
    </Button>
  );
};

ToastActionButton.displayName = "HeroUI.Toast.ActionButton";

/* ------------------------------------------------------------------------------------------------
 * Toast Region
 * --------------------------------------------------------------------------------------------- */
type ToastRegionPrimitiveProps<T extends object = ToastContentValue> = ComponentPropsWithRef<
  typeof ToastRegionPrimitive<T>
>;

interface ToastProviderProps<T extends object = ToastContentValue> extends Omit<
  ToastRegionPrimitiveProps<T>,
  "queue" | "children"
> {
  // Custom render function or element replacing the default toast layout.
  children?: ToastRegionPrimitiveProps<T>["children"];
  /**
   * The gap between toasts in pixels.
   * @default 12
   */
  gap?: number;
  /**
   * Keeps the stack in its expanded layout instead of expanding only on
   * hover or keyboard focus. Forced expansion does not pause toast timers.
   * @default false
   */
  isExpanded?: boolean;
  /**
   * The maximum number of toasts to display at a time (visual only).
   * @default 3
   */
  maxVisibleToasts?: number;
  /**
   * Hotkey that focuses the toast region. Modifiers match KeyboardEvent boolean props, other keys match event.code. Modifiers left out must be up, so Alt+T does not fire on Ctrl+Alt+T. Pass [] to disable.
   * @default ["altKey", "KeyT"]
   */
  hotkey?: string[];
  /**
   * How much each toast behind the front one scales down.
   * @default 0.05
   */
  scaleFactor?: number;
  /**
   * Placement of the toast region.
   * @default "bottom"
   */
  placement?: ToastVariants["placement"];
  // Custom toast queue instance; defaults to the shared toastQueue.
  queue?: ToastQueue<T>;
  /**
   * The width of the toast; numbers are pixels.
   * @default 460
   */
  width?: number | string;
}

const ToastProvider = <T extends object = ToastContentValue>({
  children,
  className,
  gap = DEFAULT_GAP,
  hotkey = DEFAULT_HOTKEY,
  isExpanded: isExpandedProp = false,
  maxVisibleToasts,
  placement = "bottom",
  queue: queueProp,
  ref: refProp,
  scaleFactor = DEFAULT_SCALE_FACTOR,
  style,
  width = DEFAULT_TOAST_WIDTH,
  ...rest
}: ToastProviderProps<T>) => {
  const slots = useMemo(() => toastVariants({placement}), [placement]);
  const [toastHeights, setToastHeights] = useState<Record<string, number>>({});

  // Keeps the latest hotkey without re-registering the document listener.
  const hotkeyRef = useRef(hotkey);

  useEffect(() => {
    hotkeyRef.current = hotkey;
  }, [hotkey]);

  const toastQueue = useMemo((): StatelyToastQueue<T> => {
    if (queueProp) {
      // The region consumes the underlying react-stately queue, not the wrapper.
      return queueProp.getQueue();
    }

    return defaultToastQueue.getQueue() as StatelyToastQueue<T>;
  }, [queueProp]);

  // Toasts still mounted but playing their exit animation. A foreign
  // react-stately queue degrades gracefully to instant removal.
  const exitAwareQueue = isExitAwareToastQueue(toastQueue) ? toastQueue : null;
  const exitingKeys = useSyncExternalStore(
    exitAwareQueue ? exitAwareQueue.subscribeExiting : subscribeToNothing,
    exitAwareQueue ? exitAwareQueue.getExitingKeys : getEmptyExitingKeys,
    getEmptyExitingKeys,
  );

  const subscribeToQueue = useCallback(
    (onStoreChange: () => void) => toastQueue.subscribe(onStoreChange),
    [toastQueue],
  );
  const visibleToastCount = useSyncExternalStore(
    subscribeToQueue,
    () => toastQueue.visibleToasts.length,
    () => 0,
  );

  const [isPointerOrFocusWithin, setIsPointerOrFocusWithin] = useState(false);
  const pointerWithinRef = useRef(false);

  // Expansion uses native listeners on the region node — React Aria exposes
  // neither region hover nor focus-within to the children function. Touch is
  // ignored so the stack stays collapsed on touch devices. Crossing between
  // toasts never leaves the region: each toast's ::after hit area covers its
  // rounded-corner dead zones and the gap toward its neighbor.
  const handleRegionRef = useCallback(
    (node: HTMLElement | null) => {
      const forwardRegionRef = (value: HTMLElement | null) => {
        if (typeof refProp === "function") {
          (refProp as (instance: HTMLElement | null) => void)(value);
        } else if (refProp && typeof refProp === "object") {
          (refProp as React.MutableRefObject<HTMLElement | null>).current = value;
        }
      };

      forwardRegionRef(node);

      if (!node) {
        return;
      }

      // Focus is checked live against document.activeElement — focus events
      // are unreliable when the focused toast is removed (no focusout fires),
      // so a tracked flag would go stale.
      const collapseIfOutside = () => {
        if (!pointerWithinRef.current && !node.contains(document.activeElement)) {
          setIsPointerOrFocusWithin(false);
        }
      };

      const handlePointerEnterOrMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          return;
        }

        pointerWithinRef.current = true;
        setIsPointerOrFocusWithin(true);
      };

      const handlePointerLeave = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          return;
        }

        pointerWithinRef.current = false;
        collapseIfOutside();
      };

      const handleFocusIn = () => {
        setIsPointerOrFocusWithin(true);
      };

      const handleFocusOut = (event: FocusEvent) => {
        if (event.relatedTarget instanceof Node && node.contains(event.relatedTarget)) {
          return;
        }

        collapseIfOutside();
      };

      // No browser fires pointerleave or focusout when the hovered or focused
      // toast is removed; the only later signal is a pointerover on an outside
      // target. Same fallback React Aria's useHover uses.
      const handleGlobalPointerOver = (event: PointerEvent) => {
        if (event.pointerType === "touch" || node.contains(event.target as Node)) {
          return;
        }

        pointerWithinRef.current = false;
        collapseIfOutside();
      };

      // Escape folds the expanded stack; focus is released so the live
      // focus check doesn't immediately re-expand it.
      const handleRegionKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Escape") {
          return;
        }

        if (node.contains(document.activeElement)) {
          (document.activeElement as HTMLElement).blur();
        }

        pointerWithinRef.current = false;
        setIsPointerOrFocusWithin(false);
      };

      // The hotkey focuses the region (a React Aria landmark, so F6 works too);
      // the focusin listener then expands the stack.
      const handleDocumentKeyDown = (event: KeyboardEvent) => {
        const hotkey = hotkeyRef.current;

        if (hotkey.length === 0) {
          return;
        }

        // Modifiers match KeyboardEvent boolean props; other keys match event.code.
        // Modifiers left out of the hotkey have to be up, so Alt+T does not also
        // fire on Ctrl+Alt+T or Shift+Alt+T.
        const hasExpectedModifiers = MODIFIER_PROPS.every(
          (modifier) => event[modifier] === hotkey.includes(modifier),
        );
        const hasExpectedCodes = hotkey.every(
          (key) =>
            MODIFIER_PROPS.includes(key as (typeof MODIFIER_PROPS)[number]) || event.code === key,
        );

        if (!hasExpectedModifiers || !hasExpectedCodes) {
          return;
        }

        // Claim the combination so the browser doesn't also act on it (Alt+letter
        // opens the menu bar on Windows and Linux).
        event.preventDefault();
        node.focus();
      };

      node.addEventListener("pointerenter", handlePointerEnterOrMove);
      // pointermove re-expands when the stack shifts under a still cursor;
      // Safari/Firefox don't re-fire boundary events without movement.
      node.addEventListener("pointermove", handlePointerEnterOrMove);
      node.addEventListener("pointerleave", handlePointerLeave);
      node.addEventListener("focusin", handleFocusIn);
      node.addEventListener("focusout", handleFocusOut);
      node.addEventListener("keydown", handleRegionKeyDown);
      document.addEventListener("pointerover", handleGlobalPointerOver, true);
      document.addEventListener("keydown", handleDocumentKeyDown);

      return () => {
        node.removeEventListener("pointerenter", handlePointerEnterOrMove);
        node.removeEventListener("pointermove", handlePointerEnterOrMove);
        node.removeEventListener("pointerleave", handlePointerLeave);
        node.removeEventListener("focusin", handleFocusIn);
        node.removeEventListener("focusout", handleFocusOut);
        node.removeEventListener("keydown", handleRegionKeyDown);
        document.removeEventListener("pointerover", handleGlobalPointerOver, true);
        document.removeEventListener("keydown", handleDocumentKeyDown);

        // The region unmounts when the queue empties — reset so the next
        // batch starts collapsed.
        pointerWithinRef.current = false;
        setIsPointerOrFocusWithin(false);

        forwardRegionRef(null);
      };
    },
    [refProp],
  );

  // Interacting with the stack pauses every timer. React Aria's own hover
  // pause resumes too early when a closing toast vanishes under the cursor.
  // Not keyed on `isExpanded` — the prop documents that forced expansion
  // does not pause timers.
  useEffect(() => {
    if (!exitAwareQueue || !isPointerOrFocusWithin) {
      return;
    }

    exitAwareQueue.suspendTimers("interaction");

    return () => {
      exitAwareQueue.resumeTimers("interaction");
    };
  }, [exitAwareQueue, isPointerOrFocusWithin]);

  // Pause timers while the page is hidden so toasts aren't missed in a
  // background tab.
  useEffect(() => {
    if (typeof document === "undefined" || !exitAwareQueue) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        exitAwareQueue.suspendTimers("visibility");
      } else {
        exitAwareQueue.resumeTimers("visibility");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      exitAwareQueue.resumeTimers("visibility");
    };
  }, [exitAwareQueue]);

  // A single remaining toast never expands; exiting toasts don't count.
  const activeToastCount = visibleToastCount - exitingKeys.size;
  const isExpanded = (isExpandedProp || isPointerOrFocusWithin) && activeToastCount > 1;

  const resolvedMaxVisibleToasts = useMemo(() => {
    const queueLimit =
      queueProp && "maxVisibleToasts" in queueProp ? queueProp.maxVisibleToasts : undefined;

    return maxVisibleToasts ?? queueLimit ?? DEFAULT_MAX_VISIBLE_TOAST;
  }, [maxVisibleToasts, queueProp]);

  const handleToastHeightChange = useCallback((key: string, height: number) => {
    setToastHeights((prev) => {
      if (prev[key] === height) {
        return prev;
      }

      return {
        ...prev,
        [key]: height,
      };
    });
  }, []);

  const handleToastHeightRemove = useCallback((key: string) => {
    setToastHeights((prev) => {
      if (!(key in prev)) {
        return prev;
      }

      const next = {...prev};

      delete next[key];

      return next;
    });
  }, []);

  const getDefaultChildren = useCallback(
    (renderProps: {toast: QueuedToast<T>}) => {
      const {actionProps, description, indicator, isLoading, title, variant} =
        (renderProps.toast.content as ToastContentValue) ?? {};

      return (
        <Toast
          placement={placement}
          scaleFactor={scaleFactor}
          toast={renderProps.toast}
          variant={variant}
        >
          {indicator === null ? null : isLoading ? (
            <ToastIndicator variant={variant}>
              <Spinner color="current" size="sm" />
            </ToastIndicator>
          ) : (
            <ToastIndicator variant={variant}>{indicator}</ToastIndicator>
          )}
          <ToastContent>
            {!!title && <ToastTitle>{title}</ToastTitle>}
            {!!description && <ToastDescription>{description}</ToastDescription>}
          </ToastContent>
          {actionProps?.children ? (
            <ToastActionButton {...actionProps}>{actionProps.children}</ToastActionButton>
          ) : null}
          <ToastCloseButton />
        </Toast>
      );
    },
    [placement, scaleFactor],
  );

  const contextValue = useMemo<ToastContext>(
    () => ({
      exitingKeys,
      gap,
      heightsByKey: toastHeights,
      isExpanded,
      maxVisibleToasts: resolvedMaxVisibleToasts,
      onToastHeightChange: handleToastHeightChange,
      onToastHeightRemove: handleToastHeightRemove,
      placement,
      scaleFactor,
      slots,
    }),
    [
      exitingKeys,
      gap,
      handleToastHeightChange,
      handleToastHeightRemove,
      isExpanded,
      placement,
      resolvedMaxVisibleToasts,
      scaleFactor,
      slots,
      toastHeights,
    ],
  );

  const regionStyle = composeRenderProps(
    style,
    (userStyle) =>
      ({
        "--gap": `${gap}px`,
        "--placement": placement,
        "--scale-factor": scaleFactor,
        "--toast-width": typeof width === "number" ? `${width}px` : width,
        ...userStyle,
      }) as CSSProperties,
  );

  return (
    <ToastRegionPrimitive<T>
      {...rest}
      ref={handleRegionRef as ToastRegionPrimitiveProps<T>["ref"]}
      className={useResolvedClassName(className, slots?.region())}
      data-expanded={dataAttr(isExpanded)}
      data-slot="toast-region"
      queue={toastQueue}
      style={regionStyle}
    >
      {(renderProps) => {
        const content = renderProps.toast.content as ToastContentValue;
        const renderPropsWithIsLoading = {
          ...renderProps,
          isLoading: content?.isLoading ?? false,
        };

        return (
          <ToastContext value={contextValue}>
            {typeof children === "undefined"
              ? getDefaultChildren(renderProps)
              : typeof children === "function"
                ? children(renderPropsWithIsLoading)
                : children}
          </ToastContext>
        );
      }}
    </ToastRegionPrimitive>
  );
};

ToastProvider.displayName = "HeroUI.Toast.Provider";

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {
  ToastQueue,
  Toast,
  ToastActionButton,
  ToastCloseButton,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastProvider,
  ToastTitle,
};

export type {
  ToastActionButtonProps,
  ToastCloseButtonProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIndicatorProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
};
