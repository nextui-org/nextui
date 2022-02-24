import { styled, VariantProps } from '../theme/stitches.config';

export const StyledAvatar = styled('span', {
  dflex: 'center',
  position: 'relative',
  zIndex: '$1',
  boxSizing: 'border-box',
  overflow: 'hidden',
  verticalAlign: 'top',
  cursor: 'auto',
  transition: '$default',
  '&:first-child': {
    margin: 0
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
  '.nextui-avatar-bg': {
    size: '100%'
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
        },
        '.nextui-avatar-text': {
          color: '$background'
        }
      },
      secondary: {
        '.nextui-avatar-bg': {
          bg: '$secondary'
        },
        '.nextui-avatar-text': {
          color: '$background'
        }
      },
      success: {
        '.nextui-avatar-bg': {
          bg: '$success'
        },
        '.nextui-avatar-text': {
          color: '$background'
        }
      },
      warning: {
        '.nextui-avatar-bg': {
          bg: '$warning'
        },
        '.nextui-avatar-text': {
          color: '$background'
        }
      },
      error: {
        '.nextui-avatar-bg': {
          bg: '$error'
        },
        '.nextui-avatar-text': {
          color: '$background'
        }
      },
      gradient: {
        '.nextui-avatar-bg': {
          bg: '$gradient'
        },
        '.nextui-avatar-text': {
          color: '$background'
        }
      }
    },
    textColor: {
      default: {
        '.nextui-avatar-text': {
          color: '$text'
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
});

export type AvatarVariantsProps = VariantProps<typeof StyledAvatar>;

export default StyledAvatar;
