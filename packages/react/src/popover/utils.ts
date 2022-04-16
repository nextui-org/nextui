import { Placement } from '@react-types/overlays';

export type PopoverPlacement =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'start'
  | 'start-top'
  | 'start-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'end'
  | 'end-top'
  | 'end-bottom';

export const getAriaPlacement = (placement?: PopoverPlacement) => {
  if (!placement) {
    return 'bottom' as Placement;
  }
  return placement.replace('-', ' ') as Placement;
};

export const getOppositePlacement = (placement?: PopoverPlacement) => {
  if (!placement) {
    return 'bottom' as Placement;
  }
  switch (placement) {
    case 'bottom':
      return 'top';
    case 'top':
      return 'bottom';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'bottom-left':
      return 'top-right';
    case 'bottom-right':
      return 'top-left';
    case 'top-left':
      return 'bottom-right';
    case 'top-right':
      return 'bottom-left';
    case 'left-top':
      return 'right-bottom';
    case 'left-bottom':
      return 'right-top';
    case 'right-top':
      return 'left-bottom';
    case 'right-bottom':
      return 'left-top';
    case 'start':
      return 'end';
    case 'end':
      return 'start';
    case 'start-top':
      return 'end-bottom';
    case 'start-bottom':
      return 'end-top';
    case 'end-top':
      return 'start-bottom';
    case 'end-bottom':
      return 'start-top';
    default:
      return 'bottom';
  }
};
