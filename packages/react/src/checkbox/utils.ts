import { CheckboxProps } from './checkbox';

export const mapPropsToReactAriaAttr = (checkboxProps: CheckboxProps) => {
  return {
    ...checkboxProps,
    isIndeterminate: checkboxProps.indeterminate,
    isDisabled: checkboxProps.disabled,
    isReadOnly: checkboxProps.readOnly,
    isRequired: checkboxProps.required,
    isSelected: checkboxProps.checked,
    defaultSelected: checkboxProps.initialChecked
  };
};
