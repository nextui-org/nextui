import { styled, VariantProps } from '../theme/stitches.config';
import { StyledDrip } from '../utils/drip';
import { StyledImage, StyledImageContainer } from '../index';

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
  ta: 'left'
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
  '.nextui-image': {
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
        $$cardColor: '$colors$backgroundContrast',
        bg: '$$cardColor'
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
    disableShadow: {
      false: {
        boxShadow: '$md'
      }
    },
    isBordered: {
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
    disableAnimation: {
      true: {
        transition: 'none'
      },
      false: {
        transition: '$card'
      }
    },
    isPressable: {
      true: {
        cursor: 'pointer',
        us: 'none',
        WebkitTapHighlightColor: 'transparent'
      }
    },
    isPressed: {
      true: {}
    },
    isHoverable: {
      true: {}
    },
    isHovered: {
      true: {}
    },
    isFocusVisible: {
      true: {
        outline: 'transparent solid 2px',
        outlineOffset: '2px',
        boxShadow: '0 0 0 2px $colors$background, 0 0 0 4px $colors$primary'
      },
      false: {
        outline: 'none'
      }
    },
    isImageCover: {
      true: {
        [`& ${StyledImage}`]: {
          objectFit: 'cover'
        },
        [`& ${StyledCardBody}`]: {
          p: 0
        }
      },
      false: {
        [`& ${StyledImage}`]: {
          bblr: '0',
          bbrr: '0'
        },
        [`& ${StyledImageContainer}`]: {
          bblr: '0',
          bbrr: '0'
        }
      }
    }
  },
  compoundVariants: [
    // isPressable && !disableAnimation && isPreseed
    {
      isPressable: true,
      disableAnimation: false,
      isPressed: true,
      css: {
        scale: 0.97
      }
    },
    // isHoverable && !isHovered
    {
      isHoverable: true,
      isHovered: false,
      css: {
        transform: 'translateY(-2px)',
        boxShadow: '$md'
      }
    },
    // isFocusVisible && !disableShadow
    {
      isFocusVisible: true,
      disableShadow: false,
      css: {
        shouldShowOutline: {
          true: {
            outline: 'solid 2px $colors$primary'
          }
        }
      }
    }
  ]
});

export const StyledCardHeader = styled('div', {
  w: '100%',
  display: 'flex',
  flexShrink: 0,
  zIndex: '$1',
  jc: 'flex-start',
  ai: 'center',
  overflow: 'hidden',
  color: 'inherit',
  fontSize: '$xs',
  p: '$sm'
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
