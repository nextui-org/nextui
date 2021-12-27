import Radio from './radio';
import RadioGroup from './radio-group';
import { StyledRadioDescription as RadioDescription } from './radio.styles';

Radio.Group = RadioGroup;
Radio.Description = RadioDescription;
Radio.Desc = RadioDescription;

export {
  StyledRadioInput,
  StyledRadioLabel,
  StyledRadioPoint,
  StyledRadio,
  StyledRadioGroup,
  StyledRadioDescription
} from './radio.styles';
export type {
  RadioVariantsProps,
  RadioLabelVariantsProps,
  RadioGroupVariantsProps
} from './radio.styles';

export default Radio;
