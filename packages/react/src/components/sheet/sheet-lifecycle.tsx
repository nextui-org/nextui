"use client";

import type {RefObject} from "react";
import type {SheetRenderProps} from "react-aria-components/Sheet";

import {useCallback, useEffect, useLayoutEffect, useRef} from "react";

import {useSheetContext} from "./context";
import {snapScrollPosition} from "./use-sheet-handle-drag";

/** Observe RAC's scroll lifecycle, including closed overlays retained by isExiting. */
export function SheetLifecycle({
  onExitComplete,
  overlayRef,
}: SheetRenderProps & {overlayRef: RefObject<HTMLDivElement | null>; onExitComplete: () => void}) {
  const {isOpen, onAnimationEnd, placement} = useSheetContext();
  const reported = useRef<boolean | undefined>(undefined);
  const restoring = useRef(false);
  const restingScroll = useRef<{left: number; top: number} | null>(null);
  const latest = useRef({isOpen, onAnimationEnd, onExitComplete});

  useLayoutEffect(() => {
    if (isOpen !== latest.current.isOpen) {
      if (isOpen) restoring.current = true;
      reported.current = undefined;
    }
    latest.current = {isOpen, onAnimationEnd, onExitComplete};
  }, [isOpen, onAnimationEnd, onExitComplete]);

  const notify = useCallback((open: boolean) => {
    if (reported.current === open) return;
    reported.current = open;
    if (open) restoring.current = false;
    latest.current.onAnimationEnd?.(open);
    if (!open) latest.current.onExitComplete();
  }, []);
  const finishScroll = useCallback(() => {
    const scroller = overlayRef.current?.querySelector<HTMLElement>("[data-sheet-scroll]");

    if (scroller?.hasAttribute("data-handle-dragging")) return;

    const rect = scroller
      ?.querySelector<HTMLElement>('[data-slot="sheet-dialog"]')
      ?.getBoundingClientRect();
    const visible =
      !!rect &&
      rect.bottom > 0 &&
      rect.top < window.innerHeight &&
      rect.right > 0 &&
      rect.left < window.innerWidth;

    if (visible !== latest.current.isOpen) return;
    if (latest.current.isOpen && scroller) {
      restingScroll.current = {left: scroller.scrollLeft, top: scroller.scrollTop};
    }
    notify(latest.current.isOpen);
  }, [notify, overlayRef]);

  useEffect(() => {
    if (!isOpen || !restoring.current) return;

    // RAC's enter hook runs on mount. A retained overlay needs its scroll position
    // restored when reopened, without remounting the consumer's content.
    const scroller = overlayRef.current?.querySelector<HTMLElement>("[data-sheet-scroll]");

    if (scroller) {
      // An interrupted first entrance has no saved resting position yet. Read
      // RAC's initial/full snap marker, using the same geometry as handle dragging.
      if (!restingScroll.current) {
        const axis = placement === "left" || placement === "right" ? "x" : "y";
        const after = placement === "bottom" || placement === "right";
        const initial = scroller.querySelector<HTMLElement>("[data-sheet-initial]");
        const marker = initial ?? (after ? scroller.lastElementChild : scroller.firstElementChild);

        if (!(marker instanceof HTMLElement)) return;
        const align = initial ? (after ? "start" : "end") : after ? "end" : "start";
        const position = snapScrollPosition(scroller, marker, axis, align);

        restingScroll.current = {
          left: axis === "x" ? position : 0,
          top: axis === "y" ? position : 0,
        };
      }
      const {left, top} = restingScroll.current;

      if (Math.abs(scroller.scrollLeft - left) > 1 || Math.abs(scroller.scrollTop - top) > 1) {
        scroller.scrollTo({
          ...restingScroll.current,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });

        return;
      }
    }
    if (restoring.current) finishScroll();
  }, [isOpen, overlayRef, finishScroll, placement]);

  useEffect(() => {
    if (isOpen) return;

    const scroller = overlayRef.current?.querySelector<HTMLElement>("[data-sheet-scroll]");

    if (!scroller) return;
    const axis = placement === "left" || placement === "right" ? "x" : "y";
    const after = placement === "bottom" || placement === "right";
    let previous: number | undefined;
    let stationaryFrames = 0;
    let resumedExit = false;
    let frame: number;
    const checkExit = () => {
      finishScroll();
      if (reported.current === false || latest.current.isOpen) return;

      // RAC can miss visibility at a partial detent and skip its exit scroll.
      // Let any native movement finish first, then scroll to its closed marker
      // if the retained panel is still visible. Keep native snapping/motion.
      const current = axis === "x" ? scroller.scrollLeft : scroller.scrollTop;

      stationaryFrames = current === previous ? stationaryFrames + 1 : 0;
      previous = current;
      if (stationaryFrames >= 2 && !resumedExit) {
        const marker = after ? scroller.firstElementChild : scroller.lastElementChild;

        if (marker instanceof HTMLElement) {
          resumedExit = true;
          const target = snapScrollPosition(scroller, marker, axis, after ? "start" : "end");

          scroller.scrollTo({
            [axis === "x" ? "left" : "top"]: target,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          });
        }
      }
      frame = requestAnimationFrame(checkExit);
    };

    // Also handles closing before movement, when no scrollend event fires.
    frame = requestAnimationFrame(checkExit);

    return () => cancelAnimationFrame(frame);
  }, [isOpen, finishScroll, overlayRef, placement]);

  useEffect(() => {
    const scroller = overlayRef.current?.querySelector<HTMLElement>("[data-sheet-scroll]");

    scroller?.addEventListener("scrollend", finishScroll);

    return () => {
      scroller?.removeEventListener("scrollend", finishScroll);
      if (!latest.current.isOpen) notify(false);
    };
  }, [overlayRef, finishScroll, notify]);

  return null;
}
