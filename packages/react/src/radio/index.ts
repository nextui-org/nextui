import Radio from "./radio";
import RadioGroup from "./radio-group";

Radio.Group = RadioGroup;

export {
  StyledRadioLabel,
  StyledRadioText,
  StyledRadioPoint,
  StyledRadioContainer,
  StyledRadioDescription,
  StyledRadioGroup,
  StyledRadioGroupContainer,
} from "./radio.styles";

export type {
  RadioLabelVariantsProps,
  RadioTexVariantsProps,
  RadioPointVariantsProps,
  RadioContainerVariantsProps,
  RadioDescriptionVariantsProps,
  RadioGroupVariantsProps,
  RadioGroupContainerVariantsProps,
} from "./radio.styles";

export type {RadioProps} from "./radio";

export type {RadioGroupProps} from "./radio-group";

export default Radio;
