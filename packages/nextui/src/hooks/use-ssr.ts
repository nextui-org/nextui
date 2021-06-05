import { useEffect, useState } from 'react';

const isBrowser = (): boolean => {
  return Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  );
};

export type SSRState = {
  isBrowser: boolean;
  isServer: boolean;
};

const useSSR = (): SSRState => {
  const [browser, setBrowser] = useState<boolean>(false);
  useEffect(() => {
    setBrowser(isBrowser());
  }, []);

  return {
    isBrowser: browser,
    isServer: !browser,
  };
};

export default useSSR;
