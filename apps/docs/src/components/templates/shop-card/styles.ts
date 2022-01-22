import { styled, Grid, Button, Card } from '@nextui-org/react';
import { darkTheme, lightTheme } from '@theme/shared';
import {
  lightModernTheme,
  lightElegantTheme,
  lightRetroTheme,
  darkModernTheme,
  darkElegantTheme,
  darkRetroTheme
} from './themes';
import { Star } from '../../icons';

export const StyledCard = styled(Card, {
  py: '$2',
  mt: '$8',
  boxShadow: '$lg',
  br: '35px',
  ov: 'visible',
  [`.${darkElegantTheme} &, .${lightElegantTheme} &`]: {
    br: '4px'
  },
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    br: '0px'
  },
  [`.${lightRetroTheme} &`]: {
    bg: '#F4E8D1'
  },
  [`.${darkRetroTheme} &`]: {
    bg: '#E1CA9E'
  }
});

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
  background: 'linear-gradient(135deg, #010187 0%,#18000E 100%)',
  '@xsMax': {
    width: '100%'
  },
  [`.${darkModernTheme} &, .${lightModernTheme} &, .${darkElegantTheme} &, .${lightElegantTheme} &`]:
    {
      ml: '-$4',
      transform: 'scale(1.2)',
      background: 'linear-gradient(135deg, #870172 0%,#18000E 100%)',
      boxShadow: '20px 30px 60px rgba(0, 0, 0, 0.15)',
      '@xsMax': {
        ml: '10%',
        my: '$12',
        width: '80%',
        bs: '$md'
      }
    },
  [`.${darkElegantTheme} &, .${lightElegantTheme} &`]: {
    background: 'linear-gradient(135deg, #323232 0%,#000000 100%)'
  },
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    background: ' #FFD34E',
    top: '5%',
    left: '5%',
    '@xsMax': {
      width: '94%',
      mb: '$8'
    },
    '&:after': {
      content: '',
      position: 'absolute',
      top: '-5%',
      left: '-5%',
      size: '100%',
      background: 'linear-gradient(135deg, #FFD34E 0%,#EE457E 100%)'
    }
  }
});

export const ProductImage = styled('img', {
  minWidth: '200%',
  position: 'absolute',
  zIndex: '$10',
  top: 0,
  left: '-45%',
  '@xsMax': {
    left: '0',
    minWidth: '100%'
  },
  [`.${darkModernTheme} &, .${lightModernTheme} &, .${darkElegantTheme} &, .${lightElegantTheme} &`]:
    {
      top: '12%',
      left: '-20%',
      minWidth: '140%',
      '@xsMax': {
        top: 0,
        left: 0,
        minWidth: '100%'
      }
    },
  [`.${darkElegantTheme} &, .${lightElegantTheme} &`]: {
    filter: 'saturate(0)'
  },
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    top: '-10%',
    left: '-50%',
    '@xsMax': {
      left: '-5%'
    }
  }
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
  transition: 'background 0.3s ease 0s, border-radius 0.3s ease 0s',
  [`.${darkModernTheme} &, .${lightModernTheme} &`]: {
    color: '#A258DF'
  },
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    color: '#333333'
  },
  variants: {
    selected: {
      true: {
        background: '$primary',
        color: '$white',
        [`.${darkModernTheme} &, .${lightModernTheme} &`]: {
          color: '$white'
        },
        [`.${darkElegantTheme} &`]: {
          color: '$black'
        },
        [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
          color: '$white',
          bg: '$error'
        }
      }
    }
  }
});

export const StyledStar = styled(Star, {
  position: 'absolute',
  top: '$6',
  right: '$8',
  zIndex: '$max',
  cursor: 'pointer',
  '@xsMax': {
    top: '$11',
    right: '$11'
  },
  '& path': {
    stroke: '$accents4',
    fill: 'transparent'
  },
  '&:hover': {
    '& path': {
      stroke: '$yellow500'
    }
  },
  [`.${darkModernTheme} &, .${lightModernTheme} &`]: {
    top: '$4',
    left: '$4',
    '@xsMax': {
      top: '$14',
      left: '$14'
    }
  },
  [`.${darkElegantTheme} &, .${lightElegantTheme} &`]: {
    top: '$4',
    left: '28%',
    '@xsMax': {
      top: '$14',
      left: '$14'
    }
  },
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    '@xsMax': {
      top: '$10',
      right: '$16',
      '& path': {
        stroke: 'rgba(255,255,255,0.5)'
      }
    }
  },
  variants: {
    liked: {
      true: {
        '& path': {
          fill: '$yellow400',
          stroke: '$yellow400'
        },
        '&:hover': {
          '& path': {
            fill: '$yellow500'
          }
        }
      },
      false: {
        [`.${darkModernTheme} &, .${lightModernTheme} &`]: {
          '& path': {
            stroke: '$gray300'
          }
        }
      }
    }
  }
});

const BaseText = styled('p', {
  p: 0,
  m: 0,
  transformOrigin: 'left',
  [`.${darkElegantTheme} &, .${lightElegantTheme} &`]: {
    fontFamily: '$mono',
    fontWeight: '$normal'
  },
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    textTransform: 'uppercase'
  }
});

export const StyledTitle = styled(BaseText, {
  transformOrigin: 'left',
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    color: '$black'
  }
});

export const StyledSubtitle = styled(BaseText, {
  color: '$accents6',
  fontWeight: '$semibold',
  fontSize: '$base',
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    fontSize: '$xs'
  },
  [`.${darkRetroTheme} &`]: {
    color: '$accents4'
  }
});

export const StyledPrice = styled(BaseText, {
  fontSize: '18px',
  fontWeight: '$bold',
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    color: '$black'
  }
});

export const StyledOldPrice = styled(BaseText, {
  ml: '$8',
  textDecorationLine: 'line-through',
  fontWeight: '$semibold',
  fontSize: '18px',
  color: '$accents6',
  [`.${darkRetroTheme} &`]: {
    color: '$accents5'
  }
});

export const StyledDiscount = styled(BaseText, {
  ml: '$4',
  color: '$success',
  fontSize: '18px',
  fontWeight: '$semibold',
  [`.${darkRetroTheme} &`]: {
    color: '$accents5'
  }
});

export const BuyButton = styled(Button, {
  ov: 'hidden',
  tt: 'none',
  transition: '$default',
  [`.${darkModernTheme} &, .${lightModernTheme} &`]: {
    borderRadius: '$pill'
  },
  [`.${darkElegantTheme} &, .${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    color: '$black'
  },
  [`.${darkRetroTheme} &, .${lightRetroTheme} &`]: {
    textTransform: 'uppercase',
    fontWeight: '$bold'
  }
});

export const AddToBagButton = styled(BuyButton, {
  [`.${darkElegantTheme} &`]: {
    color: '$white'
  }
});
