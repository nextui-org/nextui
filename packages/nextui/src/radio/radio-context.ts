import { NormalColors, NormalSizes } from '../utils/prop-types';
import React from 'react';

export interface RadioConfig {
  disabledAll: boolean;
  size?: NormalSizes;
  color?: NormalColors;
  textColor?: NormalColors;
  value?: string | number;
  inGroup: boolean;
  updateState?: (value: string | number) => void;
}

const defaultContext = {
  color: 'primary' as NormalColors,
  size: 'md' as NormalSizes,
  textColor: 'default' as NormalColors,
  disabledAll: false,
  inGroup: false
};

export const RadioContext = React.createContext<RadioConfig>(defaultContext);

export const useRadioContext = (): RadioConfig =>
  React.useContext<RadioConfig>(RadioContext);
