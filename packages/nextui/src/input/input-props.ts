import React from 'react';
import {
  NormalSizes,
  SimpleColors,
  ContentPosition,
  NormalWeights,
  AsProp,
} from '../utils/prop-types';

export type FormElement = HTMLInputElement | HTMLTextAreaElement;

export interface Props
  extends AsProp<'input' | 'textarea'>,
    React.HTMLAttributes<FormElement> {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  size?: NormalSizes;
  color?: SimpleColors;
  helperColor?: SimpleColors;
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
  onChange?: (e: React.ChangeEvent<FormElement>) => void;
  onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<FormElement>) => void;
  onBlur?: (e: React.FocusEvent<FormElement>) => void;
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
  helperColor: 'default' as SimpleColors,
  status: 'default' as SimpleColors,
  borderWeight: 'normal' as NormalWeights,
  autoComplete: 'off',
  className: '',
  placeholder: '',
  initialValue: '',
};
