import { styled, Grid } from '@nextui-org/react';
import { darkTheme, lightTheme } from '@theme/shared';

export const GridItem = styled(Grid, {
  d: 'flex',
  fd: 'column',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: '$default',
  '&:hover': {
    opacity: 0.8
  },
  ai: 'center',
  [`.${darkTheme} &`]: {
    color: '#666'
  },
  [`.${lightTheme} &`]: {
    color: '#B0B0B0'
  },
  variants: {
    selected: {
      true: {
        [`.${darkTheme} &`]: {
          color: '$primary'
        },
        [`.${lightTheme} &`]: {
          color: '$primary'
        }
      }
    }
  }
});

export const TabText = styled('p', {
  m: 0,
  mt: '$3',
  fontSize: '$space$8',
  fontWeight: '$semibold',
  color: 'currentColor'
});

export const ProductImageContainer = styled('div', {
  d: 'flex',
  minSize: '200px',
  br: '32px',
  position: 'relative',
  background: 'linear-gradient(135deg, #010187 0%,#18000E 100%)'
});

export const ProductImage = styled('img', {
  minWidth: '200%',
  position: 'absolute',
  top: 0,
  left: '-45%'
});

export const ProductSize = styled('div', {
  color: '$text',
  fontSize: '$xs',
  dflex: 'center',
  fontWeight: '$bold',
  width: '30px',
  height: '30px',
  position: 'relative',
  zIndex: 10,
  borderRadius: '$sm',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
  variants: {
    selected: {
      true: {
        background: '$primary',
        color: '$white'
      }
    }
  }
});
