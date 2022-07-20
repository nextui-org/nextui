import {useRef, useEffect} from "react";

const isBrowser = typeof window !== "undefined";

export type ScrollValue = {x: any; y: any};

function getScrollPosition(element: HTMLElement | undefined | null): ScrollValue {
  if (!isBrowser) return {x: 0, y: 0};

  if (!element) {
    return {x: window.scrollX, y: window.scrollY};
  }

  return {x: element.scrollLeft, y: element.scrollTop};
}

export interface UseScrollPositionOptions {
  wait?: number;
  enabled?: boolean;
  elementRef?: React.RefObject<HTMLElement> | null;
  callback?: ({prevPos, currPos}: {prevPos: ScrollValue; currPos: ScrollValue}) => void;
}

const useScrollPosition = (props: UseScrollPositionOptions): ScrollValue => {
  const {elementRef, wait = 30, callback, enabled} = props;

  const position = useRef<ScrollValue>(getScrollPosition(elementRef?.current));

  let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

  const handler = () => {
    const currPos = getScrollPosition(elementRef?.current);

    if (typeof callback === "function") {
      callback({prevPos: position.current, currPos});
    }

    position.current = currPos;
    throttleTimeout = null;
  };

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(handler, wait);
        }
      } else {
        handler();
      }
    };

    const target = elementRef?.current || window;

    target.addEventListener("scroll", handleScroll);

    return () => target.removeEventListener("scroll", handleScroll);
  }, [elementRef?.current, wait, enabled]);

  return position.current;
};

export default useScrollPosition;
