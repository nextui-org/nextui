import { CheckboxProps } from './checkbox';

export const mapPropsToReactAriaAttr = ({
  indeterminate,
  disabled,
  readOnly,
  required,
  checked,
  initialChecked,
  ...checkboxProps
}: CheckboxProps) => {
  return {
    ...checkboxProps,
    isIndeterminate: indeterminate,
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isSelected: checked,
    defaultSelected: initialChecked
  };
};
