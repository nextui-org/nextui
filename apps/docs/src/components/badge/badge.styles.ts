import { styled, VariantProps } from '@nextui-org/react';

export const StyledBadge = styled('span', {
  display: 'inline-block',
  textTransform: 'uppercase',
  padding: '5px 5px',
  margin: '0 2px',
  fontSize: '10px',
  fontWeight: '800',
  borderRadius: '14px',
  letterSpacing: '0.6px',
  lineHeight: 1,
  textShadow: '0 1px 1px rgba(0, 0, 0, 0.16)',
  boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 10%)',
  alignItems: 'center',
  alignSelf: 'center',
  color: '$white',
  variants: {
    type: {
      default: {
        bg: '$primaryLight',
        color: '$primary'
      },
      primary: {
        bg: '$primaryLight',
        color: '$primary'
      },
      secondary: {
        bg: '$secondaryLight',
        color: '$secondary'
      },
      warning: {
        bg: '$warningLight',
        color: '$warning'
      },
      success: {
        bg: '$successLight',
        color: '$success'
      },
      error: {
        bg: '$errorLight',
        color: '$error'
      },
      disabled: {
        fontSize: '9px',
        color: '$accents8',
        bg: '$accents0'
      }
    },
    solid: {
      true: {
        color: '$white'
      }
    }
  },
  defaultVariants: {
    type: 'default'
  },
  compoundVariants: [
    // solid: true && type: 'default'
    {
      type: 'default',
      solid: true,
      css: {
        bg: '$primary'
      }
    },
    // solid: true && type: 'primary'
    {
      type: 'primary',
      solid: true,
      css: {
        bg: '$primary'
      }
    },
    // solid: true && type: 'secondary'
    {
      type: 'secondary',
      solid: true,
      css: {
        bg: '$secondary'
      }
    },
    // solid: true && type: 'warning'
    {
      type: 'warning',
      solid: true,
      css: {
        bg: '$warning'
      }
    },
    // solid: true && type: 'success'
    {
      type: 'success',
      solid: true,
      css: {
        bg: '$success'
      }
    },
    // solid: true && type: 'error'
    {
      type: 'error',
      solid: true,
      css: {
        bg: '$error'
      }
    }
  ]
});

export type BadgeVariantsProps = VariantProps<typeof StyledBadge>;
