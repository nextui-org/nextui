import { styled, VariantProps } from '../theme/stitches.config';

export const StyledDivider = styled('div', {
  width: '100%',
  maxWidth: '100%',
  position: 'relative',
  variants: {
    color: {
      default: {
        bg: '$border'
      },
      primary: {
        bg: '$primary'
      },
      secondary: {
        bg: '$secondary'
      },
      success: {
        bg: '$success'
      },
      warning: {
        bg: '$warning'
      },
      error: {
        bg: '$error'
      }
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

export const StyledDividerText = styled('span', {
  position: 'absolute',
  left: '50%',
  top: '50%',
  minHeight: '100%',
  display: 'inline-flex',
  jc: 'center',
  ai: 'center',
  transform: 'translate(-50%, -50%)',
  padding: '0 $lg',
  fontSize: '$base',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  backgroundColor: '$background',
  zIndex: '$1',
  variants: {
    color: {
      default: {
        color: '$text'
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
    }
  }
});

export type DividerVariantsProps = VariantProps<typeof StyledDivider>;
