import {useCallback, useEffect, useRef, useState} from "react";

export type UseIsMountedProps = {
  rerender?: boolean;
};

export function useIsMounted(props: UseIsMountedProps = {}) {
  const {rerender = false} = props;

  const isMountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  // Update the ref when the component mounts
  useEffect(() => {
    isMountedRef.current = true;

    if (rerender) {
      setIsMounted(true);
    }

    // Update the ref when the component unmounts
    return () => {
      isMountedRef.current = false;
      if (rerender) {
        setIsMounted(false);
      }
    };
  }, [rerender]);

  // Return a callback that returns the value of the ref
  return [useCallback(() => isMountedRef.current, []), isMounted];
}

export type UseIsMountedReturn = ReturnType<typeof useIsMounted>;
