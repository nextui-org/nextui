import { styled, VariantProps } from '../theme/stitches.config';
import { cssFocusVisible, sharedDialogPopup } from '../theme/shared-css';
import { StyledDrip } from '../utils/drip';

export const StyledButton = styled(
  'button',
  {
    $$buttonBorderRadius: '$radii$md',
    $$buttonPressedScale: 0.97,
    dflex: 'center',
    appearance: 'none',
    boxSizing: 'border-box',
    fontWeight: '$medium',
    us: 'none',
    lineHeight: '$sm',
    ta: 'center',
    whiteSpace: 'nowrap',
    transition: '$button',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    cursor: 'pointer',
    pe: 'auto',
    p: 0,
    br: '$$buttonBorderRadius',
    '@motion': {
      transition: 'none'
    },
    '.nextui-button-text': {
      dflex: 'center',
      zIndex: '$2',
      'p, pre, div': {
        margin: 0
      }
    },
    [`& ${StyledDrip}`]: {
      zIndex: '$1',
      '.nextui-drip-filler': {
        opacity: 0.25,
        fill: '$accents2'
      }
    },
    variants: {
      bordered: {
        true: {
          bg: 'transparent',
          borderStyle: 'solid',
          color: '$text'
        }
      },
      ghost: {
        true: {}
      },
      color: {
        default: {
          bg: '$primary',
          color: '$primarySolidContrast'
        },
        primary: {
          bg: '$primary',
          color: '$primarySolidContrast'
        },
        secondary: {
          bg: '$secondary',
          color: '$secondarySolidContrast'
        },
        success: {
          bg: '$success',
          color: '$successSolidContrast'
        },
        warning: {
          bg: '$warning',
          color: '$warningSolidContrast'
        },
        error: {
          bg: '$error',
          color: '$errorSolidContrast'
        },
        gradient: {
          bg: '$gradient',
          color: '$primarySolidContrast'
        }
      },
      size: {
        xs: {
          $$buttonPadding: '$space$3',
          $$buttonBorderRadius: '$radii$xs',
          $$buttonHeight: '$space$10',
          px: '$3',
          height: '$$buttonHeight',
          lh: '$space$10',
          width: 'auto',
          minWidth: '$20',
          fontSize: '$tiny'
        },
        sm: {
          $$buttonPadding: '$space$5',
          $$buttonBorderRadius: '$radii$sm',
          $$buttonHeight: '$space$12',
          px: '$5',
          height: '$$buttonHeight',
          lh: '$space$14',
          width: 'auto',
          minWidth: '$36',
          fontSize: '$xs'
        },
        md: {
          $$buttonPadding: '$space$7',
          $$buttonBorderRadius: '$radii$md',
          $$buttonHeight: '$space$14',
          px: '$7',
          height: '$$buttonHeight',
          lh: '$space$14',
          width: 'auto',
          minWidth: '$48',
          fontSize: '$xs'
        },
        lg: {
          $$buttonPadding: '$space$9',
          $$buttonBorderRadius: '$radii$base',
          $$buttonHeight: '$space$16',
          px: '$9',
          height: '$$buttonHeight',
          lh: '$space$15',
          width: 'auto',
          minWidth: '$60',
          fontSize: '$base'
        },
        xl: {
          $$buttonPadding: '$space$10',
          $$buttonBorderRadius: '$radii$xl',
          $$buttonHeight: '$space$18',
          px: '$10',
          height: '$$buttonHeight',
          lh: '$space$17',
          width: 'auto',
          minWidth: '$72',
          fontSize: '$sm'
        }
      },
      borderWeight: {
        light: {
          bw: '$light',
          $$buttonBorderWeight: '$borderWeights$light'
        },
        normal: {
          bw: '$normal',
          $$buttonBorderWeight: '$borderWeights$normal'
        },
        bold: {
          bw: '$bold',
          $$buttonBorderWeight: '$borderWeights$bold'
        },
        extrabold: {
          bw: '$extrabold',
          $$buttonBorderWeight: '$borderWeights$extrabold'
        },
        black: {
          bw: '$black',
          $$buttonBorderWeight: '$borderWeights$black'
        }
      },
      flat: {
        true: {
          color: '$text'
        }
      },
      light: {
        true: {
          bg: 'transparent',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.8,
              fill: '$accents2'
            }
          }
        }
      },
      shadow: {
        true: {
          bs: '$sm'
        }
      },
      animated: {
        false: {
          transition: 'none'
        }
      },
      auto: {
        true: {
          width: 'auto',
          minWidth: 'min-content'
        }
      },
      rounded: {
        true: {
          $$buttonBorderRadius: '$radii$pill'
        }
      },
      isPressed: {
        true: {}
      },
      isHovered: {
        true: {}
      },
      isChildLess: {
        true: {
          p: 0,
          width: '$$buttonHeight',
          height: '$$buttonHeight'
        }
      }
    },
    compoundVariants: [
      // isPressed && animated
      {
        isPressed: true,
        animated: true,
        css: {
          transform: 'scale($$buttonPressedScale)'
        }
      },
      // size / auto / isChildLess
      {
        auto: true,
        isChildLess: false,
        size: 'xs',
        css: {
          px: '$5',
          minWidth: 'min-content'
        }
      },
      {
        auto: true,
        isChildLess: false,
        size: 'sm',
        css: {
          px: '$8',
          minWidth: 'min-content'
        }
      },
      {
        auto: true,
        isChildLess: false,
        size: 'md',
        css: {
          px: '$9',
          minWidth: 'min-content'
        }
      },
      {
        auto: true,
        isChildLess: false,
        size: 'lg',
        css: {
          px: '$10',
          minWidth: 'min-content'
        }
      },
      {
        auto: true,
        isChildLess: false,
        size: 'xl',
        css: {
          px: '$11',
          minWidth: 'min-content'
        }
      },
      // shadow / color
      {
        shadow: true,
        color: 'default',
        css: {
          normalShadow: '$primaryShadow'
        }
      },
      {
        shadow: true,
        color: 'primary',
        css: {
          normalShadow: '$primaryShadow'
        }
      },
      {
        shadow: true,
        color: 'secondary',
        css: {
          normalShadow: '$secondaryShadow'
        }
      },
      {
        shadow: true,
        color: 'warning',
        css: {
          normalShadow: '$warningShadow'
        }
      },
      {
        shadow: true,
        color: 'success',
        css: {
          normalShadow: '$successShadow'
        }
      },
      {
        shadow: true,
        color: 'error',
        css: {
          normalShadow: '$errorShadow'
        }
      },
      {
        shadow: true,
        color: 'gradient',
        css: {
          normalShadow: '$primaryShadow'
        }
      },
      // light / color
      {
        light: true,
        color: 'default',
        css: {
          bg: 'transparent',
          color: '$text',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.8,
              fill: '$primaryLightActive'
            }
          }
        }
      },
      {
        light: true,
        color: 'primary',
        css: {
          bg: 'transparent',
          color: '$primary',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.8,
              fill: '$primaryLightActive'
            }
          }
        }
      },
      {
        light: true,
        color: 'secondary',
        css: {
          bg: 'transparent',
          color: '$secondary',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.8,
              fill: '$secondaryLightActive'
            }
          }
        }
      },
      {
        light: true,
        color: 'warning',
        css: {
          bg: 'transparent',
          color: '$warning',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.8,
              fill: '$warningLightActive'
            }
          }
        }
      },
      {
        light: true,
        color: 'success',
        css: {
          bg: 'transparent',
          color: '$success',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.8,
              fill: '$successLightActive'
            }
          }
        }
      },
      {
        light: true,
        color: 'error',
        css: {
          bg: 'transparent',
          color: '$error',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.8,
              fill: '$errorLightActive'
            }
          }
        }
      },
      // bordered / color
      {
        bordered: true,
        color: 'default',
        css: {
          bg: 'transparent',
          borderColor: '$primary',
          color: '$primary',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              fill: '$primary'
            }
          }
        }
      },
      {
        bordered: true,
        color: 'primary',
        css: {
          bg: 'transparent',
          borderColor: '$primary',
          color: '$primary',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              fill: '$primary'
            }
          }
        }
      },
      {
        bordered: true,
        color: 'secondary',
        css: {
          bg: 'transparent',
          borderColor: '$secondary',
          color: '$secondary',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              fill: '$secondary'
            }
          }
        }
      },
      {
        bordered: true,
        color: 'success',
        css: {
          bg: 'transparent',
          borderColor: '$success',
          color: '$success',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              fill: '$success'
            }
          }
        }
      },
      {
        bordered: true,
        color: 'warning',
        css: {
          bg: 'transparent',
          borderColor: '$warning',
          color: '$warning',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              fill: '$warning'
            }
          }
        }
      },
      {
        bordered: true,
        color: 'error',
        css: {
          bg: 'transparent',
          borderColor: '$error',
          color: '$error',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              fill: '$error'
            }
          }
        }
      },
      {
        bordered: true,
        color: 'gradient',
        css: {
          bg: 'transparent',
          color: '$text',
          padding: '$$buttonBorderWeight',
          bgClip: 'content-box, border-box',
          borderColor: '$primary',
          backgroundImage:
            'linear-gradient($background, $background), $gradient',
          border: 'none',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              fill: '$secondary'
            }
          }
        }
      },
      // ghost / color && isHovered
      {
        ghost: true,
        isHovered: true,
        color: 'default',
        css: {
          bg: '$primary',
          color: '$primarySolidContrast'
        }
      },
      {
        ghost: true,
        isHovered: true,
        color: 'primary',
        css: {
          bg: '$primary',
          color: '$primarySolidContrast'
        }
      },
      {
        ghost: true,
        isHovered: true,
        color: 'secondary',
        css: {
          bg: '$secondary',
          color: '$secondarySolidContrast'
        }
      },
      {
        ghost: true,
        isHovered: true,
        color: 'success',
        css: {
          bg: '$success',
          color: '$successSolidContrast'
        }
      },
      {
        ghost: true,
        isHovered: true,
        color: 'warning',
        css: {
          bg: '$warning',
          color: '$warningSolidContrast'
        }
      },
      {
        ghost: true,
        isHovered: true,
        color: 'error',
        css: {
          bg: '$error',
          color: '$errorSolidContrast'
        }
      },
      {
        ghost: true,
        color: 'gradient',
        isHovered: true,
        css: {
          bg: '$gradient',
          color: '$white'
        }
      },
      // flat / color
      {
        flat: true,
        color: 'default',
        css: {
          bg: '$primaryLight',
          color: '$primaryLightContrast',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.4,
              fill: '$primary'
            }
          }
        }
      },
      {
        flat: true,
        color: 'primary',
        css: {
          bg: '$primaryLight',
          color: '$primaryLightContrast',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.4,
              fill: '$primary'
            }
          }
        }
      },
      {
        flat: true,
        color: 'secondary',
        css: {
          bg: '$secondaryLight',
          color: '$secondaryLightContrast',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.4,
              fill: '$secondary'
            }
          }
        }
      },
      {
        flat: true,
        color: 'success',
        css: {
          bg: '$successLight',
          color: '$successLightContrast',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.4,
              fill: '$success'
            }
          }
        }
      },
      {
        flat: true,
        color: 'warning',
        css: {
          bg: '$warningLight',
          color: '$warningLightContrast',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.4,
              fill: '$warning'
            }
          }
        }
      },
      {
        flat: true,
        color: 'error',
        css: {
          bg: '$errorLight',
          color: '$errorLightContrast',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.4,
              fill: '$error'
            }
          }
        }
      },
      // flat / isHovered / color
      {
        flat: true,
        isHovered: true,
        color: 'default',
        css: {
          bg: '$primaryLightHover'
        }
      },
      {
        flat: true,
        isHovered: true,
        color: 'primary',
        css: {
          bg: '$primaryLightHover'
        }
      },
      {
        flat: true,
        isHovered: true,
        color: 'secondary',
        css: {
          bg: '$secondaryLightHover'
        }
      },
      {
        flat: true,
        isHovered: true,
        color: 'success',
        css: {
          bg: '$successLightHover'
        }
      },
      {
        flat: true,
        isHovered: true,
        color: 'warning',
        css: {
          bg: '$warningLightHover'
        }
      },
      {
        flat: true,
        isHovered: true,
        color: 'error',
        css: {
          bg: '$errorLightHover'
        }
      },
      // flat / isPressed / color
      {
        flat: true,
        isPressed: true,
        color: 'default',
        css: {
          bg: '$primaryLightActive'
        }
      },
      {
        flat: true,
        isPressed: true,
        color: 'primary',
        css: {
          bg: '$primaryLightActive'
        }
      },
      {
        flat: true,
        isPressed: true,
        color: 'secondary',
        css: {
          bg: '$secondaryLightActive'
        }
      },
      {
        flat: true,
        isPressed: true,
        color: 'success',
        css: {
          bg: '$successLightActive'
        }
      },
      {
        flat: true,
        isPressed: true,
        color: 'warning',
        css: {
          bg: '$warningLightActive'
        }
      },
      {
        flat: true,
        isPressed: true,
        color: 'error',
        css: {
          bg: '$errorLightActive'
        }
      },
      // auto / gradient-color / bordered
      {
        auto: true,
        color: 'gradient',
        bordered: true,
        css: {
          '.nextui-button-text': {
            px: '$$buttonPadding'
          },
          '.nextui-button-icon': {
            ml: '$$buttonPadding'
          },
          '.nextui-button-icon-right': {
            mr: '$$buttonPadding'
          },
          '.nextui-button-text-left': {
            pl: 0
          },
          '.nextui-button-text-right': {
            pr: 0
          }
        }
      },
      // rounded && size
      {
        rounded: true,
        size: 'xs',
        css: {
          br: '$pill'
        }
      },
      {
        rounded: true,
        size: 'sm',
        css: {
          br: '$pill'
        }
      },
      {
        rounded: true,
        size: 'md',
        css: {
          br: '$pill'
        }
      },
      {
        rounded: true,
        size: 'lg',
        css: {
          br: '$pill'
        }
      },
      {
        rounded: true,
        size: 'xl',
        css: {
          br: '$pill'
        }
      }
    ],
    defaultVariants: {
      color: 'default',
      borderWeight: 'normal',
      animated: true,
      size: 'md'
    }
  },
  cssFocusVisible,
  sharedDialogPopup
);

export type ButtonVariantsProps = VariantProps<typeof StyledButton>;

export default StyledButton;
