import {forwardRef} from "react";

import {usePaginationItem, UsePaginationItemProps} from "./use-pagination-item";

export interface PaginationItemProps extends Omit<UsePaginationItemProps, "ref"> {}

const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(({key, ...props}, ref) => {
  const {Component, children, getItemProps} = usePaginationItem({ref, ...props});

  return (
    <Component key={key} {...getItemProps()}>
      {children}
    </Component>
  );
});

PaginationItem.displayName = "NextUI.PaginationItem";

export default PaginationItem;
