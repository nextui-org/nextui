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
        bg: '$primary'
      },
      primary: {
        bg: '$primary'
      },
      secondary: {
        bg: '$secondary'
      },
      warning: {
        bg: '$warning'
      },
      success: {
        bg: '$success'
      },
      error: {
        bg: '$error'
      }
    }
  },
  defaultVariants: {
    type: 'default'
  }
});

export type BadgeVariantsProps = VariantProps<typeof StyledBadge>;
