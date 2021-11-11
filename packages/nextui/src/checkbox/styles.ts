import { CSSProperties } from 'react';
import { NormalSizes } from '../utils/prop-types';

export const getCheckboxSize = (size: NormalSizes | number): string => {
  const sizes: { [key in NormalSizes]: string } = {
    xs: '14px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '28px'
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
        width: 'auto'
      }
    : {
        display: 'block',
        position: 'relative',
        width: '8px',
        height: '14px',
        marginTop: '-4px'
      };

  const sizes: { [key in NormalSizes]: CSSProperties } = {
    xs: {
      ...common,
      marginTop: '-2px',
      transform: indeterminate ? 'scale(0.5)' : 'rotate(45deg) scale(0.5)'
    },
    sm: {
      ...common,
      marginTop: '-2px',
      transform: indeterminate ? 'scale(0.5)' : 'rotate(45deg) scale(0.5)'
    },
    md: {
      ...common,
      transform: indeterminate ? 'scale(0.8)' : 'rotate(45deg) scale(0.8)'
    },
    lg: {
      ...common,
      transform: indeterminate ? '' : 'rotate(45deg)'
    },
    xl: {
      ...common,
      transform: indeterminate ? '' : 'rotate(45deg)'
    }
  };
  if (typeof size === 'number') {
    const fr = size / 100;
    if (size < 20) {
      return sizes.sm;
    } else if (size > 20 && size < 24) {
      return sizes.md;
    } else {
      return {
        ...sizes.lg,
        transform: indeterminate
          ? ''
          : `translateY(-${fr}px) rotate(45deg) scale(calc(1 + (${fr})))`
      };
    }
  }
  return sizes[size];
};
