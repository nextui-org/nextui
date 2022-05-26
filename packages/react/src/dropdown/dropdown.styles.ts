import { styled, VariantProps } from '../theme/stitches.config';
import { cssFocusVisible } from '../theme/shared-css';

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

export const StyledDropdownItem = styled(
  'li',
  {
    $$dropdownItemPressedScale: 0.97,
    $$dropdownItemTextColor: '$colors$text',
    $$dropdownItemBorderRadius: '$radii$sm',
    outline: 'none',
    cursor: 'pointer',
    dflex: 'center',
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
      transition: 'none'
    },
    variants: {
      color: {
        default: {
          $$dropdownItemHoverBackground: '$colors$neutralLight',
          $$dropdownItemHoverTextColor: '$colors$neutralLightContrast',
          $$dropdownItemActiveBackground: '$colors$neutralLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$neutral',
          $$dropdownItemSolidHoverTextColor: '$colors$neutralSolidContrast',
          $$dropdownItemShadow: '$colors$neutralShadow'
        },
        primary: {
          $$dropdownItemHoverBackground: '$colors$primaryLight',
          $$dropdownItemHoverTextColor: '$colors$primaryLightContrast',
          $$dropdownItemActiveBackground: '$colors$primaryLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$primary',
          $$dropdownItemSolidHoverTextColor: '$colors$primarySolidContrast',
          $$dropdownItemShadow: '$colors$primaryShadow'
        },
        secondary: {
          $$dropdownItemHoverBackground: '$colors$secondaryLight',
          $$dropdownItemHoverTextColor: '$colors$secondaryLightContrast',
          $$dropdownItemActiveBackground: '$colors$secondaryLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$secondary',
          $$dropdownItemSolidHoverTextColor: '$colors$secondarySolidContrast',
          $$dropdownItemShadow: '$colors$secondaryShadow'
        },
        success: {
          $$dropdownItemHoverBackground: '$colors$successLight',
          $$dropdownItemHoverTextColor: '$colors$successLightContrast',
          $$dropdownItemActiveBackground: '$colors$successLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$success',
          $$dropdownItemSolidHoverTextColor: '$colors$successSolidContrast',
          $$dropdownItemShadow: '$colors$successShadow'
        },
        warning: {
          $$dropdownItemHoverBackground: '$colors$warningLight',
          $$dropdownItemHoverTextColor: '$colors$warningLightContrast',
          $$dropdownItemActiveBackground: '$colors$warningLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$warning',
          $$dropdownItemSolidHoverTextColor: '$colors$warningSolidContrast',
          $$dropdownItemShadow: '$colors$warningShadow'
        },
        error: {
          $$dropdownItemHoverBackground: '$colors$errorLight',
          $$dropdownItemHoverTextColor: '$colors$errorLightContrast',
          $$dropdownItemActiveBackground: '$colors$errorLightActive',
          $$dropdownItemSolidHoverBackground: '$colors$error',
          $$dropdownItemSolidHoverTextColor: '$colors$errorSolidContrast',
          $$dropdownItemShadow: '$colors$errorShadow'
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
          color: '$$dropdownItemHoverTextColor'
        }
      },
      isHovered: {
        true: {
          bg: '$$dropdownItemHoverBackground',
          color: '$$dropdownItemHoverTextColor'
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
          color: '$$dropdownItemSolidHoverTextColor'
        }
      },
      // isFocused && variant === 'solid'
      {
        isFocused: true,
        variant: 'solid',
        css: {
          bg: '$$dropdownItemSolidHoverBackground',
          color: '$$dropdownItemSolidHoverTextColor'
        }
      },
      // isHovered && variant === 'shadow'
      {
        isHovered: true,
        variant: 'shadow',
        css: {
          bg: '$$dropdownItemSolidHoverBackground',
          color: '$$dropdownItemSolidHoverTextColor',
          boxShadow: `0 3px 10px 0 $$dropdownItemShadow`
        }
      },
      // isFocused && variant === 'shadow'
      {
        isFocused: true,
        variant: 'shadow',
        css: {
          bg: '$$dropdownItemSolidHoverBackground',
          color: '$$dropdownItemSolidHoverTextColor',
          boxShadow: `0 3px 10px 0 $$dropdownItemShadow`
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

export type DropdownItemVariantsProps = VariantProps<typeof StyledDropdownItem>;
