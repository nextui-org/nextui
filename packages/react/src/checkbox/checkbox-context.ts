import { createContext } from '../utils/context';
import { UseCheckboxGroupReturn } from './use-checkbox-group';

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<UseCheckboxGroupReturn>({
    name: 'CheckboxGroupContext',
    strict: false
  });
