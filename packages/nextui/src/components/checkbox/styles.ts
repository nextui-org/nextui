import { CSSProperties } from 'react';
import { NormalSizes } from '../../utils/prop-types';

export const getCheckboxSize = (size: NormalSizes): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '.875rem',
    small: '1rem',
    medium: '1.2rem',
    large: '1.5rem',
    xlarge: '1.8rem',
  };
  return sizes[size];
};

export const getIconCheckStyle = (
  size: NormalSizes,
  indeterminate?: boolean
): CSSProperties => {
  const common: CSSProperties = indeterminate
    ? {
        transform: 'rotate(0deg)',
        height: 'auto',
        margin: '0px',
        width: 'auto',
      }
    : {
        display: 'block',
        position: 'relative',
        width: '8px',
        height: '13px',
        marginTop: '-4px',
      };

  const sizes: { [key in NormalSizes]: CSSProperties } = {
    mini: {
      ...common,
      transform: indeterminate ? 'scale(0.5)' : 'rotate(45deg) scale(0.5)',
    },
    small: {
      ...common,
      transform: indeterminate ? 'scale(0.5)' : 'rotate(45deg) scale(0.5)',
    },
    medium: {
      ...common,
      transform: indeterminate ? 'scale(0.8)' : 'rotate(45deg) scale(0.8)',
    },
    large: {
      ...common,
      transform: indeterminate ? '' : 'rotate(45deg)',
    },
    xlarge: {
      ...common,
      transform: indeterminate ? '' : 'rotate(45deg)',
    },
  };
  return sizes[size];
};
