import { createContext } from '../utils/context';
import type { UseRadioGroupReturn } from './use-radio-group';

export const [RadioGroupProvider, useRadioGroupContext] =
  createContext<UseRadioGroupReturn>({
    name: 'RadioGroupContext',
    strict: true,
    errorMessage:
      'useRadioGroupContext: `context` is undefined. Seems you forgot to wrap all checkbox components within `<Radio.Group />`'
  });
