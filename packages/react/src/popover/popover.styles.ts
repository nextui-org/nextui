import { styled, keyframes } from '../theme/stitches.config';

const appearanceIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.95)'
  },
  '60%': {
    opacity: 0.75,
    transform: 'scale(1.02)'
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)'
  }
});
const appearanceOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(1)'
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.95)'
  }
});

const slideUpAndFade = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.95) translateY(-8px)'
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1) translateY(0)'
  }
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' }
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' }
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' }
});

export const StyledPopoverContent = styled('div', {
  $$popoverMinWidth: '$space$13',
  $$popoverMinHeight: '$space$13',
  $$popoverBorderRadius: '$radii$lg',
  boxShadow: '$md',
  outline: 'none' /* Hide focus outline */,
  overflow: 'hidden auto',
  position: 'absolute',
  /* Be a flexbox to allow a full sized content area that scrolls */
  display: 'inline-flex',
  flexdirection: 'column',
  boxSizing: 'border-box',

  minWidth: '$$popoverMinWidth',
  minHeight: '$$popoverMinHeight',
  maxWidth: 'calc(100% - $$popoverMinWidth)',
  maxHeight: 'calc(100% - $$popoverMinWidth)',

  borderRadius: '$$popoverBorderRadius',

  animationDuration: '250ms',
  animationTimingFunction: 'ease',
  animationFillMode: 'forwards',
  willChange: 'transform, opacity',

  '&[data-side="bottom"]': {
    '&.nextui-popover-content-enter': {
      animationName: appearanceIn,
      animationDuration: '200ms',
      animationTimingFunction: 'ease-in',
      animationDirection: 'normal'
    },
    '&.nextui-popover-content-enter-active': {
      opacity: 1
    },
    '&.nextui-popover-content-leave': {
      animationName: appearanceOut,
      animationDuration: '50ms',
      animationTimingFunction: 'ease-out'
    }
  },
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    // '&[data-side="bottom"]': {},
    '&[data-side="left"]': { animationName: slideRightAndFade }
  }
});
