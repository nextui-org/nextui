import * as React from "react";

/**
 * A hook that returns true if the component is mounted on the client (hydrated)
 * and false when rendering on the server.
 *
 * @example
 * ```jsx
 * function Component() {
 *   const isHydrated = useIsHydrated()
 *
 *   if (!isHydrated) {
 *     return <div>Loading...</div>
 *   }
 *
 *   return <div>Client rendered content</div>
 * }
 * ```
 * @returns boolean indicating if the component is hydrated
 */

export function useIsHydrated() {
  const subscribe = () => () => {};

  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
