import { CSSProperties } from 'react';
import { NormalSizes } from '../utils/prop-types';

export const getCheckboxSize = (size: NormalSizes | number): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '14px',
    small: '16px',
    medium: '20px',
    large: '24px',
    xlarge: '28px',
  };
  if (typeof size === 'number') return `${size}px`;
  return sizes[size];
};

export const getIconCheckStyle = (
  size: NormalSizes | number,
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
        height: '14px',
        marginTop: '-4px',
      };

  const sizes: { [key in NormalSizes]: CSSProperties } = {
    mini: {
      ...common,
      marginTop: '-2px',
      transform: indeterminate ? 'scale(0.5)' : 'rotate(45deg) scale(0.5)',
    },
    small: {
      ...common,
      marginTop: '-2px',
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
  if (typeof size === 'number') {
    const fr = size / 100;
    if (size < 20) {
      return sizes.small;
    } else if (size > 20 && size < 24) {
      return sizes.medium;
    } else {
      return {
        ...sizes.large,
        transform: indeterminate
          ? ''
          : `translateY(-${fr}px) rotate(45deg) scale(calc(1 + (${fr})))`,
      };
    }
  }
  return sizes[size];
};
