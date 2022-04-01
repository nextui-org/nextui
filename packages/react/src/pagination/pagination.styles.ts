import {
  styled,
  VariantProps,
  sharedFocus,
  keyframes
} from '../theme/stitches.config';

const paginationAnimation = keyframes({
  '0%': {
    transform: 'scale(1)'
  },
  '60%': {
    transform: 'scale($$paginationScaleTransform)'
  },
  '100%': {
    transform: 'scale(1)'
  }
});

export const StyledPaginationEllipsis = styled('svg', {
  color: 'currentColor',
  stroke: 'currentColor',
  variants: {
    isEllipsis: {
      true: {
        transform: '0deg'
      }
    },
    isBefore: {
      true: {}
    }
  },
  compoundVariants: [
    {
      // isEllipsis && isBefore
      isEllipsis: true,
      isBefore: true,
      css: {
        transform: 'rotate(180deg)'
      }
    }
  ]
});

export const StyledPaginationIcon = styled('svg', {
  transform: 'rotate(180deg)',
  variants: {
    isPrev: {
      true: {
        transform: 'rotate(0deg)'
      }
    }
  }
});

export const StyledPaginationItemContent = styled('span', {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  top: 0,
  left: 0,
  zIndex: '$2'
});

export const StyledPaginationItem = styled(
  'button',
  {
    border: 'none',
    position: 'relative',
    display: 'inline-flex',
    margin: '0 $$paginationItemMargin',
    ai: 'center',
    jc: 'center',
    padding: 0,
    boxSizing: 'border-box',
    tt: 'capitalize',
    us: 'none',
    whiteSpace: 'nowrap',
    ta: 'center',
    verticalAlign: 'middle',
    bs: 'none',
    outline: 'none',
    height: '$$paginationSize',
    minWidth: '$$paginationSize',
    fs: 'inherit',
    cursor: 'pointer',
    br: '$$paginationItemRadius',
    color: '$text',
    bg: '$accents1',
    '@motion': {
      transition: 'none'
    },
    '&:hover': {
      bg: '$accents2'
    },
    [`& ${StyledPaginationIcon}`]: {
      size: '$$paginationFontSize'
    },
    [`& ${StyledPaginationEllipsis}`]: {
      size: '$$paginationFontSize'
    },
    variants: {
      active: {
        true: {
          fontWeight: '$bold',
          cursor: 'default',
          boxShadow: '$sm',
          [`& ${StyledPaginationItemContent}`]: {
            color: '$white'
          }
        }
      },
      disabled: {
        true: {
          color: '$accents4',
          cursor: 'not-allowed'
        }
      },
      bordered: {
        true: {
          bg: 'transparent',
          border: '$$paginationItemBorderWeight solid $accents2'
        }
      },
      onlyDots: {
        true: {}
      },
      preserveContent: {
        true: {}
      },
      animated: {
        true: {
          transition:
            'transform 0.25s ease 0s, background 0.25s ease 0s, box-shadow 0.25s ease 0s'
        },
        false: {
          transition: 'none'
        }
      }
    },
    compoundVariants: [
      // onlyDots && !preserveContent
      {
        onlyDots: true,
        preserveContent: false,
        css: {
          [`& ${StyledPaginationItemContent}`]: {
            display: 'none'
          }
        }
      },
      // animated && !disabled && !active
      {
        animated: true,
        disabled: false,
        active: false,
        css: {
          '&:active': {
            transform: 'scale($$paginationScaleTransform)',
            fs: 'calc($$paginationFontSize * 0.9)'
          }
        }
      }
    ]
  },
  sharedFocus
);

export const StyledPaginationHighlight = styled('div', {
  position: 'absolute',
  contain: 'strict',
  top: '0px',
  zIndex: '$1',
  bg: '$$paginationColor',
  br: '$$paginationItemRadius',
  height: '$$paginationSize',
  minWidth: '$$paginationSize',
  animationName: `${paginationAnimation}`,
  animationDirection: 'normal',
  '&.nextui-pagination-highlight--moving': {
    transform: 'scale($$paginationScaleTransform)'
  },
  '@motion': {
    transition: 'none',
    '&.nextui-pagination-highlight--moving': {
      transform: 'scale(1)'
    }
  },
  variants: {
    animated: {
      true: {
        animationDuration: '350ms',
        animationTimingFunction: 'ease',
        transition: 'left 350ms ease 0s, transform 300ms ease 0s'
      },
      false: {
        animationDuration: 'none',
        animationTimingFunction: 'none',
        transition: 'none',
        '&.nextui-pagination-highlight--moving': {
          transform: 'scale(1)'
        }
      }
    },
    noMargin: {
      true: {
        br: '$squared'
      }
    },
    rounded: {
      true: {}
    },
    shadow: {
      true: {
        normalShadowVar: '$$paginationShadowColor'
      }
    }
  },
  compoundVariants: [
    {
      // rounded && noMargin
      rounded: true,
      noMargin: true,
      css: {
        br: '$pill'
      }
    }
  ]
});

