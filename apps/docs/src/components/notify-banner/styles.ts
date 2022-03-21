import { styled } from '@nextui-org/react';
import { StyledCardBlur } from '@primitives';
import { lightTheme } from '@theme/shared';

export const StyledNotifyBanner = styled(StyledCardBlur, {
  dflex: 'center',
  fd: 'row',
  p: 0,
  br: 0,
  position: 'relative',
  zIndex: '$1',
  height: '40px',
  color: '$text',
  width: '100%',
  border: '1.5px solid $border',
  borderTopColor: 'transparent',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  [`.${lightTheme} &`]: {
    '& .notify-gradient': {
      display: 'none'
    }
  }
});

export const StyledContent = styled('a', {
  display: 'flex',
  position: 'relative',
  zIndex: '$10',
  fd: 'row',
  alignItems: 'center',
  textDecoration: 'none',
  color: '$text',
  cursor: 'pointer',
  transition: '$default',

  '& .chevron-right-icon': {
    transition: 'transform cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
  },
  '&:hover': {
    opacity: 0.8,
    '& .chevron-right-icon': {
      transform: 'translateX(2px)'
    }
  },
  '&:active': {
    '& .chevron-right-icon': {
      opacity: 0.1,
      transform: 'translateX(10px)'
    }
  }
});

export const StyledImg = styled('img', {});
