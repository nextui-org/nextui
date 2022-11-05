import {ReactElement, ReactNode, CSSProperties} from "react";

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

export interface KBarResultsProps {
  style?: CSSProperties;
  className?: string;
  onRender?: (action: Action, handlers: ResultHandlers, state: ResultState) => ReactElement;
}
