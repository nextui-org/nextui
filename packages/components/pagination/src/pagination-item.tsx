import {forwardRef} from "@nextui-org/system";

import {usePaginationItem, UsePaginationItemProps} from "./use-pagination-item";

export interface PaginationItemProps extends UsePaginationItemProps {}

const PaginationItem = forwardRef<"li", PaginationItemProps>(({key, ...props}, ref) => {
  const {Component, children, getItemProps} = usePaginationItem({...props, ref});

  return (
    <Component key={key} {...getItemProps()}>
      {children}
    </Component>
  );
});

PaginationItem.displayName = "NextUI.PaginationItem";

export default PaginationItem;
