import { NormalSizes } from '../utils/prop-types';

export type SwitchSize = {
  width: string;
  height: string;
};

export const getSizes = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SwitchSize } = {
    xs: {
      width: '32px',
      height: '18px'
    },
    sm: {
      width: '40px',
      height: '20px'
    },
    md: {
      width: '45px',
      height: '24px'
    },
    lg: {
      width: '52px',
      height: '28px'
    },
    xl: {
      width: '62px',
      height: '32px'
    }
  };
  return sizes[size];
};
