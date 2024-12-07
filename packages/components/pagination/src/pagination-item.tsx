import {forwardRef} from "@nextui-org/system";

import {usePaginationItem, UsePaginationItemProps} from "./use-pagination-item";

export interface PaginationItemProps extends UsePaginationItemProps {}

const PaginationItem = forwardRef<"li", PaginationItemProps>((props, ref) => {
  const {Component, FragmentWrapper, fragmentWrapperProps, children, getItemProps} =
    usePaginationItem({...props, ref});

  return (
    <Component {...getItemProps()}>
      <FragmentWrapper {...fragmentWrapperProps}>{children}</FragmentWrapper>
    </Component>
  );
});

PaginationItem.displayName = "NextUI.PaginationItem";

export default PaginationItem;
