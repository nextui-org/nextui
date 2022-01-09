import { styled } from '@nextui-org/react';

export const Title = styled('h1', {
  display: 'inline',
  fontWeight: '$bold',
  color: '$text',
  lh: '1.2',
  fs: '2.5rem',
  mb: 0,
  '@sm': {
    fs: '3rem'
  },
  '@lg': {
    fs: '3.5rem'
  },
  variants: {
    color: {
      violet: {
        textGradient: '180deg, #FF1CF7 25%, #b249f8 100%'
      },
      warning: {
        textGradient: '180deg, #f36534 25%, #F69F27 100%'
      }
    },
    fullWidth: {
      true: {
        display: 'block',
        width: '100%'
      }
    }
  }
});

export const Subtitle = styled('p', {
  pl: '$1',
  fs: '$sm',
  fontWeight: '$medium',
  color: '$accents6',
  display: 'block',
  mw: '100%',
  width: '100%',
  '@sm': {
    mw: '50%'
  }
});

export const Section = styled('section', {
  zIndex: '$2',
  width: '100%'
});

export const Box = styled('div', {
  // Reset
  boxSizing: 'border-box'
});
