import { styled, VariantProps } from '../theme/stitches.config';

const baseInputValues = {
  $$inputColor: '$colors$accents1',
  $$inputTextColor: '$colors$text',
  $$inputPlaceholderColor: '$colors$accents3',
  $$inputPlaceholdeOpacity: 1,
  $$inputShadow: '$shadows$sm',
  $$inputBorderColor: '$colors$accents2',
  $$inputHoverBorderColor: '$colors$foreground',
  $$inputLabelColor: '$$inputHoverBorderColor'
  // TODO: test on dark mode
  // '@dark': {
  //   $$inputColor: '$colors$accents1',
  //   $$inputPlaceholderColor: '$colors$accents6'
  // }
};

export const StyledInputMainContainer = styled('div', {
  ...baseInputValues,
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  WebkitBoxAlign: 'center',
  variants: {
    color: {
      default: {},
      primary: {
        $$inputColor: '$colors$primary',
        $$inputHoverBorderColor: '$colors$primary',
        $$inputLabelColor: '$$inputHoverBorderColor'
      },
      secondary: {
        $$inputColor: '$colors$secondary',
        $$inputHoverBorderColor: '$colors$secondary',
        $$inputLabelColor: '$$inputHoverBorderColor'
      },
      success: {
        $$inputColor: '$colors$success',
        $$inputHoverBorderColor: '$colors$success',
        $$inputLabelColor: '$$inputHoverBorderColor'
      },
      warning: {
        $$inputColor: '$colors$warning',
        $$inputHoverBorderColor: '$colors$warning',
        $$inputLabelColor: '$$inputHoverBorderColor'
      },
      error: {
        $$inputColor: '$colors$error',
        $$inputHoverBorderColor: '$colors$error',
        $$inputLabelColor: '$$inputHoverBorderColor'
      }
    },
    status: {
      default: {},
      primary: {
        $$inputColor: '$colors$primaryLight',
        $$inputPlaceholderColor: '$colors$primary',
        $$inputTextColor: '$colors$primary',
        $$inputLabelColor: '$$inputTextColor',
        $$inputPlaceholdeOpacity: 0.5
      },
      secondary: {
        $$inputColor: '$colors$secondaryLight',
        $$inputPlaceholderColor: '$colors$secondary',
        $$inputTextColor: '$colors$secondary',
        $$inputLabelColor: '$$inputTextColor',
        $$inputPlaceholdeOpacity: 0.5
      },
      success: {
        $$inputColor: '$colors$successLight',
        $$inputPlaceholderColor: '$colors$success',
        $$inputTextColor: '$colors$success',
        $$inputLabelColor: '$$inputTextColor',
        $$inputPlaceholdeOpacity: 0.5
      },
      warning: {
        $$inputColor: '$colors$warningLight',
        $$inputPlaceholderColor: '$colors$warning',
        $$inputTextColor: '$colors$warning',
        $$inputLabelColor: '$$inputTextColor',
        $$inputPlaceholdeOpacity: 0.5
      },
      error: {
        $$inputColor: '$colors$errorLight',
        $$inputPlaceholderColor: '$colors$error',
        $$inputTextColor: '$colors$error',
        $$inputLabelColor: '$$inputTextColor',
        $$inputPlaceholdeOpacity: 0.5
      }
    },
    helperColor: {
      default: {
        $$inputHelperColor: '$colors$text'
      },
      primary: {
        $$inputHelperColor: '$colors$primary'
      },
      secondary: {
        $$inputHelperColor: '$colors$secondary'
      },
      success: {
        $$inputHelperColor: '$colors$success'
      },
      warning: {
        $$inputHelperColor: '$colors$warning'
      },
      error: {
        $$inputHelperColor: '$colors$error'
      }
    },
    borderWeight: {
      light: {
        $$inputBorderWeight: '$borderWeights$light'
      },
      normal: {
        $$inputBorderWeight: '$borderWeights$normal'
      },
      bold: {
        $$inputBorderWeight: '$borderWeights$bold'
      },
      extrabold: {
        $$inputBorderWeight: '$borderWeights$extrabold'
      },
      black: {
        $$inputBorderWeight: '$borderWeights$black'
      }
    },
    size: {
      xs: {
        $$inputBorderRadius: '$space$3',
        $$inputFontSize: '$fontSizes$tiny',
        $$inputHeightRatio: '1.2',
        br: '$$inputBorderRadius'
      },
      sm: {
        $$inputBorderRadius: '$space$4',
        $$inputFontSize: '$fontSizes$tiny',
        $$inputHeightRatio: '1.6',
        br: '$$inputBorderRadius'
      },
      md: {
        $$inputBorderRadius: '$space$6',
        $$inputFontSize: '$fontSizes$xs',
        $$inputHeightRatio: '2',
        br: '$$inputBorderRadius'
      },
      lg: {
        $$inputBorderRadius: '$space$7',
        $$inputFontSize: '$fontSizes$base',
        $$inputHeightRatio: '2.2',
        br: '$$inputBorderRadius'
      },
      xl: {
        $$inputBorderRadius: '$space$8',
        $$inputFontSize: '$fontSizes$sm',
        $$inputHeightRatio: '2.6',
        br: '$$inputBorderRadius'
      }
    },
    rounded: {
      true: {
        $$inputBorderRadius: '$radii$pill'
      }
    },
    disabled: {
      true: {
        $$inputColor: '$colors$accents2',
        $$inputTextColor: '$colors$accents3',
        $$inputPlaceholderColor: '$colors$accents3',
        $$inputShadow: '$shadows$sm'
        // '@dark': {
        //   $$inputColor: '$colors$accents7',
        //   $$inputPlaceholderColor: '$colors$accents4'
        // }
      }
    }
  }
});

