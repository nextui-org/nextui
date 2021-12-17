import { theme, styled, VariantProps } from '../theme/stitches.config';
import { addColorAlpha } from '../utils/color';

const StyledLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'baseline',
  lineHeight: 'inherit',
  textDecoration: 'none',
  width: 'fitContent',
  '&:hover': {
    opacity: 0.8
  },
  '@motion': {
    transition: 'none'
  },
  '& svg': {
    ml: '$1',
    as: 'center',
    display: 'inline-flex',
    color: 'currentColor'
  },
  variants: {
    color: {
      default: {
        color: '$link'
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
    underline: {
      true: {
        '&:hover, &:active, &:focus': {
          textDecoration: 'underline'
        }
      }
    },
    block: {
      true: {
        padding: '$1 $2',
        borderRadius: '$base'
      }
    },
    animated: {
      true: {
        transition: '$default'
      }
    }
  },
  compoundVariants: [
    {
      color: 'default',
      block: true,
      css: {
        '&:hover': {
          backgroundColor: addColorAlpha(theme.colors?.link?.value, 0.2)
        }
      }
    },
    {
      color: 'primary',
      block: true,
      css: {
        '&:hover': {
          backgroundColor: addColorAlpha(theme.colors?.primary?.value, 0.2)
        }
      }
    },
    {
      color: 'secondary',
      block: true,
      css: {
        '&:hover': {
          backgroundColor: addColorAlpha(theme.colors?.secondary?.value, 0.2)
        }
      }
    },
    {
      color: 'secondary',
      block: true,
      css: {
        '&:hover': {
          backgroundColor: addColorAlpha(theme.colors?.secondary?.value, 0.2)
        }
      }
    },
    {
      color: 'success',
      block: true,
      css: {
        '&:hover': {
          backgroundColor: addColorAlpha(theme.colors?.success?.value, 0.2)
        }
      }
    },
    {
      color: 'warning',
      block: true,
      css: {
        '&:hover': {
          backgroundColor: addColorAlpha(theme.colors?.warning?.value, 0.2)
        }
      }
    },
    {
      color: 'error',
      block: true,
      css: {
        '&:hover': {
          backgroundColor: addColorAlpha(theme.colors?.error?.value, 0.2)
        }
      }
    }
  ],
  defaultVariants: {
    color: 'default',
    animated: true
  }
});

export type LinkVariantsProps = VariantProps<typeof StyledLink>;

export default StyledLink;
