import React from "react";

// Utility helper for random number generation
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const useRandomInterval = (
  callback: () => void,
  minDelay: number | null = 50,
  maxDelay: number | null = 500,
) => {
  const timeoutId = React.useRef<any>();

  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (typeof minDelay === "number" && typeof maxDelay === "number") {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);

        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };

      handleTick();
    }

    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);

  const cancel = React.useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);

  return cancel;
};

export default useRandomInterval;
