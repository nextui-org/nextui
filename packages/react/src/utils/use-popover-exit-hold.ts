"use client";

import type {PopoverProps} from "react-aria-components/Popover";

import {use} from "react";
import {OverlayTriggerStateContext} from "react-aria-components/Dialog";
import {PopoverContext} from "react-aria-components/Popover";
import {useSlottedContext} from "react-aria-components/slots";

import {resolveOverlayOpen, useOverlayExitHold} from "./use-overlay-exit-hold";

/** Follow the same local and slotted animation options as React Aria's Popover. */
export const usePopoverExitHold = <T extends HTMLElement>(
  props: Pick<PopoverProps, "defaultOpen" | "isOpen" | "shouldSkipAnimation" | "slot">,
  options: Parameters<typeof useOverlayExitHold<T>>[1],
) => {
  const context = useSlottedContext(PopoverContext, props.slot);
  const state = use(OverlayTriggerStateContext);
  const shouldSkipAnimation = props.shouldSkipAnimation ?? context?.shouldSkipAnimation;

  return useOverlayExitHold(
    resolveOverlayOpen(
      props.isOpen ?? context?.isOpen,
      props.defaultOpen ?? context?.defaultOpen,
      state,
    ),
    {...options, enabled: !shouldSkipAnimation},
  );
};
