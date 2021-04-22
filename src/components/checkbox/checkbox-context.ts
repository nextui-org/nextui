import React from 'react';
import { NormalTypes } from '@utils/prop-types';

export interface CheckboxConfig {
  color: NormalTypes;
  updateState?: (value: string, checked: boolean) => void;
  disabledAll: boolean;
  values: string[];
  inGroup: boolean;
}

const defaultContext = {
  color: 'primary' as NormalTypes,
  disabledAll: false,
  inGroup: false,
  values: [],
};

export const CheckboxContext = React.createContext<CheckboxConfig>(
  defaultContext
);

export const useCheckbox = (): CheckboxConfig =>
  React.useContext<CheckboxConfig>(CheckboxContext);
