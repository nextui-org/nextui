import {RefObject, useEffect, useState} from "react";

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false}: Args = {},
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>();

  const isFrozen = entry?.isIntersecting && freezeOnceVisible;
  const isVisible = !!entry?.isIntersecting;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || isFrozen || !node) return;

    const observerParams = {threshold, root, rootMargin};
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, isFrozen]);

  return {entry, setEntry, isVisible, isFrozen};
}

export default useIntersectionObserver;
