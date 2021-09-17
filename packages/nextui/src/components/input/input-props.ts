import { NormalWeights } from './../../utils/prop-types';
import React from 'react';
import { NormalSizes, SimpleColors } from '../../utils/prop-types';

export interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  size?: NormalSizes;
  color?: SimpleColors;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  labelRight?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconClickable?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  borderWeight?: NormalWeights;
  width?: string;
  className?: string;
  clearable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  autoComplete: string;
}

export const defaultProps = {
  disabled: false,
  bordered: false,
  readOnly: false,
  clearable: false,
  rounded: false,
  iconClickable: false,
  width: 'initial',
  size: 'medium' as NormalSizes,
  color: 'default' as SimpleColors,
  borderWeight: 'normal' as NormalWeights,
  autoComplete: 'off',
  className: '',
  placeholder: '',
  initialValue: '',
};
