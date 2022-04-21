import { keyframes } from '../theme/stitches.config';

export const reboundAnimation = keyframes({
  '0%': {
    transform: 'scale(0.95)'
  },
  '40%': {
    transform: 'scale(1.02)'
  },
  '80%': {
    transform: 'scale(0.98)'
  },
  '100%': {
    transform: 'scale(1)'
  }
});

export const appearanceIn = keyframes({
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

export const appearanceOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(1)'
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.95)'
  }
});
