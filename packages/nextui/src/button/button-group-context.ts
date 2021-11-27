import React from 'react';
import { NormalSizes, NormalColors, NormalWeights } from '../utils/prop-types';

export interface ButtonGroupConfig {
  size?: NormalSizes;
  color?: NormalColors;
  borderWeight?: NormalWeights;
  bordered?: boolean;
  disabled?: boolean;
  light?: boolean;
  flat?: boolean;
  ripple?: boolean;
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
