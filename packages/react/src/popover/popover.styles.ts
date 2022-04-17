import { styled, keyframes } from '../theme/stitches.config';

export const appearanceIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.95)'
  },
  '60%': {
    opacity: 0.75,
    transform: 'scale(1.05)'
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)'
  }
});

export const appearanceOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(1)'
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.5)'
  }
});

export const StyledPopoverContent = styled('div', {
  $$popoverMinWidth: '$space$13',
  $$popoverMinHeight: '$space$13',
  $$popoverBorderRadius: '$radii$lg',
  $$popoverBackground: '$colors$background',
  boxShadow: '$md',
  outline: 'none' /* Hide focus outline */,
  overflow: 'hidden auto',
  bg: '$$popoverBackground',
  /* Be a flexbox to allow a full sized content area that scrolls */
  display: 'inline-flex',
  flexDirection: 'column',
  boxSizing: 'border-box',

  minWidth: '$$popoverMinWidth',
  minHeight: '$$popoverMinHeight',
  maxWidth: 'calc(100% - $$popoverMinWidth)',
  maxHeight: 'calc(100% - $$popoverMinWidth)',

  borderRadius: '$$popoverBorderRadius',

  animationFillMode: 'forwards',
  willChange: 'transform, opacity',

  '&.nextui-popover-content-enter': {
    animationName: appearanceIn,
    animationTimingFunction: 'ease-out',
    animationDirection: 'normal',
    animationDuration: '250ms'
  },
  '&.nextui-popover-content-leave': {
    animationName: appearanceOut,
    animationTimingFunction: 'ease-in',
    animationDuration: '60ms'
  }
});
