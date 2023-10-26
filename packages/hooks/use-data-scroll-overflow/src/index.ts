import {capitalize} from "@nextui-org/shared-utils";
import {useEffect, useRef} from "react";

export type VisibleState = "auto" | "top" | "bottom" | "left" | "right" | "both" | "none";

export interface UseDataScrollOverflowProps {
  /**
   * The reference to the DOM element on which we're checking overflow.
   */
  domRef?: React.RefObject<HTMLElement>;
  /**
   * Determines the direction of overflow to check.
   * - "horizontal" will check for overflow on the x-axis.
   * - "vertical" will check for overflow on the y-axis.
   * - "both" (default) will check for overflow on both axes.
   *
   * @default "both"
   */
  overflowCheck?: "horizontal" | "vertical" | "both";
  /**
   * Controlled visible state. Passing "auto" will make the shadow visible only when the scroll reaches the edge.
   * use "left" / "right" for horizontal scroll and "top" / "bottom" for vertical scroll.
   * @default "auto"
   */
  visible?: VisibleState;
  /**
   * Enables or disables the overflow checking mechanism.
   * @default true
   */
  isEnabled?: boolean;
  /**
   * Defines a buffer or margin within which we won't treat the scroll as reaching the edge.
   *
   * @default 0 - meaning the check will behave exactly at the edge.
   */
  offset?: number;
  /**
   * Callback to be called when the overflow state changes.
   *
   * @param overflow VisibleState
   */
  onVisibleChange?: (overflow: VisibleState) => void;
}

export function useDataScrollOverflow(props: UseDataScrollOverflowProps = {}) {
  const {
    domRef,
    isEnabled = true,
    overflowCheck = "vertical",
    visible = "auto",
    offset = 0,
    onVisibleChange,
  } = props;

  const visibleRef = useRef<VisibleState>(visible);

  useEffect(() => {
    const el = domRef?.current;

    if (!el || !isEnabled) return;

    const setAttributes = (
      direction: string,
      hasBefore: boolean,
      hasAfter: boolean,
      prefix: string,
      suffix: string,
    ) => {
      if (visible === "auto") {
        const both = `${prefix}${capitalize(suffix)}Scroll`;

        if (hasBefore && hasAfter) {
          el.dataset[both] = "true";
          el.removeAttribute(`data-${prefix}-scroll`);
          el.removeAttribute(`data-${suffix}-scroll`);
        } else {
          el.dataset[`${prefix}Scroll`] = hasBefore.toString();
          el.dataset[`${suffix}Scroll`] = hasAfter.toString();
          el.removeAttribute(`data-${prefix}-${suffix}-scroll`);
        }
      } else {
        const next =
          hasBefore && hasAfter ? "both" : hasBefore ? prefix : hasAfter ? suffix : "none";

        if (next !== visibleRef.current) {
          onVisibleChange?.(next as VisibleState);
          visibleRef.current = next as VisibleState;
        }
      }
    };

    const checkOverflow = () => {
      const directions = [
        {type: "vertical", prefix: "top", suffix: "bottom"},
        {type: "horizontal", prefix: "left", suffix: "right"},
      ];

      for (const {type, prefix, suffix} of directions) {
        if (overflowCheck === type || overflowCheck === "both") {
          const hasBefore = type === "vertical" ? el.scrollTop > offset : el.scrollLeft > offset;
          const hasAfter =
            type === "vertical"
              ? el.scrollTop + el.clientHeight + offset < el.scrollHeight
              : el.scrollLeft + el.clientWidth + offset < el.scrollWidth;

          setAttributes(type, hasBefore, hasAfter, prefix, suffix);
        }
      }
    };

    const clearOverflow = () => {
      ["top", "bottom", "topBottom", "left", "right", "leftRight"].forEach((attr) => {
        el.removeAttribute(`data-${attr}-scroll`);
      });
    };

    // auto
    checkOverflow();
    el.addEventListener("scroll", checkOverflow);

    // controlled
    if (visible !== "auto") {
      clearOverflow();
      if (visible === "both") {
        el.dataset.topBottomScroll = String(overflowCheck === "vertical");
        el.dataset.leftRightScroll = String(overflowCheck === "horizontal");
      } else {
        el.dataset.topBottomScroll = "false";
        el.dataset.leftRightScroll = "false";

        ["top", "bottom", "left", "right"].forEach((attr) => {
          el.dataset[`${attr}Scroll`] = String(visible === attr);
        });
      }
    }

    return () => {
      el.removeEventListener("scroll", checkOverflow);
      clearOverflow();
    };
  }, [isEnabled, visible, overflowCheck, onVisibleChange, domRef]);
}

export type UseDataScrollOverflowReturn = ReturnType<typeof useDataScrollOverflow>;
