import {
  styled,
  sharedVisuallyHidden,
  sharedFocus,
  VariantProps
} from '../theme/stitches.config';

export const StyledRadioInput = styled('input', {}, sharedVisuallyHidden);

export const StyledRadioDescription = styled('span', {
  fontSize: '$$radioSize',
  us: 'none',
  d: 'inline-flex',
  ai: 'center',
  variants: {
    color: {
      default: {
        color: '$text'
      },
      primary: {
        color: '$primary'
      },
      secondary: {
        color: '$secondary'
      },
      success: {
        color: '$success'
      },
      warning: {
        color: '$warning'
      },
      error: {
        color: '$error'
      }
    },
    disabled: {
      true: {
        color: '$accents4'
      }
    }
  }
});

export const StyledRadioPoint = styled(
  'span',
  {
    size: '$$radioSize',
    br: '$$radioRadii',
    position: 'relative',
    d: 'inline-block',
    mr: 'calc($$radioSize * 0.375)',
    '&:after': {
      content: '',
      d: 'block',
      position: 'absolute',
      size: '$$radioSize',
      br: '$$radioRadii',
      boxSizing: 'border-box',
      border: '2px solid $border'
    }
  },
  sharedFocus
);

export const StyledRadio = styled('label', {
  d: 'flex',
  w: 'initial',
  ai: 'flex-start',
  position: 'relative',
  fd: 'column',
  jc: 'flex-start',
  cursor: 'pointer',
  '@motion': {
    [`& ${StyledRadioPoint}`]: {
      transition: 'none',
      '&:after': {
        transition: 'none'
      }
    }
  },
  variants: {
    color: {
      default: {
        $$radioColor: '$colors$primary',
        $$radioColorHover: '$colors$primaryDark'
      },
      primary: {
        $$radioColor: '$colors$primary',
        $$radioColorHover: '$colors$primaryDark'
      },
      secondary: {
        $$radioColor: '$colors$secondary',
        $$radioColorHover: '$colors$secondaryDark'
      },
      success: {
        $$radioColor: '$colors$success',
        $$radioColorHover: '$colors$successDark'
      },
      warning: {
        $$radioColor: '$colors$warning',
        $$radioColorHover: '$colors$warningDark'
      },
      error: {
        $$radioColor: '$colors$error',
        $$radioColorHover: '$colors$errorDark'
      }
    },
    size: {
      xs: {
        $$radioSize: '$space$7'
      },
      sm: {
        $$radioSize: '$space$8'
      },
      md: {
        $$radioSize: '$space$9'
      },
      lg: {
        $$radioSize: '$space$10'
      },
      xl: {
        $$radioSize: '$space$11'
      }
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        $$radioColor: '$colors$accents4'
      }
    },
    squared: {
      true: {
        $$radioRadii: '$space$1'
      },
      false: {
        $$radioRadii: '$radii$rounded'
      }
    },
    active: {
      true: {
        [`& ${StyledRadioPoint}`]: {
          '&:after': {
            border: 'calc($$radioSize * 0.34) solid $$radioColor'
          }
        },
        '&:hover': {
          [`& ${StyledRadioPoint}`]: {
            '&:after': {
              border: 'calc($$radioSize * 0.34) solid $$radioColorHover'
            }
          }
        }
      }
    },
    animated: {
      true: {
        [`& ${StyledRadioPoint}`]: {
          transition: '$default',
          '&:after': {
            transition: '$default'
          }
        }
      },
      false: {
        [`& ${StyledRadioPoint}`]: {
          transition: 'none',
          '&:after': {
            transition: 'none'
          }
        }
      }
    }
  },
  defaultVariants: {
    size: 'md',
    squared: false,
    animated: true
  },
  compoundVariants: [
    {
      // !active && !disabled
      active: false,
      disabled: false,
      css: {
        '&:hover': {
          [`& ${StyledRadioPoint}`]: {
            bg: '$border'
          }
        }
      }
    }
  ]
});

// types
export type RadioVariantsProps = VariantProps<typeof StyledRadio>;
export type RadioInputVariantsProps = VariantProps<typeof StyledRadioInput>;
export type RadioDescriptionVariantsProps = VariantProps<
  typeof StyledRadioDescription
>;
export type RadioPointVariantsProps = VariantProps<typeof StyledRadioPoint>;
