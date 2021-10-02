import { useEffect } from 'react';

const useDomClean = (): void => {
  useEffect(() => {
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');
  }, []);
};

export default useDomClean;
