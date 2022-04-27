import { AriaCheckboxProps } from '@react-types/checkbox';
import { TableCollection } from '@react-types/table';

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
    isDisabled,
    ...ariaCheckboxProps
  } = ariaProps;
  return {
    checked: isSelected,
    disabled: isDisabled,
    initialChecked: defaultSelected,
    indeterminate: isIndeterminate,
    readOnly: isReadOnly,
    required: isRequired,
    ...ariaCheckboxProps
  };
};
