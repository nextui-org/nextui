import { NormalSizes } from '../utils/prop-types';

type PaginationSize = {
  font: string;
  width: string;
};

export const getPaginationSizes = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: PaginationSize } = {
    mini: {
      font: '.75rem',
      width: '1.25rem'
    },
    small: {
      font: '.75rem',
      width: '1.65rem'
    },
    medium: {
      font: '.875rem',
      width: '2rem'
    },
    large: {
      font: '1rem',
      width: '2.4rem'
    },
    xlarge: {
      font: '1.4rem',
      width: '2.8rem'
    }
  };
  return sizes[size];
};
