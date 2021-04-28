import { NormalSizes } from '@utils/prop-types';

export type SwitchSize = {
  width: string;
  height: string;
};

export const getSizes = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SwitchSize } = {
    mini: {
      width: '1.336rem',
      height: '.835rem',
    },
    small: {
      width: '1.6rem',
      height: '1rem',
    },
    medium: {
      width: '1.96rem',
      height: '1.2rem',
    },
    large: {
      width: '2.4rem',
      height: '1.5rem',
    },
    xlarge: {
      width: '2.88rem',
      height: '1.8rem',
    },
  };
  return sizes[size];
};
