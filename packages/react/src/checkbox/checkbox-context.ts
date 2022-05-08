import { createContext, useContext } from 'react';
import type { CheckboxGroupState } from '@react-stately/checkbox';
import type {
  NormalColors,
  NormalSizes,
  SimpleColors
} from '../utils/prop-types';

export interface ICheckboxGroupContext {
  size: NormalSizes;
  color: NormalColors;
  labelColor: SimpleColors;
  groupState: CheckboxGroupState;
}

const CheckboxGroupContext = createContext<ICheckboxGroupContext | undefined>(
  undefined
);

export const CheckboxGroupProvider = CheckboxGroupContext.Provider;

export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
