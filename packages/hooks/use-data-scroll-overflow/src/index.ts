import {useEffect} from "react";

export interface UseDataScrollOverflowProps {
  domRef?: React.RefObject<HTMLElement>;
  isEnabled?: boolean;
}

export function useDataScrollOverflow(props: UseDataScrollOverflowProps = {}) {
  const {domRef, isEnabled = true} = props;

  useEffect(() => {
    const el = domRef?.current;

    const checkOverflow = () => {
      if (!el) return;

      const hasElementsAbove = el.scrollTop > 0;
      const hasElementsBelow = el.scrollTop + el.clientHeight < el.scrollHeight;

      if (hasElementsAbove && hasElementsBelow) {
        el.dataset.hasBothScroll = "true";
        el.dataset.hasTopScroll = "false";
        el.dataset.hasBottomScroll = "false";
      } else {
        el.dataset.hasBothScroll = "false";
        el.dataset.hasTopScroll = hasElementsAbove.toString();
        el.dataset.hasBottomScroll = hasElementsBelow.toString();
      }
    };

    el?.addEventListener("scroll", checkOverflow);

    isEnabled && checkOverflow();

    return () => {
      // Cleanup listener when component unmounts
      el?.removeEventListener("scroll", checkOverflow);
    };
  }, [isEnabled]);
}

export type UseDataScrollOverflowReturn = ReturnType<typeof useDataScrollOverflow>;
