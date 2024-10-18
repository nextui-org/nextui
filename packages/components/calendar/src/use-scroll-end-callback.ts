import {useCallback, useEffect, useRef} from "react";

function useScrollEndCallback(debounce: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const abortRef = useRef<(() => void) | null>();
  const onScrollRef = useRef<(() => void) | null>();

  const clearListener = useCallback(() => {
    if (elementRef.current && onScrollRef.current) {
      elementRef.current.removeEventListener("scroll", onScrollRef.current);
    }
    // Remove the event listener and clear timeout when the component unmounts
    if (abortRef.current) {
      abortRef.current();
    }
    abortRef.current = null;
    onScrollRef.current = null;
    elementRef.current = null;
  }, [elementRef]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearListener();
    };
  }, []);

  const onScrollEnd = useCallback(
    (element: HTMLElement | null, callback: () => void) => {
      if (!element) return;
      clearListener();
      elementRef.current = element;

      // Clear the timeout if already set
      const abort = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };

      const onScroll = () => {
        // Clear previous timeout to prevent firing too early
        abort();

        // Set new timeout to trigger the callback after scrolling stops
        timeoutRef.current = setTimeout(() => {
          callback();
          clearListener();
        }, debounce); // You can adjust the delay as necessary
      };

      onScrollRef.current = onScroll;

      // Add the scroll event listener to the element
      element.addEventListener("scroll", onScroll);

      // onScroll();

      abortRef.current = abort;
    },
    [debounce],
  );

  return {onScrollEnd, abortRef};
}

export default useScrollEndCallback;
