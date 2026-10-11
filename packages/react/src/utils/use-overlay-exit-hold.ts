"use client";

import type {Ref} from "react";

import {useCallback, useLayoutEffect, useRef, useState} from "react";
import {flushSync} from "react-dom";

const EXITING_SELECTOR = '[data-exiting="true"]';

type ExitHoldOptions<T extends HTMLElement> = {
  /** Close immediately when false. Tooltip warmup uses this. */
  enabled?: boolean;
  /** Called when the hold starts, before the exit animation is observed. Must be stable. */
  prepare?: (element: HTMLElement) => void;
  /** The caller's ref, merged into the returned one. */
  ref?: Ref<T>;
};

const setRef = <T>(ref: Ref<T> | undefined, value: T) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

const animationDurationMs = (element: Element) => {
  const durations = getComputedStyle(element)
    .animationDuration.split(",")
    .map((part) => {
      const value = part.trim();
      const amount = Number.parseFloat(value);

      if (Number.isNaN(amount)) return 0;

      return value.endsWith("ms") ? amount : amount * 1000;
    });

  return Math.max(0, ...durations);
};

const hasAnimationName = (element: Element) =>
  getComputedStyle(element)
    .animationName.split(",")
    .some((name) => {
      const value = name.trim().replaceAll('"', "");

      return value !== "" && value !== "none";
    });

/** The overlay and its exiting parts, e.g. a modal backdrop and its container. */
const exitingElements = (element: HTMLElement) => [
  element,
  ...element.querySelectorAll<HTMLElement>(EXITING_SELECTOR),
];

/** Longest exit animation on the overlay or an exiting part, in ms. */
const exitAnimationDuration = (element: HTMLElement) =>
  Math.max(
    0,
    ...exitingElements(element).map((node) =>
      hasAnimationName(node) ? animationDurationMs(node) : 0,
    ),
  );

const isExitingTarget = (element: HTMLElement, target: unknown) =>
  target instanceof Element &&
  (target === element || (element.contains(target) && target.matches(EXITING_SELECTOR)));

const runningExitAnimations = (element: HTMLElement) => {
  if (typeof element.getAnimations !== "function" || typeof CSSAnimation === "undefined") {
    return [];
  }

  return element.getAnimations({subtree: true}).filter((animation): animation is CSSAnimation => {
    return (
      animation instanceof CSSAnimation &&
      isExitingTarget(element, (animation.effect as KeyframeEffect | null)?.target) &&
      (animation.playState === "running" || String(animation.playState) === "pending")
    );
  });
};

/**
 * Keeps an overlay mounted until its close animation is actually running.
 *
 * WebKit leaves a new CSS animation `pending` in the layout effect where React Aria
 * looks for `playState === "running"`, then unmounts. Holding `isExiting` lets the
 * animation paint. With no stylesheet animation, release through a normal setState.
 * After the animation ends, fill mode `none` would paint opacity 1 again, so pin it
 * and unmount before that frame.
 */
export const useOverlayExitHold = <T extends HTMLElement>(
  isOpen: boolean | undefined,
  {enabled = true, prepare, ref: forwardedRef}: ExitHoldOptions<T> = {},
) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [prevOpen, setPrevOpen] = useState(isOpen);

  let exiting = isExiting;

  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    exiting = enabled && isOpen === false;
    if (exiting !== isExiting) setIsExiting(exiting);
  } else if ((!enabled || isOpen) && isExiting) {
    setIsExiting(false);
    exiting = false;
  }

  const ref = useCallback(
    (node: T | null) => {
      elementRef.current = node;
      setRef(forwardedRef, node);
    },
    [forwardedRef],
  );

  const endExit = useCallback(() => setIsExiting(false), []);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!exiting || !element) return;

    prepare?.(element);

    let settled = false;
    // Inside the layout effect, setState is already flushed before paint.
    const finish = () => {
      if (settled) return;
      settled = true;
      endExit();
    };
    // After the animation ends the fill is `none`, so computed opacity is already 1.
    // Pin it and unmount before that frame is painted.
    const finishBeforePaint = () => {
      if (settled) return;
      settled = true;

      for (const node of exitingElements(element)) {
        node.style.opacity = "0";
      }

      flushSync(endExit);
    };
    const waitForAnimations = (animations: CSSAnimation[]) => {
      if (animations.length === 0) {
        finish();

        return;
      }

      void Promise.all(animations.map((animation) => animation.finished)).then(
        finishBeforePaint,
        finishBeforePaint,
      );
    };

    const current = runningExitAnimations(element);

    if (current.length > 0) {
      waitForAnimations(current);

      return () => {
        settled = true;
      };
    }

    const duration = exitAnimationDuration(element);

    // No stylesheet animation (jsdom, reduced motion). Release in this layout pass.
    if (duration === 0) {
      finish();

      return;
    }

    // WebKit has already applied the animation name, but getAnimations() still
    // reports nothing until the next frame. Hold until it is running, or until
    // its duration elapses if it never starts.
    const onAnimationDone = (event: AnimationEvent) => {
      if (!isExitingTarget(element, event.target)) return;
      if (runningExitAnimations(element).length > 0) return;

      finishBeforePaint();
    };

    element.addEventListener("animationend", onAnimationDone);
    element.addEventListener("animationcancel", onAnimationDone);
    const timeout = window.setTimeout(finishBeforePaint, duration + 50);
    const frame = window.requestAnimationFrame(() => {
      const next = runningExitAnimations(element);

      if (next.length === 0) return;

      window.clearTimeout(timeout);
      waitForAnimations(next);
    });

    return () => {
      settled = true;
      element.removeEventListener("animationend", onAnimationDone);
      element.removeEventListener("animationcancel", onAnimationDone);
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [endExit, exiting, prepare]);

  return {isExiting: exiting, ref};
};

/** Same open-state choice as React Aria: local `isOpen` wins, otherwise the trigger state. */
export const resolveOverlayOpen = (
  isOpen: boolean | undefined,
  defaultOpen: boolean | undefined,
  state: {isOpen: boolean} | null,
) => {
  if (isOpen != null || defaultOpen != null || !state) return isOpen;

  return state.isOpen;
};
