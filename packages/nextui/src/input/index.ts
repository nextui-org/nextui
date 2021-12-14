import Input from './input';
import Textarea from '../textarea';
import InputPassword from './input-password';

export type { FormElement } from './input-props';

export type { InputProps } from './input';
export type { InputPasswordProps } from './input-password';

export * from './input.styles';

Input.Textarea = Textarea;
Input.Password = InputPassword;

export default Input;
