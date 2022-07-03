import { styled, VariantProps } from '../theme/stitches.config';
import { cssFocusVisible } from '../theme/shared-css';

export const StyledDropdownMenu = styled('ul', {
  $$dropdownItemHeight: '$space$13',
  $$dropdownMenuPadding: '$space$4',
  $$dropdownMenuWidth: '250px',
  listStyle: 'none',
  position: 'relative',
  width: '$$dropdownMenuWidth',
  p: '$$dropdownMenuPadding',
  m: 0,
  outline: 'none'
});

export const StyledDropdownItemIconWrapper = styled('span', {
  dflex: 'center',
  flexShrink: 0,
  mr: '$4'
});

export const StyledDropdownItemKbd = styled('kbd', {
  opacity: 0.8,
  ml: '$4',
  mr: 0,
  dflex: 'center',
  color: '$$dropdownItemKeyboardColor',
  fontSize: '$xs',
  fontFamily: '$sans',
  boxShadow: 'none',
  bg: 'transparent',
  transition: 'border 0.26s ease 0s'
});

export const StyledDropdownItemContentWrapper = styled('div', {
  d: 'flex',
  flex: '1 1 0%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  lineHeight: 1.2
});

export const StyledDropdownItemContent = styled('span', {
  flex: '1 1 0%'
});

export const StyledDropdownItemDescription = styled('span', {
  fontSize: '$xs',
  color: '$$dropdownItemDescriptionColor',
  truncateText: 'calc($$dropdownMenuWidth * 0.9)',
  transition: 'color 0.26s ease 0s',
  variants: {
    hasIcon: {
      true: {
        truncateText: 'calc($$dropdownMenuWidth * 0.7)'
      }
    },
    hasCommand: {
      true: {
        truncateText: 'calc($$dropdownMenuWidth * 0.7)'
      }
    }
  },
  compoundVariants: [
    // hasIcon && hasCommand
    {
      hasIcon: true,
      hasCommand: true,
      css: {
        truncateText: 'calc($$dropdownMenuWidth * 0.6)'
      }
    }
  ]
});

