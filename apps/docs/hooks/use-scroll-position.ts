/* eslint-disable no-undef */
import * as React from "react";

export function useScrollPosition(ref: React.MutableRefObject<HTMLElement | null>) {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(ref.current?.scrollTop || 0);
    };

    ref.current?.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      ref.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}
