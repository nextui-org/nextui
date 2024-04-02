import {useCallback, useRef, useState} from "react";

export type Dimensions = {
  width: number | null;
  height: number | null;
};

/**
 * A custom hook that measures the dimensions of a DOM element.
 * @returns A tuple containing a ref callback and the dimensions of the measured element.
 */
export function useMeasure(): [React.RefCallback<Element>, Dimensions] {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: null,
    height: null,
  });

  const previousObserver = useRef<ResizeObserver | null>(null);

  const customRef = useCallback((node: Element | null) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const {inlineSize: width, blockSize: height} = entry.borderBoxSize[0];

          setDimensions({width, height});
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, dimensions];
}

export type UseMeasureReturn = ReturnType<typeof useMeasure>;
