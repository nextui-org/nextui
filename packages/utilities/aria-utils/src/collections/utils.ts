import {Children, createElement, isValidElement} from "react";
import {CollectionChildren, CollectionElement} from "@react-types/shared";
import {warn} from "@nextui-org/shared-utils";

const getValidCollectionChildren = <T = object>(
  children: CollectionChildren<T>,
  baseChild: any,
) => {
  let list: CollectionElement<T>[] = [];
  let hasCustomChildren = false;

  Children.map(children, (item) => {
    if (!isValidElement(item)) return item;
    if (item.type === baseChild) {
      list.push(item);
    } else {
      // @ts-ignore
      const listItem = createElement(baseChild, {
        ...item.props,
        // @ts-ignore
        key: item.key || item.props?.key || "",
      }) as CollectionElement<T>;

      list.push(listItem);

      hasCustomChildren = true;
    }
  })?.filter(Boolean) as T;

  return {list, hasCustomChildren};
};

export const createCollectionChildren = <T = object>(
  children: CollectionChildren<T>,
  baseChild: any,
  items?: Iterable<T>,
) => {
  let collectionItems: CollectionChildren<T> = children;

  if (typeof children === "function") {
    if (!items) {
      warn("props.children was a function but props.items is missing");

      return undefined;
    }

    collectionItems = [];

    for (let item of items) {
      collectionItems.push(children(item));
    }
  }

  const {list, hasCustomChildren} = getValidCollectionChildren(collectionItems, baseChild);

  const targetChildren = hasCustomChildren && list.length ? list : children;

  return targetChildren;
};
