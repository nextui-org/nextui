import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';

export type { CheckboxProps, CheckboxEvent } from './checkbox';
export type { CheckboxGroupProps } from './checkbox-group';

Checkbox.Group = CheckboxGroup;

// export styled components
export * from './checkbox.styles';

export default Checkbox;