export const StyledInputContainer = styled('div', {
  width: '100%',
  br: '$$inputBorderRadius',
  '@motion': {
    transition: 'none'
  },
  variants: {
    isTextarea: {
      false: {
        display: 'inline-flex',
        alignItems: 'center',
        height: 'calc($$inputHeightRatio * $9)'
      }
    },
    focused: {
      true: {}
    },
    isReadOnly: {
      false: {}
    },
    underlined: { true: {} },
    animated: {
      true: {
        transition: '$default'
      },
      false: {
        transition: 'none'
      }
    }
  },
  compoundVariants: [
    {
      // underlined && !isReadOnly
      isReadOnly: false,
      underlined: true,
      css: {
        transform: 'none'
      }
    },
    {
      // focused && animated && !isReadOnly && !underlined
      focused: true,
      animated: true,
      isReadOnly: false,
      underlined: false,
      css: {
        transform: 'translateY(-$space$1)'
      }
    }
  ]
});

export const StyledInput = styled('input', {
  padding: 0,
  fontSize: '$$inputFontSize',
  bg: 'transparent',
  border: 'none',
  color: '$$inputTextColor',
  br: 0,
  outline: 'none',
  size: '100%',
  minWidth: 0,
  WebkitAppearance: 'none',
  '::placeholder': {
    color: '$$inputPlaceholderColor',
    transition: 'opacity 0.25s ease 0s',
    MozTransition: 'opacity 0.25s ease 0s',
    MsTransition: 'opacity 0.25s ease 0s',
    WebkitTransition: 'opacity 0.25s ease 0s'
  },
  '@motion': {
    transition: 'none',
    '&::placeholder': {
      transition: 'none'
    }
  },
  '&:disabled': {
    pe: 'none',
    color: '$accents4',
    cursor: 'not-allowed'
  },
  variants: {
    focused: {
      true: {
        '&::placeholder': {
          opacity: 0,
          transition: 'opacity 0.25s ease 0s'
        }
      }
    },
    rounded: {
      true: {
        padding: '0 $3'
      }
    },
    animated: {
      false: {
        transition: 'none',
        '::placeholder': {
          transition: 'none'
        }
      }
    },
    hasLeftContent: {
      true: {
        ml: 0
      }
    },
    hasRightContent: {
      true: {
        mr: 0
      }
    }
  }
});

