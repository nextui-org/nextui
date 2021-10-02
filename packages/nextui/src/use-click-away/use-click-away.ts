import { MutableRefObject, useEffect } from 'react';

const useClickAway = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const callback = (event: Event) => {
      const el = ref.current;
      if (!event || !el || el.contains((event as any).target)) return;
      handler(event);
    };

    document.addEventListener('click', callback);
    return () => document.removeEventListener('click', callback);
  }, [ref, handler]);
};

export default useClickAway;
