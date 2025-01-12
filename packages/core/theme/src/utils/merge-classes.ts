import type {SlotsToClasses} from "./types";

import {clsx} from "@heroui/shared-utils";

/**
 * Merges two sets of class names for each slot in a component.
 * @param itemClasses - Base classes for each slot
 * @param itemPropsClasses - Additional classes from props for each slot
 * @returns A merged object containing the combined classes for each slot
 */
export const mergeClasses = <T extends SlotsToClasses<string>, P extends SlotsToClasses<string>>(
  itemClasses?: T,
  itemPropsClasses?: P,
): T => {
  if (!itemClasses && !itemPropsClasses) return {} as T;

  const keys = new Set([...Object.keys(itemClasses || {}), ...Object.keys(itemPropsClasses || {})]);

  return Array.from(keys).reduce(
    (acc, key) => ({
      ...acc,
      [key]: clsx(itemClasses?.[key], itemPropsClasses?.[key]),
    }),
    {} as T,
  );
};
