import {Children, createElement, isValidElement} from "react";
import {CollectionChildren, CollectionElement} from "@react-types/shared";
import {warn} from "@nextui-org/shared-utils";

const getElementType = (el: any) => {
  console.log(el.type);

  return "section";
};

const getValidCollectionChildren = <T = object>(
  children: CollectionChildren<T>,
  baseChild: any,
  sectionChild?: any,
) => {
  let list: CollectionElement<T>[] = [];
  let hasCustomChildren = false;

  // console.log(html);

  // Children.forEach(children.props.children, (child) => {
  //   console.log(child);
  //   // if (child.type === DropdownItem) {
  //   //   hasDropdownItem = true;
  //   // }
  //   // if (child.type === DropdownSection) {
  //   //   hasDropdownSection = true;
  //   // }
  // });

  Children.map(children, (item) => {
    // console.log(item, item.props);
    console.log(String(item.type));
    // console.log(getElementType(item));

    if (!isValidElement(item)) return item;
    if (item.type === baseChild || item.type === sectionChild) {
      list.push(item);
    } else {
      // if(item.props.children )
      // Children.forEach(item.props.children, (grandChild) => {
      // console.log(grandChild);
      // if (grandChild.type === DropdownItem) {
      // console.log('This is a DropdownItem inside MyItem');
      // }
      // });

      // @ts-ignore
      const listItem = createElement(baseChild, {
        ...item.props,
        // @ts-ignore
        key: item.key || item.props?.key || "",
      }) as CollectionElement<T>;

      // console.log(listItem.type.getCollectionNode);
      list.push(listItem);

      hasCustomChildren = true;
    }
  })?.filter(Boolean) as T;

  return {list, hasCustomChildren};
};

export const createCollectionChildren = <T = object>({
  children,
  item,
  section,
  items,
}: {
  children: CollectionChildren<T>;
  item: any;
  section?: any;
  items?: Iterable<T>;
}) => {
  let collectionItems: CollectionChildren<T> = children;

  if (typeof children === "function") {
    if (!items) {
      warn("props.children was a function but props.items is missing");

      return undefined;
    }

    collectionItems = [];

    for (let i of items) {
      collectionItems.push(children(i));
    }
  }
  const {list, hasCustomChildren} = getValidCollectionChildren(collectionItems, item, section);

  const targetChildren = hasCustomChildren && list.length ? list : children;

  return targetChildren;
};
