"use client";

import type {SheetPlacement} from "./types";
import type React from "react";

import {useEffect, useRef} from "react";

import {useSheetContext} from "./context";
import {animateSheetValue, nearestSheetSnap, sheetDismissTarget} from "./sheet.utils";

/* A pointer drag on the handle scrolls React Aria's sheet. Touch on the panel still swipes natively.
 * Releasing uses the previous sheet curve: 0.5s cubic-bezier(0.32, 0.72, 0, 1). */

type SheetAxis = "x" | "y";

interface HandleDragState {
  axis: SheetAxis;
  handle: HTMLDivElement;
  last: number;
  lastTime: number;
  origin: number;
  pointerId: number;
  scroll: number;
  scroller: HTMLElement;
  startedAt: number;
  velocity: number;
}

export function useSheetHandleDrag(placement: SheetPlacement) {
  const {isDismissable, isOpen, snapPoints} = useSheetContext();
  const drag = useRef<HandleDragState | null>(null);
  const lastScroller = useRef<HTMLElement | null>(null);

  useEffect(
    () => () => {
      const state = drag.current;

      if (state) {
        state.handle.removeAttribute("data-dragging");
        if (state.handle.hasPointerCapture?.(state.pointerId))
          state.handle.releasePointerCapture(state.pointerId);
      }
      drag.current = null;
      if (lastScroller.current) cancelSheetScroll(lastScroller.current);
    },
    [isOpen, placement],
  );

  const axis: SheetAxis = placement === "left" || placement === "right" ? "x" : "y";

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || drag.current) return;

    const scroller = event.currentTarget.closest<HTMLElement>("[data-sheet-scroll]");

    if (!scroller) return;

    const origin = axis === "y" ? event.clientY : event.clientX;

    event.preventDefault();
    if (lastScroller.current) cancelSheetScroll(lastScroller.current);
    lastScroller.current = scroller;
    cancelSheetScroll(scroller);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    event.currentTarget.setAttribute("data-dragging", "");
    scroller.setAttribute("data-handle-dragging", "");
    drag.current = {
      axis,
      handle: event.currentTarget,
      last: origin,
      lastTime: event.timeStamp,
      origin,
      pointerId: event.pointerId,
      scroll: axis === "y" ? scroller.scrollTop : scroller.scrollLeft,
      scroller,
      startedAt: event.timeStamp,
      velocity: 0,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = drag.current;

    if (!state || event.pointerId !== state.pointerId) return;

    const point = state.axis === "y" ? event.clientY : event.clientX;
    const elapsed = event.timeStamp - state.lastTime;

    if (elapsed > 0) state.velocity = (point - state.last) / elapsed;
    state.last = point;
    state.lastTime = event.timeStamp;

    const next = state.scroll - (point - state.origin);

    if (state.axis === "y") state.scroller.scrollTop = next;
    else state.scroller.scrollLeft = next;
  };

  const finish = (event: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    const state = drag.current;

    if (!state || event.pointerId !== state.pointerId) return;

    drag.current = null;
    event.currentTarget.removeAttribute("data-dragging");
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    // Read the dragged position before scroll-snap can pull the sheet back open.
    const current = state.axis === "y" ? state.scroller.scrollTop : state.scroller.scrollLeft;
    const point = state.axis === "y" ? event.clientY : event.clientX;
    const target = cancelled
      ? state.scroll
      : snapPoints && snapPoints.length > 0
        ? nearestSheetSnap(sheetSnapTargets(state.scroller, state.axis), current, state.velocity)
        : sheetDismissTarget({
            current,
            elapsed: event.timeStamp - state.startedAt,
            isDismissable,
            placement,
            rest: state.scroll,
            ...measureSheet(state.scroller, state.axis),
            travel: point - state.origin,
          });

    if (target == null) {
      state.scroller.removeAttribute("data-handle-dragging");

      return;
    }

    animateSheetScroll(state.scroller, state.axis, target, current);
  };

  const cancel = (event: React.PointerEvent<HTMLDivElement>) => finish(event, true);

  return {
    onLostPointerCapture: cancel,
    onPointerCancel: cancel,
    onPointerDown,
    onPointerMove,
    onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => finish(event),
  };
}

const sheetScrollFrames = new WeakMap<HTMLElement, () => void>();

function cancelSheetScroll(scroller: HTMLElement) {
  sheetScrollFrames.get(scroller)?.();
  sheetScrollFrames.delete(scroller);
  scroller.removeAttribute("data-handle-dragging");
}

function animateSheetScroll(scroller: HTMLElement, axis: SheetAxis, to: number, from: number) {
  cancelSheetScroll(scroller);
  scroller.setAttribute("data-handle-dragging", "");
  let completed = false;
  const cancel = animateSheetValue(
    from,
    to,
    (value) => {
      if (axis === "y") scroller.scrollTop = value;
      else scroller.scrollLeft = value;
    },
    () => {
      completed = true;
      sheetScrollFrames.delete(scroller);
      scroller.removeAttribute("data-handle-dragging");
    },
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  if (!completed) sheetScrollFrames.set(scroller, cancel);
}

function measureSheet(scroller: HTMLElement, axis: SheetAxis) {
  const dialog = scroller.querySelector<HTMLElement>("[data-sheet-content]");
  const rect = dialog?.getBoundingClientRect();

  return axis === "y"
    ? {
        extent: scroller.scrollHeight - scroller.clientHeight,
        size: rect?.height || dialog?.clientHeight || 0,
        viewport: window.innerHeight,
      }
    : {
        extent: scroller.scrollWidth - scroller.clientWidth,
        size: rect?.width || dialog?.clientWidth || 0,
        viewport: window.innerWidth,
      };
}

function sheetSnapTargets(scroller: HTMLElement, axis: SheetAxis) {
  const targets: number[] = [];

  for (const node of scroller.querySelectorAll<HTMLElement>("*")) {
    const align = node.style.scrollSnapAlign || getComputedStyle(node).scrollSnapAlign;

    if (!align || align === "none" || align.startsWith("none")) continue;

    const position = snapScrollPosition(scroller, node, axis, align);

    if (Number.isFinite(position)) targets.push(position);
  }

  return targets;
}

export function snapScrollPosition(
  scroller: HTMLElement,
  marker: HTMLElement,
  axis: SheetAxis,
  align: string,
) {
  const markerRect = marker.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  const style = getComputedStyle(marker);
  const edge = align.split(" ")[0];

  if (axis === "y") {
    if (edge === "end") {
      const margin = parseFloat(style.scrollMarginBottom) || 0;

      return (
        markerRect.bottom - scrollerRect.top + scroller.scrollTop + margin - scroller.clientHeight
      );
    }

    const margin = parseFloat(style.scrollMarginTop) || 0;

    return markerRect.top - scrollerRect.top + scroller.scrollTop - margin;
  }

  if (edge === "end") {
    const margin = parseFloat(style.scrollMarginRight) || 0;

    return (
      markerRect.right - scrollerRect.left + scroller.scrollLeft + margin - scroller.clientWidth
    );
  }

  const margin = parseFloat(style.scrollMarginLeft) || 0;

  return markerRect.left - scrollerRect.left + scroller.scrollLeft - margin;
}
