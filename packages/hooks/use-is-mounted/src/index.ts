import {useCallback, useEffect, useRef, useState} from "react";

export type UseIsMountedProps = {
  rerender?: boolean;
  delay?: number;
};

export function useIsMounted(props: UseIsMountedProps = {}) {
  const {rerender = false, delay = 0} = props;

  const isMountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  // Update the ref when the component mounts
  useEffect(() => {
    isMountedRef.current = true;
    let timer: any = null;

    if (rerender) {
      if (delay > 0) {
        timer = setTimeout(() => {
          setIsMounted(true);
        }, delay);
      } else {
        setIsMounted(true);
      }
    }

    // Update the ref when the component unmounts
    return () => {
      isMountedRef.current = false;
      if (rerender) {
        setIsMounted(false);
      }
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [rerender]);

  // Return a callback that returns the value of the ref
  return [useCallback(() => isMountedRef.current, []), isMounted];
}

export type UseIsMountedReturn = ReturnType<typeof useIsMounted>;
