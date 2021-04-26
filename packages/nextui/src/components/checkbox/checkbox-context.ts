import React from 'react';
import { NormalColors } from '@utils/prop-types';

export interface CheckboxConfig {
  color: NormalColors;
  updateState?: (value: string, checked: boolean) => void;
  disabledAll: boolean;
  values: string[];
  inGroup: boolean;
}

const defaultContext = {
  color: 'primary' as NormalColors,
  disabledAll: false,
  inGroup: false,
  values: [],
};

export const CheckboxContext = React.createContext<CheckboxConfig>(
  defaultContext
);

export const useCheckbox = (): CheckboxConfig =>
  React.useContext<CheckboxConfig>(CheckboxContext);
