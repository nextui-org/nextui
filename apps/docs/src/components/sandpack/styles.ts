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
    fill: 'var(--sp-colors-fg-default)',
    ml: '$2',
    '&:hover': {
      opacity: 0.8
    }
  },
  '.sp-language-icon--selected': {
    fill: 'var(--sp-colors-fg-active)'
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

export const StyledShoreMoreButton = styled(StyledLanguageButton, {
  color: 'var(--sp-colors-fg-default)',
  transition: '$default',
  '&:hover': {
    color: 'var(--sp-colors-fg-active)'
  }
});
