// based on @react-aria/use-slot-id hook, but with useId from react 18
// thanks to @adobe/react-spectrum for the great work ❤️

import {useId, useCallback} from "react";
import {useValueEffect, useLayoutEffect} from "@react-aria/utils";

export interface UseAriaSlotIdProps {}

export function useAriaSlotId(depArray: ReadonlyArray<any> = []): string {
  let id = useId();
  let [resolvedId, setResolvedId] = useValueEffect(id);
  let updateId = useCallback(() => {
    setResolvedId(function* () {
      yield id;

      yield document.getElementById(id) ? id : undefined;
    });
  }, [id, setResolvedId]);

  useLayoutEffect(updateId, [id, updateId, ...depArray]);

  return resolvedId;
}

export type UseAriaSlotIdReturn = ReturnType<typeof useAriaSlotId>;
