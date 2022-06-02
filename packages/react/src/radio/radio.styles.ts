import { styled, cssFocusVisible } from '../theme/stitches.config';
import type { VariantProps } from '../theme/stitches.config';

export const StyledRadioText = styled('span', {
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
    isDisabled: {
      true: {
        color: '$accents5'
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
  cssFocusVisible
);

export const StyledRadioLabel = styled('label', {
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
        $$radioColorHover: '$colors$primarySolidHover'
      },
      primary: {
        $$radioColor: '$colors$primary',
        $$radioColorHover: '$colors$primarySolidHover'
      },
      secondary: {
        $$radioColor: '$colors$secondary',
        $$radioColorHover: '$colors$secondarySolidHover'
      },
      success: {
        $$radioColor: '$colors$success',
        $$radioColorHover: '$colors$successSolidHover'
      },
      warning: {
        $$radioColor: '$colors$warning',
        $$radioColorHover: '$colors$warningSolidHover'
      },
      error: {
        $$radioColor: '$colors$error',
        $$radioColorHover: '$colors$errorSolidHover'
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
    isDisabled: {
      true: {
        cursor: 'not-allowed',
        $$radioColor: '$colors$accents4'
      }
    },
    isSquared: {
      true: {
        $$radioRadii: '$radii$squared'
      },
      false: {
        $$radioRadii: '$radii$rounded'
      }
    },
    isChecked: {
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
    disableAnimation: {
      true: {
        [`& ${StyledRadioPoint}`]: {
          transition: 'none',
          '&:after': {
            transition: 'none'
          }
        }
      },
      false: {
        [`& ${StyledRadioPoint}`]: {
          transition: '$default',
          '&:after': {
            transition: '$default'
          }
        }
      }
    }
  },
  defaultVariants: {
    size: 'md',
    isSquared: false,
    disableAnimation: false
  },
  compoundVariants: [
    {
      // isChecked && isDisabled
      isChecked: true,
      isDisabled: true,
      css: {
        '&:hover': {
          [`& ${StyledRadioPoint}`]: {
            '&:after': {
              border: 'calc($$radioSize * 0.34) solid $$radioColor'
            }
          }
        }
      }
    },
    {
      // !isChecked && !isDisabled
      isChecked: false,
      isDisabled: false,
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

export const StyledRadioDescription = styled('span', {
  color: '$accents7',
  fontSize: 'calc($$radioSize * 0.85)',
  paddingLeft: 'calc($$radioSize + $$radioSize * 0.375)'
});

export const StyledRadioContainer = styled('div', {
  w: 'initial',
  position: 'relative',
  d: 'flex',
  fd: 'row',
  ai: 'center',
  jc: 'flex-start'
});

export const StyledRadioGroup = styled('div', {
  border: 0,
  margin: 0,
  padding: 0,
  display: 'flex',
  fd: 'column',
  '& .nextui-radio-group-label': {
    d: 'block',
    fontWeight: '$normal',
    fontSize: 'calc($$checkboxSize * 0.8)',
    color: '$accents7',
    mb: '$3'
  },
  variants: {
    size: {
      xs: {
        $$radioGroupGap: '$space$7'
      },
      sm: {
        $$radioGroupGap: '$space$8'
      },
      md: {
        $$radioGroupGap: '$space$9'
      },
      lg: {
        $$radioGroupGap: '$space$10'
      },
      xl: {
        $$radioGroupGap: '$space$11'
      }
    }
  }
});

export const StyledRadioGroupContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  variants: {
    isRow: {
      true: {
        mt: 0,
        flexDirection: 'row',
        [`& ${StyledRadioLabel}:not(:last-child)`]: {
          mr: '$$radioSize'
        }
      },
      false: {
        mr: 0,
        flexDirection: 'column',
        [`& ${StyledRadioLabel}:not(:first-child)`]: {
          mt: '$$radioSize'
        }
      }
    }
  },
  defaultVariants: {
    isRow: false
  }
});

// types
export type RadioLabelVariantsProps = VariantProps<typeof StyledRadioLabel>;
export type RadioTexVariantsProps = VariantProps<typeof StyledRadioText>;
export type RadioPointVariantsProps = VariantProps<typeof StyledRadioPoint>;
export type RadioGroupVariantsProps = VariantProps<typeof StyledRadioGroup>;
export type RadioContainerVariantsProps = VariantProps<
  typeof StyledRadioContainer
>;
export type RadioGroupContainerVariantsProps = VariantProps<
  typeof StyledRadioGroupContainer
>;
export type RadioDescriptionVariantsProps = VariantProps<
  typeof StyledRadioDescription
>;
