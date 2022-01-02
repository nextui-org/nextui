import React from 'react';
import { NormalColors, NormalSizes, SimpleColors } from '../utils/prop-types';

export interface CheckboxConfig {
  color: NormalColors;
  size: NormalSizes;
  labelColor: SimpleColors;
  updateState?: (value: string, checked: boolean) => void;
  disabledAll: boolean;
  values: string[];
  inGroup: boolean;
}

const defaultContext = {
  color: 'default' as NormalColors,
  labelColor: 'default' as SimpleColors,
  size: 'md' as NormalSizes,
  disabledAll: false,
  inGroup: false,
  values: []
};

export const CheckboxContext =
  React.createContext<CheckboxConfig>(defaultContext);

export const useCheckbox = (): CheckboxConfig =>
  React.useContext<CheckboxConfig>(CheckboxContext);
