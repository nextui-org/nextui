import {forwardRef} from "@heroui/system";

import {usePaginationItem, UsePaginationItemProps} from "./use-pagination-item";

export interface PaginationItemProps extends UsePaginationItemProps {}

const PaginationItem = forwardRef<"li", PaginationItemProps>((props, ref) => {
  const {Component, children, getItemProps} = usePaginationItem({...props, ref});

  return <Component {...getItemProps()}>{children}</Component>;
});

PaginationItem.displayName = "HeroUI.PaginationItem";

export default PaginationItem;
