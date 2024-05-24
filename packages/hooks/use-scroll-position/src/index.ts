import {useRef, useEffect, useCallback} from "react";

const isBrowser = typeof window !== "undefined";

export type ScrollValue = {x: number; y: number};

function getScrollPosition(element: HTMLElement | undefined | null): ScrollValue {
  if (!isBrowser) return {x: 0, y: 0};
  if (!element) {
    return {x: window.scrollX, y: window.scrollY};
  }

  return {x: element.scrollLeft, y: element.scrollTop};
}

export interface UseScrollPositionOptions {
  /**
   * The wait time in milliseconds before triggering the callback.
   * @default 30
   */
  delay?: number;
  /**
   * Whether the scroll position should be tracked or not.
   * @default true
   */
  isEnabled?: boolean;
  /**
   * The element to track the scroll position for.
   */
  elementRef?: React.RefObject<HTMLElement> | null;
  /**
   * The callback function to be called when the scroll position changes.
   */
  callback?: ({prevPos, currPos}: {prevPos: ScrollValue; currPos: ScrollValue}) => void;
}

export const useScrollPosition = (props: UseScrollPositionOptions): ScrollValue => {
  const {elementRef, delay = 30, callback, isEnabled} = props;

  const position = useRef<ScrollValue>(
    isEnabled ? getScrollPosition(elementRef?.current) : {x: 0, y: 0},
  );

  const throttleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handler = useCallback(() => {
    const currPos = getScrollPosition(elementRef?.current);

    if (typeof callback === "function") {
      callback({prevPos: position.current, currPos});
    }

    position.current = currPos;
    throttleTimeout.current = null;
  }, [callback, elementRef]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleScroll = () => {
      if (delay) {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(handler, delay);
        }
      } else {
        handler();
      }
    };

    const target = elementRef?.current || window;

    target.addEventListener("scroll", handleScroll);

    return () => {
      target.removeEventListener("scroll", handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [elementRef?.current, delay, handler, isEnabled]);

  return position.current;
};
