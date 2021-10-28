import { NormalSizes } from '../utils/prop-types';

export type ProgessSize = {
  height: string;
  radius: string;
};

export const getSizes = (size: NormalSizes, squared: boolean) => {
  const sizes: {
    [key in NormalSizes]: ProgessSize;
  } = {
    mini: {
      height: '0.25rem',
      radius: squared ? '1px' : '0.25rem'
    },
    small: {
      height: '0.5rem',
      radius: squared ? '2px' : '0.5rem'
    },
    medium: {
      height: '0.75rem',
      radius: squared ? '3px' : '0.75rem'
    },
    large: {
      height: '1rem',
      radius: squared ? '4px' : '1rem'
    },
    xlarge: {
      height: '1.5rem',
      radius: squared ? '4.2px' : '1.5rem'
    }
  };
  if (!size) return sizes.medium;
  return sizes[size];
};