export const StyledInputWrapper = styled('div', {
  flex: 1,
  position: 'relative',
  br: '$$inputBorderRadius',
  bg: '$$inputColor',
  display: 'inline-flex',
  verticalAlign: 'middle',
  alignItems: 'center',
  userSelect: 'none',
  '@motion': {
    transition: 'none',
    '&:before': {
      transition: 'none'
    },
    '&:after': {
      transition: 'none'
    }
  },
  variants: {
    focused: {
      true: {}
    },
    isReadOnly: {
      true: {}
    },
    bordered: {
      true: {
        bg: 'transparent',
        border: 'none',
        boxShadow: '0 0 0 $$inputBorderWeight $$inputBorderColor',
        transition: 'box-shadow 0.25s ease'
      }
    },
    shadow: {
      true: {
        transition: '$default'
      }
    },
    disabled: {
      true: {
        cursor: 'not-allowed'
      }
    },
    underlined: {
      true: {
        bg: 'transparent',
        [`& ${StyledInput}`]: {
          margin: '$2 $3'
        },
        '&:before': {
          content: '',
          position: 'absolute',
          zIndex: '$2',
          width: 0,
          bottom: 0,
          height: '$1',
          left: '50%',
          transform: 'translate(-50%)',
          background: '$$inputHoverBorderColor',
          transition: 'width 0.25s ease'
        },
        '&:after': {
          content: '',
          position: 'absolute',
          zIndex: '$1',
          bottom: 0,
          width: '100%',
          height: '$$inputBorderWeight',
          bg: '$$inputBorderColor'
        }
      },
      false: {
        [`& ${StyledInput}`]: {
          margin: '$2 $5'
          // margin: '$xs $sm' // TODO: put this in the textarea styles
        }
      }
    },
    animated: {
      false: {
        transition: 'none',
        '&:before': {
          transition: 'none'
        },
        '&:after': {
          transition: 'none'
        }
      }
    },
    isTextarea: {
      false: {
        height: '100%'
      }
    }
  },
  compoundVariants: [
    {
      // underlined && bordered
      bordered: true,
      underlined: true,
      css: {
        boxShadow: '0 0 0 0px $$inputBorderColor'
      }
    },
    {
      // focused && underlined
      focused: true,
      underlined: true,
      css: {
        '&:before': {
          width: '100%'
        }
      }
    },
    // focused && shadow && !readOnly
    {
      focused: true,
      shadow: true,
      isReadOnly: false,
      underlined: false,
      css: {
        boxShadow: '$$inputShadow'
      }
    },
    // focused && bordered && !readOnly && !underlined
    {
      focused: true,
      bordered: true,
      isReadOnly: false,
      underlined: false,
      css: {
        boxShadow: '0 0 0 $$inputBorderWeight $$inputHoverBorderColor'
      }
    },
    //  bordered && !readOnly && !underlined
    {
      bordered: true,
      isReadOnly: false,
      underlined: false,
      css: {
        '&:hover': {
          boxShadow: '0 0 0 $$inputBorderWeight $$inputHoverBorderColor'
        }
      }
    }
  ]
});

export const StyledHelperTextContainer = styled('div', {
  position: 'absolute',
  opacity: 0,
  bottom: 'calc($$inputHeightRatio * -$sm)',
  '@motion': {
    transition: 'none'
  },
  variants: {
    animated: {
      true: {
        transition: 'opacity 0.25s ease'
      },
      false: {
        transition: 'none'
      }
    },
    withValue: {
      true: {
        opacity: 1
      }
    }
  }
});

