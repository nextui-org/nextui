import { styled, VariantProps } from '../theme/stitches.config';

const StyledContainer = styled('div', {
  w: '100%',
  mr: 'auto',
  ml: 'auto',
  variants: {
    fluid: {
      true: {
        maxWidth: '100%'
      }
    },
    responsive: {
      true: {
        '@xs': {
          maxWidth: '$breakpoints$xs'
        },
        '@sm': {
          maxWidth: '$breakpoints$sm'
        },
        '@md': {
          maxWidth: '$breakpoints$md'
        },
        '@lg': {
          maxWidth: '$breakpoints$lg'
        },
        '@xl': {
          maxWidth: '$breakpoints$xl'
        }
      }
    }
  },
  defaultVariants: {
    fluid: false,
    responsive: true
  }
});

export type ContainerVariantsProps = VariantProps<typeof StyledContainer>;

export default StyledContainer;
