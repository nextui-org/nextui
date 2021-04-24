import { CSSProperties } from 'react';
import { NormalSizes } from '@utils/prop-types';

export const getCheckboxSize = (size: NormalSizes): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '.875rem',
    small: '1rem',
    medium: '1.125rem',
    large: '1.3rem',
    xlarge: '1.5rem',
  };
  return sizes[size];
};

export const getIconCheckStyle = (size: NormalSizes): CSSProperties => {
  const common: CSSProperties = {
    display: 'block',
    position: 'relative',
    width: '8px',
    height: '13px',
    marginTop: '-4px',
  };
  const sizes: { [key in NormalSizes]: CSSProperties } = {
    mini: {
      ...common,
      transform: 'rotate(45deg) scale(0.5)',
    },
    small: {
      ...common,
      transform: 'rotate(45deg) scale(0.5)',
    },
    medium: {
      ...common,
      transform: 'rotate(45deg) scale(0.8)',
    },
    large: {
      ...common,
      transform: 'rotate(45deg)',
    },
    xlarge: {
      ...common,
      transform: 'rotate(45deg)',
    },
  };
  return sizes[size];
};
