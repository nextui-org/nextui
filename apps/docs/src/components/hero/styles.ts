import { styled } from '@nextui-org/react';

export const StyledTitle = styled('h1', {
  display: 'inline',
  fontWeight: '$bold',
  color: '$text',
  lh: '1.2',
  fs: '2.5rem',
  '@sm': {
    fs: '3rem'
  },
  '@lg': {
    fs: '3.5rem'
  }
});

export const StyledGradientTitle = styled(StyledTitle, {
  textGradient: '180deg, #FF1CF7 25%, #b249f8 100%',
  '&::selection': {
    WebkitTextFillColor: '$colors$text'
  }
});

export const StyledSubtitle = styled('p', {
  pl: '$1',
  fs: '$xl',
  width: '100%',
  display: 'inline-flex',
  fontWeight: '$medium',
  color: '$accents7'
});