export const StyledHelperText = styled('p', {
  margin: '$1 0 0 $5',
  fontSize: '$space$5',
  color: '$$inputHelperColor'
});

/// Input accessories
export const StyledInputBlockLabel = styled('label', {
  d: 'block',
  fontWeight: '$normal',
  color: '$$inputLabelColor',
  p: '0 0 0 $2',
  mb: '$3',
  fs: '$$inputFontSize',
  lh: '$md',
  WebkitTouchCallout: 'none' /* iOS Safari */,
  WebkitUserSelect: 'none' /* Safari */,
  KhtmlUserSelect: 'none' /* Konqueror HTML */,
  MozUserSelect: 'none' /* Firefox */,
  MsUserSelect: 'none' /* Internet Explorer/Edge */,
  us: 'none' /* Non-prefixed version, currently supported by Chrome and Opera */,
  '> *:first-child': {
    marginTop: 0
  },
  '> *:last-child': {
    mb: 0
  },
  '@motion': {
    transition: 'none'
  },
  variants: {
    rounded: {
      true: {
        padding: '0 0 0 $3'
      }
    },
    asPlaceholder: {
      true: {
        position: 'absolute',
        padding: 0,
        zIndex: '$1',
        left: '$space$6',
        top: '20%',
        mb: 0,
        cursor: 'text',
        color: '$$inputPlaceholderColor',
        transition: 'left 0.25s ease 0s, color 0.25s ease 0s, top 0.25s ease 0s'
      }
    },
    animated: {
      false: {
        transition: 'none'
      }
    },
    focused: {
      true: {}
    },
    underlined: {
      true: {}
    },
    withValue: {
      true: {}
    },
    isTextarea: {
      true: {}
    },
    hasContentLeft: {
      true: {}
    }
  },
  compoundVariants: [
    // underlined && asPlaceholder
    {
      underlined: true,
      asPlaceholder: true,
      css: {
        left: '$space$2'
      }
    },
    // asPlaceholder && focused && !underlined
    {
      asPlaceholder: true,
      focused: true,
      underlined: false,
      css: {
        color: '$$inputTextColor',
        top: '-72%',
        left: '$2',
        cursor: 'inherit'
      }
    },
    // asPlaceholder && focused && underlined
    {
      asPlaceholder: true,
      focused: true,
      underlined: true,
      css: {
        color: '$$inputTextColor',
        top: '-72%',
        left: '0px',
        cursor: 'inherit'
      }
    },
    // asPlaceholder && focused && withValue && !underlined
    {
      asPlaceholder: true,
      withValue: true,
      underlined: false,
      css: {
        color: '$$inputTextColor',
        top: '-72%',
        left: '$2',
        cursor: 'inherit'
      }
    },
    // asPlaceholder && focused && withValue && underlined
    {
      asPlaceholder: true,
      withValue: true,
      underlined: true,
      css: {
        color: '$$inputTextColor',
        top: '-72%',
        left: '0px',
        cursor: 'inherit'
      }
    },

    // asPlaceholder && isTextarea
    {
      asPlaceholder: true,
      isTextarea: true,
      css: {
        top: '$5'
      }
    },
    // asPlaceholder && hasContentLeft
    {
      asPlaceholder: true,
      hasContentLeft: true,
      css: {
        left: 'calc($space$6 + $$inputHeightRatio * $space$7)'
      }
    },
    // asPlaceholder && isTextarea && focused
    {
      asPlaceholder: true,
      isTextarea: true,
      focused: true,
      css: {
        top: '-$11'
      }
    },
    // asPlaceholder && isTextarea && withValue
    {
      asPlaceholder: true,
      isTextarea: true,
      withValue: true,
      css: {
        top: '-$11'
      }
    }
  ],
  defaultVariants: {
    asPlaceholder: false
  }
});

// types
export type InputVariantsProps = VariantProps<typeof StyledInput>;
export type InputBlockLabelVariantsProps = VariantProps<
  typeof StyledInputBlockLabel
>;
