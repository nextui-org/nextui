import { keyframes } from '@nextui-org/react';

export const levitating = keyframes({
  '0%': {
    transform: 'translateY(0)'
  },
  '30%': {
    transform: 'translateY(-10px)'
  },
  '50%': {
    transform: 'translateY(4px)'
  },
  '70%': {
    transform: 'translateY(-15px)'
  },
  '100%': {
    transform: 'translateY(0)'
  }
});

export const appears = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});
