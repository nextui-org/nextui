import { styled } from '../theme/stitches.config';

export const StyledUser = styled('div', {
  d: 'inline-flex',
  p: '0 $sm',
  jc: 'center',
  ai: 'center',
  w: 'max-content',
  maxWidth: '100%'
});

export const StyledUserInfo = styled('div', {
  ml: '$sm',
  d: 'inline-flex',
  fd: 'column',
  whiteSpace: 'nowrap'
});

export const StyledUserName = styled('span', {
  fontSize: '$xs',
  color: '$text',
  lh: '$sm',
  tt: 'capitalize',
  fontWeight: '$medium',
  maxW: '$60',
  to: 'ellipsis', // text overflow
  ov: 'hidden' // overflow
});

export const StyledUserDesc = styled('span', {
  fontSize: '$tiny',
  color: '$accents7',
  '*:first-child': {
    mt: 0
  },
  '*:last-child': {
    mb: 0
  }
});

export const StyledUserLink = styled('span', {
  a: {
    '&:hover': {
      opacity: 0.7
    }
  }
});
