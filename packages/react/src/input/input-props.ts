import React from 'react';
import {
  NormalSizes,
  SimpleColors,
  ContentPosition,
  NormalWeights,
  AsProp
} from '../utils/prop-types';

export type FormElement = HTMLInputElement | HTMLTextAreaElement;

export interface Props
  extends AsProp<'input' | 'textarea'>,
    React.HTMLAttributes<FormElement> {
  value?: string | ReadonlyArray<string> | number;
  fullWidth?: boolean;
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
  labelLeft?: string | React.ReactNode;
  labelRight?: string | React.ReactNode;
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
  onClearClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  fullWidth: false,
  contentClickable: false,
  contentRightStyling: true,
  contentLeftStyling: true,
  required: false,
  width: 'initial',
  size: 'md' as NormalSizes,
  color: 'default' as SimpleColors,
  helperColor: 'default' as SimpleColors,
  status: 'default' as SimpleColors,
  borderWeight: 'normal' as NormalWeights,
  autoComplete: 'off',
  className: '',
  placeholder: '',
  initialValue: ''
};
