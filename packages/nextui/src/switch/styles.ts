import { NormalSizes } from '../utils/prop-types';

export type SwitchSize = {
  width: string;
  height: string;
};

export const getSizes = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SwitchSize } = {
    mini: {
      width: '32px',
      height: '18px',
    },
    small: {
      width: '40px',
      height: '20px',
    },
    medium: {
      width: '45px',
      height: '24px',
    },
    large: {
      width: '52px',
      height: '28px',
    },
    xlarge: {
      width: '62px',
      height: '32px',
    },
  };
  return sizes[size];
};
