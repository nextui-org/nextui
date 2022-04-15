import { Placement } from '@react-types/overlays';

export type PopoverPlacement =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top left'
  | 'top-right'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-top'
  | 'left bottom'
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
