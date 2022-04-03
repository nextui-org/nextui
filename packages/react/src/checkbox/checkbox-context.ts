import React from 'react';
import { CheckboxGroupState } from '@react-stately/checkbox';
import { NormalColors, NormalSizes, SimpleColors } from '../utils/prop-types';

export interface CheckboxConfig extends CheckboxGroupState {
  color: NormalColors;
  size: NormalSizes;
  labelColor: SimpleColors;
  inGroup: boolean;
}

export const CheckboxContext = React.createContext<CheckboxConfig | null>(null);

export const useCheckbox = () => React.useContext(CheckboxContext);
