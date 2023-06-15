import {useEffect, useState} from "react";

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    });
  }, []);

  return isMounted;
}
