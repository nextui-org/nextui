import { keyframes, styled, VariantProps } from '../theme/stitches.config';

const loading = keyframes({
  '0%': {
    backgroundPosition: '200% 0'
  },
  to: {
    backgroundPosition: '-200% 0'
  }
});

export const StyledImageContainer = styled('div', {
  opacity: 0,
  margin: '0 auto',
  position: 'relative',
  br: '$lg',
  overflow: 'hidden',
  maxWidth: '100%',
  transition: 'transform 250ms ease 0ms, opacity 200ms ease-in 0ms',
  '@motion': {
    transition: 'none'
  },
  variants: {
    ready: {
      true: {
        opacity: 1
      },
      false: {
        opacity: 0
      }
    }
  }
});

export const StyledImage = styled('img', {
  size: '100%',
  display: 'block'
});

export const StyledImageSkeleton = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  size: '100%',
  borderRadius: '$lg',
  backgroundImage:
    'linear-gradient(270deg,$accents1,$accents2,$accents2,$accents1)',
  backgroundSize: '400% 100%',
  animation: `${loading} 5s ease-in-out infinite`,
  transition: 'opacity 300ms ease-out'
});

export type ImageContainerVariantProps = VariantProps<
  typeof StyledImageContainer
>;
export type ImageVariantsProps = VariantProps<typeof StyledImage>;
export type ImageSkeletonVariantsProps = VariantProps<
  typeof StyledImageSkeleton
>;
