import {useEffect} from "react";

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
}

export function useDataScrollOverflow(props: UseDataScrollOverflowProps = {}) {
  const {domRef, isEnabled = true, overflowCheck = "vertical", offset = 0} = props;

  useEffect(() => {
    const el = domRef?.current;

    const checkOverflow = () => {
      if (!el) return;

      // Vertical overflow
      if (overflowCheck === "vertical" || overflowCheck === "both") {
        const hasElementsAbove = el.scrollTop > offset;
        const hasElementsBelow = el.scrollTop + el.clientHeight + offset < el.scrollHeight;

        if (hasElementsAbove && hasElementsBelow) {
          el.dataset.topBottomScroll = "true";
          el.removeAttribute("data-top-scroll");
          el.removeAttribute("data-bottom-scroll");
        } else {
          el.dataset.topScroll = hasElementsAbove.toString();
          el.dataset.bottomScroll = hasElementsBelow.toString();
          el.removeAttribute("data-top-bottom-scroll");
        }
      }

      // Horizontal overflow
      if (overflowCheck === "horizontal" || overflowCheck === "both") {
        const hasElementsLeft = el.scrollLeft > offset;
        const hasElementsRight = el.scrollLeft + el.clientWidth + offset < el.scrollWidth;

        if (hasElementsLeft && hasElementsRight) {
          el.dataset.leftRightScroll = "true";
          el.removeAttribute("data-left-scroll");
          el.removeAttribute("data-right-scroll");
        } else {
          el.dataset.leftScroll = hasElementsLeft.toString();
          el.dataset.rightScroll = hasElementsRight.toString();
          el.removeAttribute("data-left-right-scroll");
        }
      }
    };

    const clearOverflow = () => {
      if (!el) return;

      el.removeAttribute("data-top-scroll");
      el.removeAttribute("data-bottom-scroll");
      el.removeAttribute("data-top-bottom-scroll");

      el.removeAttribute("data-left-scroll");
      el.removeAttribute("data-right-scroll");
      el.removeAttribute("data-left-right-scroll");
    };

    if (isEnabled) {
      // first check
      checkOverflow();

      el?.addEventListener("scroll", checkOverflow);
    } else {
      clearOverflow();
    }

    return () => {
      // Cleanup listener when component unmounts
      el?.removeEventListener("scroll", checkOverflow);
      clearOverflow();
    };
  }, [isEnabled, overflowCheck, domRef]);
}

export type UseDataScrollOverflowReturn = ReturnType<typeof useDataScrollOverflow>;
