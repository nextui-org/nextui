import { styled, VariantProps, sharedFocus } from '../theme/stitches.config';
import {
  reboundAnimation,
  appearanceIn,
  appearanceOut
} from '../utils/animations';

export const StyledModalHideTab = styled('div', {
  outline: 'none',
  overflow: 'hidden',
  width: 0,
  height: 0,
  opacity: 0
});

export const StyledModalCloseButton = styled(
  'button',
  {
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    zIndex: '$1',
    top: '$space$3',
    right: '$space$2',
    margin: 0,
    d: 'inline-flex',
    ai: 'center',
    height: 'auto',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: '$default',
    padding: 'calc($space$sm * 0.5)',
    color: '$accents4',
    br: '$space$5',
    svg: {
      color: 'currentColor'
    },
    '&:hover': {
      svg: {
        opacity: 0.8
      }
    },
    variants: {
      disabled: {
        true: {
          cursor: 'not-allowed'
        }
      }
    }
  },
  sharedFocus
);

export const StyledModalHeader = styled('div', {
  display: 'flex',
  flexShrink: 0,
  ai: 'center',
  ov: 'hidden',
  color: 'inherit',
  padding: '$sm $10',
  fs: '$xs',
  variants: {
    noPadding: {
      true: {
        padding: 0
      }
    },
    autoMargin: {
      true: {
        '> *:first-child': {
          mt: 0
        },
        '> *:last-child': {
          mb: 0
        }
      }
    }
  }
});

export const StyledModalBody = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  padding: '$sm $10',
  oy: 'auto',
  position: 'relative',
  ta: 'left',
  variants: {
    noPadding: {
      true: {
        flex: 1,
        padding: 0
      }
    },
    autoMargin: {
      true: {
        '> *:first-child': {
          mt: 0
        },
        '> *': {
          mb: '$8'
        },
        '> *:last-child': {
          mb: 0
        }
      }
    }
  }
});

export const StyledModalFooter = styled('div', {
  d: 'flex',
  flexWrap: 'wrap',
  flexShrink: 0,
  overflow: 'hidden',
  color: 'inherit',
  ai: 'center',
  fs: '$xs',
  padding: '$sm $lg',
  variants: {
    noPadding: {
      true: {
        padding: 0
      }
    },
    autoMargin: {
      true: {
        '> *': {
          m: '$2'
        }
      }
    }
  }
});

export const StyledModal = styled('section', {
  maxWidth: '100%',
  verticalAlign: 'middle',
  overflow: 'hidden',
  height: 'fit-content(20em)',
  maxHeight: 'inherit',
  display: 'flex',
  outline: 'none',
  flexDirection: 'column',
  position: 'relative',
  boxSizing: 'border-box',
  color: '$foreground',
  br: '$lg',
  boxShadow: '$lg',
  bg: '$background',
  animationFillMode: 'forwards',
  '&.nextui-modal-wrapper-enter:not(.nextui-modal-rendered)': {
    animationName: appearanceIn,
    animationDuration: '200ms',
    animationTimingFunction: 'ease-in',
    animationDirection: 'normal'
  },
  '&.nextui-modal-wrapper-leave': {
    animationName: appearanceOut,
    animationDuration: '50ms',
    animationTimingFunction: 'ease-out'
  },
  variants: {
    fullScreen: {
      true: {
        size: '100%',
        maxHeight: '100%'
      },
      false: {
        '&.nextui-modal-rebound': {
          animationDuration: '250ms',
          animationName: reboundAnimation,
          animationTimingFunction: 'ease',
          animationFillMode: 'forwards'
        }
      }
    },
    scroll: {
      true: {
        maxHeight: 'calc(100vh - 200px)'
      }
    },
    closeButton: {
      true: {
        paddingTop: '$lg',
        [`& ${StyledModalCloseButton}`]: {
          svg: {
            size: '$10'
          }
        }
      }
    },
    isDark: {
      true: {
        bg: '$accents1'
      }
    }
  },
  compoundVariants: [
    {
      // scroll && fullScreen
      scroll: true,
      fullScreen: true,
      css: {
        maxHeight: '100%'
      }
    }
  ]
});

export type ModalVariantsProps = VariantProps<typeof StyledModal>;
export type ModalCloseButtonVariantsProps = VariantProps<
  typeof StyledModalCloseButton
>;
export type ModalBodyVariantsProps = VariantProps<typeof StyledModalBody>;
export type ModalHeaderVariantsProps = VariantProps<typeof StyledModalHeader>;
export type ModalFooterVariantsProps = VariantProps<typeof StyledModalFooter>;
