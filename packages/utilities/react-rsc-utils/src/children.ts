import {Children, ComponentType, isValidElement, ReactElement, ReactNode} from "react";

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: ReactNode) {
  return Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];
}

export const pickChildren = <T = ReactNode>(
  children: T | undefined,
  targetChild: {displayName?: string},
): [T | undefined, T[] | undefined] => {
  let target: T[] = [];

  const withoutTargetChildren = Children.map(children, (item) => {
    if (!isValidElement(item)) return item;
    if (
      targetChild.displayName &&
      typeof item.type === "object" &&
      (item.type as ComponentType).displayName === targetChild.displayName
    ) {
      target.push(item as T);

      return null;
    }

    return item;
  })?.filter(Boolean) as T;

  const targetChildren = target.length >= 0 ? target : undefined;

  return [withoutTargetChildren, targetChildren];
};
