import { styled, VariantProps } from '../theme/stitches.config';
import { sharedVisuallyHidden } from '../theme/shared-css';

const baseInputValues = {
  $$inputColor: '$colors$accents0',
  $$inputTextColor: '$colors$text',
  $$inputPlaceholderColor: '$colors$accents6',
  $$inputShadow: '$shadows$sm',
  $$inputBorderColor: '$colors$border',
  $$inputHoverBorderColor: '$colors$foreground',
  $$inputLabelColor: '$$inputHoverBorderColor'
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
        $$inputHoverBorderColor: '$colors$primary',
        $$inputLabelColor: '$colors$primary'
      },
      secondary: {
        $$inputHoverBorderColor: '$colors$secondary',
        $$inputLabelColor: '$colors$secondary'
      },
      success: {
        $$inputHoverBorderColor: '$colors$success',
        $$inputLabelColor: '$colors$success'
      },
      warning: {
        $$inputHoverBorderColor: '$colors$warning',
        $$inputLabelColor: '$colors$warning'
      },
      error: {
        $$inputHoverBorderColor: '$colors$error',
        $$inputLabelColor: '$colors$error'
      }
    },
    status: {
      default: {},
      primary: {
        $$inputColor: '$colors$primaryLight',
        $$inputPlaceholderColor: '$colors$primaryLightContrast',
        $$inputTextColor: '$colors$primaryLightContrast',
        $$inputLabelColor: '$$inputTextColor',
        $$inputHoverBorderColor: '$colors$primary'
      },
      secondary: {
        $$inputColor: '$colors$secondaryLight',
        $$inputPlaceholderColor: '$colors$secondaryLightContrast',
        $$inputTextColor: '$colors$secondaryLightContrast',
        $$inputLabelColor: '$$inputTextColor',
        $$inputHoverBorderColor: '$colors$secondary'
      },
      success: {
        $$inputColor: '$colors$successLight',
        $$inputPlaceholderColor: '$colors$successLightContrast',
        $$inputTextColor: '$colors$successLightContrast',
        $$inputLabelColor: '$$inputTextColor',
        $$inputHoverBorderColor: '$colors$success'
      },
      warning: {
        $$inputColor: '$colors$warningLight',
        $$inputPlaceholderColor: '$colors$warningLightContrast',
        $$inputTextColor: '$colors$warningLightContrast',
        $$inputLabelColor: '$$inputTextColor',
        $$inputHoverBorderColor: '$colors$warning'
      },
      error: {
        $$inputColor: '$colors$errorLight',
        $$inputPlaceholderColor: '$colors$errorLightContrast',
        $$inputTextColor: '$colors$errorLightContrast',
        $$inputLabelColor: '$$inputTextColor',
        $$inputHoverBorderColor: '$colors$error'
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
        $$inputFontSize: '$fontSizes$xs',
        $$inputHeightRatio: '1.2',
        br: '$$inputBorderRadius'
      },
      sm: {
        $$inputBorderRadius: '$space$4',
        $$inputFontSize: '$fontSizes$xs',
        $$inputHeightRatio: '1.6',
        br: '$$inputBorderRadius'
      },
      md: {
        $$inputBorderRadius: '$space$6',
        $$inputFontSize: '$fontSizes$sm',
        $$inputHeightRatio: '2',
        br: '$$inputBorderRadius'
      },
      lg: {
        $$inputBorderRadius: '$space$7',
        $$inputFontSize: '$fontSizes$md',
        $$inputHeightRatio: '2.2',
        br: '$$inputBorderRadius'
      },
      xl: {
        $$inputBorderRadius: '$space$8',
        $$inputFontSize: '$fontSizes$lg',
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
        $$inputColor: '$colors$accents1',
        $$inputTextColor: '$colors$accents7',
        $$inputPlaceholderColor: '$colors$accents7',
        $$inputShadow: '$shadows$sm'
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
    isTextarea: {
      true: {
        boxShadow: 'none',
        display: 'block',
        size: '100%',
        resize: 'none',
        border: 'none',
        outline: 'none'
      }
    },
    focused: {
      true: {
        '&::placeholder': {
          opacity: 0,
          transition: 'opacity 0.25s ease 0s'
        }
      }
    },
    bordered: {
      true: {
        padding: '0 $3'
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
      true: {
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%',
        height: 'auto'
      },
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
    },
    // isTextarea  && !underlined
    {
      isTextarea: true,
      underlined: false,
      css: {
        [`& ${StyledInput}`]: {
          margin: '$xs $sm'
        }
      }
    }
  ]
});

