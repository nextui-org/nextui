import Button from "./button";
import ButtonGroup from "./button-group";

export type {ButtonProps} from "./button";
export type {ButtonGroupProps} from "./button-group";
export type {ButtonIconProps} from "./button-icon";

export {StyledButton} from "./button.styles";
export type {ButtonVariantsProps} from "./button.styles";
export {StyledButtonGroup} from "./button-group.styles";
export type {ButtonGroupVariantsProps} from "./button-group.styles";
export {StyledButtonIcon} from "./button-icon";

Button.Group = ButtonGroup;

export default Button;
