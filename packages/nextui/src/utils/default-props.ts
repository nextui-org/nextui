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

export type NextUISpacesKeys = { [key in keyof NextUISpaces]?: string };

export const NextUISpacesStringKeys = [
  'm',
  'my',
  'mx',
  'mt',
  'mb',
  'ml',
  'mr',
  'p',
  'py',
  'px',
  'pt',
  'pb',
  'pl',
  'pr'
];

export interface DefaultProps extends NextUIMargins, NextUIPaddings {
  style?: CSSProperties;
  className?: string;
}
