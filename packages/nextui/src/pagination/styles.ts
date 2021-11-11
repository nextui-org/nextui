import { NormalSizes } from '../utils/prop-types';

type PaginationSize = {
  font: string;
  width: string;
};

export const getPaginationSizes = (size: NormalSizes | number) => {
  const sizes: { [key in NormalSizes]: PaginationSize } = {
    xs: {
      font: '10px',
      width: '24px'
    },
    sm: {
      font: '12px',
      width: '28px'
    },
    md: {
      font: '14px',
      width: '34px'
    },
    lg: {
      font: '16px',
      width: '40px'
    },
    xl: {
      font: '18px',
      width: '46px'
    }
  };
  if (typeof size === 'number')
    return { font: `calc(${size}px / 2.55)`, width: `${size}px` };
  return sizes[size];
};
