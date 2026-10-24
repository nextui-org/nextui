"use client";

import type {SheetPlacement} from "./types";
import type {SheetRenderProps} from "react-aria-components/Sheet";

import React from "react";

interface SheetContextValue {
  closeSheet: () => void;
  isDetached: boolean;
  isDismissable: boolean;
  isNested: boolean;
  /** When true, SheetTrigger owns open state and the overlay reads it from context. */
  isTriggerControlled: boolean;
  isOpen: boolean;
  onAnimationEnd?: (open: boolean) => void;
  placement: SheetPlacement;
  setIsOpen: (open: boolean) => void;
  snapPoints?: Array<number | string>;
}

export const SheetContext = React.createContext<SheetContextValue | null>(null);

export const SheetSwipeDirectionContext = React.createContext<
  SheetRenderProps["swipeDirection"] | null
>(null);

export const useSheetContext = () => {
  const context = React.useContext(SheetContext);

  if (!context) {
    throw new Error("useSheetContext must be used within a Sheet");
  }

  return context;
};
