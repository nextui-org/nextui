import { styled } from '../theme/stitches.config';

export const StyledDropdownMenu = styled('ul', {
  $$dropdownItemHeight: '$space$13',
  $$dropdownMenuPadding: '$space$4',
  listStyle: 'none',
  minWidth: '250px',
  position: 'relative',
  p: '$$dropdownMenuPadding',
  m: 0,
  outline: 'none'
});

export const StyledDropdownItem = styled('li', {
  $$dropdownItemPressedScale: 0.97,
  $$dropdownItemTextColor: '$text',
  outline: 'none',
  cursor: 'pointer',
  dflex: 'center',
  justifyContent: 'space-between',
  bg: 'transparent',
  position: 'relative',
  height: '$$dropdownItemHeight',
  px: '$6',
  br: '$sm',
  color: '$$dropdownItemTextColor',
  mb: 0,
  transition: 'background 0.25s ease, transform 0.25s ease, color 0.15s ease',
  /* Avoid blurriness */
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  '@motion': {
    transition: 'none'
  },
  variants: {
    color: {
      default: {
        $$dropdownItemHoverBackground: '$colors$neutralLight',
        $$dropdownItemHoverColor: '$foreground',
        $$dropdownItemActiveBackground: '$colors$neutralLightActive'
      },
      primary: {
        $$dropdownItemHoverBackground: '$colors$primaryLight',
        $$dropdownItemHoverColor: '$colors$primaryLightContrast',
        $$dropdownItemActiveBackground: '$colors$primaryLightActive'
      },
      secondary: {
        $$dropdownItemHoverBackground: '$colors$secondaryLight',
        $$dropdownItemHoverColor: '$colors$secondaryLightContrast',
        $$dropdownItemActiveBackground: '$colors$secondaryLightActive'
      },
      success: {
        $$dropdownItemHoverBackground: '$colors$successLight',
        $$dropdownItemHoverColor: '$colors$successLightContrast',
        $$dropdownItemActiveBackground: '$colors$successLightActive'
      },
      warning: {
        $$dropdownItemHoverBackground: '$colors$warningLight',
        $$dropdownItemHoverColor: '$colors$warningLightContrast',
        $$dropdownItemActiveBackground: '$colors$warningLightActive'
      },
      error: {
        $$dropdownItemHoverBackground: '$colors$errorLight',
        $$dropdownItemHoverColor: '$colors$errorLightContrast',
        $$dropdownItemActiveBackground: '$colors$errorLightActive'
      }
    },
    textColor: {
      default: {
        $$dropdownItemTextColor: '$colors$text',
        $$dropdownItemHoverColor: '$colors$text'
      },
      primary: {
        $$dropdownItemTextColor: '$colors$primaryLightContrast',
        $$dropdownItemHoverColor: '$colors$primaryLightContrast'
      },
      secondary: {
        $$dropdownItemTextColor: '$colors$secondaryLightContrast',
        $$dropdownItemHoverColor: '$colors$secondaryLightContrast'
      },
      success: {
        $$dropdownItemTextColor: '$colors$successLightContrast',
        $$dropdownItemHoverColor: '$colors$successLightContrast'
      },
      warning: {
        $$dropdownItemTextColor: '$colors$warningLightContrast',
        $$dropdownItemHoverColor: '$colors$warningLightContrast'
      },
      error: {
        $$dropdownItemTextColor: '$colors$errorLightContrast',
        $$dropdownItemHoverColor: '$colors$errorLightContrast'
      }
    },
    isPressed: {
      true: {
        bg: '$$dropdownItemActiveBackground'
      }
    },
    isFocused: {
      true: {
        bg: '$$dropdownItemHoverBackground',
        color: '$$dropdownItemHoverColor'
      }
    },
    isHovered: {
      true: {
        bg: '$$dropdownItemHoverBackground',
        color: '$$dropdownItemHoverColor'
      }
    },
    isSelected: {
      true: {}
    },
    isSelectable: {
      true: {}
    },
    isDisabled: {
      true: {
        color: '$accents5',
        cursor: 'default'
      }
    },
    withDivider: {
      true: {
        mt: '$6',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '-$3',
          left: '-$$dropdownMenuPadding',
          right: '-$$dropdownMenuPadding',
          height: '1px',
          bg: '$border'
        }
      }
    },
    disableAnimation: {
      true: {
        transition: 'none'
      }
    }
  },
  compoundVariants: [
    // !disableAnimation && isPressed
    {
      isPressed: true,
      disableAnimation: false,
      css: {
        transform: 'scale($$dropdownItemPressedScale)'
      }
    }
  ],
  defaultVariants: {
    color: 'default',
    textColor: 'default'
  }
});
