import React, { ReactNode } from 'react';
import { AriaCheckboxProps } from '@react-types/checkbox';
import { TableCollection } from '@react-types/table';

export const hasPaginationChild = (
  children: ReactNode | undefined,
  child: React.ElementType
): { hasPagination: boolean; rowsPerPage: number } => {
  const pagination = React.Children.toArray(children).find(
    (item) => React.isValidElement(item) && item.type === child
  );
  if (React.isValidElement(pagination)) {
    return {
      hasPagination: true,
      rowsPerPage: pagination?.props?.rowsPerPage || 0
    };
  }
  return { hasPagination: false, rowsPerPage: 0 };
};

export const isInfinityScroll = (collection: TableCollection<unknown>) => {
  const bodyProps = collection.body?.props;
  return (
    bodyProps?.loadingState !== undefined &&
    typeof bodyProps?.onLoadMore === 'function'
  );
};

export const mapPropsToCheckboxAttr = (ariaProps: AriaCheckboxProps) => {
  const {
    isSelected,
    defaultSelected,
    isIndeterminate,
    isReadOnly,
    isRequired,
    ...ariaCheckboxProps
  } = ariaProps;
  return {
    checked: isSelected,
    initialChecked: defaultSelected,
    indeterminate: isIndeterminate,
    readOnly: isReadOnly,
    required: isRequired,
    ...ariaCheckboxProps
  };
};
