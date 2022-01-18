import { styled, Link } from '@nextui-org/react';
import { lightTheme } from '@theme/shared';

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
      },
      blue: {
        textGradient: '180deg, $blue300 25%, $blue500 100%'
      },
      cyan: {
        textGradient: '180deg, #00b7fa 25%, #01cfea 100%'
      },
      green: {
        textGradient: '180deg, #6FEE8D 25%, #17c964 100%'
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

export const BlockLink = styled(Link, {
  mt: '$12',
  py: '$2',
  px: '$6',
  br: '$pill',
  bg: '$blockLinkBackground',
  fontSize: '$xs',
  color: '$blockLinkColor',
  '&:hover': {
    bg: '$blockLinkHoverBackground'
  },
  variants: {
    color: {
      default: {
        color: '$blockLinkColor'
      },
      green: {
        color: '$green300',
        bg: '$accents1',
        '&:hover': {
          bg: '$green800'
        },
        [`.${lightTheme} &`]: {
          color: '$green500',
          '&:hover': {
            bg: '$cyan400'
          }
        }
      },
      blue: {
        color: '$blue300',
        bg: '$accents1',
        '&:hover': {
          bg: '$blue800'
        },
        [`.${lightTheme} &`]: {
          color: '$blue500',
          '&:hover': {
            bg: '$blue100'
          }
        }
      }
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

export const StyledCardBlur = styled('div', {
  background: '$accents1',
  boxShadow: '$sm',
  borderRadius: '$lg',
  display: 'flex',
  flexDirection: 'column',
  p: '$8',
  bf: 'saturate(180%) blur(14px)',
  bg: 'rgba(255, 255, 255, 0.05)'
});
