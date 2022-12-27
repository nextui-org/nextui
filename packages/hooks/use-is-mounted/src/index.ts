import {useCallback, useEffect, useRef} from "react";

export function useIsMounted() {
  const isMounted = useRef(false);

  // Update the ref when the component mounts
  useEffect(() => {
    isMounted.current = true;

    // Update the ref when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Return a callback that returns the value of the ref
  return useCallback(() => isMounted.current, []);
}

export type UseIsMountedReturn = ReturnType<typeof useIsMounted>;
