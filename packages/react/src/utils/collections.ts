import React, { ReactNode } from 'react';

export const getId = () => {
  return Math.random().toString(32).slice(2, 10);
};

export const hasChild = (
  children: ReactNode | undefined,
  child: React.ElementType
): boolean => {
  const types = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return null;
    return item.type;
  });

  return (types || []).includes(child);
};

export const pick = <Obj extends { [key: string]: any }, Key extends keyof Obj>(
  props: Key[],
  obj: Obj
): Pick<Obj, Key> =>
  props.reduce((acc, prop) => {
    acc[prop] = obj[prop];
    return acc;
  }, {} as Pick<Obj, Key>);

export const pickChild = <T = ReactNode>(
  children: ReactNode | undefined,
  targetChild: React.ElementType
): [T | ReactNode | undefined, ReactNode[] | undefined] => {
  let target: ReactNode[] = [];
  const withoutTargetChildren = React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return item;
    if (item.type === targetChild) {
      target.push(item);
      return null;
    }
    return item;
  });

  const targetChildren = target.length >= 0 ? target : undefined;

  return [withoutTargetChildren, targetChildren];
};

export const pickSingleChild = <T = ReactNode>(
  children: ReactNode | undefined,
  targetChild: React.ElementType
): [T, ReactNode | null] => {
  const [withoutTargetChildren, target] = pickChild<T>(children, targetChild);
  let targetChildren: ReactNode = null;

  if (target && target.length >= 1) {
    targetChildren = target.length >= 0 ? target[0] : undefined;
  }

  return [withoutTargetChildren as T, targetChildren];
};

export const isChildElement = (
  parent: Element | null | undefined,
  child: Element | null | undefined
): boolean => {
  if (!parent || !child) return false;
  // eslint-disable-next-line no-undef
  let node: (Node & ParentNode) | null = child;
  while (node) {
    if (node === parent) return true;
    node = node.parentNode;
  }
  return false;
};

export const isBrowser = (): boolean => {
  return Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  );
};

export const isMac = (): boolean => {
  if (!isBrowser()) return false;
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
};

export const setChildrenIndex = (
  children: ReactNode | undefined,
  targetComponents: Array<React.ElementType> = []
): ReactNode | undefined => {
  if (React.Children.count(children) === 0) return [];
  const allowAll = targetComponents.length === 0;
  const clone = (child: React.ReactElement, props = {}) =>
    React.cloneElement(child, props);
  let index = 0;

  return React.Children.map(children, (item) => {
    if (!React.isValidElement(item)) return item;
    index = index + 1;
    if (allowAll) return clone(item, { index });

    const isAllowed = targetComponents.find((child) => child === item.type);
    if (isAllowed) return clone(item, { index });
    index = index - 1;
    return item;
  });
};

export const flattenArray = (arr: any[]): any[] => {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val),
    []
  );
};
