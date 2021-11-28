import { styled, sharedFocus, VariantProps } from '../theme/stitches.config';

export const StyledCheckboxLabel = styled('label', {
  d: 'inline-flex',
  jc: 'flex-start',
  ai: 'center',
  position: 'relative',
  w: 'auto',
  cursor: 'pointer',
  transition: '$default',
  zIndex: '$1',
  opacity: 1,
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
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

export const StyledCheckboxContainer = styled(
  'div',
  {
    // width: var(--nextui-checkbox-size); // size variant
    // height: var(--nextui-checkbox-size); // size variant
    br: '$squared',
    position: 'relative',
    sizeMin: '$$checkboxSize',
    opacity: 1,
    transition: '$default',
    zIndex: '$1',
    '@motion': {
      transition: 'none'
    },
    variants: {
      color: {
        default: {
          $$checkboxColor: '$colors$primary'
        },
        primary: {
          $$checkboxColor: '$colors$primary'
        },
        secondary: {
          $$checkboxColor: '$colors$secondary'
        },
        success: {
          $$checkboxColor: '$colors$success'
        },
        warning: {
          $$checkboxColor: '$colors$warning'
        },
        error: {
          $$checkboxColor: '$colors$error'
        },
        gradient: {
          $$checkboxColor: '$colors$gradient'
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
      }
    },
    defaultVariants: {
      color: 'default'
    }
  },
  sharedFocus
);

export const StyledIconCheckFirstLine = styled('div', {
  content: '',
  background: 'transparent',
  position: 'absolute',
  width: '8px',
  height: '1px',
  transition: '$default',
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
    transition: '$default',
    br: '5px 0px 0px 5px'
  },
  variants: {
    indeterminate: {
      true: {
        opacity: 0,
        transform: 'rotate(-45deg)',
        bottom: '0px',
        right: -'1px',
        display: 'none'
      }
    }
  }
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
  transition: '$default',
  width: '2px',
  '&:after': {
    content: '',
    position: 'absolute',
    width: '2px',
    height: '0%',
    background: '$white',
    transition: '$default',
    left: '0px',
    bottom: '0px',
    br: '5px 5px 0px 0px'
  },
  variants: {
    indeterminate: {
      true: {
        right: '0px',
        bottom: '-0.14rem',
        transform: 'rotate(45deg)',
        transition: '$default',
        height: '11px',
        display: 'none'
      }
    }
  }
});

export const StyledIconCheck = styled('i', {
  // width: var(--nextui-checkbox-size); // size variant
  // height: var(--nextui-checkbox-size); // size variant
  dflex: 'center',
  transition: '$default',
  br: 'inherit',
  variants: {
    indeterminate: {
      true: {
        transform: 'rotate(0deg)',
        width: 'auto',
        height: 'auto',
        margin: '0px'
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
  size: '100%',
  position: 'absolute',
  pe: 'none',
  boxSizing: 'border-box',
  dflex: 'center',
  zIndex: '-$1',
  br: 'inherit',
  transition: '$default',
  '&:before': {
    content: '',
    position: 'absolute',
    top: '0px',
    left: '0px',
    size: '100%',
    br: 'inherit',
    transition: '$default',
    zIndex: '-$1',
    border: '$borderWeights$normal solid $border',
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
    transition: '$default',
    zIndex: '-$1'
  },
  [`& ${StyledIconCheck}`]: {
    opacity: 0,
    zIndex: '$2'
  },
  [`i:not(&${StyledIconCheck})`]: {
    opacity: 0,
    transition: '$default',
    color: '$white',
    fontSize: '$sm',
    scale: 0.5
  },
  variants: {
    checked: {
      true: {
        '&:after': {
          opacity: 1,
          scale: 1
        }
      }
    }
  }
});

export const StyledCheckboxText = styled('span', {
  position: 'relative',
  dflex: 'center',
  color: '$text',
  pl: 'calc($$checkboxSize * 0.57)',
  ln: '$$checkboxSize',
  fontSize: '$$checkboxSize',
  // color: ${labelColor}; TODO: label color
  us: 'none',
  '&:before': {
    content: '',
    position: 'absolute',
    width: '0px',
    height: '2px',
    background: '$text',
    transition: '$default'
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
        opacity: 0.6
      }
    },
    checked: {
      true: {
        '&:before': {
          opacity: 0.8
        }
      }
    }
  },
  compoundVariants: [
    {
      line: true,
      checked: true,
      css: {
        '&:before': {
          w: 'calc(100% - 10px)'
        }
      }
    }
  ]
});

export const StyledCheckboxInput = styled('input', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  margin: '0px',
  padding: '0px',
  opacity: 0,
  zIndex: '$1',
  '&:active': {
    [`& ~${StyledCheckboxMask}`]: {
      bg: '$border'
    }
  },
  '&:hover': {
    [`& ~${StyledCheckboxMask}`]: {
      bg: '$border',
      '&:before': {
        border: '2px solid transparent'
      }
    }
  },
  '&:disabled': {
    cursor: 'not-allowed'
  },
  '&:checked': {
    // input:checked ~ .${preClass}-mask i:not(.${preClass}-icon-check) {
    //     opacity: 1;
    //     transform: scale(1);
    //     transition: all 0.25s ease 0.15s;
    //   }

    [`& ~${StyledIconCheck}`]: {
      opacity: 1
    }
    //   input:checked ~ .${preClass}-mask .${preClass}-icon-check {
    //     opacity: 1;
    //   }
    //   input:checked
    //     ~ .${preClass}-mask
    //     .${preClass}-icon
    //     .${preClass}-line1:after {
    //     width: 100%;
    //     transition: all 0.25s ease 0.1s;
    //   }
    //   input:checked
    //     ~ .${preClass}-mask
    //     .${preClass}-icon-check
    //     span
    //     .${preClass}-line2:after {
    //     transition: all 0.2s ease 0.3s;
    //     height: 100%;
    //   }
    //   input:checked ~ .${preClass}-mask:after {
    //     opacity: 1;
    //     transform: scale(1);
    //   }
    //   input:checked ~ .${preClass}-mask:before {
    //     opacity: 0;
    //     transform: scale(1.2);
    //   }
    //   input:checked
    //     ~ .${preClass}-mask
    //     .${preClass}-indeterminate
    //     .${preClass}-icon:after {
    //     width: 10px;
    //   }
  }
});

export const StyledCheckboxGroup = styled('div', {});

// types

export type CheckboxVariantsProps = VariantProps<typeof StyledCheckboxInput>;
