import React, {useRef, createContext, useContext, useCallback} from "react";
// TODO: remove this and use the one from "react:18" once we migrate to it
import {useSyncExternalStore} from "use-sync-external-store";

/**
 * Creates a fast named context, provider, and store hook.
 * This is a faster alternative to React's built-in context API, it saves the data in a ref and
 * updates it when the context value changes. It also allows to subscribe to the context specific value.
 */
export function createFastContext<Store>(initialState: Store, name = "StoreFastContext") {
  function useStoreData(): {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
      store.current = {...store.current, ...value};
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);

      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  StoreContext.displayName = name;

  function Provider({children}: {children: React.ReactNode}) {
    return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
  }

  function useStore<T>(selector: (store: Store) => T): [T, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);

    if (!store) {
      const error = new Error(
        "Store not found. Seems you forgot to wrap component within the Provider",
      );

      error.name = "FastContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    const state = useSyncExternalStore(store.subscribe, () => selector(store.get()));

    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}
