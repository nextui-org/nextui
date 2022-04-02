import { AriaCheckboxProps } from '@react-types/checkbox';
import { TableCollection } from '@react-types/table';

export const isInfinityScroll = (collection: TableCollection<unknown>) => {
  const bodyProps = collection.body?.props;
  return (
    bodyProps?.loadingState !== undefined &&
    typeof bodyProps?.onLoadMore === 'function'
  );
};

export const mapPropsToCheckboxAttr = (
  ariaProps: AriaCheckboxProps,
  isSelectAll = false
) => {
  const {
    isSelected,
    defaultSelected,
    isIndeterminate,
    isReadOnly,
    isRequired,
    ...ariaCheckboxProps
  } = ariaProps;
  return {
    checked: isSelected || (isSelectAll && isIndeterminate),
    initialChecked: defaultSelected,
    indeterminate: isIndeterminate,
    readOnly: isReadOnly,
    required: isRequired,
    ...ariaCheckboxProps
  };
};
