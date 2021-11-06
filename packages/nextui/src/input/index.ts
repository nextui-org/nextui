import { FormElement } from './input-props';
import Input from './input';
import Textarea from '../textarea';
import InputPassword from './input-password';

export type { FormElement };

Input.Textarea = Textarea;
Input.Password = InputPassword;

export default Input;
