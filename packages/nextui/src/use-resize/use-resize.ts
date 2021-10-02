import { useEffect } from 'react';

const useResize = (
  callback: Function,
  immediatelyInvoke: boolean = true
): void => {
  useEffect(() => {
    const fn = () => callback();
    if (immediatelyInvoke) {
      fn();
    }
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
};

export default useResize;
