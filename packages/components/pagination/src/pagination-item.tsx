import {forwardRef} from "@nextui-org/system";

import {usePaginationItem, UsePaginationItemProps} from "./use-pagination-item";

export interface PaginationItemProps extends Omit<UsePaginationItemProps, "ref"> {}

const PaginationItem = forwardRef<PaginationItemProps, "li">((props, ref) => {
  const {Component, children, getItemProps} = usePaginationItem({ref, ...props});

  return <Component {...getItemProps()}>{children}</Component>;
});

PaginationItem.displayName = "NextUI.PaginationItem";

export default PaginationItem;
