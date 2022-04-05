import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';

export type { CheckboxProps } from './checkbox';
export type { CheckboxGroupProps } from './checkbox-group';

Checkbox.Group = CheckboxGroup;

// export styled components
export {
  StyledCheckboxLabel,
  StyledCheckboxContainer,
  StyledIconCheckFirstLine,
  StyledIconCheckSecondLine,
  StyledIconCheck,
  StyledCheckboxMask,
  StyledCheckboxText,
  StyledCheckboxGroup
} from './checkbox.styles';
export type {
  CheckboxGroupVariantsProps,
  CheckboxTextVariantsProps,
  CheckboxMaskVariantsProps,
  CheckboxIconCheckVariantsProps,
  CheckboxIconCheckFirstLineVariantsProps,
  CheckboxIconCheckSecondLineVariantsProps,
  CheckboxLabelVariantsProps,
  CheckboxContainerVariantsProps
} from './checkbox.styles';

export default Checkbox;
