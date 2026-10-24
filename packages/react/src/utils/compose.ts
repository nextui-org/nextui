"use client";

import {useMemo} from "react";
import {composeRenderProps} from "react-aria-components/composeRenderProps";
import {cx} from "tailwind-variants";

// Re-export utility classes from @heroui/styles for backward compatibility
export {disabledClasses, focusRingClasses, ariaDisabledClasses} from "@heroui/styles";

function composeTwRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind?: string | ((v: T) => string | undefined),
): string | ((v: T) => string) {
  return composeRenderProps(className, (className, renderProps): string => {
    const tw = typeof tailwind === "function" ? (tailwind(renderProps) ?? "") : (tailwind ?? "");
    const cls = className ?? "";

    return cx(tw, cls) ?? "";
  });
}

export const composeSlotClassName = (
  slotFn: ((args?: {className?: string; [key: string]: any}) => string) | undefined,
  className?: string,
  variants?: Record<string, any>,
): string | undefined => {
  return typeof slotFn === "function" ? slotFn({...(variants ?? {}), className}) : className;
};

function useResolvedClassName<T>(
  className: string | ((v: T) => string) | undefined,
  styles?: string,
): string | ((v: T) => string) {
  return useMemo(() => {
    if (typeof className === "function") {
      return composeTwRenderProps(className, styles);
    }

    if (!styles) {
      return className ?? "";
    }

    return className ? (cx(styles, className) ?? styles) : styles;
  }, [className, styles]);
}

export {composeTwRenderProps, useResolvedClassName};
