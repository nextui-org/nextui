import React from 'react';
import { NormalSizes, NormalColors } from '../utils/prop-types';

export interface ButtonGroupConfig {
  size?: NormalSizes;
  color?: NormalColors;
  bordered?: boolean;
  disabled?: boolean;
  light?: boolean;
  flat?: boolean;
  ghost?: boolean;
  shadow?: boolean;
  auto?: boolean;
  animated?: boolean;
  rounded?: boolean;
  isButtonGroup: boolean;
}

const defaultContext = {
  isButtonGroup: false,
  disabled: false
};

export const ButtonGroupContext =
  React.createContext<ButtonGroupConfig>(defaultContext);

export const useButtonGroupContext = (): ButtonGroupConfig =>
  React.useContext<ButtonGroupConfig>(ButtonGroupContext);
