import {useState} from "react";

import {useReactId, useIsomorphicLayoutEffect, formatId} from "./utils";

let identifier = 0;

export const useId = (id?: string): string => {
  const initial = useReactId();

  const [clientSideId, setClientSideId] = useState<number | string | undefined>(id ?? initial);

  useIsomorphicLayoutEffect(() => {
    if (!clientSideId) setClientSideId((prevId) => prevId ?? ++identifier);
  }, []);

  return formatId(clientSideId);
};