export const StyledDropdownItem = styled(
  'li',
  {
    $$dropdownItemPressedScale: 0.97,
    $$dropdownItemTextColor: '$colors$text',
    $$dropdownItemBorderRadius: '$radii$sm',
    $$dropdownItemKeyboardColor: '$colors$accents8',
    $$dropdownItemDescriptionColor: '$colors$accents8',
    dflex: 'center',
    outline: 'none',
    cursor: 'pointer',
    justifyContent: 'space-between',
    bg: 'transparent',
    position: 'relative',
    height: '$$dropdownItemHeight',
    px: '$6',
    br: '$$dropdownItemBorderRadius',
    color: '$$dropdownItemTextColor',
    mb: 0,
    transition: '$dropdownItem',
    /* Avoid blurriness */
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    $$dropdownItemShadow: '$colors$primaryShadow',
    '@motion': {
      transition: 'none',
      [`& ${StyledDropdownItemKbd}`]: {
        transition: 'none'
      },
      [`& ${StyledDropdownItemDescription}`]: {
        transition: 'none'
      }
    },
    variants: {
      color: {
        default: {
          $$dropdownItemHoverBackground: '$colors$neutralLight',
          $$dropdownItemHoverTextColor: '$colors$neutralLightContrast',
          $$dropdownItemActiveBackground: '$colors$neutralLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$neutral',
          $$dropdownItemSolidHoverTextColor: '$colors$neutralSolidContrast',
          $$dropdownItemShadow: '$colors$neutralShadow',
          $$dropdownItemHoverBorderColor: '$colors$neutralBorder'
        },
        primary: {
          $$dropdownItemHoverBackground: '$colors$primaryLight',
          $$dropdownItemHoverTextColor: '$colors$primaryLightContrast',
          $$dropdownItemActiveBackground: '$colors$primaryLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$primary',
          $$dropdownItemSolidHoverTextColor: '$colors$primarySolidContrast',
          $$dropdownItemShadow: '$colors$primaryShadow',
          $$dropdownItemHoverBorderColor: '$colors$primaryBorder'
        },
        secondary: {
          $$dropdownItemHoverBackground: '$colors$secondaryLight',
          $$dropdownItemHoverTextColor: '$colors$secondaryLightContrast',
          $$dropdownItemActiveBackground: '$colors$secondaryLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$secondary',
          $$dropdownItemSolidHoverTextColor: '$colors$secondarySolidContrast',
          $$dropdownItemShadow: '$colors$secondaryShadow',
          $$dropdownItemHoverBorderColor: '$colors$secondaryBorder'
        },
        success: {
          $$dropdownItemHoverBackground: '$colors$successLight',
          $$dropdownItemHoverTextColor: '$colors$successLightContrast',
          $$dropdownItemActiveBackground: '$colors$successLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$success',
          $$dropdownItemSolidHoverTextColor: '$colors$successSolidContrast',
          $$dropdownItemShadow: '$colors$successShadow',
          $$dropdownItemHoverBorderColor: '$colors$successBorder'
        },
        warning: {
          $$dropdownItemHoverBackground: '$colors$warningLight',
          $$dropdownItemHoverTextColor: '$colors$warningLightContrast',
          $$dropdownItemActiveBackground: '$colors$warningLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$warning',
          $$dropdownItemSolidHoverTextColor: '$colors$warningSolidContrast',
          $$dropdownItemShadow: '$colors$warningShadow',
          $$dropdownItemHoverBorderColor: '$colors$warningBorder'
        },
        error: {
          $$dropdownItemHoverBackground: '$colors$errorLight',
          $$dropdownItemHoverTextColor: '$colors$errorLightContrast',
          $$dropdownItemActiveBackground: '$colors$errorLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$error',
          $$dropdownItemSolidHoverTextColor: '$colors$errorSolidContrast',
          $$dropdownItemShadow: '$colors$errorShadow',
          $$dropdownItemHoverBorderColor: '$colors$errorBorder'
        }
      },
      textColor: {
        default: {},
        primary: {
          $$dropdownItemTextColor: '$colors$primaryLightContrast',
          $$dropdownItemHoverTextColor: '$colors$primaryLightContrast'
        },
        secondary: {
          $$dropdownItemTextColor: '$colors$secondaryLightContrast',
          $$dropdownItemHoverTextColor: '$colors$secondaryLightContrast'
        },
        success: {
          $$dropdownItemTextColor: '$colors$successLightContrast',
          $$dropdownItemHoverTextColor: '$colors$successLightContrast'
        },
        warning: {
          $$dropdownItemTextColor: '$colors$warningLightContrast',
          $$dropdownItemHoverTextColor: '$colors$warningLightContrast'
        },
        error: {
          $$dropdownItemTextColor: '$colors$errorLightContrast',
          $$dropdownItemHoverTextColor: '$colors$errorLightContrast'
        }
      },
      variant: {
        flat: {
          true: {}
        },
        light: {
          true: {}
        },
        solid: {
          true: {}
        },
        shadow: {
          true: {}
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
          color: '$$dropdownItemHoverTextColor',
          zIndex: '$1',
          [`& ${StyledDropdownItemKbd}`]: {
            color: '$$dropdownItemHoverTextColor',
            borderColor: '$$dropdownItemHoverBorderColor'
          },
          [`& ${StyledDropdownItemDescription}`]: {
            color: 'currentColor'
          }
        }
      },
      isHovered: {
        true: {
          bg: '$$dropdownItemHoverBackground',
          color: '$$dropdownItemHoverTextColor',
          [`& ${StyledDropdownItemKbd}`]: {
            color: '$$dropdownItemHoverTextColor',
            borderColor: '$$dropdownItemHoverBorderColor'
          },
          [`& ${StyledDropdownItemDescription}`]: {
            color: 'currentColor'
          }
        }
      },
      shouldShowOutline: {
        true: {
          outline: 'solid 2px $$dropdownItemActiveBackground'
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
      withDescription: {
        true: {
          height: 'calc($$dropdownItemHeight * 1.2)'
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
            height: '$$dropdownItemBorderWeight',
            bg: '$border'
          }
        }
      },
      dividerWeight: {
        light: {
          $$dropdownItemBorderWeight: '$borderWeights$light'
        },
        normal: {
          $$dropdownItemBorderWeight: '$borderWeights$normal'
        },
        bold: {
          $$dropdownItemBorderWeight: '$borderWeights$bold'
        },
        extrabold: {
          $$dropdownItemBorderWeight: '$borderWeights$extrabold'
        },
        black: {
          $$dropdownItemBorderWeight: '$borderWeights$black'
        }
      },
      disableAnimation: {
        true: {
          transition: 'none',
          [`& ${StyledDropdownItemKbd}`]: {
            transition: 'none'
          },
          [`& ${StyledDropdownItemDescription}`]: {
            transition: 'none'
          }
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
      },

      // isHovered & variant === 'light'
      {
        isHovered: true,
        variant: 'light',
        css: {
          bg: 'transparent'
        }
      },
      // isFocused & variant === 'light'
      {
        isFocused: true,
        variant: 'light',
        css: {
          bg: 'transparent'
        }
      },
      // isHovered && variant === 'solid'
      {
        isHovered: true,
        variant: 'solid',
        css: {
          bg: '$$dropdownItemSolidHoverBackground',
          color: '$$dropdownItemSolidHoverTextColor',
          [`& ${StyledDropdownItemKbd}`]: {
            color: '$$dropdownItemSolidHoverTextColor'
          }
        }
      },
      // isFocused && variant === 'solid'
      {
        isFocused: true,
        variant: 'solid',
        css: {
          bg: '$$dropdownItemSolidHoverBackground',
          color: '$$dropdownItemSolidHoverTextColor',
          [`& ${StyledDropdownItemKbd}`]: {
            color: '$$dropdownItemSolidHoverTextColor'
          }
        }
      },
      // isHovered && variant === 'shadow'
      {
        isHovered: true,
        variant: 'shadow',
        css: {
          bg: '$$dropdownItemSolidHoverBackground',
          color: '$$dropdownItemSolidHoverTextColor',
          boxShadow: `0 3px 10px 0 $$dropdownItemShadow`,
          [`& ${StyledDropdownItemKbd}`]: {
            color: '$$dropdownItemSolidHoverTextColor'
          }
        }
      },
      // isFocused && variant === 'shadow'
      {
        isFocused: true,
        variant: 'shadow',
        css: {
          bg: '$$dropdownItemSolidHoverBackground',
          color: '$$dropdownItemSolidHoverTextColor',
          boxShadow: `0 3px 10px 0 $$dropdownItemShadow`,
          [`& ${StyledDropdownItemKbd}`]: {
            color: '$$dropdownItemSolidHoverTextColor'
          }
        }
      },
      // variant === 'flat' && color === 'default'
      {
        variant: 'flat',
        color: 'default',
        css: {
          $$dropdownItemHoverTextColor: '$colors$foreground'
        }
      }
    ],
    defaultVariants: {
      color: 'default',
      textColor: 'default',
      dividerWeight: 'light',
      variant: 'flat'
    }
  },
  cssFocusVisible
);

export const StyledDropdownSectionWrapper = styled('li', {
  mb: 0
});

export const StyledDropdownSection = styled('ul', {
  m: 0,
  p: 0,
  listStyle: 'none'
});

export const StyledDropdownSectionTitle = styled('span', {
  fontWeight: '$medium',
  fontSize: '$xs',
  padding: '0 $4',
  color: '$accents8'
});

export type DropdownItemVariantsProps = VariantProps<typeof StyledDropdownItem>;
export type StyledDropdownItemDescriptionProps = VariantProps<
  typeof StyledDropdownItemDescription
>;
