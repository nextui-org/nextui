import {
  styled,
  cssFocusVisible,
  VariantProps
} from '../theme/stitches.config';

export const StyledCheckboxLabel = styled('label', {
  d: 'inline-flex',
  jc: 'flex-start',
  ai: 'center',
  position: 'relative',
  w: 'auto',
  cursor: 'pointer',
  zIndex: '$1',
  opacity: 1,
  transition: 'opacity 0.25s ease',
  $$checkboxBorderColor: '$colors$border',
  '@motion': {
    transition: 'none'
  },
  variants: {
    size: {
      xs: {
        $$checkboxSize: '$space$7'
      },
      sm: {
        $$checkboxSize: '$space$8'
      },
      md: {
        $$checkboxSize: '$space$9'
      },
      lg: {
        $$checkboxSize: '$space$10'
      },
      xl: {
        $$checkboxSize: '$space$11'
      }
    },
    disabled: {
      true: {
        opacity: 0.75,
        cursor: 'not-allowed'
      }
    },
    isHovered: {
      true: {
        opacity: 0.8
      }
    },
    animated: {
      false: {
        transition: 'none'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export const StyledIconCheckFirstLine = styled('div', {
  content: '',
  background: 'transparent',
  position: 'absolute',
  width: '8px',
  height: '1px',
  br: '5px',
  zIndex: '$1',
  bottom: '0px',
  '&:after': {
    content: '',
    position: 'absolute',
    left: '0px',
    width: '0%',
    height: '2px',
    background: '$white',

    br: '5px 0px 0px 5px'
  },
  '@motion': {
    '&:after': {
      transition: 'none'
    }
  },
  variants: {
    indeterminate: {
      true: {
        display: 'none'
      }
    },
    checked: {
      true: {
        '&:after': {
          width: '100%',
          transition: 'width 0.25s ease 0.1s'
        }
      }
    },
    animated: {
      false: {
        '&:after': {
          transition: 'none'
        }
      }
    }
  },
  compoundVariants: [
    // checked && !animated
    {
      checked: true,
      animated: false,
      css: {
        '&:after': {
          transition: 'none'
        }
      }
    }
  ]
});

export const StyledIconCheckSecondLine = styled('div', {
  content: '',
  position: 'absolute',
  h: '13px',
  br: '5px',
  bottom: '0',
  right: '0',
  zIndex: '$1',
  background: 'transparent',
  width: '2px',
  '&:after': {
    content: '',
    position: 'absolute',
    width: '2px',
    height: '0%',
    background: '$white',
    left: '0px',
    bottom: '0px',
    br: '5px 5px 0px 0px'
  },
  '@motion': {
    '&:after': {
      transition: 'none'
    }
  },
  variants: {
    indeterminate: {
      true: {
        display: 'none'
      }
    },
    checked: {
      true: {
        '&:after': {
          height: '100%',
          transition: 'height 0.2s ease 0.3s'
        }
      }
    },
    animated: {
      false: {
        '&:after': {
          transition: 'none'
        }
      }
    }
  },
  compoundVariants: [
    // checked && !animated
    {
      checked: true,
      animated: false,
      css: {
        '&:after': {
          transition: 'none'
        }
      }
    }
  ]
});

export const StyledIconCheck = styled('i', {
  size: '$$checkboxSize',
  dflex: 'center',
  br: 'inherit',
  opacity: 0,
  zIndex: '$2',
  transition: 'transform 0.35s ease',
  '&:after': {
    content: '',
    opacity: 0,
    position: 'relative',
    width: '10px',
    height: '2px',
    br: '1px',
    background: '$white',
    display: 'block'
  },
  '@motion': {
    transition: 'none',
    '&:after': {
      transition: 'none'
    }
  },
  variants: {
    indeterminate: {
      true: {
        transform: 'rotate(0deg)',
        width: 'auto',
        height: 'auto',
        margin: '0px',
        '&:after': {
          opacity: 1
        }
      },
      false: {
        width: '8px',
        height: '14px',
        display: 'block',
        position: 'relative',
        marginTop: '-4px'
      }
    },
    size: {
      xs: {
        marginTop: '-2px',
        transform: 'rotate(45deg) scale(0.5)'
      },
      sm: {
        marginTop: '-2px',
        transform: 'rotate(45deg) scale(0.5)'
      },
      md: {
        transform: 'rotate(45deg) scale(0.8)'
      },
      lg: {
        transform: 'rotate(45deg)'
      },
      xl: {
        transform: 'rotate(45deg)'
      }
    },
    checked: {
      true: {
        opacity: 1
      }
    },
    animated: {
      false: {
        transition: 'none',
        '&:after': {
          transition: 'none'
        }
      }
    }
  },
  compoundVariants: [
    // indeterminate && xs size
    {
      indeterminate: true,
      size: 'xs',
      css: {
        scale: '0.5'
      }
    },
    // indeterminate && sm size
    {
      indeterminate: true,
      size: 'sm',
      css: {
        scale: '0.5'
      }
    },
    // indeterminate && md size
    {
      indeterminate: true,
      size: 'md',
      css: {
        scale: '0.8'
      }
    },
    // indeterminate && lg size
    {
      indeterminate: true,
      size: 'lg',
      css: {
        transform: 'none'
      }
    },
    // indeterminate && xl size
    {
      indeterminate: true,
      size: 'lg',
      css: {
        transform: 'none'
      }
    }
  ]
});

export const StyledCheckboxMask = styled('div', {
  $$checkboxMaskTransition:
    'transform 0.25s ease 0s, opacity 0.25s ease 0s, background 0.25s ease 0s, border-color 0.25s ease 0s',
  size: '100%',
  position: 'absolute',
  pe: 'none',
  boxSizing: 'border-box',
  dflex: 'center',
  zIndex: '-$1',
  br: 'inherit',
  color: '$$checkboxBorderColor',
  '&:before': {
    content: '',
    position: 'absolute',
    top: '0px',
    left: '0px',
    size: '100%',
    br: 'inherit',
    transition: '$$checkboxMaskTransition',
    zIndex: '-$1',
    border: '$borderWeights$normal solid currentColor',
    boxSizing: 'border-box'
  },
  '&:after': {
    content: '',
    position: 'absolute',
    top: '0px',
    left: '0px',
    size: '100%',
    bg: '$$checkboxColor',
    scale: 0.5,
    br: 'inherit',
    opacity: 0,
    transition: '$$checkboxMaskTransition',
    zIndex: '-$1'
  },
  '@motion': {
    '&:before': {
      transition: 'none'
    },
    '&:after': {
      transition: 'none'
    }
  },
  variants: {
    checked: {
      true: {
        '&:before': {
          opacity: 0,
          scale: 1.2
        },
        '&:after': {
          opacity: 1,
          scale: 1
        }
      }
    },
    animated: {
      false: {
        '&:before': {
          transition: 'none'
        },
        '&:after': {
          transition: 'none'
        }
      }
    }
  }
});

export const StyledCheckboxText = styled('span', {
  position: 'relative',
  dflex: 'center',
  color: '$text',
  opacity: 1,
  pl: 'calc($$checkboxSize * 0.57)',
  ln: '$$checkboxSize',
  fontSize: '$$checkboxSize',
  us: 'none',
  transition: 'opacity 0.25s ease 0s',
  '@motion': {
    transition: 'none',
    '&:before': {
      transition: 'none'
    }
  },
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
    line: {
      true: {
        '&:before': {
          content: '',
          position: 'absolute',
          width: '0px',
          height: '2px',
          background: '$text',
          transition: 'width 0.25s ease 0s'
        }
      }
    },
    checked: {
      true: {
        '&:before': {
          opacity: 0.8
        }
      }
    },
    disabled: {
      true: {
        color: '$accents4'
      }
    },
    animated: {
      false: {
        transition: 'none',
        '&:before': {
          transition: 'none'
        }
      }
    }
  },
  compoundVariants: [
    {
      line: true,
      checked: true,
      css: {
        opacity: 0.6,
        '&:before': {
          w: 'calc(100% - 10px)'
        }
      }
    }
  ]
});

export const StyledCheckboxContainer = styled(
  'div',
  {
    br: '$squared',
    position: 'relative',
    sizeMin: '$$checkboxSize',
    transition: 'box-shadow 0.25s ease',
    zIndex: '$1',
    '&.nextui-checkbox-input': {
      '&:disabled': {
        cursor: 'not-allowed'
      }
    },
    '@motion': {
      transition: 'none'
    },
    variants: {
      color: {
        default: {
          $$checkboxColor: '$colors$primary',
          $$checkboxColorHover: '$colors$primaryDark'
        },
        primary: {
          $$checkboxColor: '$colors$primary',
          $$checkboxColorHover: '$colors$primaryDark'
        },
        secondary: {
          $$checkboxColor: '$colors$secondary',
          $$checkboxColorHover: '$colors$secondaryDark'
        },
        success: {
          $$checkboxColor: '$colors$success',
          $$checkboxColorHover: '$colors$successDark'
        },
        warning: {
          $$checkboxColor: '$colors$warning',
          $$checkboxColorHover: '$colors$warningDark'
        },
        error: {
          $$checkboxColor: '$colors$error',
          $$checkboxColorHover: '$colors$errorDark'
        },
        gradient: {
          $$checkboxColor: '$colors$gradient',
          $$checkboxColorHover: '$colors$gradient'
        }
      },
      rounded: {
        true: {
          br: '$pill'
        }
      },
      disabled: {
        true: {
          opacity: 0.4,
          cursor: 'not-allowed'
        }
      },
      animated: {
        false: {
          transition: 'none'
        }
      },
      isHovered: {
        true: {
          [`& ${StyledCheckboxMask}:before`]: {
            bg: '$$checkboxBorderColor',
            border: '2px solid transparent'
          },
          [`& ${StyledCheckboxMask}:after`]: {
            bg: '$$checkboxColorHover'
          }
        }
      }
    },
    defaultVariants: {
      color: 'default'
    }
  },
  cssFocusVisible
);

export const StyledCheckboxGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  variants: {
    size: {
      xs: {
        $$checkboxSize: '$space$7'
      },
      sm: {
        $$checkboxSize: '$space$8'
      },
      md: {
        $$checkboxSize: '$space$9'
      },
      lg: {
        $$checkboxSize: '$space$10'
      },
      xl: {
        $$checkboxSize: '$space$11'
      }
    }
  }
});

export const StyledCheckboxGroupContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  variants: {
    row: {
      true: {
        flexDirection: 'row',
        mt: 0,
        [`& ${StyledCheckboxLabel}`]: {
          mr: '$$checkboxSize'
        }
      },
      false: {
        mr: 0,
        flexDirection: 'column',
        [`& ${StyledCheckboxLabel}:not(:first-child)`]: {
          mt: '$$checkboxSize'
        }
      }
    }
  },
  defaultVariants: {
    row: false
  }
});

export const StyledCheckboxGroupLabel = styled('label', {
  d: 'block',
  fontWeight: '$normal',
  fontSize: 'calc($$checkboxSize * 0.8)',
  color: '$accents6',
  mb: '$2',
  variants: {
    disabled: {
      true: {
        opacity: 0.75
      }
    }
  }
});

// types

export type CheckboxGroupVariantsProps = VariantProps<
  typeof StyledCheckboxGroup
>;
export type CheckboxTextVariantsProps = VariantProps<typeof StyledCheckboxText>;
export type CheckboxMaskVariantsProps = VariantProps<typeof StyledCheckboxMask>;
export type CheckboxIconCheckVariantsProps = VariantProps<
  typeof StyledIconCheck
>;
export type CheckboxIconCheckFirstLineVariantsProps = VariantProps<
  typeof StyledIconCheckFirstLine
>;
export type CheckboxIconCheckSecondLineVariantsProps = VariantProps<
  typeof StyledIconCheckSecondLine
>;
export type CheckboxLabelVariantsProps = VariantProps<
  typeof StyledCheckboxLabel
>;
export type CheckboxContainerVariantsProps = VariantProps<
  typeof StyledCheckboxContainer
>;
