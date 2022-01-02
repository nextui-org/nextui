import { MutableRefObject, useEffect, useState } from 'react';

export type ShapeType = {
  width: number;
  height: number;
};

const getCSSStyleVal = (str: string, parentNum: number) => {
  if (!str) return 0;
  const strVal = str.includes('px')
    ? +str.split('px')[0]
    : str.includes('%')
    ? +str.split('%')[0] * parentNum * 0.01
    : str;

  return Number.isNaN(+strVal) ? 0 : +strVal;
};

export const getRealShape = (el: HTMLElement | null): ShapeType => {
  const defaultShape: ShapeType = { width: 0, height: 0 };
  if (!el || typeof window === 'undefined') return defaultShape;

  const rect = el.getBoundingClientRect();
  const { width, height } = window.getComputedStyle(el);

  return {
    width: getCSSStyleVal(`${width}`, rect.width),
    height: getCSSStyleVal(`${height}`, rect.height)
  };
};

export type ShapeResult = [ShapeType, () => void];

const useRealShape = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>
): ShapeResult => {
  const [state, setState] = useState<ShapeType>({
    width: 0,
    height: 0
  });
  const update = () => {
    const { width, height } = getRealShape(ref.current);
    setState({ width, height });
  };
  useEffect(() => update(), [ref.current]);

  return [state, update];
};

export default useRealShape;
