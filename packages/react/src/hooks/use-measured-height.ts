"use client";

import type {RefObject} from "react";

import {useCallback, useEffect, useState} from "react";

import {useSafeLayoutEffect} from "./use-safe-layout-effect";

export const useMeasuredHeight = (ref: RefObject<HTMLDivElement | null>) => {
  const [height, setHeight] = useState<number | undefined>(undefined);

  const calculateHeight = useCallback(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const previousHeight = element.style.height;

    element.style.height = "auto";
    const measuredHeight = element.offsetHeight;

    element.style.height = previousHeight;

    setHeight((prev) => (prev !== measuredHeight ? measuredHeight : prev));
  }, [ref]);

  useSafeLayoutEffect(() => {
    calculateHeight();
  }, [calculateHeight]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let measureFrame = 0;
    const scheduleMeasure = () => {
      if (measureFrame) return;
      measureFrame = requestAnimationFrame(() => {
        measureFrame = 0;
        calculateHeight();
      });
    };

    const mutationObserver = new MutationObserver(scheduleMeasure);

    mutationObserver.observe(element, {
      attributeFilter: ["class"],
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });

    // Content reflowing at a new width changes the measured height without
    // touching the DOM, so the mutation observer above cannot see it. Only the
    // inline axis is watched: consumers transition the block axis, and reacting
    // to it would re-measure on every frame of that animation.
    let lastWidth = element.getBoundingClientRect().width;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;

      if (width === undefined || Math.abs(width - lastWidth) < 0.5) {
        return;
      }

      lastWidth = width;
      scheduleMeasure();
    });

    resizeObserver.observe(element);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(measureFrame);
    };
  }, [ref, calculateHeight]);

  return {
    height,
  };
};
