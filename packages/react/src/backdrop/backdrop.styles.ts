import { styled, VariantProps } from '../theme/stitches.config';

export const StyledBackdropContent = styled('div', {
  position: 'relative',
  display: 'inline-block',
  zIndex: '$max',
  outline: 'none',
  width: '100%',
  margin: '$9 auto',
  verticalAlign: 'middle',
  '@sm': {
    width: '90%',
    maxWidth: '90%'
  }
});

export const StyledBackdropLayer = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  size: '100%',
  pe: 'none',
  zIndex: '$max',
  '@motion': {
    transition: 'none'
  },
  variants: {
    blur: {
      true: {
        opacity: 1,
        transition: 'background 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'saturate(180%) blur(20px)',
        bg: 'rgba(0, 0, 0, 0.1)'
      },
      false: {
        bg: '$black',
        opacity: '$$backdropOpacity',
        transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    animated: {
      false: {
        transition: 'none'
      }
    }
  }
});

export const StyledBackdrop = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'auto',
  zIndex: '$max',
  WebkitOverflowScrolling: 'touch',
  boxSizing: 'border-box',
  textAlign: 'center',
  '&:before': {
    content: '',
    display: 'inline-block',
    width: 0,
    height: '100%',
    verticalAlign: 'middle'
  },
  '.nextui-backdrop-wrapper-enter .nextui-backdrop-layer-default': {
    opacity: 0
  },
  '.nextui-backdrop-wrapper-enter-active .nextui-backdrop-layer-default': {
    opacity: '$$backdropOpacity'
  },

  '.nextui-backdrop-wrapper-leave .nextui-backdrop-layer-default': {
    opacity: '$$backdropOpacity'
  },
  '.nextui-backdrop-wrapper-leave-active .nextui-backdrop-layer-default': {
    opacity: 0
  },

  '.nextui-backdrop-wrapper-enter .nextui-backdrop-layer-blur': {
    bg: 'rgba(0, 0, 0, 0.1)'
  },
  '.nextui-backdrop-wrapper-enter-active .nextui-backdrop-layer-blur': {
    bg: 'rgba(0, 0, 0, 0.4)'
  },

  '.nextui-backdrop-wrapper-leave .nextui-backdrop-layer-blur': {
    bg: 'rgba(0, 0, 0, 0.4)'
  },
  '.nextui-backdrop-wrapper-leave-active .nextui-backdrop-layer-blur': {
    bg: 'rgba(0, 0, 0, 0.1)'
  },
  variants: {
    fullScreen: {
      true: {
        display: 'inline-flex',
        overflow: 'hidden',
        [`& ${StyledBackdropContent}`]: {
          width: '100vw',
          maxWidth: '100vw',
          height: '100vh',
          margin: 0
        },
        [`& ${StyledBackdropLayer}`]: {
          display: 'none'
        }
      }
    }
  },
  defaultVariants: {
    fullScreen: false
  }
});

export type BackdropVariantsProps = VariantProps<typeof StyledBackdrop>;
