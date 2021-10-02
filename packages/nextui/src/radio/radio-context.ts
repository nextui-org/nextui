import { NormalColors } from '../utils/prop-types';
import React from 'react';

export interface RadioConfig {
  updateState?: (value: string | number) => void;
  disabledAll: boolean;
  color?: NormalColors;
  textColor?: NormalColors;
  value?: string | number;
  inGroup: boolean;
}

const defaultContext = {
  color: 'primary' as NormalColors,
  textColor: 'default' as NormalColors,
  disabledAll: false,
  inGroup: false,
};

export const RadioContext = React.createContext<RadioConfig>(defaultContext);

export const useRadioContext = (): RadioConfig =>
  React.useContext<RadioConfig>(RadioContext);
