import {
  styled,
  theme,
  sharedFocus,
  VariantProps
} from '../theme/stitches.config';
import { StyledDrip } from '../utils/drip';

import { addColorAlpha } from '../utils/color';

export const StyledButton = styled(
  'button',
  {
    dflex: 'center',
    appearance: 'none',
    boxSizing: ' border-box',
    fontWeight: '$medium',
    us: 'none',
    lineHeight: '$sm',
    textTransform: 'capitalize',
    ta: 'center',
    whiteSpace: 'nowrap',
    transition: '$default',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    cursor: 'pointer',
    pe: 'auto',
    p: 0,
    '&:hover': {
      opacity: 0.85
    },
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
        true: {
          '&:hover': {
            color: '$white'
          }
        }
      },
      color: {
        default: {
          bg: '$primary',
          color: '$white'
        },
        primary: {
          bg: '$primary',
          color: '$white'
        },
        secondary: {
          bg: '$secondary',
          color: '$white'
        },
        success: {
          bg: '$success',
          color: '$white'
        },
        warning: {
          bg: '$warning',
          color: '$white'
        },
        error: {
          bg: '$error',
          color: '$white'
        },
        gradient: {
          bg: '$gradient',
          color: '$white'
        }
      },
      size: {
        xs: {
          $$buttonPadding: '$space$3',
          px: '$3',
          height: '$10',
          lh: '$space$10',
          width: 'auto',
          minWidth: '$20',
          fontSize: '$tiny',
          br: '$xs'
        },
        sm: {
          $$buttonPadding: '$space$5',
          px: '$5',
          height: '$12',
          lh: '$space$14',
          width: 'auto',
          minWidth: '$36',
          fontSize: '$xs',
          br: '$sm'
        },
        md: {
          $$buttonPadding: '$space$7',
          px: '$7',
          height: '$14',
          lh: '$space$14',
          width: 'auto',
          minWidth: '$48',
          fontSize: '$xs',
          br: '$md'
        },
        lg: {
          $$buttonPadding: '$space$9',
          px: '$9',
          height: '$15',
          lh: '$space$15',
          width: 'auto',
          minWidth: '$60',
          fontSize: '$base',
          br: '$base'
        },
        xl: {
          $$buttonPadding: '$space$10',
          px: '$10',
          height: '$17',
          lh: '$space$17',
          width: 'auto',
          minWidth: '$72',
          fontSize: '$sm',
          br: '$xl'
        }
      },
      borderWeight: {
        light: {
          bw: '$light'
        },
        normal: {
          bw: '$normal'
        },
        bold: {
          bw: '$bold'
        },
        extrabold: {
          bw: '$extrabold'
        },
        black: {
          bw: '$black'
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
      disabled: {
        true: {
          bg: '$accents2',
          color: '$accents4',
          cursor: 'not-allowed',
          pe: 'auto',
          '&:hover': {
            opacity: 1
          }
        }
      },
      clickable: {
        false: {
          cursor: 'default',
          pe: 'none'
        }
      },
      animated: {
        true: {
          '&:active': {
            transform: 'scale(0.97)'
          }
        },
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
          br: '$pill'
        }
      }
    },
    compoundVariants: [
      // size / auto
      {
        auto: true,
        size: 'xs',
        css: {
          px: '$5',
          minWidth: 'min-content'
        }
      },
      {
        auto: true,
        size: 'sm',
        css: {
          px: '$8',
          minWidth: 'min-content'
        }
      },
      {
        auto: true,
        size: 'md',
        css: {
          px: '$9',
          minWidth: 'min-content'
        }
      },
      {
        auto: true,
        size: 'lg',
        css: {
          px: '$10',
          minWidth: 'min-content'
        }
      },
      {
        auto: true,
        size: 'xl',
        css: {
          px: '$11',
          minWidth: 'min-content'
        }
      },
      // animated / disabled
      {
        animated: true,
        disabled: true,
        css: {
          '&:active': {
            transform: 'none'
          }
        }
      },
      // shadow / color
      {
        shadow: true,
        color: 'default',
        css: {
          normalShadow: '$primaryLight'
        }
      },
      {
        shadow: true,
        color: 'primary',
        css: {
          normalShadow: '$primaryLight'
        }
      },
      {
        shadow: true,
        color: 'secondary',
        css: {
          normalShadow: '$secondaryLight'
        }
      },
      {
        shadow: true,
        color: 'warning',
        css: {
          normalShadow: '$warningLight'
        }
      },
      {
        shadow: true,
        color: 'success',
        css: {
          normalShadow: '$successLight'
        }
      },
      {
        shadow: true,
        color: 'error',
        css: {
          normalShadow: '$errorLight'
        }
      },
      {
        shadow: true,
        color: 'gradient',
        css: {
          normalShadow: '$primaryLight'
        }
      },
      // light / color
      {
        light: true,
        color: 'default',
        css: {
          bg: 'transparent',
          color: '$text'
        }
      },
      {
        light: true,
        color: 'primary',
        css: {
          bg: 'transparent',
          color: '$primary'
        }
      },
      {
        light: true,
        color: 'secondary',
        css: {
          bg: 'transparent',
          color: '$secondary'
        }
      },
      {
        light: true,
        color: 'warning',
        css: {
          bg: 'transparent',
          color: '$warning'
        }
      },
      {
        light: true,
        color: 'success',
        css: {
          bg: 'transparent',
          color: '$success'
        }
      },
      {
        light: true,
        color: 'error',
        css: {
          bg: 'transparent',
          color: '$error'
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
          padding: '$1',
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
      // ghost / color
      {
        ghost: true,
        color: 'default',
        css: {
          '&:hover': {
            bg: '$primary'
          }
        }
      },
      {
        ghost: true,
        color: 'primary',
        css: {
          '&:hover': {
            bg: '$primary'
          }
        }
      },
      {
        ghost: true,
        color: 'secondary',
        css: {
          '&:hover': {
            bg: '$secondary'
          }
        }
      },
      {
        ghost: true,
        color: 'success',
        css: {
          '&:hover': {
            bg: '$success'
          }
        }
      },
      {
        ghost: true,
        color: 'warning',
        css: {
          '&:hover': {
            bg: '$warning'
          }
        }
      },
      {
        ghost: true,
        color: 'error',
        css: {
          '&:hover': {
            bg: '$error'
          }
        }
      },
      {
        ghost: true,
        color: 'gradient',
        css: {
          '&:hover': {
            bg: '$gradient'
          }
        }
      },
      // flat / color
      {
        flat: true,
        color: 'default',
        css: {
          bg: addColorAlpha(theme.colors?.primary?.value, 0.25),
          color: '$primary',
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
          bg: addColorAlpha(theme.colors?.primary?.value, 0.25),
          color: '$primary',
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
          bg: addColorAlpha(theme.colors?.secondary?.value, 0.25),
          color: '$secondary',
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
          bg: addColorAlpha(theme.colors?.success?.value, 0.25),
          color: '$success',
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
          bg: addColorAlpha(theme.colors?.warning?.value, 0.25),
          color: '$warning',
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
          bg: addColorAlpha(theme.colors?.error?.value, 0.25),
          color: '$error',
          [`& ${StyledDrip}`]: {
            '.nextui-drip-filler': {
              opacity: 0.4,
              fill: '$error'
            }
          }
        }
      },
      // border-weight / gradient-color / bordered
      {
        bordered: true,
        color: 'gradient',
        borderWeight: 'light',
        css: {
          padding: '$borderWeights$light'
        }
      },
      {
        bordered: true,
        color: 'gradient',
        borderWeight: 'normal',
        css: {
          padding: '$borderWeights$normal'
        }
      },
      {
        bordered: true,
        color: 'gradient',
        borderWeight: 'bold',
        css: {
          padding: '$borderWeights$bold'
        }
      },
      {
        bordered: true,
        color: 'gradient',
        borderWeight: 'extrabold',
        css: {
          padding: '$borderWeights$extrabold'
        }
      },
      {
        bordered: true,
        color: 'gradient',
        borderWeight: 'black',
        css: {
          padding: '$borderWeights$black'
        }
      },
      // size / auto / gradient-color / bordered
      {
        auto: true,
        color: 'gradient',
        bordered: true,
        size: 'xs',
        css: {
          px: '$1',
          py: '$1',
          '.nextui-button-text': {
            px: '$5'
          }
        }
      },
      {
        auto: true,
        color: 'gradient',
        bordered: true,
        size: 'sm',
        css: {
          px: '$1',
          py: '$1',
          '.nextui-button-text': {
            px: '$8'
          }
        }
      },
      {
        auto: true,
        color: 'gradient',
        bordered: true,
        size: 'md',
        css: {
          px: '$1',
          py: '$1',
          '.nextui-button-text': {
            px: '$9'
          }
        }
      },
      {
        auto: true,
        color: 'gradient',
        bordered: true,
        size: 'lg',
        css: {
          px: '$1',
          py: '$1',
          '.nextui-button-text': {
            px: '$14'
          }
        }
      },
      {
        auto: true,
        color: 'gradient',
        bordered: true,
        size: 'xl',
        css: {
          px: '$1',
          py: '$1',
          '.nextui-button-text': {
            px: '$12'
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
  sharedFocus
);

export type ButtonVariantsProps = VariantProps<typeof StyledButton>;

export default StyledButton;
