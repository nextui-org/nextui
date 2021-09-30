import { Position } from '../utils/prop-types';

interface ParentDomRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface TooltipPosition {
  top: string;
  left: string;
  transform: string;
}

export const defaultTooltipPosition = {
  top: '-1000px',
  left: '-1000px',
  transform: 'none',
};

export interface TooltipIconPosition {
  top: string;
  left: string;
  right: string;
  bottom: string;
  transform: string;
}

export const getPosition = (
  placement: Position,
  rect: ParentDomRect,
  offset: number
): TooltipPosition => {
  const positions: { [key in Position]: TooltipPosition } = {
    top: {
      top: `${rect.top - offset}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, -100%)',
    },
    topStart: {
      top: `${rect.top - offset}px`,
      left: `${rect.left}px`,
      transform: 'translate(0, -100%)',
    },
    topEnd: {
      top: `${rect.top - offset}px`,
      left: `${rect.left + rect.width}px`,
      transform: 'translate(-100%, -100%)',
    },
    bottom: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, 0)',
    },
    bottomStart: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left}px`,
      transform: 'translate(0, 0)',
    },
    bottomEnd: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left + rect.width}px`,
      transform: 'translate(-100%, 0)',
    },
    left: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.left - offset}px`,
      transform: 'translate(-100%, -50%)',
    },
    leftStart: {
      top: `${rect.top}px`,
      left: `${rect.left - offset}px`,
      transform: 'translate(-100%, 0)',
    },
    leftEnd: {
      top: `${rect.top + rect.height}px`,
      left: `${rect.left - offset}px`,
      transform: 'translate(-100%, -100%)',
    },
    right: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + offset}px`,
      transform: 'translate(0, -50%)',
    },
    rightStart: {
      top: `${rect.top}px`,
      left: `${rect.right + offset}px`,
      transform: 'translate(0, 0)',
    },
    rightEnd: {
      top: `${rect.top + rect.height}px`,
      left: `${rect.right + offset}px`,
      transform: 'translate(0, -100%)',
    },
  };
  return positions[placement] || (positions.top as TooltipPosition);
};

export const getIconPosition = (
  placement: Position,
  offset: number
): TooltipIconPosition => {
  const positions: { [key in Position]?: TooltipIconPosition } = {
    top: {
      top: 'auto',
      right: 'auto',
      left: '50%',
      bottom: `${offset}px`,
      transform: 'translate(-50%, 100%) rotate(45deg)',
    },
    topStart: {
      top: 'auto',
      right: 'auto',
      left: '8%',
      bottom: `${offset}px`,
      transform: 'translate(0, 100%) rotate(45deg)',
    },
    topEnd: {
      top: 'auto',
      right: '8%',
      left: 'auto',
      bottom: `${offset}px`,
      transform: 'translate(0, 100%) rotate(45deg)',
    },
    bottom: {
      top: `${offset}px`,
      right: 'auto',
      left: '50%',
      bottom: 'auto',
      transform: 'translate(-50%, -100%) rotate(225deg)',
    },
    bottomStart: {
      top: `${offset}px`,
      right: 'auto',
      left: '8%',
      bottom: 'auto',
      transform: 'translate(0, -100%) rotate(225deg)',
    },
    bottomEnd: {
      top: `${offset}px`,
      right: '8%',
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(0, -100%) rotate(225deg)',
    },
    left: {
      top: '50%',
      right: `${offset + 1}px`,
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(100%, -50%) rotate(-45deg)',
    },
    leftStart: {
      top: 'calc(30% + 1px)',
      right: `${offset + 1}px`,
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(100%, 0) rotate(-45deg)',
    },
    leftEnd: {
      top: 'auto',
      right: `${offset + 1}px`,
      left: 'auto',
      bottom: 'calc(30% + 1px)',
      transform: 'translate(100%, 0) rotate(-45deg)',
    },
    right: {
      top: '50%',
      right: 'auto',
      left: `${offset + 1}px`,
      bottom: 'auto',
      transform: 'translate(-100%, -50%) rotate(135deg)',
    },
    rightStart: {
      top: 'calc(30% + 1px)',
      right: 'auto',
      left: `${offset + 1}px`,
      bottom: 'auto',
      transform: 'translate(-100%, 0) rotate(135deg)',
    },
    rightEnd: {
      top: 'auto',
      right: 'auto',
      left: `${offset + 1}px`,
      bottom: 'calc(30% + 1px)',
      transform: 'translate(-100%, 0) rotate(135deg)',
    },
  };

  return positions[placement] || (positions.top as TooltipIconPosition);
};
