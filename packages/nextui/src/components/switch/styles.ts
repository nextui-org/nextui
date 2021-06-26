import { NormalSizes } from '../../utils/prop-types';

export type SwitchSize = {
  width: string;
  height: string;
};

export const getSizes = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SwitchSize } = {
    mini: {
      width: '2rem',
      height: '1.2rem',
    },
    small: {
      width: '2.45rem',
      height: '1.4rem',
    },
    medium: {
      width: '2.8rem',
      height: '1.6rem',
    },
    large: {
      width: '3.2rem',
      height: '1.8rem',
    },
    xlarge: {
      width: '3.8rem',
      height: '2.2rem',
    },
  };
  return sizes[size];
};