export const StyledHelperTextContainer = styled('div', {
  position: 'absolute',
  opacity: 0,
  bottom: 'calc($$inputHeightRatio * -$space$5)',
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

export const StyledInputPlaceholder = styled('span', {}, sharedVisuallyHidden);

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
      true: {
        color: '$$inputHoverBorderColor'
      }
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
    bordered: {
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
      isTextarea: false,
      css: {
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
      isTextarea: false,
      css: {
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
      isTextarea: false,
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
      isTextarea: false,
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
        top: 'calc(-$space$10 - $space$3)',
        left: '$2'
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
    },
    // focused && asPlaceholder && isTextarea && bordered
    {
      asPlaceholder: true,
      focused: true,
      isTextarea: true,
      bordered: true,
      css: {
        top: '-$12'
      }
    }
  ],
  defaultVariants: {
    asPlaceholder: false
  }
});

export const StyledInputLabel = styled('span', {
  position: 'relative',
  display: 'inline-flex',
  width: 'initial',
  height: '100%',
  fontWeight: '$medium',
  ai: 'center',
  pe: 'none',
  margin: 0,
  padding: '0 $sm',
  color: '$$inputPlaceholderColor',
  fontSize: '$$inputFontSize',
  lineHeight: '$xs',
  variants: {
    isRight: {
      true: {
        btrr: '$$inputBorderRadius',
        bbrr: '$$inputBorderRadius'
      },
      false: {
        btlr: '$$inputBorderRadius',
        bblr: '$$inputBorderRadius'
      }
    },
    isDark: {
      true: {}
    },
    isDefaultStatus: {
      true: {}
    },
    underlined: {
      true: {
        bg: 'transparent'
      }
    },
    bordered: {
      true: {
        '&:after': {
          display: 'none'
        },
        '&:before': {
          display: 'none'
        }
      }
    }
  },
  compoundVariants: [
    // isRight && underlined
    {
      isRight: true,
      underlined: true,
      css: {
        borderLeftColor: '$$inputPlaceholderColor',
        borderLeftStyle: 'solid',
        marginLeft: '$2',
        borderLeftWidth: 'calc($$inputBorderWeight / 2)',
        height: '40%'
      }
    },
    // !isRight && underlined
    {
      isRight: false,
      underlined: true,
      css: {
        borderRightColor: '$$inputPlaceholderColor',
        borderRightStyle: 'solid',
        marginRight: '$2',
        borderRightWidth: 'calc($$inputBorderWeight / 1)',
        height: '40%'
      }
    },
    // isDefaultStatus && !bordered && !underlined
    {
      isDefaultStatus: true,
      bordered: false,
      underlined: false,
      css: {
        bg: '$accents2'
      }
    },
    // isDefaultStatus && !bordered && !underlined && isDark
    {
      isDefaultStatus: true,
      bordered: false,
      underlined: false,
      isDark: true,
      css: {
        color: '$accents6'
      }
    },
    // !isDefaultStatus && !bordered && !underlined
    {
      isDefaultStatus: false,
      bordered: true,
      underlined: false,
      css: {
        bg: '$$inputColor'
      }
    },
    // bordered && isRight
    {
      bordered: true,
      isRight: true,
      css: {
        peddingRight: '$sm',
        paddingLeft: 0
      }
    },
    // bordered && !isRight
    {
      bordered: true,
      isRight: false,
      css: {
        peddingLeft: '$sm',
        paddingRight: 0
      }
    }
  ],
  defaultVariants: {
    isRight: false
  }
});

export const StyledInputContent = styled('span', {
  variants: {
    applyStyles: {
      true: {
        display: 'flex',
        boxSizing: 'content-box',
        width: 'calc($$inputHeightRatio * $space$4)',
        height: '100%',
        alignItems: 'center',
        verticalAlign: 'center',
        margin: 0,
        padding: '0 calc($$inputHeightRatio * $3)',
        color: '$$inputTextColor',
        lineHeight: '$xs',
        position: 'relative',
        cursor: 'default',
        pe: 'none'
      }
    },
    clickable: {
      true: {
        cursor: 'pointer',
        pe: 'auto'
      }
    }
  }
});

export const StyledInputClearButton = styled('button', {
  position: 'absolute',
  right: 0,
  margin: 0,
  d: 'inline-flex',
  ai: 'center',
  border: 'none',
  bg: 'transparent',
  width: 'auto',
  height: 'auto',
  cursor: 'pointer',
  boxSizing: 'border-box',
  transition:
    'color 250ms ease 0s, transform 250ms ease 0s, opacity 250ms ease 0s',
  color: '$$inputPlaceholderColor',
  visibility: 'hidden',
  transform: 'translateX(20%)',
  opacity: 0,
  '&:hover': {
    opacity: 0.85
  },
  svg: {
    color: 'currentColor',
    size: 'calc($space$5 * $$inputHeightRatio)'
  },
  '@motion': {
    transition: 'none'
  },
  variants: {
    visible: {
      true: {
        visibility: 'visible',
        transform: 'translateX(0)',
        opacity: 1
      }
    },
    underlined: {
      true: {
        padding: '0 $1'
      }
    },
    animated: {
      false: {
        transition: 'none'
      }
    },
    hasContentRight: {
      true: {
        padding: 0,
        position: 'relative',
        transform: 'translateX(30%)'
      }
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        '&:hover': {
          color: '$accents3'
        }
      }
    }
  }
});

// types
export type InputVariantsProps = VariantProps<typeof StyledInput>;
export type InputBlockLabelVariantsProps = VariantProps<
  typeof StyledInputBlockLabel
>;
export type InputLabelVariantsProps = VariantProps<typeof StyledInputLabel>;
export type InputContentVariantsProps = VariantProps<typeof StyledInputContent>;
