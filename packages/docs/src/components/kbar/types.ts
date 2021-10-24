import { ReactElement, ReactNode } from 'react';

export type ActionId = string;

export interface Action {
  id: string;
  name: string;
  shortcut: string[];
  keywords: string;
  perform?: () => void;
  section?: string;
  parent?: ActionId | null | undefined;
  children?: ActionId[];
  icon?: string | ReactElement | ReactNode;
  subtitle?: string;
}

export interface ResultHandlers {
  onClick: () => void;
  onMouseEnter: () => void;
  onPointerDown: () => void;
}
export interface ResultState {
  index: number;
  activeIndex: number;
}