export const StyledPagination = styled('nav', {
  m: 0,
  p: 0,
  d: 'inline-flex',
  position: 'relative',
  fontVariant: 'tabular-nums',
  fontFeatureSettings: 'tnum',
  variants: {
    color: {
      default: {
        $$paginationColor: '$colors$primary',
        $$paginationShadowColor: '$colors$primaryShadow'
      },
      primary: {
        $$paginationColor: '$colors$primary',
        $$paginationShadowColor: '$colors$primaryShadow'
      },
      secondary: {
        $$paginationColor: '$colors$secondary',
        $$paginationShadowColor: '$colors$secondaryShadow'
      },
      success: {
        $$paginationColor: '$colors$success',
        $$paginationShadowColor: '$colors$successShadow'
      },
      warning: {
        $$paginationColor: '$colors$warning',
        $$paginationShadowColor: '$colors$warningShadow'
      },
      error: {
        $$paginationColor: '$colors$error',
        $$paginationShadowColor: '$colors$errorShadow'
      },
      gradient: {
        $$paginationColor: '$colors$gradient',
        $$paginationShadowColor: '$colors$primaryShadow'
      }
    },
    size: {
      xs: {
        $$paginationWidth: '$space$10',
        $$paginationFontSize: '$space$5',
        fs: '$$paginationFontSize'
      },
      sm: {
        $$paginationWidth: '$space$12',
        $$paginationFontSize: '$space$6',
        fs: '$$paginationFontSize'
      },
      md: {
        $$paginationWidth: '$space$13',
        $$paginationFontSize: '$space$7',
        fs: '$$paginationFontSize'
      },
      lg: {
        $$paginationWidth: '$space$14',
        $$paginationFontSize: '$space$8',
        fs: '$$paginationFontSize'
      },
      xl: {
        $$paginationWidth: '$space$15',
        $$paginationFontSize: '$space$9',
        fs: '$$paginationFontSize'
      }
    },
    borderWeight: {
      light: {
        $$paginationItemBorderWeight: '$borderWeights$light'
      },
      normal: {
        $$paginationItemBorderWeight: '$borderWeights$normal'
      },
      bold: {
        $$paginationItemBorderWeight: '$borderWeights$bold'
      },
      extrabold: {
        $$paginationItemBorderWeight: '$borderWeights$extrabold'
      },
      black: {
        $$paginationItemBorderWeight: '$borderWeights$black'
      }
    },
    bordered: {
      true: {}
    },
    onlyDots: {
      true: {
        $$paginationSize: 'calc($$paginationWidth / 2)',
        $$paginationItemRadius: '$radii$pill',
        $$paginationScaleTransform: 1.05
      },
      false: {
        $$paginationSize: '$$paginationWidth',
        $$paginationScaleTransform: 1.1
      }
    },
    rounded: {
      true: {
        $$paginationItemRadius: '$radii$pill'
      },
      false: {
        $$paginationItemRadius: '$radii$squared'
      }
    },
    noMargin: {
      true: {
        $$paginationItemRadius: '0px',
        $$paginationItemMargin: '0',
        [`& ${StyledPaginationItem}:first-of-type`]: {
          btlr: '$squared',
          bblr: '$squared'
        },
        [`& ${StyledPaginationItem}:last-of-type`]: {
          btrr: '$squared',
          bbrr: '$squared'
        }
      },
      false: {
        $$paginationItemMargin: '$space$1'
      }
    }
  },
  compoundVariants: [
    {
      // bordered && noMargin
      bordered: true,
      noMargin: true,
      css: {
        [`& ${StyledPaginationItem}:not(:last-child)`]: {
          borderRight: 0
        }
      }
    },
    {
      // noMargin && rounded
      noMargin: true,
      rounded: true,
      css: {
        $$paginationItemRadius: '0px'
      }
    },
    {
      // !rounded && noMargin
      rounded: false,
      noMargin: true,
      css: {
        $$paginationItemRadius: '0px'
      }
    }
  ],
  defaultVariants: {
    color: 'default',
    size: 'md',
    borderWeight: 'normal',
    onlyDots: false,
    noMargin: false,
    rounded: false
  }
});

export type PaginationVariantsProps = VariantProps<typeof StyledPagination>;
export type PaginationItemVariantsProps = VariantProps<
  typeof StyledPaginationItem
>;
export type PaginationHighlightVariantsProps = VariantProps<
  typeof StyledPaginationHighlight
>;
