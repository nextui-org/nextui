import React from 'react';

export interface CheckboxConfig {
  updateState?: (value: string, checked: boolean) => void;
  disabledAll: boolean;
  values: string[];
  inGroup: boolean;
}

const defaultContext = {
  disabledAll: false,
  inGroup: false,
  values: [],
};

export const CheckboxContext = React.createContext<CheckboxConfig>(
  defaultContext
);

export const useCheckbox = (): CheckboxConfig =>
  React.useContext<CheckboxConfig>(CheckboxContext);
