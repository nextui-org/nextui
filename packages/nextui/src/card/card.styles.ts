import { styled, VariantProps } from '../theme/stitches.config';
import { StyledDrip } from '../utils/drip';

export const StyledCardBody = styled('div', {
  d: 'flex',
  w: '100%',
  h: 'auto',
  flex: '1 1 auto',
  fd: 'column',
  jc: 'inherit',
  ai: 'inherit',
  ac: 'inherit',
  p: '$sm $lg',
  oy: 'auto',
  position: 'relative',
  ta: 'left',
  '*:first-child': {
    mt: 0
  },
  '*:last-child': {
    mb: 0
  }
});

export const StyledCard = styled('div', {
  m: 0,
  p: 0,
  br: '$lg',
  position: 'relative',
  display: 'flex',
  overflow: 'hidden',
  fd: 'column',
  width: '100%',
  height: 'auto',
  boxSizing: 'border-box',
  '@motion': {
    transition: 'none'
  },
  'img, .nextui-image': {
    width: '100%'
  },
  [`& ${StyledDrip}`]: {
    zIndex: '$1',
    '.nextui-drip-filler': {
      opacity: 0.25,
      fill: '$accents6'
    }
  },
  variants: {
    color: {
      default: {
        $$cardColor: '$colors$background',
        bg: '$$cardColor'
        //   '@dark': { // TODO: do this when dark theme is ready
        //     $$cardColor: '$colors$accents1',
        //     bg: '$$cardColor'
        //   }
      },
      primary: {
        $$cardColor: '$colors$primary',
        color: '$white',
        bg: '$$cardColor'
      },
      secondary: {
        $$cardColor: '$colors$secondary',
        color: '$white',
        bg: '$$cardColor'
      },
      success: {
        $$cardColor: '$colors$success',
        color: '$white',
        bg: '$$cardColor'
      },
      warning: {
        $$cardColor: '$colors$warning',
        color: '$white',
        bg: '$$cardColor'
      },
      error: {
        $$cardColor: '$colors$error',
        color: '$white',
        bg: '$$cardColor'
      },
      gradient: {
        $$cardColor: '$colors$gradient',
        color: '$white',
        bg: '$$cardColor'
      }
    },
    shadow: {
      true: {
        boxShadow: '$md'
      }
    },
    bordered: {
      true: {
        borderStyle: 'solid',
        borderColor: '$border'
      },
      false: {
        bw: 0
      }
    },
    borderWeight: {
      light: {
        bw: '$light'
      },
      normal: {
        bw: '$normal'
      },
      bold: {
        bw: '$bold'
      },
      extrabold: {
        bw: '$extrabold'
      },
      black: {
        bw: '$black'
      }
    },
    animated: {
      true: {
        transition: '$default'
      },
      false: {
        transition: 'none'
      }
    },
    clickable: {
      true: {
        cursor: 'pointer',
        us: 'none',
        WebkitTapHighlightColor: 'transparent',
        '&:focus:not(&:focus-visible)': {
          boxShadow: 'none'
        },
        '&:focus': {
          outline: 'none',
          boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary'
        },
        '@safari': {
          WebkitTapHighlightColor: 'transparent',
          outline: 'none'
        }
      }
    },
    hoverable: {
      true: {
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '$lg'
        }
      }
    },
    cover: {
      true: {
        'img, .nextui-image': {
          objectFit: 'cover !important' // TODO: remove important when image be styled
        },
        [`& ${StyledCardBody}`]: {
          p: 0
        }
      },
      false: {
        'img, .nextui-image, .nextui-image-container': {
          bblr: '0 !important', // TODO: remove important when image be styled
          bbrr: '0 !important'
        }
      }
    }
  },
  compoundVariants: [
    // color default && shadow
    {
      color: 'default',
      shadow: true,
      css: {
        $$cardColor: '$colors$background',
        bg: '$$cardColor'
        //   '@dark': { // TODO: do this when dark theme is ready
        //     $$cardColor: '$colors$accents1',
        //     bg: '$$cardColor'
        //   }
      }
    },
    // clickable && animated
    {
      clickable: true,
      animated: true,
      css: {
        '&:active': {
          scale: 0.97
        }
      }
    }
  ],
  defaultVariants: {
    color: 'default',
    borderWeight: 'normal',
    animated: true,
    bordered: false,
    shadow: true
  }
});

export const StyledCardHeader = styled('div', {
  w: '100%',
  display: 'flex',
  fs: 0, // flex-shrink
  zIndex: '$1',
  jc: 'flex-start',
  ai: 'center',
  overflow: 'hidden',
  color: 'inherit',
  fontSize: '$xs',
  p: '$sm',
  '*:first-child': {
    mt: 0
  },
  '*:last-child': {
    mb: 0
  }
});

export const StyledCardFooter = styled('div', {
  w: '100%',
  h: 'auto',
  p: '$sm $lg',
  d: 'flex',
  ai: 'center',
  overflow: 'hidden',
  color: 'inherit',
  fontSize: '$xs',
  bblr: '$lg',
  bbrr: '$lg',
  '*': {
    mt: 0,
    mb: 0
  },
  variants: {
    blur: {
      true: {
        bf: 'saturate(180%) blur(10px)',
        bg: '$$cardColor'
      }
    }
  }
});

// types
export type CardVariantsProps = VariantProps<typeof StyledCard>;
export type CardFooterVariantsProps = VariantProps<typeof StyledCardFooter>;
