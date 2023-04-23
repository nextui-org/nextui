import {useLayoutEffect, useRef} from "react";

export interface UseInfiniteScrollProps {
  /**
   * Whether there are more items to load, the observer will disconnect when there are no more items to load.
   */
  hasMore?: boolean;
  /**
   * The distance in pixels before the end of the items that will trigger a call to load more.
   * @default 250
   */
  distance?: number;
  /**
   * Callback to load more items.
   */
  onLoadMore?: () => void;
}

export function useInfiniteScroll(props: UseInfiniteScrollProps = {}) {
  const {hasMore, distance = 250, onLoadMore} = props;

  const scrollContainerRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLElement>(null);

  const previousY = useRef<number>();
  const previousRatio = useRef<number>(0);

  useLayoutEffect(() => {
    const loaderNode = loaderRef.current;
    const scrollContainerNode = scrollContainerRef.current;

    if (!scrollContainerNode || !loaderNode || !hasMore) return;

    const options = {
      root: scrollContainerNode,
      rootMargin: `0px 0px ${distance}px 0px`,
    };

    const listener = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(({isIntersecting, intersectionRatio, boundingClientRect = {}}) => {
        const y = boundingClientRect.y || 0;

        if (
          isIntersecting &&
          intersectionRatio >= previousRatio.current &&
          (!previousY.current || y < previousY.current)
        ) {
          onLoadMore?.();
        }
        previousY.current = y;
        previousRatio.current = intersectionRatio;
      });
    };

    const observer = new IntersectionObserver(listener, options);

    observer.observe(loaderNode);

    return () => observer.disconnect();
  }, [hasMore, distance, onLoadMore]);

  return [loaderRef, scrollContainerRef];
}

export type UseInfiniteScrollReturn = ReturnType<typeof useInfiniteScroll>;
