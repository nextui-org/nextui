import { useEffect } from 'react';

const useClickAnyWhere = (handler: (event: Event) => void) => {
  useEffect(() => {
    const callback = (event: Event) => handler(event);

    document.addEventListener('click', callback);
    return () => document.removeEventListener('click', callback);
  }, [handler]);
};

export default useClickAnyWhere;
