import debounce from "lodash.debounce";
import {useLayoutEffect, useRef} from "react";

export interface UseInfiniteScrollProps {
  /**
   * Whether the infinite scroll is enabled.
   * @default true
   */
  isEnabled?: boolean;
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
   * Use loader element for the scroll detection.
   */
  shouldUseLoader?: boolean;
  /**
   * Callback to load more items.
   */
  onLoadMore?: () => void;
}

export function useInfiniteScroll(props: UseInfiniteScrollProps = {}) {
  const {hasMore, distance = 250, isEnabled = true, shouldUseLoader = true, onLoadMore} = props;

  const scrollContainerRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLElement>(null);

  const previousY = useRef<number>();
  const previousRatio = useRef<number>(0);

  useLayoutEffect(() => {
    const scrollContainerNode = scrollContainerRef.current;

    if (!isEnabled || !scrollContainerNode || !hasMore) return;

    if (shouldUseLoader) {
      const loaderNode = loaderRef.current;

      if (!loaderNode) return;

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
    } else {
      const debouncedOnLoadMore = onLoadMore ? debounce(onLoadMore, 200) : undefined;

      const checkIfNearBottom = () => {
        if (
          scrollContainerNode.scrollHeight - scrollContainerNode.scrollTop <=
          scrollContainerNode.clientHeight + distance
        ) {
          debouncedOnLoadMore?.();
        }
      };

      scrollContainerNode.addEventListener("scroll", checkIfNearBottom);

      return () => {
        scrollContainerNode.removeEventListener("scroll", checkIfNearBottom);
      };
    }
  }, [hasMore, distance, isEnabled, onLoadMore, shouldUseLoader]);

  return [loaderRef, scrollContainerRef];
}

export type UseInfiniteScrollReturn = ReturnType<typeof useInfiniteScroll>;
