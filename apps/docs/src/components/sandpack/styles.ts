import { styled } from '@nextui-org/react';

export const StyledPlaygroundButtons = styled('div', {
  transition: '$default',
  position: 'absolute',
  right: '$4',
  top: '$7',
  d: 'flex',
  jc: 'center',
  ai: 'center',
  '.sp-language-icon': {
    transition: '$default',
    fill: '$gray500',
    ml: '$2',
    '&:hover': {
      opacity: 0.8
    }
  },
  '.sp-language-icon--selected': {
    fill: '$gray100'
  },
  variants: {
    bottom: {
      true: {
        top: 'auto',
        right: '$5',
        bottom: '$7'
      }
    }
  }
});

export const StyledLanguageButton = styled('button', {
  // reset styles
  m: 0,
  p: 0,
  bg: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer'
});
