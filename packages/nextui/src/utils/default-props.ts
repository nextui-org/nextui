import { NormalSizes } from './prop-types';
import type { CSSProperties } from 'react';

export type NextUISpacingWithAuto = NormalSizes | 'px' | 'auto' | number;

export interface NextUIMargins {
  m?: NextUISpacingWithAuto;
  my?: NextUISpacingWithAuto;
  mx?: NextUISpacingWithAuto;
  mt?: NextUISpacingWithAuto;
  mb?: NextUISpacingWithAuto;
  ml?: NextUISpacingWithAuto;
  mr?: NextUISpacingWithAuto;
}

export interface NextUIPaddings {
  p?: NextUISpacingWithAuto;
  py?: NextUISpacingWithAuto;
  px?: NextUISpacingWithAuto;
  pt?: NextUISpacingWithAuto;
  pb?: NextUISpacingWithAuto;
  pl?: NextUISpacingWithAuto;
  pr?: NextUISpacingWithAuto;
}

export type NextUISpaces = NextUIMargins & NextUIPaddings;

export interface DefaultProps<T extends string = never>
  extends NextUIMargins,
    NextUIPaddings {
  style?: CSSProperties;
  className?: string;
  classNames?: Partial<Record<T, string>>;
}
