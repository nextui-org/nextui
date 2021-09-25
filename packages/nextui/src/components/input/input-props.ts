import { NormalWeights } from './../../utils/prop-types';
import React from 'react';
import {
  NormalSizes,
  SimpleColors,
  ContentPosition,
} from '../../utils/prop-types';

export interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  size?: NormalSizes;
  color?: SimpleColors;
  status?: SimpleColors;
  readOnly?: boolean;
  shadow?: boolean;
  animated?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  labelPlaceholder?: string;
  labelLeft?: string;
  labelRight?: string;
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  contentClickable?: boolean;
  contentRightStyling?: boolean;
  contentLeftStyling?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  underlined?: boolean;
  borderWeight?: NormalWeights;
  width?: string;
  className?: string;
  clearable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onContentClick?: (
    key: ContentPosition,
    e: React.MouseEvent<HTMLDivElement>
  ) => void;
  autoComplete?: string;
}

export const defaultProps = {
  disabled: false,
  bordered: false,
  readOnly: false,
  clearable: false,
  rounded: false,
  animated: true,
  underlined: false,
  shadow: true,
  contentClickable: false,
  contentRightStyling: true,
  contentLeftStyling: true,
  required: false,
  width: 'initial',
  size: 'medium' as NormalSizes,
  color: 'default' as SimpleColors,
  status: 'default' as SimpleColors,
  borderWeight: 'normal' as NormalWeights,
  autoComplete: 'off',
  className: '',
  placeholder: '',
  initialValue: '',
};
