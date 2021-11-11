import { NormalWeights, NormalSizes } from './prop-types';

interface GetSizeValue {
  size: string | number;
  sizes: Record<string, any>;
  defaultSize?: string;
}

export const getMargin = (num: number): string => {
  return `calc(${num * 15.25}pt + 1px * ${num - 1})`;
};

export const getNormalWeight = (weight?: NormalWeights): string | undefined => {
  const weights: { [key in NormalWeights]?: string } = {
    light: '1px',
    normal: '2px',
    bold: '3px'
  };
  return weights[weight || 'normal'];
};

export const getNormalRadius = (
  size: NormalSizes,
  rounded?: boolean
): string => {
  const radius: { [key in NormalSizes]: string } = {
    mini: '7px',
    small: '9px',
    medium: '12px',
    large: '14px',
    xlarge: '15px'
  };
  const baseRadius = radius[size];
  return rounded ? `calc(${baseRadius} + 10rem)` : baseRadius;
};

export function getSizeValue({
  size,
  sizes,
  defaultSize = 'md'
}: GetSizeValue) {
  if (typeof size === 'number') {
    return size;
  }
  return sizes[size] || size || sizes[defaultSize];
}
