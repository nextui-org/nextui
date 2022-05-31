import { styled, VariantProps } from '../theme/stitches.config';
import { cssFocusVisible, sharedDialogPopup } from '../theme/shared-css';

export const StyledAvatar = styled(
  'span',
  {
    dflex: 'center',
    position: 'relative',
    zIndex: '$1',
    boxSizing: 'border-box',
    overflow: 'hidden',
    verticalAlign: 'top',
    cursor: 'auto',
    transition: 'transform 250ms ease 0ms, box-shadow 0.25s ease 0s',
    '.nextui-avatar-bg': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: '$2',
      transition: '$avatar',
      size: '100%'
    },
    '&:hover .nextui-avatar-bg': {
      boxShadow: ' inset 0 0 40px 0 rgb(0 0 0 / 14%)'
    },
    '.nextui-avatar-img': {
      opacity: 0,
      zIndex: '$3',
      display: 'flex',
      bg: '$background',
      transition: 'transform 250ms ease 0ms, opacity 200ms ease-in 0ms',
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    '&[data-state="ready"] .nextui-avatar-img': {
      opacity: 1
    },
    '.nextui-avatar-icon': {
      display: 'flex',
      position: 'absolute',
      left: '50%',
      top: '50%',
      ta: 'center',
      zIndex: '$2',
      transform: 'translate(-50%, -50%)',
      whiteSpace: 'nowrap',
      us: 'none'
    },
    '.nextui-avatar-text': {
      position: 'absolute',
      zIndex: '$2',
      left: '50%',
      top: '50%',
      ta: 'center',
      color: '$text',
      fontWeight: '$medium',
      transform: 'translate(-50%, -50%) scale(0.65)',
      whiteSpace: 'nowrap',
      us: 'none'
    },
    '@motion': {
      transition: 'none',
      '.nextui-avatar-bg, .nextui-avatar-img': {
        transition: 'none'
      }
    },
    variants: {
      color: {
        default: {
          '.nextui-avatar-bg': {
            bg: '$accents2'
          }
        },
        primary: {
          '.nextui-avatar-bg': {
            bg: '$primary'
          }
        },
        secondary: {
          '.nextui-avatar-bg': {
            bg: '$secondary'
          }
        },
        success: {
          '.nextui-avatar-bg': {
            bg: '$success'
          }
        },
        warning: {
          '.nextui-avatar-bg': {
            bg: '$warning'
          }
        },
        error: {
          '.nextui-avatar-bg': {
            bg: '$error'
          }
        },
        gradient: {
          '.nextui-avatar-bg': {
            bg: '$gradient'
          }
        }
      },
      textColor: {
        default: {
          '.nextui-avatar-text': {
            color: '$text'
          }
        },
        white: {
          '.nextui-avatar-text': {
            color: '$white'
          }
        },
        primary: {
          '.nextui-avatar-text': {
            color: '$primary'
          }
        },
        secondary: {
          '.nextui-avatar-text': {
            color: '$secondary'
          }
        },
        success: {
          '.nextui-avatar-text': {
            color: '$success'
          }
        },
        warning: {
          '.nextui-avatar-text': {
            color: '$warning'
          }
        },
        error: {
          '.nextui-avatar-text': {
            color: '$error'
          }
        }
      },
      size: {
        xs: {
          $$avatarXs: '$space$9',
          sizeMin: '$$avatarXs',
          '.nextui-avatar-text': {
            fontSize: '$xs'
          }
        },
        sm: {
          $$avatarSm: '$space$11',
          sizeMin: '$$avatarSm',
          '.nextui-avatar-text': {
            fontSize: '$base'
          }
        },
        md: {
          $$avatarMd: '$space$14',
          sizeMin: '$$avatarMd',
          '.nextui-avatar-text': {
            fontSize: '$sm'
          }
        },
        lg: {
          $$avatarLg: '$space$16',
          sizeMin: '$$avatarLg',
          '.nextui-avatar-text': {
            fontSize: '$sm'
          }
        },
        xl: {
          $$avatarXl: '$space$18',
          sizeMin: '$$avatarXl',
          '.nextui-avatar-text': {
            fontSize: '$md'
          }
        }
      },
      borderWeight: {
        light: {
          '.nextui-avatar-img': {
            borderWidth: '$light'
          }
        },
        normal: {
          '.nextui-avatar-img': {
            borderWidth: '$normal'
          }
        },
        bold: {
          '.nextui-avatar-img': {
            borderWidth: '$normal'
          }
        },
        extrabold: {
          '.nextui-avatar-img': {
            borderWidth: '$normal'
          }
        },
        black: {
          '.nextui-avatar-img': {
            borderWidth: '$normal'
          }
        }
      },
      bordered: {
        true: {
          '&:hover:not(.only-text-avatar) .nextui-avatar-bg': {
            opacity: '0.6'
          },
          '.nextui-avatar-img': {
            borderStyle: 'solid',
            borderColor: '$background'
          }
        }
      },
      stacked: {
        true: {
          ml: '-$5'
        }
      },
      pointer: {
        true: {
          cursor: 'pointer'
        }
      },
      rounded: {
        true: {
          borderRadius: '$rounded',
          '.nextui-avatar-img': {
            borderRadius: '$rounded'
          }
        }
      },
      squared: {
        true: {
          borderRadius: '$squared',
          '.nextui-avatar-img': {
            borderRadius: '$squared'
          }
        }
      },
      zoomed: {
        true: {
          '&:hover .nextui-avatar-img': {
            transform: 'scale(1.125)'
          }
        }
      }
    },
    compoundVariants: [
      // bordered / borderWeight
      {
        bordered: true,
        borderWeight: 'light',
        css: {
          padding: 'calc($1/2)'
        }
      },
      {
        bordered: true,
        borderWeight: 'normal',
        css: {
          padding: '$1'
        }
      },
      {
        bordered: true,
        borderWeight: 'bold',
        css: {
          padding: 'calc($2/1.5)'
        }
      },
      {
        bordered: true,
        borderWeight: 'extrabold',
        css: {
          padding: '$2'
        }
      },
      {
        bordered: true,
        borderWeight: 'black',
        css: {
          padding: 'calc($3/1.5)'
        }
      },
      {
        rounded: true,
        squared: true,
        css: {
          borderRadius: '$squared',
          '.nextui-avatar-img': {
            borderRadius: '$squared'
          }
        }
      }
    ],
    defaultVariants: {
      size: 'md',
      rounded: true,
      color: 'default',
      textColor: 'default',
      borderWeight: 'normal'
    }
  },
  cssFocusVisible,
  sharedDialogPopup
);

export type AvatarVariantsProps = VariantProps<typeof StyledAvatar>;

export default StyledAvatar;
